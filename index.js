const texto = document.querySelector('input');
const btnInsert = document.querySelector('.div-insert button');
const ul = document.querySelector('ul');
const divToAppend = document.querySelector('#todo-list-container');

var items = [];

texto.addEventListener('keypress', e => {
    if (e.key == 'Enter' && this.validaCampoIsPreenchido()) {
        setItems();
    }
})

btnInsert.onclick = () => {
   if (this.validaCampoIsPreenchido()) {
     setItems();
   }
}

function setItems() {
    if (items.length > 20) {
        alert('Limite de 20 itens atingido');
    }

    if (!this.valideIsElementExistsInList(texto.value)) {
        items.push({ 'item': texto.value, 'status': '' });
        updateItems();
    } else {
        alert(`A tarefa ${texto.value} já existe na lista`)
        return;
    }
}

function updateItems() {
    localStorage.setItem('todolist', JSON.stringify(items));
    loadItems();
}

function loadItems() {
    divToAppend.innerHTML = '';
    items = JSON.parse(localStorage.getItem('todolist')) ?? [];

    items.forEach((item, i) => {
        insertItemList(item.item, item.status, i)    
    });
}

function insertItemList(text, status, i) {
    const li = document.createElement('li');

    li.innerHTML = `
        <div class="todo-list-item" id="indice-${i}">
            <div class="div-btn-todo-list">
                <button onclick="addInput(${i})" data-i=${i}>
                    <i class="bx bx-plus" id="${i}"></i>
                </button>
                <button onclick="removeItem(${i})" data-i=${i}>
                    <i class="bx bxs-trash-alt"></i>
                </button>
            </div>    
            <div class="row ml-3" id=indice-${i}>
                <div class="col-md-5 col-md-offset-1">
                    <input type="text" class="form-control" placeholder="Aplicação"/>
                </div>
                <div class="col-md-5">
                    <input type="text" class="form-control" placeholder="Origem"/>
                </div>
                <button onclick="removeItem(${i})" data-i=${i}>
                    <i class="bx bxs-trash-alt"></i>
                </button>
            </div>
            <span data-si=${i} id="indice-${i}">${text}</span>

        </div>
        `;
  
    divToAppend.appendChild(li);

    texto.value = '';
}

function done(chk, i) {
    if (chk.checked) {
        items[i].status = 'checked';
    } else {
        items[i].status = '';
    }

    updateItems();
}

function removeItem(i) {
    items.splice(i, 1);
    updateItems();
}

function validaCampoIsPreenchido() {
    if (texto.value === '') {
      alert('Preencha o campo');
      return;
    } else {
        return true;
    }
}

function valideIsElementExistsInList(item) {
    const itemSearch = JSON.stringify({'item': item, 'status': ''});
    return items.some(itemList => JSON.stringify(itemList) == itemSearch);
}

function addInput(i) {
    const todoListItem = document.querySelector('.todo-list-item span');
    const buttonClicked = document.querySelector('.todo-list-item div button');

    const divNew = document.createElement('div');
    divNew.innerHTML = `
        <div class="row ml-3" id=indice-${i}>
            <div class="col-md-5 col-md-offset-1">
                <input type="text" class="form-control" placeholder="Aplicação"/>
            </div>
            <div class="col-md-5">
                <input type="text" class="form-control" placeholder="Origem"/>
            </div>
            <button onclick="removeItem(${i})" data-i=${i}>
                <i class="bx bxs-trash-alt"></i>
            </button>
        </div>
    `;
    todoListItem.appendChild(divNew);
}