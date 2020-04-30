let xml2json = require('xml2json-light');
let fs = require('fs');
let nodeDir = require('node-dir');
let path = require('path');
let fsExtra  = require('fs-extra');

module.exports = function(grunt) {
  grunt.initConfig({
    rsync: {
      options: {
        recursive: true
      },
      production: {
        options: {
          src: "./contents/_site/",
          dest: "~/public_html",
          host: "mountai8@mountainwerks.org"
        }
      }
    }
  });
  grunt.loadNpmTasks('grunt-rsync');

  grunt.registerTask('deploy', [
    'rsync:production'
  ]);

  function transformGeoLocations(input_kml, output_json) {
    var kml = fs.readFileSync(input_kml);
    var json = xml2json.toJson(kml, { object: true });
    var maps = json.kml.Document.Folder.Folder; // the locations folder.
    // There should be several map folders.
    let data = [];
    maps.forEach((map) => {
      map.Placemark.forEach((placemark) => {
        let obj = {
          name: placemark.name,
	  location: [parseFloat(placemark.LookAt.latitude),
                     parseFloat(placemark.LookAt.longitude)],
          map_name: map.name
        };
        data.push(obj);
      });
    });
    grunt.log.write('Wrote ' + data.length + ' records to ' + output_json + '.');
    fs.writeFileSync(output_json, JSON.stringify(data, null, 1));
  }

  grunt.registerTask('createLocations', function() {
    transformGeoLocations('./locations.kml', './contents/_data/locations.json');
  });

  function createDatabase(imagesDir) {
    // recursively walk the directory, and associate the filenames with
    // the flickr image id found in the filename:
    // <text>_numericid_o.jpg -> numericid
    let db = {};
    let files = nodeDir.files(imagesDir, {sync:true});
    files.forEach((file) => {
      let parsed = path.parse(file);
      if (parsed.ext === '.jpg') {
        let splits = parsed.base.split('_');
        let id = splits[splits.length - 2];
        db[id] = file;
      }
    });
    return db;
  }

  function handleMarkdown(file, db) {
    var contents = fs.readFileSync(file, 'utf-8');
    let localDir = path.parse(file).dir;
    let regexp = /https:\/{2}([0-9a-z_-]+\.)+.*\.jpg/g;
    let matchAll = contents.match(regexp) || [];
    let found = false;
    matchAll.forEach((m) => {
      // grunt.log.write("match = " + m + "\n");
      // find the flickr id.
      let id_reg = /\/([0-9]+)_/;
      let id = m.match(id_reg)[1];
      if (id in db) {
        found = true;
        grunt.log.write("id = " + id + db[id] + "\n");
        let fileName = path.parse(db[id]).base;
        let localPath = "images/" + fileName;
        contents = contents.replace(m, localPath);
      	// Copy the file.
      	let destPath = localDir + "/" + localPath;
      	fsExtra.copySync(db[id], destPath);
      	grunt.log.write("Copied " + db[id] + " to " + destPath + "\n");
      }
    });

    // Go in reverse replacing pieces of the string.
    if (found) {
      fs.writeFileSync(file, contents);
      grunt.log.write(contents);
    }
  }

  function leave(sources, images) {
    let files = nodeDir.files(sources, {sync:true});
    files.forEach((file) => {
      if (path.parse(file).ext === '.md') {
        grunt.log.write("Processing file " + file + "\n");
      	handleMarkdown(file, images);
      }
    });
  }

  grunt.registerTask('leaveFlickr', function() {
    let db = createDatabase('flickr');
    leave("./contents/_cma/2018", db);
    grunt.log.write('Leaving Flickr');
  });
};

