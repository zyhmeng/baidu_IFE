
<!--#INCLUDE FILE="/AppEngine/CoreExt/ThingsSrv/base.tjs"-->
<!--#INCLUDE FILE="/AppEngine/CoreExt/ThingsSrv/base_extend.tjs"-->
    <%@ LANGUAGE=JavaScript %>
    <%
    Response.clear();

Response.Write(function () {
    var result={
        "success":false,
        "url":""
    };

    result.success=true;

    result.url = "http://www.baidu.com";

    return TSS.JSON.encode(result);

}());

Response.ContentType = "application/json";
%>