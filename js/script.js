
"use strict";

let todos = [
    { label: "go to the gym", completed: "checked" },
    { label: "watch football", completed: "checked" },
    { label: "read book", completed: "" }
];
let k = 0;
const root = document.getElementById("root");

function TodoForm(add) {
    const cont = document.createElement("form");

    cont.innerHTML = `
        <input type="text" placeholder="Add task">
        <button>Add</button>
    `;
    
    cont.addEventListener("submit", (e) => {
        e.preventDefault();
        const value = cont.querySelector("input").value;
        add(value);
    
    });
    cont.classList.add('forma');
    return cont;
}

function listItem(todo,onchange,render) {
    const container = document.createElement("div");

    container.innerHTML = `
        <label>
            <input type="checkbox" ${todo.completed}>
            ${todo.label}
                    
        </label>
<button>x</button>
    `;
   
    const input = container.querySelector("input");
    input.addEventListener("change", (e) => {
        onchange(e.target.checked);
    });
    const button = container.querySelector("button");

    button.addEventListener("click",() =>{
    k=0;
        for(let i = 0;i<todos.length;i++){
            if(todo===todos[i]){
                todos.splice(todos.indexOf(todo),1);
                console.log(todos);
                console.log(todos.length);
                render();
                render();
            }
        }
        container.remove();

    });
     container.classList.add("task");
     return container;
}

function list(todos, onchange) {
    const cont = document.createElement("div");

    todos.map(todo => {
        return listItem(todo, (change) => {
            if (change) {
                todo.completed = "checked";
            } else {
                todo.completed = "";
            }
            onchange();
        },onchange);
    }).forEach(el => {
        cont.appendChild(el);
    });
    cont.classList.add('spisok');
    return cont;
}

function ToDoFooter(onchange) {
    const container = document.createElement("div");
    let completed = todos.filter(todo => todo.completed === "checked").length;

    container.innerHTML = `
        <span>${completed}/${todos.length-k} Completed</span>
        <button>Clear completed</button>
    `;
    const button = container.querySelector("button");
    
    button.addEventListener("click", () => {
        todos = todos.filter(todo => todo.completed !== "checked");
    onchange();
    });
    container.classList.add('footer');
    return container;
}

function app() {
    const container = document.createElement("div");

    function render() {
        container.innerHTML = "";

        container.appendChild(TodoForm((newText) => {
            todos.push({
                label: newText,
                completed: ""
            });
            render();
        }));

        container.appendChild(list(todos, () => {
            render();
        }));

        container.appendChild(ToDoFooter( () => {
            render();
            render();
        }));
        container.style.cssText = `
        


        
        `;
    }
    render();
    container.classList.add('all');
    return container;
}

root.appendChild(app());
