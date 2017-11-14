<%@ WebHandler Language="C#" Class="Autocompletejson" %>

using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Script.Serialization;

public class Autocompletejson : IHttpHandler {
    
    public void ProcessRequest (HttpContext context) {
        context.Response.ContentType = "application/json";

        var term = context.Request["term"] ?? "";
        var matches = from c in _classes
                      where c.Value.ToLower().StartsWith(term.ToLower())
                      select new
                                 {
                                    value = c.Key, 
                                    label = c.Value
                                 };

        var serializer = new JavaScriptSerializer();
        context.Response.Write(serializer.Serialize(matches));
    }
 
    public bool IsReusable {
        get {
            return false;
        }
    }

    private IDictionary<int, string> _classes = new Dictionary<int, string> {
                                    {  0, "Remote" },
                                    {  1, "C#" },
                                    {  2, "Entity Framework" },
                                    {  3, "LINQ" },
                                    {  4, "ASP.NET MVC" },
                                    {  5, "jQuery UI" },
                                    {  6, "CSS" },
                                    {  7, "Ruby" },
                                    {  8, "jQuery" },
                                    {  9, "JavaScript" },
                                    { 10, "Test driven development" },
                                    { 11, "Design patterns" } 
                                };
}