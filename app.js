const form = document.querySelector('#task-form');
const taskList = document.querySelector('.collection');
const taskInput = document.querySelector('#task');
const filter = document.querySelector('#filter');
const clearBtn = document.querySelector('.clear-tasks');

//load all eventListeners
loadEventListeners();

//load all eventListeners
function loadEventListeners() {
  // DOM load Event
  document.addEventListener('DOMContentLoaded', getTasks);
  // Add task event
  form.addEventListener('submit', addTask);
  // Remove Task event
  taskList.addEventListener('click', removeTask);
  // Clear all tasks
  clearBtn.addEventListener('click', clearTasks);
  // filter tasks
  filter.addEventListener('keyup', filterTasks);
};

//Get Tasks from localStorage
function getTasks(){
  let tasks;
  if(localStorage.getItem('tasks') === null){
    tasks = [];
  }
  else {
    tasks = JSON.parse(localStorage.getItem('tasks'));
  }

  tasks.forEach(function(task){
    // creating li element
    const li = document.createElement('li');
    // adding class
    li.className = 'collection-item';
    //creating textNode and append to li
    li.appendChild(document.createTextNode(task));
    //creating new link element
    const link = document.createElement('a');
    link.className = 'delete-item secondary-content';
    // adding icon HTML
    link.innerHTML = '<i class="fas fa-minus-circle"></i>';
    // appeding the link to li
    li.appendChild(link);
    // appening li to ul
    taskList.appendChild(li);
  })
}

// addtask
function addTask(e){
  if(taskInput.value === ''){
    alert('Add a task')
  }

  // creating li element
  const li = document.createElement('li');
  // adding class
  li.className = 'collection-item';
  //creating textNode and append to li
  li.appendChild(document.createTextNode(taskInput.value));
  //creating new link element
  const link = document.createElement('a');
  link.className = 'delete-item secondary-content';
  // adding icon HTML
  link.innerHTML = '<i class="fas fa-minus-circle"></i>';
  // appeding the link to li
  li.appendChild(link);
  // appening li to ul
  taskList.appendChild(li);

  storeInLocalStorage(taskInput.value);

  // clear input
  taskInput.value = '';

  e.preventDefault();
}

//Store Task
function storeInLocalStorage(task){
  let tasks;
  if(localStorage.getItem('tasks') === null){
    tasks = [];
  }
  else {
    tasks = JSON.parse(localStorage.getItem('tasks'));
  }
  tasks.push(task);
  localStorage.setItem('tasks', JSON.stringify(tasks));
}

//Remove a Task
function removeTask(e){
  if(e.target.parentElement.classList.contains('delete-item')){
    if(confirm('Are you sure?')){
      e.target.parentElement.parentElement.remove();
    }
    //Remove from localStorage
    removeTaskFromLocalStorage(e.target.parentElement.parentElement);
  }
}

// Remove from ls
function removeTaskFromLocalStorage(taskItem){
  let tasks;
  if(localStorage.getItem('tasks') === null){
    tasks = [];
  }
  else {
    tasks = JSON.parse(localStorage.getItem('tasks'));
  }

  tasks.forEach(function(task, index){
    if(taskItem.textContent == task){
      tasks.splice(index, 1);
    }
  })

  localStorage.setItem('tasks', JSON.stringify(tasks));
}

//clear tasks
function clearTasks(e){
  // taskList.innerHTML = ''; // one way

  // if(e.target.classList.contains('clear-tasks')){
  //   if(confirm('Are you sure?')){
  //     taskList.remove();
  //   }
  // }

  //faster
  while(taskList.firstChild){
    taskList.removeChild(taskList.firstChild);
  }
}

//filter tasks
function filterTasks(e){
  const text = e.target.value.toLowerCase();

  document.querySelectorAll('.collection-item').forEach(
    function(task){
      const item = task.firstChild.textContent;
      if(item.toLowerCase().indexOf(text) == -1){
        task.style.display = 'none';
      }
      else {
        task.style.display = 'block';
      }
    });
};