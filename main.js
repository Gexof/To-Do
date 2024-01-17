let todoText = document.getElementById("todo-text");
let addBtn = document.getElementById("add-btn");
let todoDiv = document.getElementById("todo-div");
let progressDiv = document.getElementById("progress-div");
let doneDiv = document.getElementById("done-div");

let todoList = ["Hammod", "Abood", "Samnnod"];
let progressList = [];
let doneList = [];

// Drag & Drop FUNCTIONS
function drag(event) {
  event.dataTransfer.setData("text", event.target.id);

  event.dataTransfer.setData("par-id", event.target.parentElement.id);
}

function allowDrop(event) {
  event.preventDefault();
}

function drop(event) {
  event.preventDefault();
  let id = event.dataTransfer.getData("text");
  let parId = event.dataTransfer.getData("par-id");
  let draggedItem = document.getElementById(id);

  event.target.appendChild(draggedItem);

  // event.target.id to get target div  //      parId to get id of the parent

  if (event.target.id === "progress-div") {
    if (parId === "todo-div") {
      remTodoFromList(todoList, id);
      addTodoToList(progressList, draggedItem);
    } else if (parId === "done-div") {
      remTodoFromList(doneList, id);
      addTodoToList(progressList, draggedItem);
    }
  } else if (event.target.id === "done-div") {
    if (parId === "todo-div") {
      remTodoFromList(todoList, id);
      addTodoToList(doneList, draggedItem);
    } else if (parId === "progress-div") {
      remTodoFromList(progressList, id);
      addTodoToList(doneList, draggedItem);
    }
  } else if (event.target.id === "todo-div") {
    if (parId === "progress-div") {
      remTodoFromList(progressList, id);
      addTodoToList(todoList, draggedItem);
    } else if (parId === "done-div") {
      remTodoFromList(doneList, id);
      addTodoToList(todoList, draggedItem);
    }
  }
}

function addTodo() {
  todoList.push(todoText.value);
  console.log(todoList);
  getTodo();
}

function remTodoFromList(list, id) {
  list.splice(id, 1);
}

function addTodoToList(list, item) {
  list.push(item);
}

function getTodo() {
  let todos = ``;
  for (let i = 0; i < todoList.length; i++) {
    todos += `<div class= "todo-r" id= "${i}"  draggable="true" ondragstart="drag(event)">
    <h5 id="todo${i}">${todoList[i]}</h5>
    </div>`;
  }

  todoDiv.innerHTML = todos;
}

addBtn.addEventListener("click", addTodo);

getTodo();
