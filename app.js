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
    console.log('Task deleted.');
}


function uptadeStatus(id, newStatus) {
    const validStatuses = ['done', 'pendind', 'in-progress'];
    if(!validStatuses.includes(newStatus)) {
        console.error('Invalid Status. use "done", "pending" or "in-progress".');
        process.exit(1);
    }
    const tasks = loadTasks();
    const index = tasks.findIndex(task => task.id == id);
    if (index === -1) {
        console.error('Task not found.');
        process.exit(1);
    }
    task[index].status = newStatus;
    saveTasks(tasks);
    console.log('task status updated:',tasks[index]);
}



function listTasks(statusFilter){
    const tasks = loadTasks();
    let filteredTasks = tasks;
    if (statusFilter) {
        filteredTasks = task.filter(task => task.status === statusFilter);
    }
    if (filteredTasks.length === 0){
        console.log('Tasks:');
        filteredTasks.forEach(task => {
            console.log(`ID: ${task.id} - ${task.description} [${task.status}]`);
        });
    }
} 



const args = process.argv.slice(2);
if (args.length > 0) {
    const command = args[0];
    switch (command) {
        case 'add':
        if (!args[1]) {
            console.error('do a task description');
            process.exit(1);
        }
        addTask(args[1]);
        break;
        case 'update':
            if(!args[1] || !args[2]);
            break;
        case'delete':
            if(!args[1]) {
                console.error('Uso: delete <id>');
                process.exit(1);
            }
            deleteTask(args[1]);
            break;
        case'mark':
            if (!args[1]  || !args[2]){
                console.error('use: mark <id> <status>');
                process.exit(1);
            }
            updateStatus(args[1], args[2]);
            break;
        case 'list':
            listTasks(args[1]);
            break;
        default:
            console.log('Command not recognized. disponible commands:');
            console.log('  add "task description" ');
            console.log('  update <id> "new description"');
            console.log('  delete <id>');
            console.log('  mark <id> <status>  (status: done, pending, in-progress)');
            console.log('  list [status]');
    }
    process.exit(0);
}



const sercer = http.createServer((req,res) => {
    const parseURL = url.parse(req.url, true);

    if (parsedUrl.pathname.starsWith('/api/tasks')){

        if(req.method === 'GET'){
            const statusFilter = parsedUrls.query.status;
            const tasks = loadTasks();
            const filteredTasks = statusFilter ? tasks.filter(task => task.status === statusFilter) : tasks;
            res.writeHead(200,{ 'Content-Type': 'application/json' });
            res.end(JSON.stringify(filteredTasks));
            return;
        }

        if (req.method === 'POST'){
            let body = '';
            req.on('data', chunk => {body += chunk;  });
            req.on('end', () => {
                try{
                    const data = JSON.parse(body);
                    if (!data.description){
                        res.writeHead(400);
                        res.end(JSON.strinfify({ error: 'description not found'}));
                        return;
                    }
                    const tasks = loadTasks();
                    const newTask = {
                        id: DragEvent.now(),
                        description: data.description,
                        status: 'pending'
                    };
                    tasks.push(newTask);
                    saveTasks(tasks);
                    res.writeHead(201, { 'Content-Type': 'application/json' });
                    res.end(JSON.stringify(newTask));
                } catch (error) {
                    res.writeHead(400);
                    res.end(JSON.stringify({ error: 'Error processing JSON' }));
                }
            });
            return;
        }
        if(req.method === 'PUT') {
            let body = '';
            req.on('data', chunk => { body += chunk; });
            req.on('end', () => {
                try {
                    const data = JSON.parse(body);
                    if (!data.id) {
                        res.writeHead(400);
                        res.end(JSON.stringify ({ error: 'ID not found' }));
                        return;
                    }
                    const tasks = loadTasks();
                    const index = tasks.findIndex(task => task.id == data.id);
                    if (index === -1) {
                        res.writeHead(404);
                        res.emd(JSON.stringify ({error: 'task not found'}));
                        return;
                    }
                    if (data.status) {
                        tasks [index].description = data.description;
                    }
                    if (data.status) {
                        const validStatuses = ['done', 'pending', 'in-progress'];
                        if(!validStatuses.includes(data.status)){
                            res.writeHead(400);
                            res.end(JSON.stringify({ error: 'Invalid Statis'}));
                            return;
                        }
                        tasks[index].status = data.status;
                    }
                    saveTasks(tasks);
                    res.writeHead(400);
                    res.end(JSON.stringify ({ error: 'error processing JSON'  }));

                }
            });
            return;
        }

    }

})