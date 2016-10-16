$(function () {
  getTasks();
  $('#addTask').on('submit', addTask);
  $('#tasks').on('click', '.delete', deleteTask);
}); // End of document Ready

function getTasks() {
  $.ajax({
    type: 'GET',
    url: '/tasks',
    success: displayTasks,
  });
}

function displayTasks(response) {
  console.log('working.... Yes!');
  var $taskList = $('#tasks');

  //If needed, add a counter variable here so you can create unique id's for each task
  response.forEach(function (task) {
    var $div = $('<ul class ="task"></ul>');

    //$div.append('<p>' + task.complete + '</p>');
    $div.append('<li><input type="checkbox" name="complete" value="true" /></li>');
    $div.append('<li>' + task.to_do + '</li>');
    var $deleteLi = $('<li></li>');
    var $deleteButton = $('<button type="button" class="delete">Delete</button>');
    $deleteButton.data('id', task.id);
    $deleteLi.append($deleteButton);
    $div.append($deleteLi);
    $('#tasks').append($div);
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

  console.log(taskData);

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
    success: displayTasks,// This is incorrect. Not displaying correctly.
  });
}
