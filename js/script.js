let inputelement = document.getElementById('newtask');
let formelement = document.querySelector('form');
let listelement = document.querySelector('ul');
let totaltaskselement = document.getElementById('totaltasks');
let search =document.getElementById("searchtext");
let tasklist = [
    'Do Homework',
    'Bring some milk from Store'
];
function deleteitem(e) {
    let task = e.target.parentElement.previousElementSibling.innerHTML;
    let index = tasklist.indexOf(task);
    if (index != -1) {
        tasklist.splice(index, 1);
    }
    populatelist();
}
function populatelist() {
    listelement.innerHTML = '';
    tasklist.forEach(function (item) {
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


        anchorelement.addEventListener('click', (e) => deleteitem(e));
        // add li to ul 
        listelement.appendChild(newitem);
    });

    totaltaskselement.innerHTML = tasklist.length;
}

populatelist();

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
    if (!tasklist.includes(e)) return false;
    else {
        errorMessage();
        setTimeout(clearerror, 1000);
        return true;
    }
}
function addtask() {
    if (inputelement.value && doesnothavewhitespaces(inputelement.value) && !tasksinclude(inputelement.value)) {
        tasklist.push(inputelement.value);
        populatelist();
    }
    inputelement.value = '';
}

formelement.addEventListener('submit', function (e) {
    e.preventDefault();
    addtask();
})

// search.addEventListener("input",function(){
//     let inputval=search.value;
//     console.log("fired", inputval);
//     let listitems=document.getElementsByClassName("list1");
//     console.log(listitems);
//     Array.from(listitems).forEach(function(element){
//         let listtext=element.getElementsByTagName("li")[0].innerText;
//         console.log(listtext);
//         if(listtext.includes(inputval)){
//             element.style.display= "none";
//         }
//         else{
//             element.style.display= "block";

//         }
//     })
// })