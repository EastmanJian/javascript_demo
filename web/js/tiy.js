/**
 * Global variables
 */
var tiyCodeMirror;

/**
 * When page initiates, do the following
 *  1) initiate codemirror (syntax highlight code editor)
 *  2) load demo sample list and user saved samples
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
    ajaxLoadJSON("https://eastmanjian.cn/blog/json/demo_list.json").then(updateDemoSamples, ajaxReqErr);


    //load user saved samples
    ajaxLoadJSON("tiy_get_user_samples.jsp").then(updateUserSamples, ajaxReqErr);

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
 * @param data - the demolist json data object. Passed by the promise resolve argument.
 */
function updateDemoSamples(data) {
    var option;
    var demoItem;
    var urlList = document.getElementById("url_list");
    //loop each prototype demo list
    for (var p = 0; p < data.prototypes.length; p++) {
        for (var i = 0; i < data.prototypes[p].list.length; i++) {
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
 * error handler for ajax request.
 * @param reason - the err msg returned from the promise rejection.
 */
function ajaxReqErr(reason) {
    console.log(reason);
}

/**
 * Callback function. Once the user saved sample list json data arrives, append them on the top of the option list dropdown box
 * @param data - the user saved sample filenames json data object
 */
function updateUserSamples(data) {
    var option;
    var urlList = document.getElementById("url_list");
    var filename;
    //loop each prototype demo list
    for (var i = 0; i < data.length; i++) {
        filename = data[i]
        option = document.createElement("option");
        option.setAttribute("label", "User Sample - " + filename);
        option.setAttribute("value", "../userfiles/" + filename);
        urlList.appendChild(option);
    }
}


/**
 * wrapper function of loading json data with AJAX using promise
 * @param url - the json url
 * @returns {Promise}
 */
function ajaxLoadJSON(url) {
    return new Promise((resolve, reject) => {
        var xhr = new XMLHttpRequest();
        xhr.onload = () => {
            if (xhr.status == 200) {
                let resp;
                try {
                    resp = JSON.parse(xhr.responseText);
                } catch (err) {
                    reject("Parse response JSON Error: " + err);
                }
                resolve(resp);
            } else {
                reject("Server Error: " + xhr.status);
            }
        }
        xhr.onerror = () => {
            reject("Cannot Make AJAX Request");
        }

        xhr.open("GET", url, true);
        xhr.send();
    });
}

/**
 * Load sample html codes to the code editor using AJAX, and run it.
 * The url is sourced from the hidden element "sample".
 */
function loadSample() {
    var url = document.getElementById("sample").value;
    if (!url || url == "null") {  //jsp returns a string "null" if the parameter is empty.
        url = "./basic/default_sample.html";
    }
    var xmlhttp = new XMLHttpRequest();

    xmlhttp.onload = () => {
        if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
            tiyCodeMirror.setValue(xmlhttp.responseText);
            submitCodes();
        }
    }

    xmlhttp.onerror = () => {
        alert(xmlhttp.readyState + " - " + xmlhttp.errorMessage + " - " + xmlhttp.statusText);
    }

    xmlhttp.onloadend = () => {
        if (xmlhttp.status == 404)
            alert("Sample not found!");
    }

    xmlhttp.open("GET", url, true);
    xmlhttp.send();

}

/**
 * file name format validator
 * @param inputField - the file name input field.
 */
function validateFileNameFormat(inputField) {
    if (inputField.checkValidity() || inputField.value == "") {
        inputField.className = "";
    } else {
        inputField.className = "nameErr";
    }
}

/**
 * onclick event handler for "Save Sample" button.
 * Save the current codes as a sample at server side.
 */
function saveSample() {
    var fileNameField = document.getElementById("fileNameInput");
    if (fileNameField.checkValidity() == false) {
        fileNameField.focus();
        return false;
    }

    document.getElementById("saveBtn").disabled = true;
    setTimeout(function () { //enable the btn after 2 seconds if no xhr response.
        document.getElementById("saveBtn").disabled = false;
    }, 2000);

    //submit the filename and codes to server
    var fileName = fileNameField.value;
    var codes = tiyCodeMirror.getValue();
    var params = "fileName=" + encodeURIComponent(fileName) + "&" + "codes=" + encodeURIComponent(codes);
    ajaxPostReq("tiy_save.jsp", params).then(saveSampleResult, ajaxReqErr);
}

/**
 * Callback function of save sample request.
 * @param resp - the server response data after save the sample, returned by the promise resolve argument
 */
function saveSampleResult(resp) {
    console.log("saveResult=" + resp.result);
    if (resp.result == "Success") {
        option = document.createElement("option");
        option.setAttribute("label", "User Sample - " + resp.fileName + ".html");
        option.setAttribute("value", "../userfiles/" + resp.fileName + ".html");
        document.getElementById("url_list").appendChild(option);
        document.getElementById("fileNameInput").className = "saveOK";
    } else {
        alert(resp.result);
    }
    document.getElementById("saveBtn").disabled = false;
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
 * Button event handler, load user selected html url and load it.
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

/**
 * Wrapper function of posting AJAX request using promise.
 * The response from server is required in JSON format
 * @param url - the url to post
 * @param params - the params to post using encodedURI format
 * @returns {Promise}
 */
function ajaxPostReq(url, params) {
    return new Promise((resolve, reject) => {
        var xhr = new XMLHttpRequest();
        xhr.onload = () => {
            if (xhr.status == 200) {
                let resp;
                try {
                    resp = JSON.parse(xhr.responseText);
                } catch (err) {
                    reject("Parse response JSON Error: " + err);
                }
                resolve(resp);
            } else {
                reject("Server Error: " + xhr.status);
            }
        }
        xhr.onerror = () => {
            reject("Cannot Make AJAX Request");
        }
        xhr.open("POST", url, true);
        xhr.setRequestHeader("Content-type", "application/x-www-form-urlencoded;charset=UTF-8");
        xhr.send(params);
    });
}


/**
 * Button event handler, delete user selected file.
 * User can only delete the user saved sample only.
 */
function deleteCurrentOption() {
    let currentOption = document.getElementById("urlOptions");
    if (currentOption.checkValidity() == false) {
        currentOption.focus();
        return false;
    }

    var filename = currentOption.value;
    if (filename.search("/userfiles/") == -1) {
        alert("This is not a user saved sample, cannot be deleted.");
        return false;
    }
    var fileToRecycle = filename.slice(filename.lastIndexOf("/") + 1, filename.lastIndexOf("."));
    var areYouSure = confirm("Delete " + fileToRecycle + ".html.\n" + "Are you Sure?");
    if (areYouSure == false) {
        return false;
    }

    document.getElementById("deleteBtn").disabled = true;
    setTimeout(function () { //enable the btn after 2 seconds if no xhr response.
        document.getElementById("deleteBtn").disabled = false;
    }, 2000);

    var params = "fileName=" + encodeURIComponent(fileToRecycle);
    console.log("delete user sample: " + fileToRecycle);
    ajaxPostReq("tiy_recycle.jsp", params).then(deleteSampleResult, ajaxReqErr);
}

/**
 * Callback function of delete sample request.
 * @param resp - the server response data after delete the sample
 */
function deleteSampleResult(resp) {
    let currentOption = document.getElementById("urlOptions");
    console.log("deleteResult=" + resp.result);
    if (resp.result != "Success") {
        alert(resp.result + "\nFileName: " + resp.fileName);
        return false;
    }
    //remove currentOption from the dropdown
    document.querySelector("option[value='" + currentOption.value + "']").remove();
    currentOption.value = "";
    document.getElementById("deleteBtn").disabled = false;
}


window.addEventListener("load", loadWindow, true);

