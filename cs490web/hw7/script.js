// Create empty object array
var classes = [
    {
        "studentName":"Bob",
        "courseName":"cs490",
        "imgFilename":"http://placehold.it/140x140"
    },
    {
        "studentName":"Linda",
        "courseName":"cs490",
        "imgFilename":"http://placehold.it/140x140"
    }
]

$(document).ready(function () {
	preloadTable();
});

// Used to put placeholders then empty object array
function preloadTable() {
    for (n of classes) {
        if (n.courseName == "cs490") {
        $("#cs490List").empty();
        } else if (n.courseName == "ncs490") {
        $("#ncs490List").empty();
        }
    }

    makeList();
}

function getDataApi() {
$.get("http://web.cs.sunyit.edu/~lampej/web/api/Student/getAll")
	.done(function (data) {
		$("#results").empty();
		$("#results").append(JSON.stringify(data, null, '\t'));
	})
	.fail(function (jqXHR, textStatus, errorThrown) {
		console.log("Error calling Student/getAll: " + errorThrown);
	});
}

// Fill the object array with new information
function addClass(sName, cName) {
    var newCourse = {};

    newCourse.studentName = sName;
    newCourse.courseName = cName;
    classes.push(newCourse);
}

// Disable Button and add the cog spinner
function disableButton() {
    $("#add").attr("disabled", "disabled"); 
    $("#loading").append("<i class='fa fa-cog fa-spin' id='loadCog'></i>");
}

function loadTable() {
    // Save the input so they cannot edit it while it is "loading"
    var sName = $("#student").val();
    var cName = $("#class").val();

    if (sName.length != 0) {
        // Remove error highlight class if there
        $("#studentName").removeClass("has-error")
        // disable the button first and add the spinner
        disableButton();
        // Set the time out for 3 sec
        setTimeout(function () {
            addClass(sName, cName);
            
            // Get rid of only a certain class list
            for (n of classes) {
                if (n.courseName == "cs490") {
                $("#cs490List").empty();
                } else if (n.courseName == "ncs490") {
                $("#ncs490List").empty();
                }
            }

            makeList();
            // Renable button
            $("#add").removeAttr("disabled");
            // Remove the cog spinner
            $("#loadCog").remove();
        }, 3000);
    } else {
        $("#studentName").addClass("has-error");
    }
}

function makeList() {
    for (i=0; i < classes.length; i++) {
        //var list = $("<button type='button' class='list-group-item' data-toggle='modal' data-target='#currentStudent'></button>");
        // Need to add data-target='#myModal'

        var list = $('<button/>').attr({
            type: "button",
            class: "list-group-item",
            "data-toggle": "modal",
            "data-target": "#currentStudent",
            onclick: 'makeModal("' + classes[i].studentName + '",' + i + ')'
        });
        list.append(classes[i].studentName);

        if (classes[i].courseName == "cs490") {
            $("#cs490List").append(list);
        } else if (classes[i].courseName == "ncs490") {
            $("#ncs490List").append(list);
        }
    }
}

// Make the modal by taking in the name and index in the classes object array
// For extra credit
function makeModal(name, i) {
    // Clear it out first
    $(".hiddenModal").empty();

    // Using bootstrap modal
    // Made variables for each tag just to practice and keep tings organized
    var fButton = $('<button/>').attr({
        type: "button",
        class: "btn btn-default",
        "data-dismiss": "modal"
    });

    var footer = $('<div/>').attr({class: "modal-footer"}); 

    var img = $('<img/>').attr({
        src: classes[i].imgFilename,
        alt: classes[i].studentName + " image",
        class: "img-thumbnail"
    });

    var body = $('<div/>').attr({class: "modal-body"}); 

    var title = $('<h4/>').attr({
        class: "modal-title",
        id: "myModalLabel",
    });

    var hButton = $("<button type='button' class='close' data-dismiss='modal' aria-label='Close'><span aria-hidden='true'>&times;</span></button>");

    var header = $('<div/>').attr({class: "modal-header"}); 

    var content = $('<div/>').attr({class: "modal-content"});

    var dialog = $('<div/>').attr({
        class: "modal-dialog",
        role: "docuemnt"
    });

    var modal = $('<div/>').attr({
        class: "modal fade",
        id: "currentStudent",
        tabindex: "-1",
        role: "dialog",
        "aria-labelledby": "myModalLabel"
    });

    // Append each tag into each other making sure they are in order as well
    fButton.append("Close");
    footer.append(fButton);
    body.append(img);
    title.append(name);
    header.append(hButton);
    header.append(title);
    content.append(header);
    content.append(body);
    content.append(footer);
    dialog.append(content);
    modal.append(dialog);

    $(".hiddenModal").append(modal);
    
}
