<%@ page import="java.util.Enumeration" %>
<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<%
    String code = request.getParameter("code");

    /* Avoid the browser (Chrome)'s XSS auditor's check. If the response is the same as request with script codes, the
     * browser will block the response. Replace some keywords when the codes are submitted. Server side replace them back.
     */
    String codeOrginal = code.replaceAll("eastmanEqualSign", "=").replaceAll("eastmanJsTag", "script");

    out.print(codeOrginal);
%>