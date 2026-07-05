// ===== Elements =====

const taskInput = document.getElementById("taskInput");
const priority = document.getElementById("priority");
const date = document.getElementById("date");
const time = document.getElementById("time");

const addTaskBtn = document.getElementById("addTask");
const taskList = document.getElementById("taskList");

const total = document.getElementById("total");
const completed = document.getElementById("completed");
const pending = document.getElementById("pending");

// ===== Tasks Array =====

let tasks = JSON.parse(localStorage.getItem("tasks")) || [];

// ===== Save Tasks =====

function saveTasks(){

    localStorage.setItem("tasks", JSON.stringify(tasks));

}

// ===== Display Tasks =====

function displayTasks(){

    taskList.innerHTML = "";

    tasks.forEach((task,index)=>{

        let taskCard = document.createElement("div");

        taskCard.className =
        `task ${task.priority.toLowerCase()} ${task.completed ? "completed" : ""}`;

        taskCard.innerHTML = `

        <div class="task-info">

            <div class="task-title">

                ${task.text}

            </div>

            <div class="task-details">

                Priority :
                <b>${task.priority}</b>

                <br>

                📅 ${task.date}

                ⏰ ${task.time}

            </div>

        </div>

        <div class="actions">

            <button
            class="complete-btn"
            onclick="toggleComplete(${index})">

            ✔

            </button>

            <button
            class="edit-btn"
            onclick="editTask(${index})">

            ✏

            </button>

            <button
            class="delete-btn"
            onclick="deleteTask(${index})">

            🗑

            </button>

        </div>

        `;

        taskList.appendChild(taskCard);

    });

    updateStatistics();

}

// ===== Add Task =====

addTaskBtn.addEventListener("click",()=>{

    if(taskInput.value.trim()==""){

        alert("Please enter a task.");

        return;

    }

    tasks.push({

        text:taskInput.value,

        priority:priority.value,

        date:date.value,

        time:time.value,

        completed:false

    });

    saveTasks();

    displayTasks();

    taskInput.value="";
    date.value="";
    time.value="";

});
// ===== Complete Task =====

function toggleComplete(index){

    tasks[index].completed = !tasks[index].completed;

    saveTasks();

    displayTasks();

}

// ===== Edit Task =====

function editTask(index){

    let newTask = prompt("Edit Task", tasks[index].text);

    if(newTask !== null && newTask.trim() !== ""){

        tasks[index].text = newTask;

        saveTasks();

        displayTasks();

    }

}

// ===== Delete Task =====

function deleteTask(index){

    if(confirm("Delete this task?")){

        tasks.splice(index,1);

        saveTasks();

        displayTasks();

    }

}

// ===== Update Statistics =====

function updateStatistics(){

    total.textContent = tasks.length;

    let completedCount = tasks.filter(task => task.completed).length;

    completed.textContent = completedCount;

    pending.textContent = tasks.length - completedCount;

}
// ===== Search Tasks =====

const searchInput = document.getElementById("search");

searchInput.addEventListener("keyup", () => {

    let value = searchInput.value.toLowerCase();

    let taskCards = document.querySelectorAll(".task");

    taskCards.forEach(card => {

        let taskName = card.querySelector(".task-title")
                           .textContent
                           .toLowerCase();

        if(taskName.includes(value)){

            card.style.display = "flex";

        }else{

            card.style.display = "none";

        }

    });

});

// ===== Filter Buttons =====

const filterButtons = document.querySelectorAll(".filter");

filterButtons.forEach(button=>{

    button.addEventListener("click",()=>{

        filterButtons.forEach(btn=>
            btn.classList.remove("active"));

        button.classList.add("active");

        let filter = button.dataset.filter;

        let taskCards = document.querySelectorAll(".task");

        taskCards.forEach((card,index)=>{

            if(filter==="all"){

                card.style.display="flex";

            }

            else if(filter==="completed"){

                card.style.display=
                tasks[index].completed ? "flex":"none";

            }

            else if(filter==="pending"){

                card.style.display=
                !tasks[index].completed ? "flex":"none";

            }

        });

    });

});

// ===== Clear All Tasks =====

document.getElementById("clearAll").addEventListener("click",()=>{

    if(confirm("Are you sure you want to delete all tasks?")){

        tasks=[];

        saveTasks();

        displayTasks();

    }

});

// ===== Load Tasks When Page Opens =====

displayTasks();
