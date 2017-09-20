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
    <script>
        window.addEventListener("load", loadSample, true);
    </script>
</head>
<body>
<div id="code_result">
    <textarea id="testCode" wrap="logical">
    </textarea>
    <iframe name="testResult" src="">
    </iframe>
</div>
<div id="ctrl">
    <form id="ctrlForm" target="testResult" method="post" action="tiy_result.jsp">
        <input type="hidden" id="code" name="code">
        <input type="button" name="codeToResult" value="Code --> Result" onclick="submitCodes();">
    </form>
    <input type="hidden" id="sample" name="sample" value="<%=sample%>">
    <form id="test" target="_self" method="get" action="tiy.jsp">
        <input type="hidden" name="sample" value="./basic/using_object.html">
        <input type="submit" value="Load Sample">
    </form>
</div>
</body>
</html>