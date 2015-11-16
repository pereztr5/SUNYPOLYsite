$(document).ready(function () {
    // click function for either Course or student button
    $(".loadInfo").click(function() {
        //Empty the info div
        $("#info").empty();

        // Make initial panel
        var panel = $("<div/>", { "class": "panel panel-default"});
        $("#info").append(panel);

        // Load either the course or student
        loadData($(this).data("type"));
    });

    // the panel does not exit until the info div is loaded
    // We wait to detect the click for the font awesome in tag i
    $("#info").on("click", "i", function() {
        toggleThis(this);
    });

});

// Use one function to retrieve either the Student or Course data
function loadData(objectType) {

// Javascript to get either the Student or Course information but
// the first letter must be capitalized
// Note: Loads all the data as soon as the Student or Course Button 
// is clicked which is not effiecient
$.get("http://web.cs.sunyit.edu/~lampej/web/api/"
    + objectType.charAt(0).toUpperCase() + objectType.slice(1)
    + "/getAll")
	.done(function (data) {
        jQuery.each(data, function(index, type) {
            // Make the panel body
            var panelBody = $( "<div/>", {"class": "panel-body"})
            // Add content based on which button clicked
            if (objectType == "student") {
                loadStudentData(panelBody, type);
            } else {
                panelBody.append("<p>Max students: <strong>"
                    + type.max_students + "</strong></p>");
                loadStudentsCourse(panelBody, type.coursenum);
            }
            panelBody.hide();

            // Make the panel heading
            var panelHead = $( "<div/>", { 
                "class": "panel-heading",
                "data-id": objectType.id
            });

            // load font awesome icon
            panelHead.append("<i class='fa fa-plus'></i> ");

            // Load information Depending on which button clicked
            panelHead.append( function() {
                    if (objectType == "student") {
                        return "<strong>" + type.name + "</strong>"
                    } else {
                        return "<strong>" + type.coursenum + ": " + type.name + "</strong>"
                    }
            });

            // Make the whole panel and put everything together
            //var panel = $("<div/>", { "class": "panel panel-default"});
            $(".panel").append(panelHead);
            $(".panel").append(panelBody);

            // Load the panel
            //$("#info").append(panel);
            //$(".panel-heading").append(JSON.stringify(data, null, '\t'));
        })
	})
	.fail(function (jqXHR, textStatus, errorThrown) {
		console.log("Error calling Course/getAll: " + errorThrown);
	});
}

function toggleThis (toggler) {
    $(toggler).parent(".panel-heading").next(".panel-body").slideToggle(300);

    if ($(toggler).hasClass("fa-minus")) {
        $(toggler).removeClass("fa-minus");
        $(toggler).addClass("fa-plus");
    } else {
        $(toggler).removeClass("fa-plus");
        $(toggler).addClass("fa-minus");
    }
}

// Load the student data into the panel body
function loadStudentData (target, student){
    var img = $('<img/>').attr({
        alt: student.name + " image",
        class: "img-thumbnail"
    });    

    // If there is a photo use it if not then use the placeholder
    if (student.photo_filename.length > 0) {
        img.attr({src: student.photo_filename});
    } else {
        img.attr({src: "placeholder.png"});
    }

    var id = $('<p/>').html("ID: " + student.id);
    var level = $('<p/>').html("Level: " + student.level);
    var owner = $('<p/>').html("Owner: " + student.owner);
    var active = $('<p/>').html("Active: " + function() {
        if (student.active == 1) {
            return "yes";
        } else {
            return "no";
        }
    }());
    
    target.append(img);
    target.append("<br><br>");
    target.append(id);
    target.append(level);
    target.append(owner);
    target.append(active);
}

// Load course information based on the courses
function loadStudentsCourse (target, courseNum) {
    // Get students in the course and load each on in the panel
    $.get("http://web.cs.sunyit.edu/~lampej/web/api/Student/getStudentsInCourse/"
        + courseNum)
        .done(function (data) {
            target.append("<p>Current students: <strong>"
                    + data.length + "</strong></p>"
                    + "<h5>Students Enrolled:</h5>");
            jQuery.each(data, function(index, student) {
                target.append($('<p/>').html(student.name));
            });
        });
}
