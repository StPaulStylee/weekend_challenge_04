$(function(){
  getTasks();
}); // End of document Ready

function getTasks () {
  $.ajax({
    type: 'GET',
    url:'/tasks',
    success: displayTasks
  });
}

function displayTasks(response) {
  console.log('working.... Yes!');
  var $taskList = $('#tasks');
  $taskList.empty();
  //If needed, add a counter variable here so you can create unique id's for each task
  response.forEach(function(task) {
    var $div = $('<div></div>');
    $div.append('<p>' + task.to_do + '</p>');
    $div.append('<p>' + task.complete + '</p>');
    $('#tasks').append($div);
  });
}
