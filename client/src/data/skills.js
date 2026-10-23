export const skillCategories = [{
        id: 'frontend',
        label: 'Frontend',
        icon: 'Layout',
        skills: [
            { name: 'React', description: 'Component architecture, hooks, state management', use: 'Primary UI library', projects: ['-', 'AI Code Review', 'Student Information Syatem'] },
            // { name: 'Next.js', description: 'SSR, SSG, App Router, API routes', use: 'Full-stack React framework', projects: ['—'] },
            { name: 'TypeScript', description: 'Type-safe development across the stack', use: 'Type system', projects: ['AI Code Review'] },
            { name: 'Tailwind CSS', description: 'Utility-first styling and design systems', use: 'Styling', projects: ['StyleMart'] },
            { name: 'JavaScript', description: 'ES6+, async patterns, modern syntax', use: 'Core language', projects: ['-', 'AI Code Review', '-'] },
        ],
    },
    {
        id: 'backend',
        label: 'Backend',
        icon: 'Server',
        skills: [
            { name: 'Node.js', description: 'Server-side JavaScript runtime', use: 'Backend runtime', projects: ['-', 'AI Code Review', '-'] },
            { name: 'Express.js', description: 'REST API design and middleware architecture', use: 'API framework', projects: ['-', 'AI Code Review', '-'] },
            { name: 'REST APIs', description: 'Resource-oriented API design and versioning', use: 'API layer', projects: ['-', 'AI Code Review', '-'] },
            { name: 'Socket.IO', description: 'Real-time bidirectional communication', use: 'Real-time layer', projects: ['-'] },
        ],
    },
    {
        id: 'database',
        label: 'Database',
        icon: 'Database',
        skills: [
            { name: 'MongoDB', description: 'Document-oriented NoSQL database', use: 'Primary database', projects: ['AI Code Review'] },
            { name: 'PostgreSQL', description: 'Relational database with advanced querying', use: 'Relational data', projects: ['—'] },
            { name: 'Redis', description: 'In-memory caching and pub/sub messaging', use: 'Cache and real-time', projects: ['-'] },
        ],
    },
    {
        id: 'realtime',
        label: 'Real-Time',
        icon: 'Radio',
        skills: [
            { name: 'Socket.IO', description: 'WebSocket-based real-time communication', use: 'Live updates', projects: ['-'] },
            { name: 'Redis Pub/Sub', description: 'Message broker for horizontal scaling', use: 'Event distribution', projects: ['-'] },
        ],
    },
    {
        id: 'devops',
        label: 'DevOps',
        icon: 'Cloud',
        skills: [
            { name: 'Docker', description: 'Containerization for consistent environments', use: 'Containerization', projects: ['—'] },
            { name: 'AWS', description: 'Cloud deployment and managed services', use: 'Cloud infrastructure', projects: ['—'] },
            { name: 'Linux', description: 'Server administration and scripting', use: 'Server OS', projects: ['—'] },
        ],
    },
    {
        id: 'tools',
        label: 'Tools',
        icon: 'Wrench',
        skills: [
            { name: 'Postman', description: " For backend API Testing", use: 'API Test', projects: ['All projects'] },
            { name: 'VS Code', description: "This is a Code Editor", use: 'For writing Code', projects: ['All projects'] },
            { name: 'Git', description: 'Version control and branching strategies', use: 'Version control', projects: ['All projects'] },
            { name: 'GitHub', description: 'Collaboration, CI and project management', use: 'Collaboration', projects: ['All projects'] },
        ],
    },
];

export const allSkills = skillCategories.flatMap((cat) => cat.skills.map((s) => s.name));