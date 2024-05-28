 const addTaskToList = (task) => {
    const taskItem = document.createElement('div');
    taskItem.classList.add('taskItem');
    taskItem.setAttribute('data-id', task.id);
    taskItem.innerHTML = `
        <h3>${task.title}</h3>
        <p>${task.description}</p>
        <small>Due: ${task.dueDate}</small>
        <span>Category: ${task.category}</span>
        <span>Priority: ${task.priority}</span>
    `;
    taskList.appendChild(taskItem);
};

const loadTasks = () => {
    tasks = JSON.parse(localStorage.getItem('tasks')) || [];
    tasks.forEach(task => addTaskToList(task));
};

const filterTasks = () => {
    const titleFilter = filterTitle.value.toLowerCase();
    const dueDateFilter = filterDueDate.value;
    const categoryFilter = filterCategory.value;
    const priorityFilter = filterPriority.value;
    return tasks.filter(task => {
        return (titleFilter === '' || task.title.toLowerCase().includes(titleFilter))
            && (dueDateFilter === '' || task.dueDate === dueDateFilter)
            && (categoryFilter === '' || task.category === categoryFilter)
            && (priorityFilter === '' || task.priority === priorityFilter);
    });
};
const sortTasksList = (tasks) => {
    const sortBy = sortTasks.value;
    return tasks.sort((a, b) => {
        if (sortBy === 'alphabetical') {
            return a.title.localeCompare(b.title);
        } else if (sortBy === 'reverseAlphabetical') {
            return b.title.localeCompare(a.title);
        } else if (sortBy === 'soonest') {
            return new Date(a.dueDate) - new Date(b.dueDate);
        } else if (sortBy === 'latest') {
            return new Date(b.dueDate) - new Date(a.dueDate);
        }
    });
};

const clearInputs = () => {
    taskTitle.value = '';
    taskDescription.value = '';
    taskDueDate.value = '';
    taskCategory.selectedIndex = 0;
    taskPriority.selectedIndex = 0;
};

addTaskButton.addEventListener('click', () => {
    const title = taskTitle.value.trim();
    const description = taskDescription.value.trim();
    const dueDate = taskDueDate.value;
    const category = taskCategory.value;
    const priority = taskPriority.value;

    if (!title || !description || !dueDate || !category || !priority) {
        alert('Please fill in all fields');
        return;
    }

    const id = new Date().getTime().toString();
    const newTask = { id, title, description, dueDate, category, priority };
    tasks.push(newTask);
    addTaskToList(newTask);
    saveTasks();
    clearInputs();
});
