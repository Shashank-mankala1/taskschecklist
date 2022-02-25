var inputelement = document.getElementById("newtask");
var formelement = document.querySelector('form');
var listelement = document.querySelector('ul');
var totaltaskselement = document.getElementById('totaltasks');

var task= inputelement.value;
function doesnothavewhitespaces(s) {
    let stringwithoutspaces = s.trim();
    return stringwithoutspaces.length > 0;
}

function errorMessage() {
    var error = document.getElementById("error")
    error.textContent = "Already present in your list!!"
    error.style.color = "red"
}
function clearerror() {
    var error = document.getElementById("error")
    error.textContent = ""
}

function tasksinclude(e) {
    var tasks = JSON.parse(localStorage.getItem("tasks"));
    try{ 
        if (!tasks.includes(e)) 
            return false;
        else {
            errorMessage();
            setTimeout(clearerror, 1000);
            return true;
        }
    }
    catch(e){
        return false;
    }
}
// formelement.addEventListener("submit", addtask);
formelement.addEventListener('submit', function (e) {
    e.preventDefault();
    addtask();
})
function fetchtasks(){
    listelement.innerHTML = '';
    var tasks = JSON.parse(localStorage.getItem("tasks"));
    listelement.innerHTML = '';
    tasks.forEach(function (item) {
        let newitem = document.createElement('li');

        // add new span
        let span = document.createElement('span');
        span.innerHTML = item;
        newitem.appendChild(span);

        // add delete button
        let anchorelement = document.createElement('a');
        anchorelement.classList.add('delete');
        anchorelement.innerHTML = '<i class="fas fa-trash-alt"></i>';
        anchorelement.title="Remove this task";
        newitem.appendChild(anchorelement);

        anchorelement.addEventListener('click', (e) => deletetask(e));
        // add li to ul 
        listelement.appendChild(newitem);
    });

    totaltaskselement.innerHTML = tasks.length;
}
fetchtasks();
function addtask(){
    if (inputelement.value && doesnothavewhitespaces(inputelement.value) && !tasksinclude(inputelement.value)) {
        if (localStorage.getItem("tasks") === null) {
            var tasks = [];
            tasks.push(inputelement.value);
            localStorage.setItem("tasks", JSON.stringify(tasks));
        } else {
            var tasks = JSON.parse(localStorage.getItem("tasks"));
            tasks.push(inputelement.value);
            // tasks.push(task);
            localStorage.setItem("tasks", JSON.stringify(tasks));
        }
        fetchtasks();
    }
    inputelement.value = '';
    // e.preventDefault();
}
function deletetask(e){
    var deletetask= e.target.parentElement.previousElementSibling.innerHTML;
    var tasks = JSON.parse(localStorage.getItem("tasks"));
    for (var i = 0; i < tasks.length; i++) {
        if (tasks[i] == deletetask) {
            tasks.splice(i, 1);
        }
    }
    localStorage.setItem("tasks", JSON.stringify(tasks));
    fetchtasks();
}