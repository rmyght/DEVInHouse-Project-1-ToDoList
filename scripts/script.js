function createTask(newTask, newTaskID) {
    let tr = document.createElement("tr");
    document.getElementById("task-body-list").appendChild(tr);
    tr.id = newTaskID;
    // Adiciona o Checkbox na Lista.
    let tdCheck = document.createElement("td");
    tdCheck.id = `check-${newTaskID}`;
    tr.appendChild(tdCheck);
    let checkBox = document.createElement("INPUT");
    checkBox.setAttribute("type", "checkbox");
    checkBox.onclick = function() {console.log("Teste")}; // Ajustar Checkbox
    tdCheck.appendChild(checkBox);

    // Adiciona o nome da Tarefa na Lista
    let tdTask = document.createElement("td");
    tdTask.textContent = newTask;
    tdTask.id = `task-${newTaskID}`;
    tr.appendChild(tdTask);

    // Adiciona o botão de deletar na Lista.
    let tdDel = document.createElement("td");
    tdDel.id = `del-${newTaskID}`;
    tr.appendChild(tdDel);
    let delBtn = document.createElement("BUTTON");
    delBtn.onclick = function() {document.getElementById(this.parentNode.parentNode.id).remove();};
    delBtn.textContent = "X";
    tdDel.appendChild(delBtn);

    document.getElementById("new-task").value = '';
}

function addTaskNumber(number){
    if (number) {
        return parseInt(number) + 1
    } else {
        return 1
    }
    
}

// Verifica se a String está vazia.
function isEmpty(str) {
    return (!str || /^\s*$/.test(str));
}

// Adiciona uma tarefa na lista:
function addTask() {
    let newTask = document.getElementById("new-task").value;
    // let newTaskID = newTask.toLowerCase().replace(/\s/g, '-');
    let taskListLastChild = document.getElementById("task-body-list").lastChild
    let newTaskID = taskListLastChild.id;
    newTaskID = addTaskNumber(newTaskID);
    if (isEmpty(newTask)){
        console.log("Test"); // Ajustar código
    } else {
        createTask(newTask, newTaskID);
    }
}