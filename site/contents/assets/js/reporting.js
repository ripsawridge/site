$(function(){
  var public_url = 
    "https://docs.google.com/spreadsheet/pub?key=0Aik9iNgOEySpdGxObG8ySmNCalJaS2R3YTZpSXFmWlE&single=true&gid=0&output=html";

  var display_system = ClimbGrades.GRADE.UIAA;
  var data = null;
  var myLineChart = null;

  function showInfo(data_in, tabletop) {
    data = data_in;
    workWithData();
  }

  function CreateStats(array) {
    var res = {
      mean: 0.0,
      median: 0.0,
      min: 0.0,
      max: 0.0
    };
    var accum = 0.0;

    // Compute the mean
    for (var i = 0; i < array.length; i++) {
      accum += array[i];
    }
    res.mean = accum / array.length;

    // max
    array.sort();
    if (array.length > 0) {
      res.max = array[array.length - 1];
    }

    return res;
  }


  function DateSort(a, b) {
    a = new Date(a.date);
    b = new Date(b.date);
    if (a < b) return -1;
    else if (a > b) return 1;
    return 0;
  }

  // Creates an array of objects with { date, values[] }, sorted by date.
  function AggregateIndexesByDate(data, filter_function) {
    var aggregates = [];
    // Aggregate data
    for (var i = 0; i < data.length; i++) {
      var entry = data[i];
      var choose = true;
      if (filter_function !== undefined) {
        choose = filter_function(entry);
      }

      if (choose === true) {
        if (aggregates[entry.date] === undefined) {
          aggregates[entry.date] = [];
        }

        aggregates[entry.date].push(entry.index);
      }
    }

    // Interpolate holes.
    for (var i = 0; i < data.length; i++) {
      var entry = data[i];
      if (aggregates[entry.date] === undefined) {
        // If you didn't climb anything clean on this day, you get credit for
        // having climbed one grade 4 UIAA climb.
        var index = ClimbGrades.ToIndex("4", ClimbGrades.GRADE.UIAA);
        aggregates[entry.date] = [index];
      }
    }

    var result = [];
    for (i in aggregates) {
      var obj = {};
      obj.date = i;
      obj.values = aggregates[i].slice(0);
      result.push(obj);
    }

    result.sort(DateSort);
    return result;
  }


  function AggregateData(data, filter_function) {
    // aggregates will be an array, sorted by date with objects
    // { date, values } where values are all that passed the filter
    // function.
    var aggregates = AggregateIndexesByDate(data, filter_function);
    var stats = aggregates.map(function(entry) {
      var obj = CreateStats(entry.values);
      obj.date = entry.date;
      return obj;
    });
    return stats;
  }


  function workWithData() {
    // First, turn the climbing grades into a proper ordering.
    data = data.map(function(entry) {
      var result = entry;
      result.index = ClimbGrades.ToIndex(result.grade, ClimbGrades.GRADE.UIAA);
      return result;
    });

    var stats_full = AggregateData(data);
    var stats_done = AggregateData(data, function(entry) {
      var choose = entry.notes.trim() === "";
      return choose;
    });

    // merge done data with all attempt data.
    for (var i = 0; i < stats_full.length; i++) {
      var entry = stats_full[i];
      var done_entry = stats_done[i];
      entry.done_mean = done_entry.mean;
      entry.done_max = done_entry.max;
    }

    // We only want to print data from the last year.
    var filterDate = new Date();
    filterDate.setFullYear(filterDate.getFullYear() - 1);
    stats_done = stats_full.filter(function(entry) {
      var d = new Date(entry.date);
      return d > filterDate;
    });

    RunChart(stats_done);
  }

  function RunChart(data) {
    // data , array of { date, max, median, mean }
    // transform to chart data.
    var cdata = {};
    // get labels
    var labels = data.map(function(entry) { return entry.date.toString(); });
    cdata.labels = labels;
    cdata.datasets = [
        {
            label: "Average attempt grade",
            fillColor: "rgba(220,220,220,0.2)",
            strokeColor: "rgba(220,220,220,1)",
            pointColor: "rgba(220,220,220,1)",
            pointStrokeColor: "#fff",
            pointHighlightFill: "#fff",
            pointHighlightStroke: "rgba(220,220,220,1)"
        },
        {
            label: "Average redpoint grade",
            fillColor: "rgba(151,187,205,0.2)",
            strokeColor: "rgba(151,187,205,1)",
            pointColor: "rgba(151,187,205,1)",
            pointStrokeColor: "#fff",
            pointHighlightFill: "#fff",
            pointHighlightStroke: "rgba(151,187,205,1)",
        }];
    cdata.datasets[0].data = data.map(function(entry) { return entry.mean; });
    cdata.datasets[1].data = data.map(function(entry) { return entry.done_max; });

    Chart.defaults.global.multiTooltipTemplate = function(entry) {
      // entry.value is the y value. Try and convert it to a UIAA climbing
      // grade.
      var intvalue = Math.round(entry.value);
      return ClimbGrades.FromIndex(intvalue, display_system);
    };

    // Get the context of the canvas element we want to select
    var ctx = $("#myChart").get(0).getContext("2d");
    if (myLineChart === null) {
      myLineChart = new Chart(ctx).Line(cdata);
    } else {
      myLineChart.update();
    }

  }


  function createReport() {
    // For working with canned data.
   /*
   $.getJSON("climbstats.data").done(function(data_in) {
      data = data_in;
      workWithData();
    });
   */
    // To work with live data, uncomment this:
    // $("#progressbar").show();

    Tabletop.init({ 
      key: public_url,
      callback: showInfo,
      simpleSheet: true
    });
  }

  function doRatings() {
    // What is the input rating system
    var val = $("#inputRatings :selected")[0].value;
    var system = ClimbGrades.GRADE.UIAA;
    var outsystem = [ClimbGrades.GRADE.FRENCH, ClimbGrades.GRADE.YDS];
    if (val === "French") {
      system = ClimbGrades.GRADE.FRENCH;
      outsystem = [ClimbGrades.GRADE.UIAA, ClimbGrades.GRADE.YDS];
    } else if (val === "YDS") {
      system = ClimbGrades.GRADE.YDS;
      outsystem = [ClimbGrades.GRADE.UIAA, ClimbGrades.GRADE.FRENCH];
    }

    var text = $("#ratingsText").val();
    ratings = text.split(" ");
    var output1 = "<b>" + outsystem[0].name + ":</b> ";
    var output2 = "<b>" + outsystem[1].name + ":</b> ";

    for (var i = 0; i < ratings.length; i++) {
      var rating = ratings[i];
      var index = ClimbGrades.ToIndex(rating, system);
      // Convert to YDS
      var os1 = ClimbGrades.FromIndex(index, outsystem[0]);
      output1 = output1 + os1 + " ";
      var os2 = ClimbGrades.FromIndex(index, outsystem[1]);
      output2 = output2 + os2 + " ";
    }
    $("#outputSystemOne").html(output1);
    $("#outputSystemTwo").html(output2);
  }

  // Set various UI elements.
  $("#chartRadio :radio").click(function() {
    if (this.id.trim() === "uiaa") {
      display_system = ClimbGrades.GRADE.UIAA;
    } else if (this.id.trim() === "french") {
      display_system = ClimbGrades.GRADE.FRENCH;
    } else if (this.id.trim() === "yds") {
      display_system = ClimbGrades.GRADE.YDS;
    }
  });

  $("#clickRatings").click(function() { doRatings(); });
  $("#reloadData").click(function() { createReport(); });

  // Expose the public spreadsheet url.
  $("#spreadSheetLocation").html("<a href=" + public_url + ">here</a");
  // Kick off a report creation.
  createReport();
});
