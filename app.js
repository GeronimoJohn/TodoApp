//Selectors
const todoInput = document.querySelector('.todo-input');
const todoButton = document.querySelector('.todo-button');
const todoList = document.querySelector('.todo-list');
const filterOption = document.querySelector('.filter-todo');

//Event Listeners
document.addEventListener('DOMContentLoaded', getTodos);
todoButton.addEventListener('click', addTodo);
todoList.addEventListener('click', deleteCheck);
filterOption.addEventListener('click', filterTodo);


//Functions

function addTodo(event){
    event.preventDefault();

    //todo div
    const todoDiv = document.createElement('div');
    todoDiv.classList.add("todo");

        //create LI
        const newTodo = document.createElement('li');
        newTodo.innerText = todoInput.value;
        newTodo.classList.add('todo-item');
        todoDiv.appendChild(newTodo);

        //ADD TODO TO LOCALSTORAGE
        saveLocalTodos(todoInput.value);

        //Completed Button
        const completedButton = document.createElement('button');
        completedButton.innerHTML = '<i class="fas fa-check"></i>'
        completedButton.classList.add("complete-btn");
        todoDiv.appendChild(completedButton);
        
        //Delete Button
        const  deleteButton = document.createElement('button');
        deleteButton.innerHTML = '<i class="fas fa-trash"></i>'
        deleteButton.classList.add("delete-btn");
        todoDiv.appendChild(deleteButton);

    //append to list or the section you want it to be at
    todoList.appendChild(todoDiv);
    
    //clear todo input value
    todoInput.value ="";
}

function deleteCheck(e) {
    const item = e.target;
    
    //delete todo
    if(item.classList[0] === 'delete-btn') {
        const todo = item.parentElement;

        //animation - transitionend will wait for the trasnsition to finish first before removing the todo list
        todo.classList.add('fall');
        removeLocalTodos(todo);
        todo.addEventListener("transitionend", function() {
            todo.remove();
        })
    }

    //check mark
    if(item.classList[0] === 'complete-btn') {
        const todo = item.parentElement;
        todo.classList.toggle("completed")
    }
}

function filterTodo(e) {
    // learn more about nodes
    const todos = todoList.childNodes;

    todos.forEach(function(todo) {
        switch (e.target.value){
            case "all":
                todo.style.display = 'flex';
                break;
            case "completed":
                if(todo.classList.contains('completed')){
                    todo.style.display = 'flex';
                }else{
                    todo.style.display = 'none';
                }
                break;
            case "uncompleted":
                if(!todo.classList.contains('completed')){
                    todo.style.display = 'flex';
                }
                else{
                    todo.style.display = 'none';
                }
                break;
        }
    });
}

function saveLocalTodos(todo) {
    //Check do I already have things in the local storage
    let todos; 
    if(localStorage.getItem('todos') === null){
        todos = [];
    }else{
        todos = JSON.parse(localStorage.getItem('todos'));
    }
    todos.push(todo);
    localStorage.setItem('todos', JSON.stringify(todos));
}

function getTodos(){
    let todos; 
    if(localStorage.getItem('todos') === null){
        todos = [];
    }else{
        todos = JSON.parse(localStorage.getItem('todos'));
    }

    todos.forEach(function(todo){
         //todo div
        const todoDiv = document.createElement('div');
        todoDiv.classList.add("todo");

            //create LI
            const newTodo = document.createElement('li');
            newTodo.innerText = todo;
            newTodo.classList.add('todo-item');
            todoDiv.appendChild(newTodo);

            //Completed Button
            const completedButton = document.createElement('button');
            completedButton.innerHTML = '<i class="fas fa-check"></i>'
            completedButton.classList.add("complete-btn");
            todoDiv.appendChild(completedButton);
            
            //Delete Button
            const  deleteButton = document.createElement('button');
            deleteButton.innerHTML = '<i class="fas fa-trash"></i>'
            deleteButton.classList.add("delete-btn");
            todoDiv.appendChild(deleteButton);

        //append to list or the section you want it to be at
        todoList.appendChild(todoDiv);
    });
}

function removeLocalTodos(todo){
    let todos; 
    if(localStorage.getItem('todos') === null){
        todos = [];
    }else{
        todos = JSON.parse(localStorage.getItem('todos'));
    }

    const todoIndex = todo.children[0].innerText;
    todos.splice(todos.indexOf(todoIndex), 1);
    localStorage.setItem("todos", JSON.stringify(todos));
}