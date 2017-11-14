<%@ Page Language="C#" AutoEventWireup="true" CodeBehind="unobtrusive.aspx.cs" Inherits="ASPNET45.unobtrusive" %>

<!DOCTYPE html>

<html xmlns="http://www.w3.org/1999/xhtml">
<head runat="server">
    <title>Unobtrusive Validation</title>

    <%--<script src="/js/jquery-1.10.2.min.js"></script>--%>
</head>
<body>
    <form id="form1" runat="server">
    <div>
        Zip Code:<asp:TextBox ID="TextBox1" runat="server"></asp:TextBox>
        <asp:RequiredFieldValidator ID="RequiredFieldValidator1" ControlToValidate="TextBox1" runat="server" Display="Dynamic" ErrorMessage="Required"></asp:RequiredFieldValidator>
        <asp:RegularExpressionValidator ID="RegularExpressionValidator1" ControlToValidate="TextBox1" ValidationExpression="^\d{5}" Display="Dynamic" runat="server" ErrorMessage="Invalid, must be 5 digits"></asp:RegularExpressionValidator>
        <p />
        <asp:Button ID="Button1" runat="server" Text="Button" />
    </div>
    </form>
</body>
</html>
