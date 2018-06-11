const pattern = /((^q[a-zA-Z0-9_],[a-zA-Z0-9_]) -> (q[a-zA-Z0-9_]),([a-zA-Z0-9$]),[ED])+/;
function Validate() {

  var error = false
  var states = $("#estados").val();


  var statesArray = states.split('\n');

  for (var i = 0; i < statesArray.length; i++) {
    if (!statesArray[i].match(pattern)) {
      alert('Use some os caracteres válidos pelo alfabeto e respeite o padrão: q1,_ -> qa,d,E');
      error = true;
      return
    }
  }
  if (error == false) {
    toTuring(statesArray)

    // if ($("#btn-state").val() == "Enviar") {
    //   $("#estados").val(states)
    //   $("#btn-state").val("Editar")
    //   $("#estados").prop('disabled', true)
    //   $("#btn-state").prop('class', 'btn btn-danger')
    //   toTuring(statesArray)
    // } else {
    //   $("#estados").val(states)
    //   $("#btn-state").val("Enviar")
    //   $("#estados").prop('disabled', false)
    //   $("#btn-state").prop('class', 'btn btn-danger')
    //   toTuring(statesArray)
    // }
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

function valdidation(actions, states) {
  var index = 0
  let verify = function (element) {
    index++
    return states.includes(element, index)
  }
  //verifica se tem igual
    if (states.some(element => verify(element))) {
    alert('Existem estados repetidos!')
    return false
  } else if (!actions.find(element => element.state == 'q_')) {
    alert('Você deve informar o estado inicial')
    return false
  } else if (!actions.find(element => element.write == '$')) {
    alert('Você deve informar pelo menos um  estado final')
    return false
  } else 
  return true


}

function toTuring(states) {
  var actions = []
 
    states.forEach(element => {
      actions.push({
        state: element.slice(0, 2),
        read: element.slice(3, 4),
        nextState: element.slice(8, 10),
        write: element.slice(11, 12),
        move: element.slice(13, 14)
      })
    });
    console.log(actions)
    valdidation(actions, states)

  

}