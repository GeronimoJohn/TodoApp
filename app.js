//Selectors
const todoInput = document.querySelector('.todo-input');
const todoButton = document.querySelector('.todo-button');
const todoList = document.querySelector('.todo-list');
const filterOption = document.querySelector('.filter-todo');

//Event Listeners
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
    const todos = todoList.childNodes;
    console.log(todos);
}