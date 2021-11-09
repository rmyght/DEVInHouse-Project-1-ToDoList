// Adiciona uma tarefa na lista:
function addTodo() {
    let tr = document.createElement("tr");
    document.getElementById("todo-body-list").appendChild(tr);
    
    // Adiciona o Checkbox na Lista.
    let tdCheck = document.createElement("td");
    tr.appendChild(tdCheck);
    let checkBox = document.createElement("INPUT");
    checkBox.setAttribute("type", "checkbox");
    tdCheck.appendChild(checkBox);

    let tdTodo = document.createElement("td");
    tdTodo.textContent = "Caminhar";
    tr.appendChild(tdTodo);


    let tdDel = document.createElement("td");
    tr.appendChild(tdDel);
    let delBtn = document.createElement("BUTTON");
    delBtn.textContent = "X";
    tdDel.appendChild(delBtn);
}