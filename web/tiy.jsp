<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<%--
A HTML (CSS, JavaScript) code tester (runner) on web page.
User can edit the HTML file in the textarea, click the "Code >>> Result" button to view the result on the result page.
User can select or type a HTML url in the sample box, click "Load Sample" button to load the target HTML and see the result.
This JSP accept a parameter "sample", whose value should be an url of html file.
e.g. https://eastmanjian.cn/js_demo/tiy.jsp?sample=https%3A%2F%2Feastmanjian.github.io%2Fjavascript_demo%2Fweb%2Fbasic%2Fdefault_sample.html
--%>
<%
    String sample = request.getParameter("sample");
%>
<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN"
"http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml" xml:lang="zh-cmn-Hans-CN" lang="zh-cmn-Hans-CN">
<head>
    <title>Try It Yourself</title>
    <link rel="shortcut icon" href="/blog/favicon.ico?" type="image/x-icon">
    <meta http-equiv="Content-Type" content="text/html; charset=utf-8"/>
    <script src="https://codemirror.net/lib/codemirror.js"></script>
    <link rel="stylesheet" href="css/codemirror.css">
    <script src="https://codemirror.net/mode/xml/xml.js"></script>
    <script src="https://codemirror.net/mode/javascript/javascript.js"></script>
    <script src="https://codemirror.net/mode/css/css.js"></script>
    <script src="https://codemirror.net/mode/htmlmixed/htmlmixed.js"></script>
    <script src="https://codemirror.net/addon/selection/active-line.js"></script>
    <link rel="stylesheet" type="text/css" href="./css/tiy.css">
    <script src="./js/tiy.js"></script>
</head>
<body class="main">
<header id="ctrl">
    <input type="hidden" id="sample" name="sample" value="<%=sample%>">
    <form id="chooseSample" target="_self" method="get" action="tiy.jsp">
        <input id="urlOptions" list="url_list" name="sample" required="required" placeholder="Choose a sample or input a URL" />
        <datalist id="url_list">
            <option label="JS - Default Sample" value="basic/default_sample.html"/>
            <option label="JS - TIY template" value="js_tiy_template.html"/>
            <option label="JS - Data Type - Object" value="object/using_object.html"/>
            <option label="JS - Browser Console Output" value="basic/console_output.html"/>
            <option label="JS - document write" value="basic/document_write.html"/>
            <option label="JS - document overwrite" value="basic/document_overwrite.html"/>
            <option label="JS - document overwrite" value="bom/clock.html"/>
        </datalist>
        <input id="loadOption" type="button" value="Load Sample" onclick="loadCurrentOption();"/>
    </form>
    <form id="viewResult" target="testResult" method="post" action="tiy_result.jsp">
        <input type="hidden" id="code" name="code">
        <input type="button" name="codeToResult" value="Code >>>> Browser Result" onclick="submitCodes();">
    </form>
    <a class="ej_link" href="https://eastmanjian.cn">EJ</a>
    <div class="banner">
        <p id="subject">Try It Yourself</p>
        <p id="description">HTML (CSS, Javascript) web page runner.</p>
    </div>
</header>
<div id="code_result">
    <div id="codeWrapper">
        <textarea id="testCode" wrap="logical">
        </textarea>
    </div>
    <iframe name="testResult" src="">
    </iframe>
</div>
</body>
</html>