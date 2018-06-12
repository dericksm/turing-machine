const pattern = /((^q[a-zA-Z0-9_],[a-zA-Z0-9_]) -> (q[a-zA-Z0-9_]),([a-zA-Z0-9]),[\<\>$])+/;
function validate() {
  var error = false
  var states = $("#estados").val();

  var statesArray = states.split('\n');

  for (var i = 0; i < statesArray.length; i++) {
    if (!statesArray[i].match(pattern)) {
      alert('Use some os caracteres válidos pelo alfabeto e respeite o padrão: q1,_ -> qa,d,>');
      error = true;
      return
    }
  }
  if (error == false) {
    toTuring(statesArray)
  }
}

function insertTapeElements(data) {
  $('#tape-cell').append(data);
}

function getCells() {
  var val = $("#tape").val();
  var lines = val.split(',');
  lines.unshift('_')
  return lines
}

function tapeElements() {
  $('#tape-cell')[0].innerHTML = ''
  var cells = getCells()
  var index = 0
  cells.forEach(element => {
    var html = ''
    html = "<td id=cel-" + index + ">" + element + "</td>"
    index++
    insertTapeElements(html)
  });
}
function debugStates() {
  $('#estados').val(`q_,_ -> q1,1,>
q1,1 -> q1,1,>
q2,1 -> q2,1,$`)
  validate()
  $('#tape').val('1,0,1')
  tapeElements()
}

function validation(actions, states) {
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
  } else if (!actions.find(element => element.move == '$')) {
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
  validation(actions, states)
}