var task_list = [
    {"id" : 1 ,"task_name"  : "Task 1", "status" : "completed" },
    {"id" :  2 ,"task_name"  : "Task 2","status" : "completed" },
    {"id" : 3 ,"task_name"  : "Task 3","status"  : "completed" },
    {"id" : 4 ,"task_name"  : "Task 4","status"  : "pending" },
    {"id" : 5 ,"task_name"  : "Task 5","status"  : "completed" },
];
let edited_Id;
let is_edit = false;

const task_input = document.querySelector("#txtTaskName");
const full_delete = document.querySelector("#btnDelete");
const task_filter = document.querySelectorAll(".filters span")
display_task("all");

function display_task(filter){
    let ul = document.getElementById("task-list");
    ul.innerHTML = "";
    if (task_list.length != 0) {
        task_list.forEach(task => {
            
            if (filter == task.status || filter == "all") {
                
                let li = `
                <li class="task list-group-item">
                    <div class="form-check">
                        <input type="checkbox" onclick="check_box(this)" id="${task.id}" class="form-check-input" ${task.status === 'completed' ? 'checked' : ''}>
                        <label for="${task.id}" class="form-ckeck-label ${task.status}">${task.task_name}</label>
                    </div>
                    <div class="dropdown">
                        <button class="btn btn-link dropdown-toggle" type="button" id="dropdownMenuButton1" data-bs-toggle="dropdown" aria-expanded="false">
                            <i class="fa-solid fa-ellipsis"></i>
                        </button>
                        <ul class="dropdown-menu" aria-labelledby="dropdownMenuButton1">
                            <li><a onclick="delete_task(${task.id})" class="dropdown-item" href="#"><i class="fa-solid fa-check"></i> Done</a></li>
                            <li><a onclick='edit_task(${task.id},"${task.task_name}")' class="dropdown-item" href="#"><i class="fa-solid fa-pen"></i> Edit</a></li>
                            
                        </ul>
                    </div>
                </li>
            `;
                ul.insertAdjacentHTML("beforeend",li);
            }
            
        })
    } else {
        ul.innerHTML = "<p class='pt-3 mx-3'>Your TO-DO has done!</p>"
    }
    
}
document.querySelector("#btnAddTask").addEventListener("click",add_task);

function add_task(event) {
    if (task_input == false) {
        alert("You have to add task!");
    } else {
      
        if (!is_edit){ // add
            task_list.push({"id" : task_list.length + 1 ,"task_name" : task_input.value })
        } else {
            for (let task of task_list) {
                if (task.id == edited_Id)
                    task.task_name = task_input.value;
                is_edit = false;
            }
        }
        task_input.innerHTML = "";
        display_task(document.querySelector("span.active").id);
    }
    event.preventDefault();
}

function delete_task(id) {
    var deleted_id;
    for (let index in task_list) {                  
        // console.log(task_list[index].id);
        if (task_list[index].id == id)
            {
                deleted_id = index;
            }
    }
    // console.log(deleted_id);
    task_list.splice(deleted_id,1);
    display_task(document.querySelector("span.active").id);
}

function edit_task(edit_id,edit_task) {
    edited_Id = edit_id;
    is_edit = true;
    task_input.value = edit_task;
    task_input.focus();
    task_input.classList.add("active");
}

function check_box(event_check) {
    label = event_check.nextElementSibling;
    let new_status;
    if (event_check.checked) {
        label.classList.add("checked");
        new_status = "completed";
    } else {
        label.classList.remove("checked");
        new_status = "pending";
    }
    for (let task of task_list){
        if (event_check.id == task.id)
            {task.status = new_status;}
    }
    console.log(task_list);
}
full_delete.addEventListener("click",function(){
    task_list.splice(0,task_list.length);
    display_task();
})

for (let span of task_filter) {
    span.addEventListener("click",function(){
        document.querySelector("span.active").classList.remove("active");
        span.classList.add("active");
        display_task(span.id);
    })
}
