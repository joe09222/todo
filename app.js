const task_container = document.getElementById("task-cont")

const input_form = document.getElementById("input-form")
const input_field = document.getElementById("task-info")




input_form.addEventListener("submit", (e)=>{
    e.preventDefault();
    add_task( input_field.value  );
    input_field.value = "";
})






let id = 0;
function add_task( task_desc ){
    const current_id = id;
    const new_task = document.createElement("div");
    new_task.className = "single-task";
    new_task.id = String(current_id);
    const unorderdList = document.createElement("ul");
    unorderdList.className = "parent-todo"
    const item = document.createElement("li");
    item.textContent = task_desc;
    unorderdList.appendChild(item);
    new_task.appendChild(unorderdList);
    task_container.appendChild(new_task);
    
    //  add buttons 
    const button_div = document.createElement("div");
    button_div.className = "todo-buttons"
    const del_button = document.createElement("button")
    del_button.textContent = "X";
    del_button.className = "del-todo"
    del_button.addEventListener("click",() => delete_todo( current_id ))

    const sub_todo_input = document.createElement("input");
    sub_todo_input.style.display="none"
    const add_button = document.createElement("button");
    add_button.textContent = "Add sub todo"
    add_button.className = "add-sub-todo"
    add_button.addEventListener("click",() => {
        add_sub_todo( current_id, sub_todo_input.value );
        const current_cond = sub_todo_input.style.display
        sub_todo_input.style.display = current_cond === "none" ? "inline" : "none";
        sub_todo_input.value = "";
    })

    
    button_div.appendChild(del_button)
    button_div.appendChild(add_button)
    button_div.appendChild(sub_todo_input)
    new_task.appendChild(button_div)

    id++;
}

function delete_todo( task_id ){
    const all_tasks = task_container.getElementsByClassName("single-task");

    for( let i = 0; i < all_tasks.length ;i){
        const task = all_tasks[i];
        if( all_tasks[i].id  === String(task_id) ){
            task.remove();
        }
    }

}

function add_sub_todo( task_id, task_desc ){
    if (task_desc != ""){
        const all_tasks = task_container.getElementsByClassName("single-task");

        for( let i = 0; i < all_tasks.length ;i++){
            const task = all_tasks[i];
            if( all_tasks[i].id  === String(task_id) ){
            
                const ul = task.getElementsByClassName("parent-todo")[0];
                const unorderdList = document.createElement("ul");
                unorderdList.className = "child-task"
                unorderdList.style.cursor = "pointer";
                unorderdList.style.textDecoration = "none";
                let current_cond = unorderdList.style.textDecoration
                unorderdList.addEventListener("click", ()=>{
                    unorderdList.style.textDecoration = current_cond === "none" ? "line-through" : "none";
                    current_cond = unorderdList.style.textDecoration
                })
                const item = document.createElement("li");
                item.textContent = task_desc;
                unorderdList.appendChild(item);
                ul.appendChild(unorderdList);
            }
        }
    }
}




// const singleTask = {
//     "parent" : "learn c++",
//     "childs": ["yo","hello"]
// }


//  ADDS ALL INFO IN ONE GO
function addItem( items ){
    let current_id = id;
    items.forEach( item => {
        add_task(item.parent);
        item.childs.forEach( child => {
            add_sub_todo( current_id, child)
        });
    })
}




