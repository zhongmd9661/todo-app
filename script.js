// Wait for DOM to be fully loaded
document.addEventListener('DOMContentLoaded', () => {
  // Get references to elements
  const taskList = document.getElementById('task-list');
  const addBtn = document.getElementById('add-btn');
  const newTaskInput = document.getElementById('new-task-input');
  const countDisplay = document.getElementById('count');

  // Load todos from localStorage, default to empty array
  let todos = JSON.parse(localStorage.getItem('todos')) || [];

  // Render existing tasks
  function renderTodos() {
    taskList.innerHTML = '';

    todos.forEach(todo => {
      const li = document.createElement('li');
      li.className = 'task-item';
      li.dataset.id = todo.id;

      const checkbox = document.createElement('input');
      checkbox.type = 'checkbox';
      checkbox.checked = todo.completed;
      checkbox.addEventListener('change', () => {
        todo.completed = checkbox.checked;
        saveTodos();
        updateCount();
      });

      const span = document.createElement('span');
      span.textContent = todo.text;
      if (todo.completed) {
        span.classList.add('completed');
      }

      const deleteBtn = document.createElement('button');
      deleteBtn.textContent = 'Delete';
      deleteBtn.className = 'delete-btn';
      deleteBtn.addEventListener('click', () => {
        todos = todos.filter(t => t.id !== todo.id);
        saveTodos();
        renderTodos();
        updateCount();
      });

      li.appendChild(checkbox);
      li.appendChild(span);
      li.appendChild(deleteBtn);
      taskList.appendChild(li);
    });
  }

  // Save todos to localStorage
  function saveTodos() {
    localStorage.setItem('todos', JSON.stringify(todos));
  }

  // Update the count of incomplete tasks
  function updateCount() {
    const incompleteCount = todos.filter(todo => !todo.completed).length;
    countDisplay.textContent = incompleteCount;
  }

  // Add a new todo
  function addTodo(text) {
    if (!text.trim()) return; // Don't add empty tasks

    const newTodo = {
      id: Date.now().toString(),
      text: text.trim(),
      completed: false
    };

    todos.push(newTodo);
    saveTodos();
    renderTodos();
    updateCount();
    newTaskInput.value = '';
  }

  // Event listeners
  addBtn.addEventListener('click', () => {
    addTodo(newTaskInput.value);
  });

  newTaskInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
      addTodo(newTaskInput.value);
    }
  });

  // Initial render and count update
  renderTodos();
  updateCount();
});