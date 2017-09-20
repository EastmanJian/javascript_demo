/**
 * Load sample html codes to the textarea for edit and test
 */
function loadSample() {
    var url = document.getElementById("sample").value;
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

    /* Avoid the browser (Chrome)'s XSS auditor's check. If the response is the same as request with script codes, the
     * browser will block the response. Replace some keywords in the codes. Server side replace them back.
     */
    codes = codes.replace(/=/gi, "eastmanEqualSign");
    codes = codes.replace(/script/gi, "eastmanJsTag");

    document.getElementById("code").value = codes;
    document.getElementById("ctrlForm").submit();
}

