window.onload = initPage;

var usernameValid = false;
var passwordValid = false;

function initPage() {
    document.getElementById("username").onblur = checkUsername; //
    document.getElementById("password2").onblur = checkPassword;
    document.getElementById("register").disabled = true; //
    document.getElementById("register").onclick = registerUser;

    setInterval(scrollImages, 50);
}

// 检查用户名是否重复
function showUsernameStatus() {
    console.log("readyState: " + request.readyState);
    if(request.readyState == 4) {
        if(request.status == 200) {
            console.log("responseText: "+ request.responseText);
            if(request.responseText == "okay") {
                document.getElementById("username").className = "approved";
                // document.getElementById("register").disabled = false;
                usernameValid = true;
            } else {
                document.getElementById("username").className = "denied";
                document.getElementById("username").focus();    //选中username域
                document.getElementById("username").select();   //高亮显示
                usernameValid =false;
            }
        }
    }
}

function checkUsername() {
    document.getElementById("username").className = "thinking"; //使用 #username.thinking格式

    request = createRequest();  // 函数中没有var修饰的变量，js默认当成全局变量
    if(request == null) {
        alert("Unable to create request");
    } else {
        var theName = document.getElementById("username").value;
        // var url = "server/movie/checkName.php?username=" + escape(theName);
        var url = "http://localhost/server/movie/checkName.php?username=" + escape(theName);
        console.log("url: " + url);
        request.open("GET", url, true);
        request.onreadystatechange = showUsernameStatus;
        request.send(null);
    }
}

// 服务器检查密码是否符合要求
function checkPassword() {
    var passwd1 = document.getElementById("password1");
    var passwd2 = document.getElementById("password2");
    passwd1.className = "thinking";
    console.log("passwd1: " + passwd1.value + " passwd2: " + passwd2.value);

    if(passwd1.value == passwd2.value && passwd2.value != "") {
        console.log("Valid password");
        // 这里是送到服务端检验是否符合“至少6个字符且包含数字”的要求
        passwordRequest = createRequest();
        if (passwordRequest == null) {
            alert("Unable to create request");
        } else {
            var password = escape(password1.value); //escape()将某些字符转换层URL格式字符
            // var url = 'checkPass.php?password=' + password;
            var url = "http://localhost/server/movie/checkPass.php?password=" + password;
            passwordRequest.onreadystatechange = showPasswordStatus;
            passwordRequest.open('GET', url, true);
            passwordRequest.send(null);
        }
    } else {
        console.log("Invalid password");
        // 清空password2输入框
        passwd1.className = "denied";
        passwd2.value="";
    }
}

function showPasswordStatus() {
    if (passwordRequest.readyState == 4) {
        if (passwordRequest.status == 200) {
            var password1 = document.getElementById("password1");
            if (passwordRequest.responseText == 'okay') {
                password1.className = "approved";
                passwordValid = true;
            } else {
                password1.className = "denied";
                password1.focus();
                password1.select();
                passwordValid = false;
            }
            checkFormStatus();
        }
    }
}

function checkFormStatus() {
    if (usernameValid && passwordValid) {
        document.getElementById("register").disabled = false;
    } else {
        document.getElementById("register").disabled = true;
    }
}

// 注册 begin
function registerUser() {
    // t = setInterval(scrollImages, 50);   //每隔50ms调用一次scrollImages()
    document.getElementById("register").value = "Processing...";
    registerRequest = createRequest();
    if (registerRequest == null) {
        alert("Unable to create request.");
    } else {
        var url = "http://localhost/server/movie/register.php?username=" +
        escape(document.getElementById("username").value) + "&password=" +
        escape(document.getElementById("password1").value) + "&firstname=" +
        escape(document.getElementById("firstname").value) + "&lastname=" +
        escape(document.getElementById("lastname").value) + "&email=" +
        escape(document.getElementById("email").value) + "&genre=" +
        escape(document.getElementById("genre").value) + "&favorite=" +
        escape(document.getElementById("favorite").value) + "&tastes=" +
        escape(document.getElementById("tastes").value);
        registerRequest.onreadystatechange = registrationProcessed;
        registerRequest.open("GET", url, true);
        registerRequest.send(null);
    }
}

function registrationProcessed() {
    console.log("ReadyState: " + registerRequest.readyState + " Status: " + registerRequest.status);
    if (registerRequest.readyState == 4) {
        if (registerRequest.status == 200) {
            console.log("Response: " + registerRequest.responseText);
            document.getElementById('wrapper').innerHTML = registerRequest.responseText;
        }
    }
}

function scrollImages() {
    var coverBarDiv = document.getElementById("coverBar");
    var images = coverBarDiv.getElementsByTagName("img");
    for (var i = 0; i < images.length; i++) {
        var left = images[i].style.left.substr(0, images[i].style.left.length - 2);
        if (left <=  -86) {
            left = 532;
        }
        images[i].style.left = (left - 1) + "px";
    }
}
// 注册 end


  