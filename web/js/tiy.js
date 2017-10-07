/**
 * Global variables
 */
var tiyCodeMirror;

/**
 * When page initiates, do the following
 *  1) initiate codemirror (syntax highlight code editor)
 *  2) if there is a 'sample' GET parameter, load the html in the get parameter on priority.
 *  3) if there is no GET parameter, check if there is local storage.
 *      If yes, load the testing script from local storage.
 *      If no, call loadSample(), it loads the default sample.
 */
function loadWindow() {
    //initiate codemirror
    tiyCodeMirror = CodeMirror.fromTextArea(document.getElementById("testCode"), {
        lineNumbers: true,
        mode: "htmlmixed",
        styleActiveLine: true
    });

    var url = document.getElementById("sample").value;
    if (url == "null" && localStorage.codes) {
        tiyCodeMirror.setValue(localStorage.codes);
        submitCodes();
    } else {
        loadSample();
    }
}


/**
 * Load sample html codes to the code editor and run it
 */
function loadSample() {
    var url = document.getElementById("sample").value;
    if (!url || url == "null") {  //jsp returns a string "null" if the parameter is empty.
        url = "./basic/default_sample.html";
    }
    xmlhttp = new XMLHttpRequest();

    xmlhttp.onload = function () {
        if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
            tiyCodeMirror.setValue(xmlhttp.responseText);
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
    var codes = tiyCodeMirror.getValue();
    //save the codes in local storage for loading next time
    localStorage.codes = codes;

    /* Avoid the browser (Chrome)'s XSS auditor's check. If the response is the same as request with script codes, the
     * browser will block the response. Replace some keywords in the codes. Server side replace them back.
     */
    codes = codes.replace(/=/gi, "eastmanEqualSign");
    codes = codes.replace(/script/gi, "eastmanJsTag");

    document.getElementById("code").value = codes;
    document.getElementById("viewResult").submit();
}

/**
 * Load user selected html url and load it.
 */
function loadCurrentOption() {
    var currentOption = document.getElementById("urlOptions");
    if (currentOption.checkValidity()) {
        document.getElementById("sample").value = currentOption.value;
        loadSample();
    } else {
        currentOption.focus();
    }
}



window.addEventListener("load", loadWindow, true);
