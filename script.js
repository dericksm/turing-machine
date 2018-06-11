const pattern1 = /((^q[a-zA-Z0-9]) -> ([a-zA-Z0-9]+),([a-zA-Z0-9]+),[ED])+/;
const pattern2 = /((^q[0-9]) -> ([0-9]+),([0-9]+),[ED])+/;

function Validate() {

  if ($("#btn-state").val() == "Enviar") {
    var error = false
    var pattern = $("#alphabet").val();
    var states = $("#estados").val();
    if (pattern == '1') {
      pattern = pattern1
    } else {
      pattern = pattern2
    }

    var statesArray = states.split('\n');

    for (var i = 0; i < statesArray.length; i++) {
      if (!statesArray[i].match(pattern)) {
        alert('Use some os caracteres válidos pelo alfabeto e respeite o padrão: q1 -> a,d,E');
        error = true;
      }
    }
    if (error == false) {
      $("#estados").val(states)
      $("#btn-state").val("Editar")
      $("#estados").prop('disabled', true)
      $("#btn-state").prop('class', 'btn btn-danger')
      toTuring(statesArray)
    }

  } else {


    var error = false
    var pattern = $("#alphabet").val()
    var states = $("#estados").val()
    if (pattern == '1') {
      pattern = pattern1
    } else {
      pattern = pattern2
    }

    var lines = states.split('\n');

    for (var i = 0; i < lines.length; i++) {
      if (!lines[i].match(pattern)) {
        alert('Use some os caracteres válidos pelo alfabeto e respeite o padrão: q1 -> a,d,E')
        error = true
      }
    }
    if (error == false) {
      $("#estados").val(states)
      $("#btn-state").val("Enviar")
      $("#estados").prop('disabled', false)
      $("#btn-state").prop('class', 'btn btn-primary')
      toTuring(states)
    }
  }

}

function insertTapeElements(data) {

  $('#tape-cell').append(data);
}

function tapeElements() {
  $('#tape-cell')[0].innerHTML = ''
  var val = $("#tape").val();
  var lines = val.split(',');
  var index = 0
  lines.forEach(element => {

    var html = ''
    html = "<td id=cel-" + index + ">" + element + "</td>"
    index++
    insertTapeElements(html)

  });

}

function setAlphabet() {
  var value = $("#alphabet").val();

  $("#alphabet").prop('disabled', true);
  $("#estados").prop('disabled', false);
}

function toTuring(states) {
  var state = []
  //aqui é Js até no talo
  if(states.some(element => states.includes(element, element))){
    alert('Existem estados repetidos!')
    return
  } else {
    states.forEach(element => {
      state.push({
        state: element.slice(0, 2),
        tape: element.slice(6, 7),
        write: element.slice(8, 9),
        goTo: element.slice(10, 11)
      })
    });

  }
 
}