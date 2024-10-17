const randomTasks = () => {
    const taskTypes = ['Outlook', 'Email', 'Meeting', 'Report', 'Follow-up'];
    const projects = ['Miami Naples', 'Project A', 'Project B', 'Project C', 'Project D'];
    const clients = ['John & Sabin', 'Client X', 'Client Y', 'Client Z', 'Client W'];

    const tasks = Array.from({ length: 100 }, (_, index) => {
        return {
            id: index + 1,
            task_type: taskTypes[Math.floor(Math.random() * taskTypes.length)],
            number_of_tasks: Math.floor(Math.random() * 1000).toString(), // Random number of tasks
            project: projects[Math.floor(Math.random() * projects.length)],
            client: clients[Math.floor(Math.random() * clients.length)],
            created_at: new Date(Date.now() - Math.floor(Math.random() * 30) * 24 * 60 * 60 * 1000) // Random date within the last 30 days
                .toLocaleString('en-GB', { timeZone: 'UTC', hour12: true, weekday: 'long', year: 'numeric', month: '2-digit', day: '2-digit', hour: '2-digit', minute: '2-digit' })
        };
    });

    return tasks;
};

export default randomTasks();