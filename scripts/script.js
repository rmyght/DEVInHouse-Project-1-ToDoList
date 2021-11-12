//// Métodos e ou Funções Privadas ////
// Verifica se a String está vazia.
function _isEmpty(str) {
    return (!str || /^\s*$/.test(str))
}

// Verifica se já existe uma key no Local Storage
function _existsLS(key) {
    return localStorage.getItem(key)
}

// Seta um item em Local Storage
function _setItemLS(key, item){
    localStorage.setItem(key, item);
}

// Adiciona ou atualiza a Local Storage
function _addLS(newTask, newTaskID, localTasks) {
    if (localTasks) {
        let newLocalTask = JSON.parse(localTasks);
        newLocalTask[newTaskID] = {checkBox:`check-${newTaskID}`, checked:0, taskID:`task-${newTaskID}`, task:newTask, delButton:`del-${newTaskID}`}
        _setItemLS("tasks", JSON.stringify(newLocalTask))
    } else {
        let objectTask = {[`${newTaskID}`]:{checkBox:`check-${newTaskID}`, checked:0, taskID:`task-${newTaskID}`, task:newTask, delButton:`del-${newTaskID}`}};
        _setItemLS("tasks", JSON.stringify(objectTask))
    }
}

// Antiga criação de tabela de exibição no HTML
function _createTaskTable(newTask, newTaskID) {
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

function _checkUncheckBox(id, checked) {
    let objectLocalTask = JSON.parse(actualLocalTasks);
    for (let key in objectLocalTask) {
        if (key === id){
            childObj = objectLocalTask[key];
            for (let childKey in childObj) {
                if (childKey === "checked"){
                    childObj[childKey] = checked
                    _setItemLS("tasks", JSON.stringify(objectLocalTask))
                }
            }
        }
    }
}

// Cria a tabela de exibição no HTML
function _createLocalStorageTaskTable(actualLocalStorage, newTask, newTaskID) {
    console.log(actualLocalStorage)
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
                    tr.appendChild(tdCheck);
                    let checkBox = document.createElement("INPUT");
                    checkBox.setAttribute("type", "checkbox");
                     // Não está funcionando.
                    // checkBox.checked = childObj['checked'];
                    checkBox.onclick = function() {
                                            let checkBoxElement = document.getElementById(this.parentNode.id);
                                            let checkBoxId = checkBoxElement.parentNode.id;
                                            let siblingElement = checkBoxElement.nextElementSibling;
                                            if (siblingElement.classList.contains('done')){
                                                siblingElement.classList.remove('done')
                                                _checkUncheckBox(checkBoxId, 0);
                                            } else {
                                                siblingElement.classList.add('done')
                                                _checkUncheckBox(checkBoxId, 1);
                                            }
                                        }; // Ajustar Checkbox
                    tdCheck.appendChild(checkBox);
                } else if (childKey == "task") {
                    // Adiciona o nome da Tarefa na Lista
                    let tdTask = document.createElement("td");
                    tdTask.textContent = childObj[childKey];
                    // tdTask.id = `task-${newTaskID}`;
                    tr.appendChild(tdTask);
                } else if (childKey == "delButton") {
                    // Adiciona o botão de deletar na Lista.
                    let tdDel = document.createElement("td");
                    tdDel.id = childObj[childKey];
                    tr.appendChild(tdDel);
                    let delBtn = document.createElement("BUTTON");
                    // delBtn.onclick = function() {document.getElementById(this.parentNode.parentNode.id).remove();};
                    delBtn.onclick = function() {
                                            delID = document.getElementById(this.parentNode.parentNode.id).id;
                                            delete objectLocalTask[delID];
                                            _setItemLS("tasks", JSON.stringify(objectLocalTask));
                                            location.reload();
                                        };
                    delBtn.textContent = "X";
                    tdDel.appendChild(delBtn);
                }
            }
            console.log(`Tabela da chave ${key} foi criada com sucesso!`);
        }
    }
}

// Retorna o número do ID da Task
function _returnTaskNumber(number){
    if (number) return parseInt(number) + 1
    return 1
}

//// Métodos e ou Funções Publicas ////
// Limpa o Local Storage
function clearStorage() {
    localStorage.clear();
}

// Adiciona uma tarefa na lista:
function addTask() {
    let newTask = document.getElementById("new-task").value;
    // let localTasks = _existsLS("tasks");
    if (actualLocalTasks) {
        let objectLocalTask = JSON.parse(actualLocalTasks);
        newTaskID = _returnTaskNumber(Object.keys(objectLocalTask)[Object.keys(objectLocalTask).length - 1]);
    }
    console.log(newTaskID);
    if (_isEmpty(newTask)){
        console.log("Test"); // Ajustar código
    } else {
        _addLS(newTask, newTaskID, actualLocalTasks);
        // _createTaskTable(newTask, newTaskID);
    }
}

// Declarações iniciais:
let newTaskID = _returnTaskNumber(null);

let actualLocalTasks = _existsLS("tasks");
_createLocalStorageTaskTable(actualLocalTasks)