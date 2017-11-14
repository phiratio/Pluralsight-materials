/// <reference path="jquery-1.6.2.js" />
/// <reference path="jquery-ui-1.8.16.custom.js" />

$(function () {

    $("#dialog").dialog(
        {
            autoOpen: false,
            modal: true,
            resizable: false,
            draggable: false,
            position: "top",
            buttons: {
                "Yes, I do!": function () {
                    $("#dialog").dialog("close");
                    $("#dialogDecision").text("Yes you did!!");
                },
                "No": function () { }
            }
        }
     );

    $("#openDialog").click(function () {
        $("#dialog").dialog("open");
    });

    //$("#progress").progressbar({ value: 60 });

    $("#progress").progressbar({ value: 100 });

    var value = 100;

    // countdown();

    function countdown() {
        value--;
        $("#progress").progressbar("option", "value", value);
        $("#countdown").text(value);

        if (value > 0) {
            setTimeout(countdown, 100);
        }
        else {
            $("#countdown").text("completed");
            $("#progress").progressbar("disable");
        }
    }

    $("#slider").slider({ min: 0, max: 100, value: 100, slide: function (event, ui) {
        $("#slider").prev().css({ opacity: ui.value / 100 });
    }
    });

    $("#tabs").tabs();

    $("#accordian").accordion({ autoHeight: false, collapsible: true,
        change: function (event, ui) {
            console.log(event);
            console.log(ui);
        }
    });

    $("#accordian").accordion("activate", false);

    var classes = [
	    "C#",
	    "Entity Framework",
	    "LINQ",
	    "ASP.NET MVC",
	    "jQuery UI",
	    "CSS",
	    "Ruby",
	    "jQuery",
	    "JavaScript",
	    "Test driven development",
	    "Design patterns"
    ];

    $("#search").autocomplete({
        source: "autocompletejson.ashx",
        minLength: 2,
        delay: 1500
    });

    $("#buttons").children()
                 .button({ icons: { primary: "ui-icon-search", secondary: "ui-icon-wrench"} })
                 .click(function () {
                     alert($(this).value);
                 });

    $("#radios").buttonset();
    $("#checks").buttonset();

    $("#dateselection").datepicker({
        showAnim: "bounce",
        numberOfMonths: 2,
        showWeek: true,
        changeMonth: true,
        changeYear: true,
        showButtonPanel: true,
        minDate: new Date(2008, 1 - 1, 1),
        maxDate: new Date(2012, 12 - 1, 31)
    });
    $("#dateselection").datepicker("setDate", new Date(2011, 6 - 1, 11));

});