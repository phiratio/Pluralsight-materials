using Microsoft.Web.Optimization;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Security;
using System.Web.SessionState;
using System.Web.UI;

namespace jQueryPlugins
{
    public class Global : System.Web.HttpApplication
    {
        protected void Application_Start(object sender, EventArgs e)
        {
            BundleTable.Bundles.EnableDefaultBundles();

            Bundle scriptBundle = new Bundle("~/myBundledScripts", typeof(JsMinify));
            scriptBundle.AddFile("~/js/jquery-1.10.2.js");
            scriptBundle.AddFile("~/js/jquery.maxlength.js");
            scriptBundle.AddFile("~/js/jquery.ipicture.js");

            BundleTable.Bundles.Add(scriptBundle);


            ScriptManager.ScriptResourceMapping.AddDefinition("jquery", new ScriptResourceDefinition
            {
                Path = "~/js/jquery-1.10.2.min.js",
            });
        }

        protected void Session_Start(object sender, EventArgs e)
        {

        }

        protected void Application_BeginRequest(object sender, EventArgs e)
        {

        }

        protected void Application_AuthenticateRequest(object sender, EventArgs e)
        {

        }

        protected void Application_Error(object sender, EventArgs e)
        {

        }

        protected void Session_End(object sender, EventArgs e)
        {

        }

        protected void Application_End(object sender, EventArgs e)
        {

        }
    }
}