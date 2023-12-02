
loadTask();

function loadTask(){

    const task = getTaskFromStorage();

    displayTasks(task);
}


function addTask(){

    const valid = validate();
    if (!valid) return;

    const task = getTask();

    const list = getTaskFromStorage();

    list.push(task);

    saveTaskToStorage(list);

    displayTasks(list);
    
    resetFields();

}



function getTask(){
    let textBox = document.getElementById("textBox");
    let dateBox = document.getElementById("dateBox");
    let timeBox = document.getElementById("timeBox");

    let text = textBox.value;
    let date = dateBox.value;
    let time = timeBox.value;

    let note = {
        text,
        date,
        time
    }

    return note;
}

function validate(){

    let textBox = document.getElementById("textBox");
    let dateBox = document.getElementById("dateBox");
    let timeBox = document.getElementById("timeBox");

    let text = textBox.value;
    let date = dateBox.value;
    let time = timeBox.value;

    let textBoxErr = document.getElementById("textBoxErr");
    let dateBoxErr = document.getElementById("dateBoxErr");
    let timeBoxErr = document.getElementById("timeBoxErr");

    textBoxErr.innerText = "";
    dateBoxErr.innerText = "";
    timeBoxErr.innerText = "";

    if( text === ""){
        textBoxErr.innerText = "Missing a Text!";
        textBox.focus();
        return false;
    }

    if( date === ""){
        dateBoxErr.innerText = "Missing a Date!";
        dateBox.focus();
        return false;
    }

    if( time === ""){
        timeBoxErr.innerText = "Missing a Time!";
        timeBox.focus();
        return false;
    }

    return true;


}

function getTaskFromStorage(){

    const str = localStorage.getItem("note");
    const note = str === null ? [] : JSON.parse(str);
    return note;

}

function saveTaskToStorage(arr){
    const str = JSON.stringify(arr);
    localStorage.setItem("note", str);
}

function displayTasks(notesList){

    const taskList = document.getElementById("taskList");
    taskList.innerHTML = "";
    
    for (let i = 0; i < notesList.length; i++) {
      const note = notesList[i];
      const newTask = `
        <div class="notes">
        <i class="fa-solid fa-trash fa-sm" style="color: red;" onclick="deleteTask(${i})"></i>
        <p class="note-text">${note.text}</p>
        <span class="note-date">${note.date}</span>
        <br/>
        <span class="note-time">${note.time}</span>
        </div>`;
      taskList.innerHTML += newTask;
    }
  }

function deleteTask(index) {
    const taskList = getTaskFromStorage();
    taskList.splice(index, 1);
    saveTaskToStorage(taskList);
    displayTasks(taskList);
  }


function resetFields(){
    document.getElementById("textBox").value = "";
    document.getElementById("dateBox").value = "";
    document.getElementById("timeBox").value = "";
    document.getElementById("textBox").focus();
}