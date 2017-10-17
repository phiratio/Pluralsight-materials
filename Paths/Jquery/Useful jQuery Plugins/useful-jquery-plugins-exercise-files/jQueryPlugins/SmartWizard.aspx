<%@ Page Language="C#" AutoEventWireup="true" CodeBehind="SmartWizard.aspx.cs" Inherits="jQueryPlugins.SmartWizard" %>

<!DOCTYPE html>

<html xmlns="http://www.w3.org/1999/xhtml">
<head runat="server">
     <title>Wizard</title>

    <link rel="stylesheet" href="/css/smart_wizard.css" type="text/css" media="screen" />
    <style>
        .formField {float:right; width:150px}
    </style>

    <script src="/js/jquery-1.10.2.min.js"></script>
    <script src="/js/jquery.smartWizard-2.0.min.js"></script> 
    
    <script type="text/javascript">
        $(function () {
            $('#wizard').smartWizard();
        });
    </script>   
</head>
<body>
    <form id="form1" runat="server">
        <asp:PlaceHolder ID="PlaceHolderRegisterWizard" runat="server">
        <div id="wizard" class="swMain">
            <ul>
                <li><a href="#step-1">
                    <label class="stepNumber">1</label>
                    <span class="stepDesc">Userid<br />
                        <small>Userid and password</small>
                    </span>
                </a></li>
                <li><a href="#step-2">
                    <label class="stepNumber">2</label>
                    <span class="stepDesc">Name/Address<br />
                        <small>Register name and address</small>
                    </span>
                </a></li>
            </ul>
            <div id="step-1">
                <h2 class="StepTitle">Choose a unique userid and password</h2>
                <p></p>
                <div style="width:250px">
                    Userid: <asp:TextBox ID="TextBoxUserid" CssClass="formField" runat="server"></asp:TextBox><p></p>
                    Password: <asp:TextBox ID="TextBoxPassword" CssClass="formField" TextMode="Password" runat="server"></asp:TextBox><p></p>
                    Verify:<asp:TextBox ID="TextBoxPasswordVerify" CssClass="formField" TextMode="Password" runat="server"></asp:TextBox><p></p>
                </div>
            </div>
            <div id="step-2">
                <h2 class="StepTitle">Enter name and address</h2>
                <p></p>
                <div style="width:250px">
                    Name: <asp:TextBox ID="TextBoxName" CssClass="formField" runat="server"></asp:TextBox><p></p>
                    Address: <asp:TextBox ID="TextBoxAddress" CssClass="formField" runat="server"></asp:TextBox><p></p>
                    City:<asp:TextBox ID="TextBoxCity" CssClass="formField" runat="server"></asp:TextBox><p></p>
                    State:<asp:TextBox ID="TextBoxState" CssClass="formField" runat="server"></asp:TextBox><p></p>
                    Zip:<asp:TextBox ID="TextBoxZip" CssClass="formField" runat="server"></asp:TextBox><p></p>
                </div>
            </div>
        </div>
        </asp:PlaceHolder>
    </form>
</body>
</html>
