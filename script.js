let taskList = document.querySelector('.taskList');
let TaskStorage = [];

function showTask() {
  let TaskList = document.querySelector('.taskList');
  // хз почему с большой но с маленькой не работает
  while (TaskList.firstChild) {
    TaskList.removeChild(TaskList.firstChild);
  }

  let taskList = document.querySelector('.taskList');
  let task = ``;

  if (localStorage.getItem('todo').length > 2) { // 2 - квадратные скобки массива

    TaskStorage =JSON.parse(localStorage.getItem('todo'));

    TaskStorage.forEach(function(item, i){
      task += `
      <input type="checkbox" class="checkboxTask" name="" id="check_${i}" ${item.checked ? ' checked' : ''}>
      <label class="task" id="item_${i}" for="check_${i}">
      <div class="task_text">
          <h2>${item.id}</h2>
          <p>${item.message}</p>
          <small>${item.time}</small>
      </div>
      </label>
      `

      taskList.innerHTML = task;
    })

  } else {
    const EmptyTaskHeader = document.createElement('h2');
    const EmptyTaskSubtitle = document.createElement('span');

    EmptyTaskHeader.textContent = 'Все цели на сегодня выполнены.';
    EmptyTaskSubtitle.textContent = 'Вы восхитительны!';

    taskList.appendChild(EmptyTaskHeader);
    taskList.appendChild(EmptyTaskSubtitle);
  }
}

// Checked
taskList.addEventListener('change', function(event){
  let idInput = event.target.getAttribute('id').slice(-1);
  TaskStorage.forEach(function(item){
    if(TaskStorage.indexOf(item) == idInput){
      item.checked = !item.checked;
      localStorage.setItem('todo', JSON.stringify(TaskStorage));
      showTask();
    }
  });
});


// Delete
taskList.addEventListener('contextmenu', function(event){
  event.preventDefault();
  let idInput = event.target.getAttribute('id').slice(-1);
  console.log(idInput);
  TaskStorage.forEach(function(item, i){
    if (TaskStorage.indexOf(item) == idInput) {
      console.log("test");
      TaskStorage.splice(i, 1);
      localStorage.setItem('todo', JSON.stringify(TaskStorage));
      showTask();
    }
  });
})

// Add
let addTaskButton = document.querySelector('#addTask');

addTaskButton.addEventListener('click', function(){
  let q = document.querySelector('#userTaskHeader');
  let b = document.querySelector('#userTaskBody');

  if (q.value.length > 0) {

    let newTodo = {
      id: q.value,
      message: b.value,
      checked: false,
      important: false,
      time: Date()
    };

    TaskStorage.push(newTodo);

    localStorage.setItem('todo', JSON.stringify(TaskStorage));

  } else {
    q.style.border = "1px solid red";
  }

  q.value = '';
  b.value = '';
  showTask();  
});

window.onload = showTask();