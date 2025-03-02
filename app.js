const http = require('http');
const fs = require('fs');
const url = require('url');

const taskFile = './tasks.json';


function loadTasks() {
    try {
        if (!fs.existsSync(taskFile)) {
            fs.writeFileSync(taskFile, JSON.stringify([]));
            return [];
        }
        const data = fs.readFileSync(taskFile, 'utf8');
        return JSON.parse(data);
    } catch (error) {
        console.error('Error loading tasks:', error.message);
        process.exit(1);
    }
}

function saveTasks(tasks) {
    try{
        fs.writeFileSync(taskFile, JSON.stringify(tasks, null, 2));
    } catch (error) {
        console.error('Erro ao salvar as tarefas:', error.message);
        process.exit(1);
    }
}

function addTask(description){
    const tasks = loadTasks();
    const task = {
        id: Date.now(),
        description: description,
        status: 'pending'
    };
    tasks.push(task);
    saveTasks(tasks);
    console.log('Task Added:', task);
}

function updateTask(id, newDescripton) {
    const tasks = loadTasks();
    const index = task.findIndex(task => task.id == id);
    if (index === -1) {
        console.error ('Task not found.');
        process.exit(1);
    }
    tasks[index].description = newDescription;
    saveTasks(tasks);
    console.log('Task updated:', tasks[index]);
}

function deleteTask(id) {
    let tasks = loadTasks();
    const initialLength = tasks.length;
    tasks = tasks.filter(tasks => task.id !=id);
    if (tasks.length === initialLength) {
        console.error('Task not found.');
        process.exit(1);
    }
    saveTasks(tasks);
    console.log('Task deleted');
}


function uptadeStatus