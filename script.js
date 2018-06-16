const pattern = /((^q[a-zA-Z0-9_]+,[a-zA-Z0-9_]+) -> (q[a-zA-Z0-9_]+),([a-zA-Z0-9]+),[\<\>$])+/gm
var currentIndex = 0
var currentState = 'q_'
var actions = null
var cells = null
var __timeout__ = null
var headCellClass = "table-danger"
var isClockStopped = false
function send() {
  if ($("#btn-state").val() == "Enviar") {
    validate()
  } else {
    changeButtonOnEdit()
  }
}

function validate() {
    var error = false
    var states = $("#estados").val()

    var statesArray = states.split('\n')

    if (validation(statesArray)) {
      $('#message-success').fadeIn('slow', function () {
        $('#message-success').delay(2000).fadeOut()
      })
      toTuring(statesArray)
      changeButtonOnSuccess()
    }
}

function showWarnMessage(message) {
  $("#message-validate").html("<strong>Atenção!</strong> "+ message)
  $('#message-validate').fadeIn('slow', function () {
    $('#message-validate').delay(2000).fadeOut()
  })
}
function invalidTape() {
  $('#invalid-tape').fadeIn('slow', function () {
    $('#invalid-tape').delay(2000).fadeOut()
  })
}

function changeButtonOnSuccess() {
  $("#btn-state").removeClass("btn-primary")
  $("#btn-state").addClass("btn-danger")  
  $("#btn-state").val("Editar")
  $("#estados").prop("disabled", true)

}

function changeButtonOnEdit() {
  $("#btn-state").removeClass("btn-danger")
  $("#btn-state").addClass("btn-primary")
  $("#btn-state").val("Enviar")
  $("#estados").prop("disabled", false)

}

function tapeSuccess() {
  $('#success-tape').fadeIn('slow', function () {
    $('#success-tape').delay(2000).fadeOut()
  })
}

function getCells() {
  var val = $("#tape").val()
  this.cells = val.split(',')
  this.cells.unshift('_')
  return this.cells
}

function tapeElements() {
  $('#tape-cell')[0].innerHTML = ''
  var tape = getCells()
  var index = 0
  tape.forEach(cell => {
    insertTapeElements("<td id=cel-" + index + ">" + cell + "</td>")
    index++
  })
  $("#cel-0").addClass(headCellClass)
  
}

function insertTapeElements(data) {
  $('#tape-cell').append(data)
}

function sumTest() {
  $('#estados').val(`q_,_ -> q1,_,>\nq1,1 -> q1,1,>\nq1,0 -> q2,1,>\nq2,1 -> q2,1,>\nq2,0 -> q3,0,<\nq3,1 -> q3,0,$`)
  validate()
  $('#tape').val('1,0,1')
  resetClock()
}

function equalsTest() {
  $('#estados').val(`q_,_ -> q0,_,>\nq0,A -> q1,X,>\nq0,B -> q2,X,>\nq0,X -> q0,X,>\nq0,_ -> q0,_,>\nq0,0 -> q0,0,$\nq1,A -> q1,A,>\nq1,B -> qX,X,<\nq1,_ -> q1,_,$\nq2,A -> qX,X,<\nq2,B -> q2,B,>\nq2,_ -> q2,_,$\nqX,A -> qX,A,<\nqX,B -> qX,B,<\nqX,X -> qX,X,<\nqX,_ -> q0,_,>\n`)
  validate()
  $('#tape').val('A,B')
  resetClock()
}

function validation(statesArray) {
  if(!$("#estados").val().match(pattern)) {
    showWarnMessage('Você deve seguir o padrão de estados descritos nas regras')
    return
  }
  var index = 0
  let verify = function (element) {
    index++
    return statesArray.includes(element, index)
  }

  this.actions = toTuring(statesArray)
  if (statesArray.some(element => verify(element))) {
    showWarnMessage("Existem estados repetidos!")
    return false
  } else if (!this.actions.find(element => element.state == 'q_')) {
    showWarnMessage("Você deve informar o estado inicial")
    return false
  } else if (!this.actions.find(element => element.move == '$')) {
    showWarnMessage("Você deve informar pelo menos um  estado final")
    return false
  } else
    return true
}

function toTuring(states) {
  var actions = []
  states.forEach(element => {
    var temp = []
    element.trim().split('->').forEach(x => {
      x.trim().split(',').forEach(y => {
        temp.push(y)
      })
    })
    actions.push({
      state: temp[0],
      read: temp[1],
      nextState: temp[2],
      write: temp[3],
      move: temp[4]
    })
  })
  return actions
}

function addEmptyCell() {
  this.cells.push('0')
  insertTapeElements("<td id=cel-" + this.currentIndex + ">0</td>")
}

function moveRight() {
  this.currentIndex++
  if (this.currentIndex === this.cells.length) {
    addEmptyCell()
  }
  $("#cel-" + (this.currentIndex - 1)).removeClass(headCellClass)
  $("#cel-" + this.currentIndex).addClass(headCellClass)
}

function moveLeft() {
  this.currentIndex--
  $("#cel-" + (this.currentIndex + 1)).removeClass(headCellClass)
  $("#cel-" + (this.currentIndex)).addClass(headCellClass)
}

function moveHead(direction) {
  if (direction == '>') moveRight()
  if (direction == '<') moveLeft()
}

function getAction(state, read) {
  return this.actions.find(element => element.state == state && element.read == read)
}

function sucessRead() {
  $("#cel-" + (this.currentIndex)).toggleClass("table-danger table-success")
  tapeSuccess()
}

function rewriteCell(data, index) {
  $("#cel-" + (index)).html(data)
}

function writeCell(data, cells, index) {
  cells[index] = data
  rewriteCell(data, index)
}

function readTape() {
  var action = getAction(this.currentState, this.cells[this.currentIndex])
  if(!action) {        
    stopClock()
    invalidTape()
    return "$"
  } else {
    writeCell(action.write, this.cells, this.currentIndex)
    this.currentState = action.nextState
    if (action.move == "$") {
      sucessRead()
    } else {
      moveHead(action.move)
    }
    return action.move
  }
}

function resetHead() {
  this.currentIndex = 0
  this.currentState = 'q_'
}

function getClockSpeed() {
 return $('#clock-speed').val() * 1000
}

function clock() {
  var direction = readTape()
  if(direction != "$") __timeout__ = setTimeout(clock, getClockSpeed())
}

function stopClock() {
  isClockStopped = true
  clearTimeout(__timeout__)
}

function resetClock() {
  stopClock()
  tapeElements()
  resetHead()
}