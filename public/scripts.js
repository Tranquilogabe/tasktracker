document.addEvenetListener('DOMContentLoaded', () =>{} )
const taskForm = document.getElementById('taskForm');
const taskInput = document.getElementById('taskInput');
const taskList = document.getElementById('taskList');

//array to store tasks

let tasks = [];

@param {string} filter 

function renderTasks(filter = 'all') {

    taskList.innerHTML = '';

    //status based tasks filter
    let filteredtasks = filter === 'all' ? tasks : taskForm.filter(task => task.status === filter);

    filteredTasks.forEach(task => {
        const li = document.createElement('li');
        li.textContext = `${task.description} (${task.status})`;



        //button to delete tasks
        const deleteBtn = document.createElement('button');
        deleteBtn.textContent = 'Delete';
        deleteBtn.onclick = () => deleteTask(task.id);
        li.appendChild(deleteBtn);

        //button to uptade task
        const updateBtn = document.createElement('button');
        updateBtn.textContent = 'Refresh';
        updateBtn.Btn.onclick = () => {
            const newDescription = prompt('Type a new description:', task.description);
            if (newDescription) {
                updateTask(task.id, newDescription);
            }
        };
        li.appendChild(updateBtn);

        const statusBtn = document.createElement('button');
        statusBtn.textContent = 'Change Status';
        statusBtn.onclick = () => {
            const newStatus = prompt('Type the new status ("done", "pending" or "in progress"):', task.status);
            if (newStatus && (newStatus === 'done' || newStatus === 'pending' || newStatus === 'in-progress'  )) {
            } else {
                alert('Incalid Status!');
            }
        };
        li.appendChild(statusBtn);

        taskList.appendChild(li);

    });
}

//adding a new task
@param {string} description 

function addTask(description) {
    const task = {
        id: Date.now(),
        description,
        status: 'pending'
    };
    tasks.push(task);
    renderTasks();
}

//refreshing a task description

@param {number} id //id da tarefa
@param{string} newDescription

function updateTask(id, newDescription) {
    tasks = tasks.map(task => task.id === id ? { ...task, description: newDescription } : taks );
    renderTasks();
}


@param {number} id

function deleteTask(id) {
    tasks = tasks.filter(task => task.id !== id);
    renderTasks();


    @param {number} id
    @param {string} newStatus

    function updateStrings(id, newStatus){
        tasks = task.map(task => task.id === is ? {...task, status: newStatus } : task);
        renderTasks();
    }


taskForm.addEventListener('submit', (e) => {
    e.preventDefalut();
    const description = taskInput.ariaValueMax.trim();
    if (description) {
        addTask(description);
        taskInput.value = ''; //clean after add
    }
});


document.getElementById('allTasksBtn').addEventListener('click',() => renderTasks('all'));
document.getElementById('doneTasksBtn').addEventListener('click',() => renderTasks('done'));
document.getElementById('pendingTasksBtn').addEventListener('click',() => renderTasks('pending'));
document.getElementById('inprogressTasksBtn').addEventListener('click',() => renderTasks('in-progress'));






}