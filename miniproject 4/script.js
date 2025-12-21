const todoInput = document.getElementById("todoInput");
const addTodoBtn = document.getElementById("addTodoBtn");
const todoList = document.getElementById("todoList");
const totalTodosSpan = document.getElementById("totalTodos");
const completedTodosSpan = document.getElementById("completedTodos");
const clearAllBtn = document.getElementById("clearAllBtn");

let todos = [];

const emptyMessage = document.createElement("p");
emptyMessage.textContent = "No todos yet.";
todoList.parentNode.insertBefore(emptyMessage, todoList);

function renderTodos() {
  todoList.innerHTML = "";

  if (todos.length === 0) {
    emptyMessage.style.display = "block";
  } else {
    emptyMessage.style.display = "none";
  }

  todos.forEach((todo, index) => {
    const li = document.createElement("li");
    if (todo.completed) li.classList.add("completed");

    const textSpan = document.createElement("span");
    textSpan.textContent = todo.text;
    
    const actionsDiv = document.createElement("div");
  actionsDiv.classList.add("todo-actions");

    const completeBtn = document.createElement("button");
    completeBtn.textContent = "Complete";
    completeBtn.addEventListener("click", () => {
      todo.completed = !todo.completed;
      saveTodos();
      renderTodos();
    });

    const deleteBtn = document.createElement("button");
    deleteBtn.textContent = "Delete";
    deleteBtn.addEventListener("click", () => {
      todos.splice(index, 1);
      saveTodos();
      renderTodos();
    });
    
    actionsDiv.appendChild(completeBtn)
    actionsDiv.appendChild(deleteBtn)

    li.appendChild(textSpan);
    li.appendChild(actionsDiv);

    todoList.appendChild(li);
  });

  totalTodosSpan.textContent = todos.length;
  completedTodosSpan.textContent = todos.filter(t => t.completed).length;
}

function addTodo() {
  const text = todoInput.value.trim();
  if (!text) {
    alert("Please enter a todo");
    return;
  }

  todos.push({ text, completed: false });
  todoInput.value = "";
  saveTodos();
  renderTodos();
}

function clearAllTodos() {
  todos = [];
  saveTodos();
  renderTodos();
}

function saveTodos() {
  localStorage.setItem("todos", JSON.stringify(todos));
}

function loadTodos() {
  const stored = localStorage.getItem("todos");
  if (stored) todos = JSON.parse(stored);
  renderTodos();
}

addTodoBtn.addEventListener("click", addTodo);
clearAllBtn.addEventListener("click", clearAllTodos);

loadTodos();