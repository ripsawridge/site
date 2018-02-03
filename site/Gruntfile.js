var xml2json = require('xml2json');
var fs = require('fs');

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
};

