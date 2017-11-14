using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.UI;
using System.Web.UI.WebControls;

namespace jQueryPlugins
{
    public partial class SmartWizard : System.Web.UI.Page
    {
        protected void Page_Load(object sender, EventArgs e)
        {
            if (IsPostBack)
            {
                PlaceHolderRegisterWizard.Visible = false;
                Response.Write("Thank you for registering [" + Request.Form["TextBoxUserid"] + "]");
            }
        }
    }
}