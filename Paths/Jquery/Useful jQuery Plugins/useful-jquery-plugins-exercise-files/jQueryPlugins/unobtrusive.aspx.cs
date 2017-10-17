using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.UI;
using System.Web.UI.WebControls;

namespace ASPNET45
{
    public partial class unobtrusive : System.Web.UI.Page
    {
        protected void Page_Load(object sender, EventArgs e)
        {
            //Can set unobtrusive for a particular page
            //Page.UnobtrusiveValidationMode = UnobtrusiveValidationMode.WebForms;
        }
    }
}