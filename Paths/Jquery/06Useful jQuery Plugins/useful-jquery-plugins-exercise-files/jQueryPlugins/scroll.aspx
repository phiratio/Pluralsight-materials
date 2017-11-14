<%@ Page Language="C#" AutoEventWireup="true" CodeBehind="scroll.aspx.cs" Inherits="jQueryPlugins.scroll" %>

<!DOCTYPE html>

<html xmlns="http://www.w3.org/1999/xhtml">
<head runat="server">
    <title>Scroll</title>

    <script src="/js/jquery-2.0.2.min.js"></script>
    <script src="/js/jquery.scrollTo.min.js"></script>
</head>
<body>
    <form id="form1" runat="server">
        <div>
            <asp:Button ID="Button1" runat="server" Text="Go to Section 2" OnClick="Button1_Click" />

            <h2 id="sect1">Section 1</h2>
            <asp:Repeater ID="Repeater1" runat="server">
                <ItemTemplate>
                    <%# Container.DataItem %><br />
                </ItemTemplate>
            </asp:Repeater>

            <h2 id="sect2">Section 2</h2>
            <asp:Repeater ID="Repeater2" runat="server">
                <ItemTemplate>
                    <%# Container.DataItem %><br />
                </ItemTemplate>
            </asp:Repeater>
        </div>
    </form>
</body>
</html>
