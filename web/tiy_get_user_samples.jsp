<%@ page import="ej.tool.tiy.SampleFiles" %>
<%@ page import="java.io.IOException" %>
<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<%
    SampleFiles samplefiles = new SampleFiles("/srv/www/htdocs/userfiles");
    out.print(samplefiles.getFileList());
%>
