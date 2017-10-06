/**
 * Prevent jQuery Mobile auto initialize other page elements
 */
$(document).on( "mobileinit", function() {
    //apply overrides here
    console.log("apply mobileinit overrides");
    $.mobile.autoInitializePage = false;
});

/**
 * load demo and prototypes list data when page is loaded.
 */
$(document).ready(function() {
    $.getJSON("../json/demo_list.json", renderDemoList);
});


/**
 * callback function after demo data is loaded, dynamically generate the content, render the UI.
 */
function renderDemoList(result) {
    //add each prototype section
    for (var i = 0; i < result.prototypes.length; i++) {
        var html = "<div><h3>" + result.prototypes[i].tech + "</h3><div><table id='tech" + i
            + "PrototypeList' class='display compact' cellspacing='0' width='100%'></table></div></div>";
        $("#prototypes").append(html);
    }

    //add an overall section with all prototypes data
    var html = "<div><h3>All Prototypes</h3><div><table id='allPrototypes' "
        + "class='display compact' cellspacing='0' width='100%'></table></div></div>";
    $("#prototypes").append(html);

    //construct the all prototype data array
    var allPrototypeList = null;
    var tempList;
    for (var i = 0; i < result.prototypes.length; i++) {
        tempList = result.prototypes[i].list;
        for (var j = 0; j < tempList.length; j++) {
            tempList[j].unshift(result.prototypes[i].tech);
        }
        if (allPrototypeList == null) {
            allPrototypeList = tempList;
        } else {
            allPrototypeList = allPrototypeList.concat(tempList);
        }
    }

    //render accordion
    $("#prototypes").accordion({
        header: "> div > h3",
        heightStyle: "content",
        collapsible: true,
        //save the activated panel to local storage
        activate: function (event, ui) {
            console.log("Panel moves to " + $(this).accordion("option", "active") + ". Saved to localStorage.");
            localStorage.activatedPanel = $(this).accordion("option", "active");
        },
        //load the activated panel last time when it's saved
        create:  function (event, ui) {
            if (localStorage.activatedPanel) {
                console.log("The active panel last time is " + localStorage.activatedPanel + ".");
                $(this).accordion("option", "active", Number(localStorage.activatedPanel));
            }
        }
    }).sortable({ //make accordion sortable with drag and drop
        axis: "y",
        handle: "h3",
        stop: function (event, ui) {
            // IE doesn't register the blur when sorting
            // so trigger focusout handlers to remove .ui-state-focus
            ui.item.children("h3").triggerHandler("focusout");

            // Refresh accordion to handle new order
            $(this).accordion("refresh");
        }
    });

    //render datatables for each prototype section
    for (var i = 0; i < result.prototypes.length; i++) {
        $('#tech' + i + 'PrototypeList').DataTable({
            data: result.prototypes[i].list,
            columns: [
                {title: "Category",  "orderable": false},
                {title: "Example"}
            ],
            initComplete: function () { //generate column filter
                var column = this.api().column(0);

                var select = $('<select class="columnSelect"><option value="All Categories">All Categories</option></select>')
                    .appendTo($(column.header()).empty())
                    .on('change', function () {
                        var val = $.fn.dataTable.util.escapeRegex($(this).val());
                        column
                            .search(val == "All Categories" ? '' : '^' + val + '$', true, false)
                            .draw();
                    });

                column.data().unique().sort().each(function (d, j) {
                    select.append('<option value="' + d + '">' + d + '</option>')
                });
            }
        });
    }

    //render datatables for all-prototype section
    $('#allPrototypes').DataTable({
        data: allPrototypeList,
        columns: [
            {title: "Technology", "orderable": false},
            {title: "Category", "orderable": false},
            {title: "Example"}
        ],
        initComplete: function () { //generate column filters
            //Technology column filter
            var column0 = this.api().column(0);
            var select = $('<select class="columnSelect"><option value="All Technologies">All Technologies</option></select>')
                .appendTo($(column0.header()).empty())
                .on('change', function () {
                    var val = $.fn.dataTable.util.escapeRegex($(this).val());
                    column0
                        .search(val == "All Technologies" ? '' : '^' + val + '$', true, false)
                        .draw();
                });
            column0.data().unique().sort().each(function (d, j) {
                select.append('<option value="' + d + '">' + d + '</option>')
            });

            //Category column filter
            var column1 = this.api().column(1);
            var select = $('<select class="columnSelect"><option value="All Categories">All Categories</option></select>')
                .appendTo($(column1.header()).empty())
                .on('change', function () {
                    var val = $.fn.dataTable.util.escapeRegex($(this).val());
                    column1
                        .search(val == "All Categories" ? '' : '^' + val + '$', true, false)
                        .draw();
                });
            column1.data().unique().sort().each(function (d, j) {
                select.append('<option value="' + d + '">' + d + '</option>')
            });
        }
    });
}

