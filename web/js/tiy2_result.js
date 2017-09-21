var originWhiteList = ["https://eastmanjian.github.io",
    "http://localhost:8080",
    "localhost:8080",
    "https://eastmanjian.cn"];

function checkWhiteList(origin) {
    //console.log("origin = " + origin);
    for (var i = 0; i < originWhiteList.length; i++) {
        if (origin === originWhiteList[i]) {
            return true;
        }
    }
    return false;
}

function messageHandler(e) {

    if(checkWhiteList(e.origin)) {
        //rewrite the iframe document
        document.open("text/html","replace");
        document.write(e.data);
        document.close();

        //add the message listener js
        var msgListenerJs = document.createElement("script");
        msgListenerJs.src = "js/tiy2_result.js";
        var newHead = document.getElementsByTagName("head")[0];
        newHead.appendChild(msgListenerJs);

        //console.log("iframe html:" + document.getElementsByTagName("html")[0].innerHTML);
    } else {
        console.warn("Receiving message from untrusted origin: " + e.data);
    }


}

window.addEventListener("message", messageHandler, true);
