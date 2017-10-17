<%@ Page Language="C#" AutoEventWireup="true" CodeBehind="bundlingMinification.aspx.cs" Inherits="jQueryPlugins.bundlingMinification" %>

<!DOCTYPE html>

<html xmlns="http://www.w3.org/1999/xhtml">
<head runat="server">
    <title></title>
    <% #if DEBUG %>
        <script src="/js/jquery-1.10.2.js"></script>
        <script src="/js/jquery.maxlength.js"></script>
        <script src="/js/jquery.ipicture.js"></script>
    <% #else %>
<%--        <script src="/myBundledScripts"></script>--%>
    <script src="<%= Microsoft.Web.Optimization.BundleTable.Bundles.ResolveBundleUrl("~/myBundledScripts") %>"></script>
    <% #endif %>    
</head>
<body>
    <form id="form1" runat="server">
    <div>
        Bundling
    </div>
    </form>
</body>
</html>
