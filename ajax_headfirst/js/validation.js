window.onload = initPage;
function initPage() {
    document.getElementById("username").onblur = checkUsername; //
    document.getElementById("register").disabled = true; //
}

// 检查用户名是否重复
function showUsernameStatus() {
    console.log("readyState: " + request.readyState);
    if(request.readyState == 4) {
        if(request.status == 200) {
            console.log("responseText: "+ request.responseText);
            if(request.responseText == "okay") {
                document.getElementById("username").className = "approved";
                document.getElementById("register").disabled = false;
            } else {
                document.getElementById("username").className = "denied";
                document.getElementById("username").focus();
                document.getElementById("username").select();
            }
        }
    }
}

function checkUsername() {
    document.getElementById("username").className = "thinking"; //使用 #username.thinking格式

    request = createRequest();
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
