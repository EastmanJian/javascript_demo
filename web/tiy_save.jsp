<%@ page import="ej.tool.tiy.SampleFiles" %>
<%@ page import="java.io.IOException" %>
<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<%
    String fileName = request.getParameter("fileName");
    String codes = request.getParameter("codes");
    System.out.println("fileName = " + fileName);

    SampleFiles samplefiles = new SampleFiles("/srv/www/htdocs/userfiles");
    String respText = "{\"result\":\"Success\"}";
    try {
        samplefiles.saveSample(fileName, codes);
    } catch (IOException e) {
        respText = "{\"result\":\"" + e.getMessage() + "\"}";
    }
    out.print(respText);
%>
