let todoText = document.getElementById("todo-text");
let addBtn = document.getElementById("add-btn");
let todoDiv = document.getElementById("todo-div");
let progressDiv = document.getElementById("progress-div");
let doneDiv = document.getElementById("done-div");

// let todoList = [];
// let progressList = [];
// let doneList = [];

// getTodo();
// getProg();
// getDone();

// // Drag & Drop FUNCTIONS
// function drag(event) {
//   event.dataTransfer.setData("text", event.target.id);
//   event.dataTransfer.setData("par-id", event.target.parentElement.id);
// }

// function allowDrop(event) {
//   event.preventDefault();
// }

// function drop(event) {
//   event.preventDefault();
//   let id = event.dataTransfer.getData("text");
//   let parId = event.dataTransfer.getData("par-id");
//   let draggedItem = document.getElementById(id);

//   let uniqueId = "todo-" + new Date().getTime();

//   event.target.appendChild(draggedItem);

//   // event.target.id to get target div  //      parId to get id of the parent

//   if (event.target.id === "progress-div") {
//     if (parId === "todo-div") {
//       remTodoFromList(todoList, id);
//       addTodoToList(progressList, draggedItem.innerText);
//       getTodo();
//       getProg();
//     } else if (parId === "done-div") {
//       remTodoFromList(doneList, id);
//       addTodoToList(progressList, draggedItem.innerText);
//       getProg();
//       getDone();
//     }
//   } else if (event.target.id === "done-div") {
//     if (parId === "todo-div") {
//       remTodoFromList(todoList, id);
//       addTodoToList(doneList, draggedItem.innerText);
//       getTodo();
//       getDone();
//     } else if (parId === "progress-div") {
//       remTodoFromList(progressList, id);
//       addTodoToList(doneList, draggedItem.innerText);
//       getProg();
//       getDone();
//     }
//   } else if (event.target.id === "todo-div") {
//     if (parId === "progress-div") {
//       remTodoFromList(progressList, id);
//       addTodoToList(todoList, draggedItem.innerText);

//       getTodo();
//       getProg();
//     } else if (parId === "done-div") {
//       remTodoFromList(doneList, id);
//       addTodoToList(todoList, draggedItem.innerText);
//       getTodo();
//       getDone();
//     }
//   }

//   console.log(todoList);
//   console.log(progressList);
//   console.log(doneList);
// }

// function addTodo() {
//   todoList.push(todoText.value);
//   getTodo();
// }

// function remTodoFromList(list, id) {
//   list.splice(id, 1);
// }

// function addTodoToList(list, item) {
//   list.push(item);
// }

// function getTodo() {
//   let todos = ``;
//   for (let i = 0; i < todoList.length; i++) {
//     todos += `<div class= "todo-r" id= "${i}"  draggable="true" ondragstart="drag(event)">
//     <h5 id="todo${i}">${todoList[i]}</h5>
//     </div>`;
//   }

//   todoDiv.innerHTML = todos;
// }

// function getProg() {
//   let todos = ``;
//   for (let i = 0; i < progressList.length; i++) {
//     todos += `<div class= "todo-r" id= "${i}"  draggable="true" ondragstart="drag(event)">
//     <h5 id="todo${i}">${progressList[i]}</h5>
//     </div>`;
//   }

//   progressDiv.innerHTML = todos;
// }

// function getDone() {
//   let todos = ``;
//   for (let i = 0; i < doneList.length; i++) {
//     todos += `<div class= "todo-r" id= "${i}"  draggable="true" ondragstart="drag(event)">
//     <h5 id="todo${i}">${doneList[i]}</h5>
//     </div>`;
//   }

//   doneDiv.innerHTML = todos;
// }

// Arrays to store todos in different states

let todoList = [];
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

  // Create a unique identifier for each todo item
  let uniqueId = "todo-" + new Date().getTime();

  event.target.appendChild(draggedItem);

  // event.target.id to get target div  // parId to get id of the parent
  if (event.target.id === "progress-div") {
    if (parId === "todo-div") {
      remTodoFromList(todoList, id);
      addTodoToList(progressList, {
        id: uniqueId,
        text: draggedItem.innerText,
      });
      getTodo();
      getProg();
    } else if (parId === "done-div") {
      remTodoFromList(doneList, id);
      addTodoToList(progressList, {
        id: uniqueId,
        text: draggedItem.innerText,
      });
      getProg();
      getDone();
    }
  } else if (event.target.id === "done-div") {
    if (parId === "todo-div") {
      remTodoFromList(todoList, id);
      addTodoToList(doneList, { id: uniqueId, text: draggedItem.innerText });
      getTodo();
      getDone();
    } else if (parId === "progress-div") {
      remTodoFromList(progressList, id);
      addTodoToList(doneList, { id: uniqueId, text: draggedItem.innerText });
      getProg();
      getDone();
    }
  } else if (event.target.id === "todo-div") {
    if (parId === "progress-div") {
      remTodoFromList(progressList, id);
      addTodoToList(todoList, { id: uniqueId, text: draggedItem.innerText });
      getTodo();
      getProg();
    } else if (parId === "done-div") {
      remTodoFromList(doneList, id);
      addTodoToList(todoList, { id: uniqueId, text: draggedItem.innerText });
      getTodo();
      getDone();
    }
  }

  console.log(todoList);
  console.log(progressList);
  console.log(doneList);
}

function addTodo() {
  let uniqueId = "todo-" + new Date().getTime();
  let newTodo = { id: uniqueId, text: todoText.value };
  todoList.push(newTodo);
  getTodo();
}

function remTodoFromList(list, id) {
  let index = list.findIndex((todo) => todo.id === id);
  if (index !== -1) {
    list.splice(index, 1);
  }
}

function addTodoToList(list, item) {
  list.push(item);
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
