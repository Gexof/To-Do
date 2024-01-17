// ------------------ Task 1 ---------------//
function getLoc() {
        navigator.geolocation.getCurrentPosition(showPosition);
}


function showPosition(position) {
    document.getElementById("loc").innerHTML = "Latitude: " + position.coords.latitude +
    "<br>Longitude: " + position.coords.longitude
}
// ------------------Task1-------------------//
function allowDrop(event) {
    event.preventDefault();
}

function drag(event) {
    event.dataTransfer.setData("text", event.target.id);
}

function drop(event) {
    event.preventDefault();
    var data = event.dataTransfer.getData("text");
    var draggedElement = document.getElementById(data);
    event.target.appendChild(draggedElement);
    saveToLocalStorage();
}

function addTask(containerId, taskText) {
    var container = document.getElementById(containerId);
    var taskElement = document.createElement("div");

    taskElement.id = "task" + Date.now();
    taskElement.className = "task";
    taskElement.draggable = true;
    taskElement.addEventListener("dragstart", drag);
    taskElement.textContent = taskText;

    container.appendChild(taskElement);
    saveToLocalStorage();
}

function saveToLocalStorage() {
    var tasks = {
        todo: getTaskTextArray("todo"),
        inProgress: getTaskTextArray("inProgress"),
        done: getTaskTextArray("done")
    };

    localStorage.setItem("tasks", JSON.stringify(tasks));
}

function getTaskTextArray(containerId) {
    var container = document.getElementById(containerId);
    return Array.from(container.getElementsByClassName("task"), task => task.textContent);
}

function fill(containerId, tasks) {
    var container = document.getElementById(containerId);
    tasks.forEach(taskText => addTask(containerId, taskText));
}

function loadFromLocalStorage() {
    var storedTasks = JSON.parse(localStorage.getItem("tasks")) || {};
    fill("todo", storedTasks.todo || []);
    fill("inProgress", storedTasks.inProgress || []);
    fill("done", storedTasks.done || []);
}

document.getElementById("taskForm").addEventListener("submit", function (event) {
    event.preventDefault();
    var taskInput = document.getElementById("taskInput");
    addTask("todo", taskInput.value);
    taskInput.value = "";
});

window.onload = function () {
    loadFromLocalStorage();
};
