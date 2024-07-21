document.addEventListener("DOMContentLoaded", () => {
  const todoForm = document.getElementById("todo-form");
  const todoInput = document.getElementById("new-todo");
  const todoList = document.getElementById("todo-list");

  // Load todos from local storage
  let todos = JSON.parse(localStorage.getItem("todos")) || [];

  const renderTodos = () => {
    todoList.innerHTML = "";
    todos.forEach((todo, index) => {
      const li = document.createElement("li");
      const span = document.createElement("span");
      const editBtn = document.createElement("button");
      const deleteBtn = document.createElement("button");

      span.textContent = todo;
      span.setAttribute("data-index", index);
      editBtn.textContent = "✏️";
      editBtn.classList.add("edit");
      deleteBtn.textContent = "❌";
      deleteBtn.classList.add("delete");

      li.appendChild(span);
      li.appendChild(editBtn);
      li.appendChild(deleteBtn);
      todoList.appendChild(li);

      editBtn.addEventListener("click", () => editTask(index));
      deleteBtn.addEventListener("click", () => deleteTask(index));
    });
  };

  const addTask = (task) => {
    todos.push(task);
    localStorage.setItem("todos", JSON.stringify(todos));
    renderTodos();
  };

  const editTask = (index) => {
    const newTask = prompt("Edit your task", todos[index]);
    if (newTask) {
      todos[index] = newTask;
      localStorage.setItem("todos", JSON.stringify(todos));
      renderTodos();
    }
  };

  const deleteTask = (index) => {
    todos.splice(index, 1);
    localStorage.setItem("todos", JSON.stringify(todos));
    renderTodos();
  };

  todoForm.addEventListener("submit", (e) => {
    e.preventDefault();
    const newTask = todoInput.value.trim();
    if (newTask) {
      addTask(newTask);
      todoInput.value = "";
    }
  });

  renderTodos();
});
