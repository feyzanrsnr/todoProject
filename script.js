const todoList = document.getElementById('todo-list');
const todoInput = document.getElementById('gorev-basligi');
var todoButton = document.getElementById('kaydetBtn');
const todoDesc = document.getElementById('gorev-aciklamasi');

window.addEventListener('load', () => {
    getTodosToPage();
    getDonesToPage();

})

const getTodosFromStorage = () => {
    const storage = JSON.parse(localStorage.getItem('todos'));
    return (storage) ? storage : [];
}

const getDonesFromStorage = () => {
    const storage = JSON.parse(localStorage.getItem('dones'));
    return (storage) ? storage : [];
}

const todos = getTodosFromStorage(); //kayıtlı dizimi local storage'dan almış oldum
const dones = getDonesFromStorage();

//todos dizisi üzerinden bir döngü oluşturarak içinde bulunan tüm değerler iççin createTodoItem'ı çağıracağım
const getTodosToPage = () => {
    todos.forEach((todo) => {
        createTodoItem(todo);
    });

}

const getDonesToPage = () => {
    dones.forEach((done) => {
        createDoneItem(done);
    });

}

const makeItDone = (target) => {
    const done = target.parentNode.classList.add('done');
    target.parentNode.classList.remove('todo');
    //onclick özelliğini tekrar tanımlamak istiyorum
    target.parentNode.childNodes[2].setAttribute('onclick','removeDone(this)');
    target.className = '';
    target.classList.add('fas','fa-check-square');
    target.setAttribute('onclick','uncheckDone(this)');
}

const moveTodoToDone = (todo,target) => {
    //önce local storage'dan sileceğiz sonra done isimli başka bir dizinin içerisine atacağız
    removeTodoFromStorage(todo);
    dones.push(todo);
    localStorage.setItem('dones',JSON.stringify(dones));
    makeItDone(target);
}

const checkTodo = (target) => {
    const todo = target.parentNode.childNodes[0].innerHTML;
    //şimdi bunu todo dizisinden alıp done ismini verdiğim bi başka diziye kaydedeceğim
    moveTodoToDone(todo,target);
};



const saveTodosToStorage = (todo) => {
    todos.push(todo);
    localStorage.setItem('todos',JSON.stringify(todos)); //todos dizimizi komple gönderiyoruz
    createTodoItem(todo);
}

const removeTodoFromStorage = (todo) => {
    const index = todos.indexOf(todo);
    if(index > -1) { //eğer herhangi bir değer bulamazsa -1 döner
     todos.splice(index,1);
     localStorage.setItem('todos',JSON.stringify(todos));   
    }

}

const removeDone = (target) => {
    const done = target.parentNode.childNodes[0].innerHTML;
    removeDoneFromStorage(done);
    target.parentNode.remove();

}

const removeDoneFromStorage = (done) => {
    const index = dones.indexOf(done);
    if(index > -1) { 
     dones.splice(index,1);
     localStorage.setItem('dones',JSON.stringify(dones));   
    }

}

const removeTodo = (target) => {
    //console.log(target.parentNode); //buradan gelen bilgi üzerine local storega'da bulunan <li> değerini sileceğim ve bu bilgiyi görüntüden de sileceğim
    const todo = target.parentNode.childNodes[0].innerHTML;
    removeTodoFromStorage(todo);
    target.parentNode.remove();
}

/* bir div etiketi tanımlayacağım daha sonra yukarıda oluşturduğumuz listemizi bunun içine atayacağız*/
const createTodoItem = (text) => {
    const todoItem = document.createElement('div');
    todoItem.classList.add('todo-item','todo');
    const todoItemLi = document.createElement('li');
    todoItemLi.innerHTML = text;
    const todoItemCheck = document.createElement('i');
    todoItemCheck.classList.add('fas','fa-square');
    todoItemCheck.setAttribute('onclick','checkTodo(this)');
    const todoItemRemove = document.createElement('i');
    todoItemRemove.classList.add('fas','fa-trash-alt');
    todoItemRemove.setAttribute('onclick','removeTodo(this)');

    //önce liste elemanımı ekliyorum, daha sonra check ve remove butonlarımı da ekliyorum
    todoItem.appendChild(todoItemLi);
    todoItem.appendChild(todoItemCheck);
    todoItem.appendChild(todoItemRemove);
    
    //bu item'ı todoList'e ekleyeceğim için
    todoList.appendChild(todoItem);
}

const createDoneItem = (text) => {
    const todoItem = document.createElement('div');
    todoItem.classList.add('tod-item','done');
    const todoItemLi = document.createElement('li');
    todoItemLi.innerHTML = text;
    const todoItemCheck = document.createElement('i');
    todoItemCheck.classList.add('fas','fa-square');
    todoItemCheck.setAttribute('onclick','uncheckDone(this)');
    const todoItemRemove = document.createElement('i');
    todoItemRemove.classList.add('fas','fa-trash-alt');
    todoItemRemove.setAttribute('onclick','removeDone(this)');

    todoItem.appendChild(todoItemLi);
    todoItem.appendChild(todoItemCheck);
    todoItem.appendChild(todoItemRemove);
    todoList.appendChild(todoItem);
}

//todo değerimin içine input'dan gelen değerin eklenmesi
todoButton = addEventListener('click', () => {
    const input = todoInput.value;
    if(input) saveTodosToStorage(input);
    todoInput.value = "";
});


const moveDoneToTodos = (done,target) => {
    removeDoneFromStorage(done);
    todos.push(done);
    localStorage.setItem('todos',JSON.stringify(todos));
    makeItTodo(target);
}



const makeItTodo = (target) => {
    target.parentNode.classList.remove('done');
    target.parentNode.classList.add('todo');
    //onclick özelliğini tekrar tanımlamak istiyorum
    target.parentNode.childNodes[2].setAttribute('onclick','removeTodo(this)');
    target.className = '';
    target.classList.add('fas','fa-square');
    target.setAttribute('onclick','checkTodo(this)');
}

const uncheckDone = (target) => {
    const done = target.parentNode.childNodes[0].innerHTML;
    moveDoneToTodos(done,target);
}



