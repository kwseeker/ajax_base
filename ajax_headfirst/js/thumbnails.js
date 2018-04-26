// onload 事件会在页面或图像加载完成后立即发生。
window.onload = initPage;

function initPage() {
    thumbs = document.getElementById("thumbnailPane").getElementsByTagName("img");

    for(var i=0; i<thumbs.length; i++) {
        image =thumbs[i];

        image.onclick = function() {
            detailURL = 'images/inventory/' + this.title + '-detail.jpg';
            document.getElementById("itemDetail").src = detailURL;
            getDetails(this.title);
        };
    }
}

function displayDetails() {
    if(request.readyState == 4) {
        if(request.status == 200) {
            // alert("show detail description");
            detailDiv = document.getElementById("description");
            detailDiv.innerHTML = request.responseText;
        }
    }
}

function getDetails(itemName) {
    request = createRequest();
    if(request == null) {
        alert("Unable to create request");
        return;
    }
    var url = "http://localhost/server/rob/getDetails.php?ImageID=" + escape(itemName);
    // var url = "rob_server/getDetails.php?ImageID=" + escape(itemName);   //无效
    // alert(url);
    request.open("GET", url, true);
    request.onreadystatechange = displayDetails;
    request.send(null);
}
