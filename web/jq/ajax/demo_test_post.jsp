<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<%
    String fname = request.getParameter("name");
    String city = request.getParameter("city");
    out.println("Dear " + fname + ". ");
    out.println("Hope you live well in " + city + ".");
%>