/**
 * Global variables
 */
var tiyCodeMirror;

/**
 * When page initiates, do the following
 *  1) initiate codemirror (syntax highlight code editor)
 *  2) load sample list
 *  3) if there is a 'sample' GET parameter, load the html in the get parameter on priority.
 *  4) if there is no GET parameter, check if there is local storage.
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

    //load sample from demo list
    loadJSON("https://eastmanjian.cn/blog/json/demo_list.json", updateDemoSamples);

    //load target html codes
    var url = document.getElementById("sample").value;
    if (url == "null" && localStorage.codes) {
        tiyCodeMirror.setValue(localStorage.codes);
        submitCodes();
    } else {
        loadSample();
    }
}

/**
 * Callback function. Once the demo list json data arrives, append them into the option list dropdown box
 * @param data - the demolist json data object
 */
function updateDemoSamples(data) {
    var option;
    var demoItem;
    var urlList = document.getElementById("url_list");
    //loop each prototype demo list
    for (var p=0; p<data.prototypes.length; p++) {
        for (var i=0; i<data.prototypes[p].list.length; i++) {
            demoItem = data.prototypes[p].list[i]
            if (demoItem[3] == "TIY") {
                //add to load sample dropdown box if it uses TIY function
                option = document.createElement("option");
                option.setAttribute("label", data.prototypes[p].tech + " - " + demoItem[0] + " - " + demoItem[1]);
                option.setAttribute("value", demoItem[2].replace("https://eastmanjian.cn/js_demo/", ""));
                urlList.appendChild(option);
            }
        }
    }
}

/**
 * load json data with AJAX
 * @param url - the json url
 * @param callback - callback function after json is loaded, accept the json object as parameter
 */
function loadJSON(url, callback) {
    var xmlhttp = new XMLHttpRequest();
    xmlhttp.onload = function () {
        if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
            var resp = JSON.parse(xmlhttp.responseText);
            callback(resp);
        }
    }
    xmlhttp.open("GET", url, true);
    xmlhttp.send();
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
