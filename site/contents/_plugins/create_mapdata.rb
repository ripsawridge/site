require 'fileutils'
require 'pathname'
require 'json'

module Jekyll
  class CreateMapData < Jekyll::Generator

    def addTrip(location_trips, key, trip)
      # We don't need all the data.
      strip = {}
      strip["title"] = trip.data["title"]
      strip["date"] = trip.data["date"]
      strip["blurb"] = trip.data["blurb"] || ""
      strip["url"] = trip.url
      a = location_trips[key]
      if a
        a.push(strip)
      else
        Jekyll.logger.warn "CreateMapData", 
          "Trip location " + key + 
          " not found in locations list"
        Jekyll.logger.warn "CreateMapData",
          "(referenced in file " + trip.path + ")"
      end
    end

    def readtrips(locations)

      location_trips = {}
      locations.each do |location|
        location_trips[location["name"]] = []
      end

      trips = @site.collections["cma"].docs
      trips.each do |trip|
        trip_locations = trip.data["location"]
        if trip_locations.is_a?(Array)
          trip_locations.each do |trip_location|
            addTrip(location_trips, trip_location, trip)
          end
        elsif trip_locations
          addTrip(location_trips, trip_locations, trip)
        else
          Jekyll.logger.warn "CreateMapData", 
            "empty location in " + 
            trip.path  # .data  # ["title"]
        end
      end
      location_trips
    end

    def sanitize_locations(locations)
      new_locations = []
      locations.each do |location|
        new_location = {}
        new_location["name"] = location["name"]
        new_location["location"] = location["location"]
        new_locations.push(new_location)
      end
      new_locations
    end

    def generate(site)
      # Create a hash of locations mapping location name
      # (string) to a list of trips.
      @site = site
      locations = sanitize_locations(site.data["locations"])
      location_trips = readtrips(locations)
      data = []
      locations.each do |location|
        cur = {}
        cur["name"] = location["name"]
        cur["location"] = location["location"]
        if location_trips[location["name"]]
          cur["trips"] = location_trips[location["name"]]
        end
        data.push(cur)
      end

      # Now we have the database we need. Write it out somewhere.
      # I think a js file would be best, as Leaflet is a js library.
      map_file = PageWithoutAFile.new(@site, site.source, "", "mapdata.js")
      json_stuff = JSON.pretty_generate(data)
      javascript = "var mapdata = " + json_stuff + ";"
      map_file.content = javascript
      @site.pages << map_file
    end
  end
end

