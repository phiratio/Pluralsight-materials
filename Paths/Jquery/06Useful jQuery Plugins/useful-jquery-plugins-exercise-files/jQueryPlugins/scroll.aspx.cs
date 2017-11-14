using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.UI;
using System.Web.UI.WebControls;

namespace jQueryPlugins
{
    public partial class scroll : System.Web.UI.Page
    {
        protected void Page_Load(object sender, EventArgs e)
        {
            List<int> oList = new List<int>();
            for (int i = 1; i < 50; i++)
            {
                oList.Add(i);
            }

            Repeater1.DataSource = Repeater2.DataSource = oList;
            Repeater1.DataBind();
            Repeater2.DataBind();
        }

        protected void Button1_Click(object sender, EventArgs e)
        {
            System.Threading.Thread.Sleep(3000);    //Simulate server think time

            ClientScript.RegisterClientScriptBlock(this.GetType(), "A", "$(function () { $.scrollTo($('#sect2')); });", true);
        }
    }
}