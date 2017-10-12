<%@ page import="ej.tool.tiy.SampleFiles" %>
<%@ page import="java.io.IOException" %>
<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<%
    String fileName = request.getParameter("fileName");
    System.out.println("recycle file: " + fileName);
    SampleFiles samplefiles = new SampleFiles("/srv/www/htdocs/userfiles", "/srv/www/htdocs/userfiles/recyclebin");
    String respText = "{\"result\":\"Success\"}";
    try {
        samplefiles.recycleFile(fileName);
    } catch (IOException e) {
        respText = "{\"result\":\"" + e.getClass().getName() + ": " + e.getMessage() + "\"}";
    }
    out.print(respText);
%>
