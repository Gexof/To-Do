let todoText = document.getElementById("todo-text");
let addBtn = document.getElementById("add-btn");
let todoDiv = document.getElementById("todo-div");
let progressDiv = document.getElementById("progress-div");
let doneDiv = document.getElementById("done-div");

function initializeFromLocalStorage(storageName) {
  const storedData = localStorage.getItem(storageName);
  return storedData ? JSON.parse(storedData) : [];
}

let todoList = initializeFromLocalStorage("Todo");
let progressList = initializeFromLocalStorage("Progress");
let doneList = initializeFromLocalStorage("Done");

getTodo();
getProg();
getDone();

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

  let uniqueId = "todo-" + new Date().getTime();

  event.target.appendChild(draggedItem);

  // event.target.id to get target div  // parId to get id of the parent
  if (event.target.id === "progress-div") {
    if (parId === "todo-div") {
      remTodoFromList(todoList, id, "Todo");
      addTodoToList(
        progressList,
        {
          id: uniqueId,
          text: draggedItem.innerText,
        },
        "Progress"
      );
    } else if (parId === "done-div") {
      remTodoFromList(doneList, id, "Done");
      addTodoToList(
        progressList,
        {
          id: uniqueId,
          text: draggedItem.innerText,
        },
        "Progress"
      );
    }
  } else if (event.target.id === "done-div") {
    if (parId === "todo-div") {
      remTodoFromList(todoList, id, "Todo");
      addTodoToList(
        doneList,
        { id: uniqueId, text: draggedItem.innerText },
        "Done"
      );
    } else if (parId === "progress-div") {
      remTodoFromList(progressList, id, "Progress");
      addTodoToList(
        doneList,
        { id: uniqueId, text: draggedItem.innerText },
        "Done"
      );
    }
  } else if (event.target.id === "todo-div") {
    if (parId === "progress-div") {
      remTodoFromList(progressList, id, "Progress");
      addTodoToList(
        todoList,
        { id: uniqueId, text: draggedItem.innerText },
        "Todo"
      );
    } else if (parId === "done-div") {
      remTodoFromList(doneList, id, "Done");
      addTodoToList(
        todoList,
        { id: uniqueId, text: draggedItem.innerText },
        "Todo"
      );
    }
  }

  console.log(todoList);
  console.log(progressList);
  console.log(doneList);
}

function addTodo() {
  let uniqueId = "todo-" + new Date().getTime();
  let newTodoText = todoText.value.trim(); // Trim the text content
  let newTodo = { id: uniqueId, text: newTodoText };
  todoList.push(newTodo);
  localStorage.setItem("Todo", JSON.stringify(todoList));
  getTodo();

  todoText.value = "";
}

function remTodoFromList(list, id, storageName) {
  let index = list.findIndex((todo) => todo.id === id);
  if (index !== -1) {
    list.splice(index, 1);
    localStorage.setItem(storageName, JSON.stringify(list));
    getTodo();
    getProg();
    getDone();
  }
}

function addTodoToList(list, item, storageName) {
  let trimmedText = item.text.trim(); // Trim the text content
  let newItem = { id: item.id, text: trimmedText };
  list.push(newItem);
  localStorage.setItem(storageName, JSON.stringify(list));
  getTodo();
  getProg();
  getDone();
}

function getTodo() {
  let todos = ``;
  for (let i = 0; i < todoList.length; i++) {
    todos += `<div class="todo-r" id="${todoList[i].id}" draggable="true" ondragstart="drag(event)">
    ${todoList[i].text}
    </div>`;
  }
  document.getElementById("todo-div").innerHTML = todos;
}

function getProg() {
  let todos = ``;
  for (let i = 0; i < progressList.length; i++) {
    todos += `<div class="todo-r" id="${progressList[i].id}" draggable="true" ondragstart="drag(event)">
    ${progressList[i].text}
    </div>`;
  }
  document.getElementById("progress-div").innerHTML = todos;
}

function getDone() {
  let todos = ``;
  for (let i = 0; i < doneList.length; i++) {
    todos += `<div class="todo-r" id="${doneList[i].id}" draggable="true" ondragstart="drag(event)">
    ${doneList[i].text}
    </div>`;
  }
  document.getElementById("done-div").innerHTML = todos;
}

addBtn.addEventListener("click", addTodo);
