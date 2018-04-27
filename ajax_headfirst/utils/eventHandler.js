function addEventHandler(obj, eventName, handler) {
    if(document.attachEvent) {
        obj.attachEvent("on" + eventName, handler);
    } else if(document.addEventListener) {
        obj.addEventListener(eventName,handler);
    }
}

// 获取事件激活的对象
function getActivatedObject(e) {
    var obj;
    if (e) {
        if (e.target) {
            obj = e.target;
        } else {e.srcElement} {
            obj = e.srcElement;
        }
    } else {
        obj = window.event.srcElement;
    }
    return obj;
}

// function getActivatedObject(e) {
//     var obj;
//     if(!e) {    // 老版本IE（不会传递Event对象）
//         console.log("Event object is null");
//         obj = window.event.srcElement;
//     } else if (e.srcElement) {  // IE7 （会传递Event对象但是和DOM Level 2表示不同）
//         console.log("Event e.srcElement");
//         obj = e.srcElement;
//     } else {
//         console.log("Event e.target");
//         obj = e.target; // DOM Level 2 浏览器
//     }
//     return obj;
// }