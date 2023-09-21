var form1 = document.getElementById("signupForm");
var form2 = document.getElementById("loginForm");

// signup & login div
var div1 = document.getElementById("Signup");
var div2 = document.getElementById("login");

// hiding signup initially
div1.style.display = "none";

function hideLogin(){
    div2.style.display = "none";
    div1.style.display = "flex";
}
function hideSignup(){
    div1.style.display = "none";
    div2.style.display = "flex";
}

var array = [];
var count;

var userData = {
    userId: 0,        
    nameof:"arib",        
    email:"arib@gmail.com",        
    pass: "aribarib"        
};

// getting data from local storage, if it does not exist it will return "null"
var get_data = JSON.parse(localStorage.getItem('info'));

// This function will be called on press of signup button
function validate(){
    var name_check = document.forms["signupForm"]["userName"].value;
    var email_check = document.forms["signupForm"]["userEmail"].value;
    var pass_check = document.forms["signupForm"]["userPass"].value;
    var confirmPass_check = document.forms["signupForm"]["confirmPass"].value;

    if(get_data == null)
    {
        if(name_check == "")
        {
            document.getElementById("error").innerHTML = "*please enter your name";
            return false;
        }
        else if(email_check == "")
        {
            document.getElementById("error").innerHTML = "*please enter the email";
            return false;
        }
        else if(pass_check == "")
        {
            document.getElementById("error").innerHTML = "*please enter the password";
            return false;
        }
        else if(pass_check.length < 8)
        {
            document.getElementById("error").innerHTML = "*atleast 8 characters are required";
            return false;
        }
        else if(confirmPass_check == "")
        {
            document.getElementById("error").innerHTML = "*please fill the remaining field";
            return false;
        }
        else if(pass_check !== confirmPass_check)
        {
            document.getElementById("error").innerHTML = "*password does not match the above field";
            return false;
        }
        else
        {
            data();
        }
    }
    else{
        var temp_check = get_data;
        count = temp_check.length;

        temp_check.find( function(element) { 
            if(email_check == element.email)
            {
                swal ( "Oops" ,  "This email already exists!" ,  "warning" );
                return false;
            } 
        });
        if(name_check == "")
        {
            document.getElementById("error").innerHTML = "*please enter your name";
            return false;
        }
        else if(email_check == "")
        {
            document.getElementById("error").innerHTML = "*please enter the email";
            return false;
        }
        else if(pass_check == "")
        {
            document.getElementById("error").innerHTML = "*please enter the password";
            return false;
        }
        else if(pass_check.length < 8)
        {
            document.getElementById("error").innerHTML = "*atleast 8 characters are required";
            return false;
        }
        else if(confirmPass_check == "")
        {
            document.getElementById("error").innerHTML = "*please fill the remaining field";
            return false;
        }
        else if(pass_check !== confirmPass_check)
        {
            document.getElementById("error").innerHTML = "*password does not match the above field";
            return false;
        }
        else
        {
            data();
        }
    }
}

// this function will store users signup details on local storage
function data(){
    var userName = document.forms['signupForm']['userName'].value;
    var userEmail = document.forms['signupForm']['userEmail'].value;
    var userPass = document.forms['signupForm']['userPass'].value;

    if(get_data == null){
        userData = {
            userId: 0,
            nameof: userName,
            email: userEmail,
            pass: userPass
        };
        array.push(userData);
        localStorage.setItem("info",JSON.stringify(array));

        // setting a key in localstorage and maintaining a login record
        localStorage.setItem('login', JSON.stringify(userData));
    }
    else {
        userData = {
            userId: count,
            nameof: userName,
            email: userEmail,
            pass: userPass
        };
        get_data.push(userData);
        localStorage.setItem("info",JSON.stringify(get_data));

        // setting a key in localstorage and maintaining a login record
        localStorage.setItem('login', JSON.stringify(userData));
    }
}

// this function will store users login details on local storage
function verification(){
    var user_email = document.forms['loginForm']['userEmail2'].value;
    var user_pass = document.forms['loginForm']['userPass2'].value;

    // we are converting JSON into object
    var parsed_data = JSON.parse(localStorage.getItem('info'));

    if(user_email == "")
    {
        document.getElementById("error2").innerHTML = "*please enter the email";
        return false;
    }
    else if(user_pass == "")
    {
        document.getElementById("error2").innerHTML = "*please enter the password";
        return false;
    }
    else if(get_data == null){
        swal({
            title:"User does not exist",
            text: "Signup and become our member",
            icon: "error",
            dangerMode: true,
          });
        return false;
    }
    else{
        var object_return = parsed_data.find(function(element){ 
            return element.email == user_email;
        });
        if(object_return == undefined) 
        {
            swal({
                title:"User does not exist",
                text: "Signup and become our member",
                icon: "error",
                dangerMode: true,
              });
            return false;
        }
        else if(object_return.pass != user_pass){
            swal({
                text: "*Invalid password",
                icon: "warning",
                dangerMode: true,
              });
            return false;
        }
        else{
            // setting a key in localstorage and maintaining a login record
            localStorage.setItem('login', JSON.stringify(object_return));
            swal ( "Welcome" ,  object_return.nameof ,  "success" );
        }
    }
}