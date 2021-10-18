let todoArray = [];

function creatTodoHeading (title) {

    let heading = document.createElement('h1');
    heading.innerHTML = title;

    return heading;
}

function creatTodoInput() {

    let form = document.createElement('form');
    let input = document.createElement('input');
    let button = document.createElement('button');

    form.classList.add('input-group', 'mb-3');
    input.classList.add('form-control');
    input.placeholder = 'Введите название дела';
    button.classList.add('btn', 'btn-primary');
    button.textContent = 'Добавить'

    form.append(input);
    form.append(button);

    return {
        form,
        input,
        button,
    };
}

function creatTodoList() {

    let list = document.createElement('ul');
    list.classList.add('list-group');

    return list;
}

function creatTodoItem (name) {

    let li = document.createElement('li');
    let buttonBox = document.createElement('div');
    let doneButton = document.createElement('button');
    let deletButton = document.createElement('button');

    let randomId = Math.random() * 19.96;
    li.classList.add('list-group-item', 'd-flex', 'justify-content-between','align-items-centr');
    li.innerHTML = name;
    li.id = randomId.toFixed(2)
    // li.textContent = name;

    buttonBox.classList.add('btn-group', 'btn-group-lm')
    doneButton.classList.add('btn', 'btn-success');
    doneButton.textContent = "Сделанно";
    deletButton.classList.add('btn', 'btn-danger');
    deletButton.textContent = "Удалить";

    buttonBox.append(doneButton);
    buttonBox.append(deletButton);
    li.append(buttonBox);

    return {
        li,
        doneButton,
        deletButton,
        buttonBox
    }
}

// let completedName = ['При вводе значения в поле кнопка становится доступной.'
//     ,'При очистке значения в поле кнопка снова становится недоступной.'
//     ,'При отправке (submit) формы после очистки поля кнопка становится недоступной.'];

// let completedMark = ['Поигрть','Поработать','Покушать','Погулять'];
// let completedSomebody = ['Сделал это','Сделал то','Купил что-то','Был там-то'];




function addTodoApp(boxTodo, titleName, key) {

let todoHeading = creatTodoHeading(titleName);
let todoInput = creatTodoInput();
let todoList = creatTodoList();

//Подключение добавление функицй в DOM

boxTodo.append(todoHeading);
boxTodo.append(todoInput.form);
boxTodo.append(todoList);


// Кнопки "Добавить", "Удалить"
// Добавить
function doneBtn (item, btn) {

    btn.addEventListener('click', function() {
        
    todoArray = JSON.parse(localStorage.getItem(key)); 
    item.classList.toggle('list-group-item-success');

    setLocalDone(todoArray, item);

    localStorage.setItem(key, JSON.stringify(todoArray))
    })
}

// Удалить
function deletBtn (item, btn) { 

    btn.addEventListener('click', function(){

        if(confirm('Точно?')){
            todoArray = JSON.parse(localStorage.getItem(key))
            let newList = todoArray.filter(objekt => objekt.id !== item.id);

            localStorage.setItem(key, JSON.stringify(newList))
            item.remove();
        }
    })
}


// Добавление списка из LocalStorage

let todoArray = [];

    if(localStorage.getItem(key)){
        todoArray = JSON.parse(localStorage.getItem(key));

        for(let objekt of todoArray){
            let addList = creatTodoItem(todoInput.input.value);
            addList.li.textContent = objekt.name;
            addList.li.id = objekt.id;

            if( objekt.done == true) {
                addList.li.classList.toggle('list-group-item-success');
            } else {
                    addList.li.classList.remove('list-group-item-success');
            }
                todoList.append(addList.li);
                addList.li.append(addList.buttonBox)
            
                doneBtn(addList.li, addList.doneButton);
                deletBtn(addList.li, addList.deletButton);

        }
           
    }

//третий агрумент, добавние дел при открытии страницы

// if(test){
//     for (i = 0; i < test.length; i++) {
//         let addList = creatTodoItem(test[i]);
//         todoList.append(addList.li);
//         addList.li.classList.toggle('list-group-item-success');
//         addList.deletButton.addEventListener('click', function(){
//             if(confirm('Точно?')){
//                 addList.li.remove();
//             }
//         })
//     }
// }

//Блокировка кнопки
if(todoInput.input.value == 0){
            todoInput.button.disabled = true;
        } 
 todoInput.form.addEventListener('input', function(){
    todoInput.button.disabled = false;

    if(!todoInput.input.value){
        todoInput.button.disabled = true;
    } 
 })       

 // Проверка обьекта 
function setLocalDone (array,li) {

    array.map(objekt =>{

        if(objekt.id === li.id & objekt.done === false){
            objekt.done = true;
        } else if (objekt.id === li.id & objekt.done === true)  {
            objekt.done = false;
        }    
    })
    localStorage.getItem
}

// Функция на добавление дела 
 todoInput.form.addEventListener('submit', function(x){
 x.preventDefault();

     if(todoInput.input.value == 0) {
        return;
    } 

    let addList = creatTodoItem(todoInput.input.value);

    doneBtn(addList.li, addList.doneButton);
    deletBtn(addList.li, addList.deletButton);

        let localStorageData = localStorage.getItem(key);

        if(localStorageData == null) {
            todoArray = [];
        } else {
            todoArray = JSON.parse(localStorageData);
        }

        function creatLocalObj(x) {

        var localObj = {
        name: " ",
        id: 0,
        done: false,
        }

        localObj.name = todoInput.input.value;
        localObj.id = addList.li.id;

        x.push(localObj)
        }

    creatLocalObj(todoArray);

    localStorage.setItem(key, JSON.stringify(todoArray));
    
    todoList.append(addList.li);

    todoInput.input.value = ''; 
    todoInput.button.disabled = true;
});
}

    