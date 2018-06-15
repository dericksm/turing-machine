const pattern = /((^q[a-zA-Z0-9_]+,[a-zA-Z0-9_]+) -> (q[a-zA-Z0-9_]+),([a-zA-Z0-9]+),[\<\>$])+/gm
var currentIndex = 0
var currentState = 'q_'
var actions = null
var cells = null
var timeout = null
var headCellClass = "table-danger"

function validate() {
  if ($("#btn-state").val() == "Enviar") {
    var error = false
    var states = $("#estados").val()

    var statesArray = states.split('\n')

    if (states.match(pattern) && validation(statesArray)) {
      $('#message-success').fadeIn('slow', function () {
        $('#message-success').delay(1000).fadeOut()
      })
      toTuring(statesArray)
      changeButtonOnSuccess()
    } else {
      $('#message-error').fadeIn('slow', function () {
        $('#message-error').delay(1000).fadeOut()
      })
      debugStates()
      validate()
    }
  } else {
    changeButtonOnEdit()
  }
}

function changeButtonOnSuccess() {
  $("#btn-state").toggleClass("btn-primary btn-danger")
  $("#btn-state").val("Editar")
  $("#estados").prop("disabled", true)

}

function tapeSuccess() {
  $('#success-tape').fadeIn('slow', function () {
    $('#success-tape').delay(1000).fadeOut()
  })
}

function changeButtonOnEdit() {
  $("#btn-state").toggleClass("btn-danger btn-primary")
  $("#btn-state").val("Enviar")
  $("#estados").prop("disabled", false)

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
  clock()
}

function insertTapeElements(data) {
  $('#tape-cell').append(data)
}

function debugStates() {
  $('#estados').val(`q_,_ -> q1,_,>\nq1,1 -> q1,1,>\nq1,0 -> q2,1,>\nq2,1 -> q2,1,>\nq2,0 -> q3,0,<\nq3,1 -> q3,0,$`)
  validate()
  $('#tape').val('1,0,1')
  tapeElements()

}

function validation(states) {
  var index = 0
  let verify = function (element) {
    index++
    return states.includes(element, index)
  }

  this.actions = toTuring(states)

  if (states.some(element => verify(element))) {
    alert('Existem estados repetidos!')
    return false
  } else if (!this.actions.find(element => element.state == 'q_')) {
    alert('Você deve informar o estado inicial')
    return false
  } else if (!this.actions.find(element => element.move == '$')) {
    alert('Você deve informar pelo menos um  estado final')
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
    debugger
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
  stopClock()
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
  writeCell(action.write, this.cells, this.currentIndex)
  this.currentState = action.nextState
  if (action.move == "$") {    
    sucessRead()    
  } else {
    moveHead(action.move)
  }
}
function clock() {
  readTape()
  this.timeout = setTimeout(clock, 1000)
}
function stopClock() {
  clearTimeout(this.timeout)
}