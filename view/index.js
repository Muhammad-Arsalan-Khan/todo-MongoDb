let taskContainer = document.getElementById("task-container");
let addtask = document.querySelector("#addtask");
let input = document.getElementById("input");
let allIds = [];

addtask.addEventListener("click", addTodo);
function addTodo(){
    try {
        if (!input.value) {
            alert("Enter valide Task");
            return;
          }
        const AddTodoObj = {
            todo: input.value,
          };
        fetch("http://localhost:3000/createtodo", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(AddTodoObj)
        }).then(res => res.json())
        .then(getData())
    } catch (error) {
        console.log("add todo err", error.message)
    }
}
input.addEventListener("keypress", (event) => {
    if (event.key === "Enter") {
        addTodo();
    }
  });


function getData(){
    try {
    allIds = [];
    input.value = "";
    taskContainer.innerHTML = "";
    fetch("http://localhost:3000/gettodo")
    .then(res => res.json())
    .then(res => {
        //console.log(res)
        const dataArr = res.data
        //console.log(dataArr)
         dataArr.map((data) => {
            allIds.push(data._id)
            let UI = `<ul><li><p>${data.todo}</p><span id=${data._id} onclick="updateTodo(this)">📝</span><span id=${data._id} onclick="deleteTodo(this)">🗑️</span></li></ul>`
            taskContainer.innerHTML += UI
         })
    })
    } catch (error) {
        console.log("error", error.code, error.message)
    }
}
window.getData = getData;



function updateTodo(ele){
    const id = ele.id;
    const updateTodo = prompt("Enter your updated task")
    if(!updateTodo){
        alert("Please enter a valid task")
        return
    }
    fetch(`http://localhost:3000/updatetodo/${id}`, {
        method: "PATCH",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({updateTodo})
    }).then(res => res.json())
    .then(getData())
}
window.updateTodo = updateTodo;


function deleteTodo(ele){
    const id = ele.id
    fetch(`http://localhost:3000/deletetodo/${id}`, {
        method: "DELETE",
        headers: {
            "Content-Type": "application/json"
        },
    }).then(res => res.json())
    .then(getData())

}
window.deleteTodo = deleteTodo;

function deleteAllTodo(){
    //console.log(allIds)
    fetch(`http://localhost:3000/deleteAlltodo`, {
        method: "DELETE",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(allIds)
    }).then(res => res.json())
    getData()
}
window.deleteAllTodo = deleteAllTodo

