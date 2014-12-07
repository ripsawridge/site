$(function(){
  var public_url = 
    "https://docs.google.com/spreadsheet/pub?key=0Aik9iNgOEySpdGxObG8ySmNCalJaS2R3YTZpSXFmWlE&single=true&gid=0&output=html";

  var data = null;

  function showInfo(data_in, tabletop) {
    $("#progressbar").hide();

    data = data_in;
    workWithData();
  }

  function workWithData() {
    // build a histogram of routes. Only count successful climbs.
    var gradecounts = {};
    for (var i = 0; i < data.length; i++) {
      var obj = data[i];
      var grade = obj.grade.trim();
      var notes = obj.notes.trim();
      
      // Only count successful climbs, ie, those without notes.
      if (notes === "") {
        if (!gradecounts.hasOwnProperty(grade)) {
          gradecounts[grade] = 0;
        }
        gradecounts[grade]++;
      }
    }

    // figure out an ordering for gradecounts
    var sorted_counts = [];
    for (var grade in gradecounts) {
      var obj = {};
      obj.grade = grade;
      obj.count = gradecounts[grade];
      obj.index = ClimbGrades.ToIndex(grade, ClimbGrades.GRADE.UIAA);
      sorted_counts.push(obj);
    }

    // sort sorted_counts
    sorted_counts.sort(function(a, b) { 
      if (a.index < b.index) return -1;
      if (a.index === b.index) return 0;
      if (a.index > b.index) return 1;
      });

    for (var i = 0; i < sorted_counts.length; i++) {
      var obj = sorted_counts[i];
      var row = "<b>" + obj.grade + "</b>: " + obj.count + "<br/>";
      var $row = $(row);
      $row.appendTo("#output");
    }
  }

  function createReport() {
    $("#progressbar").show();

    Tabletop.init({ 
      key: public_url,
      callback: showInfo,
      simpleSheet: true
    });
  }

  function doRatings() {
    console.log("here");

    var text = $("#ratingsText").val();
    ratings = text.split(" ");
    var output = "";
    for (var i = 0; i < ratings.length; i++) {
      var rating = ratings[i];
      var index = ClimbGrades.ToIndex(rating, ClimbGrades.GRADE.UIAA);
      // Convert to YDS
      var yds = ClimbGrades.FromIndex(index, ClimbGrades.GRADE.YDS);
      output = output + yds + " ";
    }
    $("#ratingsOutput").text(output);
  }

  this.reporting = {};
  this.reporting.createReport = createReport;
  this.reporting.doRatings = doRatings;

  // Set various UI elements.
  $("#progressbar").progressbar({value: false});
  $("#progressbar").hide();
});
