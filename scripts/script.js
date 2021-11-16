//// Métodos e/ou Funções Privadas ////
// Verifica se a String está vazia.
function _isEmpty(str) {
    return (!str || /^\s*$/.test(str));
}

// Verifica se já existe uma key no Local Storage
function _existsLS(key) {
    return localStorage.getItem(key);
}

// Seta um item em Local Storage
function _setItemLS(key, item){
    localStorage.setItem(key, item);
}

// Adiciona ou atualiza a Local Storage
function _addLS(newTask, newTaskID, localTasks) {
    if (localTasks) {
        let newLocalTask = JSON.parse(localTasks);
        newLocalTask[newTaskID] = {checkBox:`check-${newTaskID}`, checked:0, taskID:`task-${newTaskID}`, task:newTask, delButton:`del-${newTaskID}`};
        _setItemLS("tasks", JSON.stringify(newLocalTask));
    } else {
        let objectTask = {[`${newTaskID}`]:{checkBox:`check-${newTaskID}`, checked:0, taskID:`task-${newTaskID}`, task:newTask, delButton:`del-${newTaskID}`}};
        _setItemLS("tasks", JSON.stringify(objectTask));
    }
}

// Salva o checked como 1 ou 0 no Local Storage
function _checkUncheckBox(id, checked) {
    let objectLocalTask = JSON.parse(actualLocalTasks);
    for (let key in objectLocalTask) {
        if (key === id){
            childObj = objectLocalTask[key];
            childObj['checked'] = checked;
            _setItemLS("tasks", JSON.stringify(objectLocalTask));
        }
    }
}

// Cria a tabela de exibição no HTML
function _createLocalStorageTaskTable(actualLocalStorage) {
    document.getElementById("task-table-list").style.visibility = "hidden";
    if (actualLocalStorage) {
        let objectLocalTask = JSON.parse(actualLocalStorage);
        for (let key in objectLocalTask) {
            console.log(`Criando a Tabela da chave ${key}`);
            let tr = document.createElement("tr");
            document.getElementById("task-body-list").appendChild(tr);
            tr.id = key;
            childObj = objectLocalTask[key];
            for (let childKey in childObj) {
                // Adiciona o Checkbox na Lista.
                if (childKey == "checkBox") {
                    let tdCheck = document.createElement("td");
                    tdCheck.id = childObj[childKey];
                    tdCheck.classList.add("col-md-2");
                    tdCheck.classList.add("col-sm-2");
                    tr.appendChild(tdCheck);
                    let checkBox = document.createElement("INPUT");
                    checkBox.setAttribute("type", "checkbox");
                    checkBox.checked = childObj['checked'];
                    // Função criada dentro do botão de checkbox para marcar e desmarcar o valor no Local Storage
                    checkBox.onclick = function() {
                                            let checkBoxElement = document.getElementById(this.parentNode.id);
                                            let checkBoxID = checkBoxElement.parentNode.id;
                                            let siblingElementID = document.getElementById(`${checkBoxElement.nextElementSibling.id}`);
                                            if (siblingElementID.classList.contains('done')){
                                                siblingElementID.classList.remove('done');
                                                _checkUncheckBox(checkBoxID, 0);
                                            } else {
                                                siblingElementID.classList.add('done');
                                                _checkUncheckBox(checkBoxID, 1);
                                            }
                                            location.reload(true);
                                        };
                    tdCheck.appendChild(checkBox);
                } else if (childKey == "task") {
                    // Adiciona o nome da Tarefa na Lista
                    let tdTask = document.createElement("td");
                    tdTask.textContent = childObj[childKey];
                    tdTask.id = childObj['taskID'];
                    if (childObj['checked'] === 1) tdTask.classList.add("done");
                    tdTask.classList.add("task-width-limited")
                    tr.appendChild(tdTask);
                } else if (childKey == "delButton") {
                    // Adiciona o botão de deletar na Lista.
                    let tdDel = document.createElement("td");
                    tdDel.id = childObj[childKey];
                    tr.appendChild(tdDel);
                    let delBtn = document.createElement("BUTTON");
                    delBtn.onclick = function() {
                                            if (confirm('Tem certeza que deseja excluir a tarefa?')) {
                                                delID = document.getElementById(this.parentNode.parentNode.id).id;
                                                delete objectLocalTask[delID];
                                                _setItemLS("tasks", JSON.stringify(objectLocalTask));
                                                location.reload(true);
                                            } else {
                                                location.reload(true);
                                            }
                                        };
                    delBtn.textContent = "Excluir";
                    delBtn.classList.add("btn");
                    delBtn.classList.add("btn-outline-danger");
                    delBtn.classList.add("btn-sm");
                    tdDel.appendChild(delBtn);
                }
            }
            console.log(`Tabela da chave ${key} foi criada com sucesso!`);
            document.getElementById("task-table-list").style.visibility = "visible";
        }
    }
}

// Retorna o número do ID da Task
function _returnTaskNumber(number){
    if (number) return parseInt(number) + 1;
    return 1;
}

//// Métodos e/ou Funções Publicas ////
// Limpa o Local Storage
function clearStorage() {
    localStorage.clear();
}

// Adiciona uma tarefa na lista:
$("#btn-add").click(function(event){
    let newTask = document.getElementById("new-task").value;
    let form = $("#form-new-task");
    if (form[0].checkValidity() === false) {
        event.preventDefault();
        event.stopPropagation();
    }
    if (_isEmpty(newTask)){
        document.getElementById("invalid-feedback").innerText = "Você não pode adicionar uma tarefa vazia."
        form.addClass('was-validated');
        return;
    } else if (newTask.length > charLimit) {
        document.getElementById("invalid-feedback").innerText = `O limite de caracteres é de ${charLimit} e você colocou ${newTask.length}. Diminuia ${newTask.length-charLimit} para que a tarefa possa ser adicionada.`
        form.addClass('was-validated');
        return;
    } else {
        if (actualLocalTasks) {
            let objectLocalTask = JSON.parse(actualLocalTasks);
            newTaskID = _returnTaskNumber(Object.keys(objectLocalTask)[Object.keys(objectLocalTask).length - 1]);
        }
        _addLS(newTask, newTaskID, actualLocalTasks);
    }
});

// Declarações iniciais:
let newTaskID = _returnTaskNumber(null);
let charLimit = 80;

let actualLocalTasks = _existsLS("tasks");
_createLocalStorageTaskTable(actualLocalTasks);