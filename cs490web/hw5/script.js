// Create empty object array
var classes = []

$(document).ready(function () {
	preloadTable();
});

// Used to put placeholders then empty object array
function preloadTable() {
	var list = $("<li class='list-group-item'></li>");
	list.append("No Students");

	$("#cs490List").append(list);

	list = $("<li class='list-group-item'></li>");
	list.append("No Students");

	$("#ncs490List").append(list);
}

// Fill the object array with new information
function addClass() {
    var sName = $("#student").val();
    var cName = $("#class").val();
    var newCourse = {};

    newCourse.studentName = sName;
    newCourse.courseName = cName;
    classes.push(newCourse);
}

// On click
function loadTable() {
    addClass();
    
    // Get rid of only a certain class list
    for (n of classes) {
        if (n.courseName == "cs490") {
	    $("#cs490List").empty();
        } else if (n.courseName == "ncs490") {
	    $("#ncs490List").empty();
        }
    }

    // Fill class list
	for (n of classes) {
        var list = $("<li class='list-group-item'></li>");
        list.append(n.studentName);

        if (n.courseName == "cs490") {
            $("#cs490List").append(list);
        } else if (n.courseName == "ncs490") {
            $("#ncs490List").append(list);
        }
	}
}
