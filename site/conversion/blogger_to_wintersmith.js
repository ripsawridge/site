var fs = require('fs');
var xml2js = require('xml2js');
var html = require("html");
var md = require("html-md");
var mkdirp = require("mkdirp");

var atom_file = __dirname + '/atom.xml';
var output_dir = __dirname + '/build';
 
function DateToString(date) {
  var year = date.getFullYear();
  var month = date.getMonth() + 1;
  var day = date.getDate();
  return "" + year + "-" + month + "-" + day;
}


function CreateFileContents(title, date, content) {
  var nl = "\n";
  var output = "---" + nl;
  output += "title: " + title + nl;
  output += "date: " + DateToString(date) + nl;
  output += "template: page.jade" + nl;
  output += "---" + nl + nl;
  var prettyContent = html.prettyPrint(content, {indent_size: 2});
  var mdContent = md(prettyContent, { inline: true });
  output += mdContent;
  output += nl;
  return output;
}


function WriteOut(title, date, content) {
  var output = CreateFileContents(title, date, content);

  // Sanitize title into filename
  var lower_title = title.toLowerCase();
  var filename = lower_title.replace(/[\W\s]+/g,"_") + ".md";
  var directory = output_dir + "/" + date.getFullYear();
  var fullpath = directory + "/" + filename;
 
  // Work with the file system asynchronously. 
  var file_written = function(err, d) {
    if (err) console.error(err);
    else { 
      console.log("wrote file " + fullpath);
    }    
  };

  var directory_created = function(err) {
    if (err) console.error(err);
    else {
      fs.writeFile(fullpath, output, file_written);
    }
  };
    
  // Ensure directory exists and write file.
  mkdirp(directory, directory_created);
}


function IsDraftPost(item) {
  var isDraft = false;
  if (item.hasOwnProperty("app:control")) {
    var control_object = item["app:control"];
    if (control_object.length > 0 && control_object[0].hasOwnProperty("app:draft")) {
      var draft_object = control_object[0]["app:draft"];
      if (draft_object.length > 0) {
        isDraft = draft_object[0] == "yes";        
      }
    }
  }
  return isDraft;
}


function HandleItems(data) {
  for (var i = 0; i < data.feed.entry.length; i++) {
    var item = data.feed.entry[i];
    if (item.category[0].$.term == "http://schemas.google.com/blogger/2008/kind#post") {
      var date = new Date(item.published[0]);
      var title = item.title[0]._ || "UNKNOWN_TITLE";
      var isDraft = IsDraftPost(item);
      if (!isDraft) {
        WriteOut(title, date, item.content[0]._);
      }
    }
  }
}


var parser = new xml2js.Parser();
parser.on('end', function(result) {
  // If you want to inspect the data model, you might print
  // this to the screen:
  //
  // var data = JSON.stringify(result, null, 2);
  // console.dir(data);
  HandleItems(result);
});

// Kick off the effort. 
fs.readFile(atom_file, function(err, data) {
  parser.parseString(data);
});
