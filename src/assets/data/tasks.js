const randomTasks = () => {
    const taskTypes = ['Outlook', 'Email', 'Meeting', 'Report', 'Follow-up'];
    const projects = ['Miami Naples', 'Project A', 'Project B', 'Project C', 'Project D'];
    const clients = ['John & Sabin', 'Client X', 'Client Y', 'Client Z', 'Client W'];

    const tasks = Array.from({ length: 100 }, (_, index) => {
        return {
            id: index + 1,
            task_type: taskTypes[Math.floor(Math.random() * taskTypes.length)],
            number_of_tasks: Math.floor(Math.random() * 1000), // Store as number for sorting
            project: projects[Math.floor(Math.random() * projects.length)],
            client: clients[Math.floor(Math.random() * clients.length)],
            created_at: new Date(Date.now() - Math.floor(Math.random() * 30) * 24 * 60 * 60 * 1000) // Store as Date object
        };
    });

    return tasks;
};

export default randomTasks();
