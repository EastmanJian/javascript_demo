<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<%
    String sample = request.getParameter("sample");
%>
<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN"
"http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml" xml:lang="zh-cmn-Hans-CN" lang="zh-cmn-Hans-CN">
<head>
    <title>Test It Yourself</title>
    <meta http-equiv="Content-Type" content="text/html; charset=utf-8"/>
    <link rel="stylesheet" type="text/css" href="./css/tiy.css">
    <script src="./js/tiy.js"></script>
</head>
<body class="main">
<div id="code_result">
    <textarea id="testCode" wrap="logical">
    </textarea>
    <iframe name="testResult" src="">
    </iframe>
</div>
<footer id="ctrl">
    <input type="hidden" id="sample" name="sample" value="<%=sample%>">
    <form id="chooseSample" target="_self" method="get" action="tiy.jsp">
        <input list="url_list" name="sample" required="required" placeholder="Choose a sample"/>
        <datalist id="url_list">
            <option label="JS - Data Type - Object"     value="basic/using_object.html" />
            <option label="JS - Browser Console Output" value="basic/console_output.html" />
            <option label="JS - document write"         value="basic/document_write.html" />
            <option label="JS - document overwrite"     value="basic/document_overwrite.html" />
        </datalist>
        <input type="submit" value="Load Sample">
    </form>
    <form id="viewResult" target="testResult" method="post" action="tiy_result.jsp">
        <input type="hidden" id="code" name="code">
        <input type="button" name="codeToResult" value="Code >>>> Browser Result" onclick="submitCodes();">
    </form>
    <a class="animated_link" href="https://eastmanjian.cn">EJ</a>
</footer>
</body>
</html>