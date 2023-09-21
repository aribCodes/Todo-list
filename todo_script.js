// getting key named login from the localstorage, then taking value of userId from the object
var user_login = JSON.parse(localStorage.getItem("login")).userId;
var getTime = new Date();

document.getElementById("user").innerHTML = JSON.parse(localStorage.getItem("login")).nameof;

// getting id of div named as add 
var addDiv = document.getElementById('add');
// getting id of input named as add 
var task = document.getElementById("task");

var array = [];

// creating an object that will carry todo info
var todo_obj = {
    user_id : user_login,
    description: 'coding',
    time: getTime
};

// getting todo list from local storage
var get_todo = JSON.parse(localStorage.getItem('todo_list')); 

// this function will be called on every refresh and it will update the todo list 
display();

// tasks will be created in this function 
function addtask()
{
    if(get_todo == null)
    {
        if(task.value == "")
        {
            swal ( "Error" ,  "Please enter task" ,  "warning" );
        }
        else{
            todo_obj = {
                user_id: user_login,
                description: task.value,
                time: getTime
            }
            array.push(todo_obj);
            localStorage.setItem('todo_list', JSON.stringify(array));
            task.value = "";

            //creating tasks
            document.getElementById("default").innerHTML ="";
            var para = document.createElement("div");
            para.setAttribute("id","usertodos");
            var text = document.createTextNode(todo_obj.description);
            para.appendChild(text);
            //creating span which contains dustbin icon which will be further used to delete the tasks
            button = document.createElement("button");
            text = document.createTextNode("x");
            button.setAttribute("id", "delete_btn");
            button.appendChild(text);
            para.appendChild(button);
            addDiv.appendChild(para);

            location.reload();
        }
    }
    else 
    {
        if(task.value == "")
        {
            swal ( "Error" ,  "Please enter task" ,  "warning" );
        }
        else{
            todo_obj = {
                user_id: user_login,
                description: task.value,
                time: getTime
            }
            get_todo.push(todo_obj);
            localStorage.setItem('todo_list', JSON.stringify(get_todo));
            task.value = "";

            //creating tasks
            document.getElementById("default").innerHTML ="";
            var para = document.createElement("div");
            para.setAttribute("id","usertodos");
            var text = document.createTextNode(todo_obj.description);
            para.appendChild(text);
            //creating span which contains dustbin icon which will be further used to delete the tasks
            button = document.createElement("button");
            text = document.createTextNode("x");
            button.setAttribute("id", "delete_btn");
            button.appendChild(text);
            para.appendChild(button);
            addDiv.appendChild(para);

            location.reload();
        }
    }
}

// this function will be called on every refresh and it will update the todo list
function display(){
    var get_task;
    if(get_todo == null)
    {
        document.getElementById("default").innerHTML = "No Record Found";
    }
    else{
        // getting data of the current user 
        get_todo.forEach(element => { 
            if(element.user_id == user_login)    
            {
                document.getElementById("default").innerHTML ="";
                //creating paragraph to show task
                var para = document.createElement("div");
                para.setAttribute("id","usertodos");
                var text = document.createTextNode(element.description);
                para.appendChild(text);
                //creating span which contains dustbin icon which will be further used to delete the tasks
                button = document.createElement("button");
                text = document.createTextNode("x");
                button.setAttribute("id", "delete_btn");
                button.appendChild(text);
                para.appendChild(button);
                addDiv.appendChild(para);

                // particular element deleting button 
                button.addEventListener("click",function(){
                    swal({
                    title: "Are you sure?",
                    text: "Once deleted, you will not be able to recover it!",
                    icon: "warning",
                    buttons: true,
                    dangerMode: true,
                    })
                    .then((willDelete) => {
                        if (willDelete) {
                            var index_task = get_todo.indexOf(element);
                            addDiv.removeChild(para);
                            var rem = JSON.parse(localStorage.getItem("todo_list"));
                            rem.splice(index_task,1);
                            localStorage.setItem("todo_list",JSON.stringify(rem));

                            location.reload();
                        }
                    });
                });
                // --------------------------------------------------
            }
        });
    }
}

// this function will be called when the clear all button will be pressed
function removeAll(){
    var index_of = [], temp = [];
    var rem_index = JSON.parse(localStorage.getItem("todo_list")); 
    swal({
        title: "Are you sure?",
        text: "Once deleted, you will not be able to recover it!",
        icon: "warning",
        buttons: true,
        dangerMode: true,
    }).then((willDelete) => {
        if (willDelete) {
            rem_index.forEach(element => {
                if(element.user_id == user_login)
                {
                    //getting todos(key: todo_list) from local storage which matches the current user's user ID
                    temp.push(rem_index.indexOf(element));
                }
                else{
                    //getting todos(key: todo_list) from local storage which does not matches the current user's user ID
                    index_of.push(element);
                }
            });
            // updating the todo_list by adding tasks which does not match the current user's user ID
            localStorage.setItem("todo_list",JSON.stringify(index_of));
            location.reload();
        }
    });
}
function signOut(){
    localStorage.removeItem("login");
    location.href = "index.html";
}