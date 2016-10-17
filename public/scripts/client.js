$(function () {
  getTasks();
  $('#addTask').on('submit', addTask);
  $('#tasks').on('click', '.delete', deleteTask);
  $('#tasks').on('click', 'li', updateComplete);
}); // End of document Ready
var counter = 0;
function getTasks() {
  $('#tasks').empty();
  $.ajax({
    type: 'GET',
    url: '/tasks',
    success: displayTasks,
  });
}

function displayTasks(task) {
  $('#newTask').val('');
  var $taskList = $('#tasks');

  task.forEach(function (task) {
    var $ul = $('<ul class ="task"></ul>');
    var $completeLi = $('<li></li>');
    var $completeButton = $('<input type="checkbox" class="complete" name="complete" value="true" />');
    $completeLi.data('id', task.id);
    $completeLi.append($completeButton);
    $ul.append($completeLi);
    $ul.append('<li>' + task.to_do + '</li>');
    var $deleteLi = $('<li></li>');
    var $deleteButton = $('<button type="button" class="delete"></button>');
    $deleteButton.data('id', task.id);
    $deleteLi.append($deleteButton);
    $ul.append($deleteLi);
    $('#tasks').append($ul);
  });
}

function addTask(event) {
  event.preventDefault();
  var taskData = {};
  var taskBoolean = { name: 'complete', value: 'false' };
  var fields = $(this).serializeArray();
  fields.push(taskBoolean);
  fields.forEach(function (element) {
    taskData[element.name] =  element.value;
  });

  $.ajax({
    type: 'POST',
    url: '/tasks',
    data: taskData,
    success: displayTasks,
  });
}

function deleteTask(event) {
  event.preventDefault();
  var $taskID = $(this).data('id');
  $.ajax({
    type: 'DELETE',
    url: '/tasks/' + $taskID,
    success: getTasks,
  });
}

function updateComplete(event) {
  event.preventDefault();
  console.log($(this));
  $(this).next().toggleClass('taskComplete');
  var $taskID = $(this).data('id');
  $.ajax({
    type: 'PUT',
    url: '/tasks/' + $taskID,
    success: function () {
      console.log('Got it!')
    }
  });
}
