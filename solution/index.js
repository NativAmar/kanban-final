// To do button
const toDoButtonEl = document.getElementById("submit-add-to-do");

// In progress button
const inProgressElButtonEl = document.getElementById("submit-add-in-progress");

// Done button
const doneButtonEl = document.getElementById("submit-add-done");

//localStorage setup
  if(!JSON.parse(localStorage.getItem("tasks"))){
    let data ={
        "todo": [],
        "in-progress": [],
        "done": []
    };
   localStorage.setItem("tasks" ,JSON.stringify(data))
}
else{
    localStorage.getItem("tasks")
}   

let data = JSON.parse(localStorage.getItem("tasks"));

//Save the tasks in your local storage
  function addTasksToLocal(target,newTask)
  {
    if(target === toDoButtonEl){
        data["todo"].unshift(newTask)
        localStorage.setItem("tasks",JSON.stringify(data))
    }
    if(target === inProgressElButtonEl){
        data["in-progress"].unshift(newTask)
        localStorage.setItem("tasks",JSON.stringify(data))
    }
    if(target === doneButtonEl){
        data["done"].unshift(newTask)
        localStorage.setItem("tasks",JSON.stringify(data))
    }
  }

printData();

//Print the data from the localStorage
function printData()
{
    const ules= document.querySelectorAll("ul");
    for(let ul of ules){ 
        if(ul.classList.contains("to-do-tasks")){
            for(let todo of JSON.parse(localStorage.getItem("tasks"))["todo"]){
                const li= document.createElement("li");
                li.textContent = todo;
                li.classList.add("task");
                li.setAttribute("draggable","true");
                li.setAttribute("ondragstart","drag(event)");
                li.setAttribute("id",Math.random())
                ul.append(li);
            }   
        }
        if(ul.classList.contains("in-progress-tasks")){
            for(let inProgress of JSON.parse(localStorage.getItem("tasks"))["in-progress"]){
                const li= document.createElement("li");
                li.textContent = inProgress;
                li.classList.add("task");
                li.setAttribute("draggable","true");
                li.setAttribute("ondragstart","drag(event)");
                li.setAttribute("id",Math.random())
                ul.append(li);
            }  
        }
        if(ul.classList.contains("done-tasks")) {
            for(let done of JSON.parse(localStorage.getItem("tasks"))["done"]) {
                const li= document.createElement("li");
                li.textContent = done;
                li.classList.add("task");
                li.setAttribute("draggable","true");
                li.setAttribute("ondragstart","drag(event)");
                li.setAttribute("id",Math.random())
                ul.append(li);
            }    
        }
    }
}

//Adding tasks events 
toDoButtonEl.addEventListener("click",addTask)
inProgressElButtonEl.addEventListener("click",addTask)
doneButtonEl.addEventListener("click",addTask)

//Adding tasks function
    function addTask({target}) 
    {
        if(target.id==="submit-add-to-do" || target.id==="submit-add-in-progress" || target.id==="submit-add-done")
        {
            const currentSection = target.closest("section"); 
            let textField= currentSection.querySelector("input").value; 
            const newTask = document.createElement("li");

            if(textField==="")
             {
            alert("Please enter value");
            }
            else
            {
                newTask.textContent= textField;
                currentSection.querySelector("input").value = ""; 
                newTask.classList.add("task");
                newTask.setAttribute("draggable","true");
                newTask.setAttribute("ondragstart","drag(event)");
                newTask.setAttribute("id",Math.random());
                const ul = currentSection.querySelector("ul");
                ul.prepend(newTask);
                addTasksToLocal(target,newTask.textContent);
            }
        }
    }


//edit tasks functions
    document.addEventListener("dblclick", editTask)

    function editTask (event)
    {
        if (event.target.classList.contains("task"))
        {
            const li = event.target;
            const oldValue = li.textContent;
            li.setAttribute("contenteditable",true)
            li.focus(); 
            
            li.addEventListener("blur", unFoucus);

            function unFoucus ()
            { 
                const newValue = li.textContent;
                const section = li.closest("section");
                const buttonId = section.querySelector("button").id;
                let arrName = section.id;

                if(li.textContent === ""){
                     alert("you must enter value"); 
                     li.remove();
                     let index = data[arrName].indexOf(oldValue);
                     data[arrName].splice(index,1);
                }
                else{
                    blurTask (buttonId,arrName,oldValue,newValue)
                }
                localStorage.setItem("tasks",JSON.stringify(data))
            }
        }
    }
    function blurTask (buttonId,arrName,oldValue,newValue)
    {
        if ((buttonId === "submit-add-to-do")||
            (buttonId === "submit-add-in-progress")||
            (buttonId === "submit-add-done"))
            {
                let index = data[arrName].indexOf(oldValue)
                data[arrName].splice(index,1,newValue)
        }
    }
    

// Search bar function
function searchSort() {
    let input = document.getElementById('search').value
    input=input.toLowerCase();
    let tasksArr = document.getElementsByClassName('task');

    for (i = 0; i < tasksArr.length; i++)
     { 
        if (!tasksArr[i].innerHTML.toLowerCase().includes(input)) {
            tasksArr[i].style.display="none";
        }
        else {
            tasksArr[i].style.display="list-item";               
        }
    }
}
const searchbar = document.getElementById("search");
searchbar.addEventListener("keyup",searchSort);



//Alt+1/2/3 function
document.querySelectorAll('.task').forEach(item => {
    item.addEventListener('mouseover', (e)=>switchTasks(e))  })

let specificLi;

function switchTasks(e)
{
    specificLi=e.target;
    document.addEventListener("keydown",pressKeys)
}

function pressKeys(e)
{
    const value=specificLi.textContent;
    const section = specificLi.closest("section");

    if (section === null)
    return;

    if(e.altKey&&e.key==='1')
    {
        ul = document.querySelector(".to-do-tasks");
        ul.insertBefore(specificLi,ul.firstChild);
        data["todo"].unshift(value);
        let PropObj = section.id;
        let index = data[PropObj].indexOf(value);
        data[PropObj].splice(index,1);
    }
    if(e.altKey&&e.key==='2')
    { 
        ul = document.querySelector(".in-progress-tasks");
        ul.insertBefore(specificLi,ul.firstChild);
        data["in-progress"].unshift(value);
        let PropObj = section.id;
        let index = data[PropObj].indexOf(value);
        data[PropObj].splice(index,1);
    }
    if(e.altKey&&e.key==='3')
    {
        ul = document.querySelector(".done-tasks");
        ul.insertBefore(specificLi,ul.firstChild);
        data["done"].unshift(value);
        let PropObj = section.id;
        let index = data[PropObj].indexOf(value);
        data[PropObj].splice(index,1);
    }
   
    localStorage.setItem("tasks",JSON.stringify(data))
}

