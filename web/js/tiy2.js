/**
 * When page initiates, check if there is local storage.
 * If yes, load the testing script from local storage.
 * If no, call loadSample(), it loads the default sample.
 */
function loadWindow() {
    if (localStorage.codes) {
        document.getElementById("testCode").value = localStorage.codes;
        submitCodes();
    } else {
        loadSample();
    }
}

/**
 * Load sample html codes to the textarea for edit and test
 */
function loadSample() {
    var url = document.getElementById("sampleUrl").value;
    if (!url || url == "null") {  //jsp returns a string "null" if the parameter is empty.
        url = "./basic/default_sample.html";
    }
    xmlhttp = new XMLHttpRequest();

    xmlhttp.onload = function () {
        if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
            document.getElementById("testCode").value = xmlhttp.responseText;
            submitCodes();
        }
    }

    xmlhttp.open("GET", url, true);
    xmlhttp.send();

}

/**
 * Submit the codes from the editable area to the iframe to show the result
 */
function submitCodes() {
    var codes = document.getElementById("testCode").value;
    //massage will sent to the same origin.
    var trustedOrigin = window.location.origin;
    document.getElementById("resultFrame").contentWindow.postMessage(codes, trustedOrigin);
}

/**
 * Load user selected html url and load it.
 */
function loadCurrentOption() {
    document.getElementById("sampleUrl").value = document.getElementById("urlOptions").value;
    loadSample();
}

window.addEventListener("load", loadWindow, true);
