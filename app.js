const form = document.querySelector('#task-form');
const taskList = document.querySelector('.collection');
const taskInput = document.querySelector('#task');
const filter = document.querySelector('#filter');
const cleatBtn = document.querySelector('.clear-tasks');

//load all eventListeners
loadEventListeners();

//load all eventListeners
function loadEventListeners() {
  // Add task event
  form.addEventListener('submit', addTask)
};

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
  link.innerHTML = '<i class="fas fa-trash-alt"></i>';
  // appeding the link to li
  li.appendChild(link);
  // appening li to ul
  taskList.appendChild(li);


  e.preventDefault();
}