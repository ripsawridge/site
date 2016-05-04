// Copyright 2014, Michael Stanton.
var ClimbGrades = (function() {

  // index UIAA           YDS             French
  var chart = [
    [0,  "3",            "5.2",          "1"],
    [1,  "3/3+",         "5.2",          "1"],
    [2,  "3+",           "5.3",          "2"],
    [3,  "3+/4-",        "5.3",          "2"],
    [4,  "4-",           "5.4",          "3"],
    [5,  "4-/4",         "5.4",          "3"],
    [6,  "4",            "5.4",          "3"],
    [7,  "4/4+",         "5.5",          "4a"],
    [8,  "4+",           "5.5",          "4a"],
    [9,  "4+/5-",        "5.5",          "4a"],
    [10, "5-",           "5.6",          "4b"],
    [11, "5-/5",         "5.6",          "4b"],
    [12, "5",            "5.6",          "4b"],
    [13, "5/5+",         "5.7",          "4c"],
    [14, "5+",           "5.7",          "4c"],
    [15, "5+/6-",        "5.8",          "5a"],
    [16, "6-",           "5.8",          "5a"],
    [17, "6-/6",         "5.9",          "5b"],
    [18, "6",            "5.9",          "5b"],
    [19, "6/6+",         "5.10a",        "5c"],
    [20, "6+",           "5.10a",        "5c"],
    [21, "6+/7-",        "5.10b",        "6a"],
    [22, "7-",           "5.10c",        "6a+"],
    [23, "7-/7",         "5.10c",        "6a+"],
    [24, "7",            "5.10d",        "6b"],
    [25, "7/7+",         "5.10d",        "6b"],
    [26, "7+",           "5.11a",        "6b+"],
    [27, "7+/8-",        "5.11b",        "6c"],
    [28, "8-",           "5.11c",        "6c+"],
    [29, "8-/8",         "5.11c",        "6c+"],
    [30, "8",            "5.11d",        "7a"],
    [31, "8/8+",         "5.12a",        "7a+"],
    [32, "8+",           "5.12a",        "7a+"],
    [33, "8+/9-",        "5.12b",        "7b"],
    [34, "9-",           "5.12c",        "7b+"],
    [35, "9-/9",         "5.12c",        "7b+"],
    [36, "9",            "5.12d",        "7c"],
    [37, "9/9+",         "5.13a",        "7c+"],
    [38, "9+",           "5.13a",        "7c+"],
    [39, "9+/10-",       "5.13b",        "8a"],
    [40, "10-",          "5.13c",        "8a+"],
    [41, "10-/10",       "5.13c",        "8a+"],
    [42, "10",           "5.13d",        "8b"],
    [43, "10/10+",       "5.14a",        "8b+"]
  ];


  var GRADE = {
    UIAA:   { value: 1, name: "UIAA" },
    YDS:    { value: 2, name: "YDS" },
    FRENCH: { value: 3, name: "French" }
  };


  // Use like FromIndex(3, GRADE.UIAA);
  // returns string "3+/4-"
  function FromIndex(index, grade) {
    if (isNaN(parseInt(index)) || index < 0 || index >= chart.length) {
      throw new TypeError("Invalid index parameter.");
    }

    if (!grade.hasOwnProperty("name") ||
        !grade.hasOwnProperty("value")) {
      throw new TypeError("invalid grade parameter.");
    }

    if (isNaN(parseInt(grade.value)) || grade.value < 1 || grade.value > 3) {
      throw new TypeError("grade.value is invalid.");
    }

    return chart[index][grade.value];
  }


  function ToIndex(string_value, grade) {
    if (typeof string_value !== "string") {
      throw new TypeError("expected string for string_value.");
    }

    string_value = string_value.trim();
    // string_value shouldn't have any spaces now, if it does throw an error.
    if (string_value.indexOf(" ") !== -1) {
      throw new TypeError("string_value shouldn't have any spaces.");
    }

    if (!grade.hasOwnProperty("value")) {
      throw new TypeError("invalid grade parameter.");
    }

    if (isNaN(parseInt(grade.value)) || grade.value < 1 || grade.value > 3) {
      throw new TypeError("grade.value is invalid.");
    }

    // Slashes are only allowed in UIAA, sorry.
    if (grade != GRADE.UIAA && string_value.indexOf("/") !== -1) {
      throw new TypeError("Slash (/) grades are only supported for UIAA ratings.");
    }

    // Accept that YDS or FRENCH might specify a plus or - at the end. - is 
    // ignored and removed, but plus offers a hint to the resolver to choose the
    // highest index that matches the grade.
    var find_highest = false;
    if (grade == GRADE.YDS || 
        (grade == GRADE.FRENCH && parseInt(string_value[0]) <= 5)) {
      var pos = string_value.indexOf("-");
      if (pos !== -1) {
        if (pos != (string_value.length - 1)) {
          throw new TypeError("a YDS or FRENCH grade allows a - only at the end.");
        }
        string_value = string_value.substr(0, string_value.length - 1);
      }
      pos = string_value.indexOf("+");
      if (pos !== -1) {
        if (pos != (string_value.length - 1)) {
          throw new TypeError("a YDS or FRENCH grade allows a + only at the end.");
        }
        find_highest = true;
        string_value = string_value.substr(0, string_value.length - 1);
      }
    }

    var column = grade.value;
    for (var i = 0; i < chart.length; i++) {
      if (chart[i][column] === string_value) {
        if (find_highest === true) {
          // Keep looking higher.
          var j = i + 1;
          while (j < chart.length && chart[j][column] === string_value) j++;
          return j - 1;
        }
        return i;
      }
    }
    return -1;
  }

  var module = {
    GRADE: GRADE,
    FromIndex: FromIndex,
    ToIndex: ToIndex
  };

  return module;
}());

// Uncomment this if you are embedding in a web page.
// exports = module.exports = ClimbGrades;

