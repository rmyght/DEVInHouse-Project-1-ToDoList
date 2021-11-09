// Verifica se a String está vazia.
function isEmpty(str) {
    return (!str || /^\s*$/.test(str));
}

// Adiciona uma tarefa na lista:
function addTodo() {
    let newTask = document.getElementById("new-task").value
    if (isEmpty(newTask)){
        console.log("Test")
    } else {
        let newTaskID = newTask.toLowerCase().replace(/\s/g, '-');
        let tr = document.createElement("tr");
        document.getElementById("todo-body-list").appendChild(tr);
        tr.id = newTaskID;
        
        // Adiciona o Checkbox na Lista.
        let tdCheck = document.createElement("td");
        tr.appendChild(tdCheck);
        let checkBox = document.createElement("INPUT");
        checkBox.setAttribute("type", "checkbox");
        tdCheck.appendChild(checkBox);

        let tdTodo = document.createElement("td");
        tdTodo.textContent = newTask;
        tr.appendChild(tdTodo);

        let tdDel = document.createElement("td");
        tr.appendChild(tdDel);
        let delBtn = document.createElement("BUTTON");
        delBtn.onclick = function() {document.getElementById(this.parentNode.parentNode.id).remove();};
        delBtn.textContent = "X";
        tdDel.appendChild(delBtn);

        document.getElementById("new-task").value = ''
    }
}