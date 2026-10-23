const taskBox = document.querySelector(".taskBox");
const input = document.querySelector(".input1");
const addBtn = document.querySelector("#btn1");
const deleteBtn = document.querySelector(".btn2");
const taskDiv = document.querySelector(".div2");
const checkBox1 = document.querySelector(".check1");
const checkBox2 = document.querySelector(".check2");
const disNone = document.querySelector(".dis-none");
const countSpan = document.querySelector(".countSpn");

let tasks = JSON.parse(localStorage.getItem("tasks")) || [];
function saveTasks() {
    localStorage.setItem("tasks" , JSON.stringify(tasks));
    };

function createTask(task) {
    
    const newDiv = document.createElement("div");
    newDiv.classList.add("div2");
    newDiv.dataset.taskId = task.id;  // for identification each task
    newDiv.draggable = true;
    if (task.complited) {
        newDiv.classList.add("complite");
        }

    const taskText = document.createElement("span");
    taskText.classList.add("task-text");
    taskText.textContent = task.text;
    const deleteBtn = document.createElement("button");
    deleteBtn.textContent = "X";
    deleteBtn.classList.add("btn2");

    taskBox.append(newDiv);
    
    // save difficulty in localStorage
    const difficulty = document.createElement("select");
    difficulty.classList.add("difficulty");
    difficulty.innerHTML = `
    <option value="easy">Easy</option>
    <option value="medium">Medium</option>
    <option value="hard">Hard</option>
    `;
    difficulty.value = task.difficulty || "Easy";
        if (difficulty.value === "easy") {
        difficulty.classList.add("backcol-green");
        difficulty.classList.remove("backcol-gray");
        difficulty.classList.remove("backcol-red");
        
    }else if (difficulty.value === "medium") {
        difficulty.classList.add("backcol-gray");
        difficulty.classList.remove("backcol-green");
        difficulty.classList.remove("backcol-red");
        
    }else if (difficulty.value === "hard") {
        difficulty.classList.add("backcol-red");
        difficulty.classList.remove("backcol-green");
        difficulty.classList.remove("backcol-gray");
    }
    
    difficulty.addEventListener("change" , () => {
        task.difficulty = difficulty.value;
        difficulty.classList.remove(
            "backcol-red" ,
            "backcol-green",
            "backcol-red"
        );
        if (difficulty.value === "easy") {
        difficulty.classList.add("backcol-green");
        
    }else if (difficulty.value === "medium") {
        difficulty.classList.add("backcol-gray");
        
    }else if (difficulty.value === "hard") {
        difficulty.classList.add("backcol-red");
        
    }
        saveTasks();
    });
    newDiv.append(taskText ,difficulty ,deleteBtn);
    
    deleteBtn.addEventListener("click" , ()=> {
        tasks = tasks.filter(t => t.id !== task.id)
    taskCount();
    saveTasks();
    newDiv.remove();
    });
    // for complite or no complite
    taskText.addEventListener("click" , ()=> {
        task.complited = !task.complited; // after click task the complited rieverse
        newDiv.classList.toggle("complite" , task.complited);
        taskCount();
        saveTasks();
        
    });

    

};


addBtn.addEventListener("click" , ()=> {
    const text = input.value.trim();
    if (text === "") return;

const task = {
    id: Date.now(),
    text: text,
    complited: false ,
    difficulty: "easy"
};
tasks.push(task);
saveTasks();
createTask(task);
taskCount();
input.value ="";

    
});
                // for work by keybord(Enter Key)
input.addEventListener("keydown" , (e)=> {
    if (e.key == 'Enter') {
        addBtn.click();
    }
})


tasks.forEach(task => {
    createTask(task);
    taskCount();
});

function hideTaskOffComplited(){
    tasks.forEach(task => {
        const Element = taskBox.querySelector(`[data-task-id="${task.id}"]`); // for select taskID
        if (!task.complited && Element && checkBox1.checked) {
            Element.classList.add("dis-none");
        }else if(!task.complited && !checkBox1.checked) {
            Element.classList.remove("dis-none");
        }else if (checkBox2.checked) {
            checkBox2.click();
            checkBox1.click();
        };
    });
};

function hideTaskComplited() {
    tasks.forEach(task => {
        const Element = taskBox.querySelector(`[data-task-id="${task.id}"]`);
        if (task.complited && Element && checkBox2.checked) {
            Element.classList.add("dis-none");
        }else if(task.complited && !checkBox2.checked) {
            Element.classList.remove("dis-none");
        }else if (checkBox1.checked) {
            checkBox1.click();
            checkBox2.click();
        }
        
    });
}

checkBox1.addEventListener("click" , hideTaskOffComplited);
checkBox2.addEventListener("click" , hideTaskComplited);

function taskCount() {
    let currentTask = tasks.map(task => task.complited);
    compTasks = currentTask.filter(t => t == true )
    compTasksLen = compTasks.length;
    countSpan.textContent = "FIN   "+`${compTasksLen+"/"+tasks.length}`;
    console.log(compTasksLen);

}