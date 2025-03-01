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
        fs.writeFileSync(taskFile, JSON. )
    }

}