window.onload = initPage;

var welcomePaneShowing = true;  //默认welcome tab是active的，则此处默认true.

function initPage() {
    var buttons = document.getElementById("navigation").getElementsByTagName("a");
    for (var i=0; i<buttons.length; i++) {
        var currentBtn = buttons[i];
        currentBtn.onclick = showTab;
        // currentBtn.onmouseover = buttonOver;
        // currentBtn.onmouseout = buttonOut;
        // currentBtn.onmouseover = showHint;
        // currentBtn.onmouseout = hideHint;
        // 上面的方式相当于添加属性而一个属性只能有一个值， addEventListener可以指定多个事件处理程序
        // 多个事件处理函数执行顺序并不一定按注册顺序执行
        // currentBtn.addEventListener("mouseover", showHint, false);
        // currentBtn.addEventListener("mouseover", buttonOver, false);
        // currentBtn.addEventListener("mouseout", hideHint, false);
        // currentBtn.addEventListener("mouseout", buttonOut, false);
        addEventHandler(currentBtn, "mouseover", showHint);
        addEventHandler(currentBtn, "mouseover", buttonOver);
        addEventHandler(currentBtn, "mouseout", hideHint);
        addEventHandler(currentBtn, "mouseout", buttonOut);
    }

    var tabs = document.getElementById("tabs").getElementsByTagName("a");
    for(var i=0; i<tabs.length; i++) {
        var currentTab = tabs[i];
        currentTab.onmouseover = showHint;
        currentTab.onmouseout = hideHint;
        currentTab.onclick = showTab;
    }
}


function showTab() {
    console.log("function showTab called");
    var selectedTab = this.title;   // this的最终指向的是那个调用它的对象
    if (selectedTab == "welcome") {
        welcomePaneShowing = true;
        document.getElementById("content").innerHTML = 
        "<h3>Click a tab to display the course schedule for the class</h3>";
    } else {
        welcomePaneShowing = false;
    }
  
    var tabs = document.getElementById("tabs").getElementsByTagName("a");
    for (var i=0; i<tabs.length; i++) { 
      var currentTab = tabs[i];
      if (currentTab.title == selectedTab) {
        currentTab.className = 'active';
      } else {
        currentTab.className = 'inactive';
      }
    }
  
    if(selectedTab == "welcome") {
        return;
    }

    var request = createRequest();
    if (request == null) {
      alert("Unable to create request");
      return;
    }
    console.log("selectedTab: " + selectedTab);
    request.onreadystatechange = showSchedule;
    // request.open("GET", "file:///F:/mywork/learnproj/ajax_base/ajax_headfirst/advanced.html", true);    // 无效
    // request.open("GET", "server/yoga/advanced.html", true);    // 已经成功获取返回，但是无显示,前面那种方式也是
    request.open("GET", "http://localhost/server/yoga/" + selectedTab + ".html", true);       
    request.send(null);
}

function showHint(e) {
    console.log("function showHint called");
    if(!welcomePaneShowing) {
        return;
    }
    var hintText;

    var target = getActivatedObject(e); // 通过Event对象获取target
    switch(target.title) {
    // switch(this.title) {             // this 获取激活的target
        case "beginners":
            hintText = "Just getting started? Come join us!";
            break;
        case "intermediate":
            hintText = "Take your flexibility to the next level!";
            break;
        case "advanced":
            hintText = "Perfectly join your body and mind with these intensive workouts.";
            break;
        default:
            hintText = "Click a tab to display the course schedule for the class";
    }
    var contentPane = document.getElementById("content");
    contentPane.innerHTML = "<h3>" + hintText + "</h3>";
}

function hideHint() {
    console.log("function hideHint called");
    if (welcomePaneShowing) {
        var contentPane = document.getElementById("content");
        contentPane.innerHTML = 
            "<h3>Click a tab to display the course schedule for the class</h3>";
    }
}

function showSchedule() {
    if(request.readyState == 4) {
        if(request.status == 200) {
            document.getElementById("content").innerHTML = request.responseText;
        }
    }
}

function buttonOver() {
    console.log("buttonOver called!");
    this.className = "active";
}

function buttonOut() {
    console.log("buttonOut called!");
    this.className = "";
}
