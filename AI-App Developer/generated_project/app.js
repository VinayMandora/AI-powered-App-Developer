// To-Do List Application Core Functionality

// 1. Variable to store tasks
let tasks = [];

// Function to load tasks from local storage
function loadTasksFromLocalStorage() {
    const storedTasks = localStorage.getItem('tasks');
    if (storedTasks) {
        tasks = JSON.parse(storedTasks);
    }
    updateTaskList();
}

// Function to save tasks to local storage
function saveTasksToLocalStorage() {
    localStorage.setItem('tasks', JSON.stringify(tasks));
}

// 2. Function to add a task
function addTask() {
    const taskInput = document.getElementById('taskInput');
    const taskValue = taskInput.value.trim();

    if (taskValue === '') {
        alert('Task cannot be empty!');
        return;
    }

    tasks.push({ text: taskValue, completed: false });
    taskInput.value = '';
    updateTaskList();
    saveTasksToLocalStorage(); // Save changes to local storage
}

// 3. Function to delete a task
function deleteTask(taskIndex) {
    tasks.splice(taskIndex, 1);
    updateTaskList();
    saveTasksToLocalStorage(); // Save changes to local storage
}

// 4. Function to mark a task as complete
function markTaskComplete(taskIndex) {
    tasks[taskIndex].completed = !tasks[taskIndex].completed;
    updateTaskList();
    saveTasksToLocalStorage(); // Save changes to local storage
}

// 5. Function to filter tasks by status
function filterTasks(filter) {
    let filteredTasks;
    switch(filter) {
        case 'active':
            filteredTasks = tasks.filter(task => !task.completed);
            break;
        case 'completed':
            filteredTasks = tasks.filter(task => task.completed);
            break;
        default:
            filteredTasks = tasks;
    }
    renderTaskList(filteredTasks);
}

// Helper function to update task list display
function updateTaskList() {
    renderTaskList(tasks);
}

// Function to render tasks in the task list
function renderTaskList(tasksToRender) {
    const taskList = document.getElementById('taskList');
    taskList.innerHTML = '';
    tasksToRender.forEach((task, index) => {
        const listItem = document.createElement('li');
        listItem.textContent = task.text;
        if (task.completed) {
            listItem.style.textDecoration = 'line-through';
        }
        // Add delete button
        const deleteButton = document.createElement('button');
        deleteButton.textContent = 'Delete';
        deleteButton.onclick = () => deleteTask(index);
        listItem.appendChild(deleteButton);

        // Add complete button
        const completeButton = document.createElement('button');
        completeButton.textContent = task.completed ? 'Undo' : 'Complete';
        completeButton.onclick = () => markTaskComplete(index);
        listItem.appendChild(completeButton);

        taskList.appendChild(listItem);
    });
}

// Load tasks from local storage at the start of the application
loadTasksFromLocalStorage();

// Event listeners
document.getElementById('addTaskButton').addEventListener('click', addTask);