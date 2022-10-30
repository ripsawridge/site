require 'fileutils'
require 'pathname'
require 'json'

module Jekyll
  class CreateStats < Jekyll::Generator

    def print(str)
      Jekyll.logger.warn "CreateStats", str
    end

    def readelevations()

      elevations = {}

      trips = @site.collections["cma"].docs
      trips.each do |trip|
        if trip.data["report"] != false
          year = trip.data["date"].year.to_s
          if elevations.has_key? year
            numeric_elevation = elevations[year]
          else
            numeric_elevation = 0
          end

          elevation = trip.data["elevation"]
          if elevation.is_a?(Array)
            elevation.each do |each_elevation|
              numeric_elevation += each_elevation.to_i
            end
          elsif elevation
            numeric_elevation += elevation
          end

          elevations[year] = numeric_elevation
        end
      end
      elevations
    end

    def generate(site)
      # Create a hash of locations mapping location name
      # (string) to a list of trips.
      @site = site
      elevations = readelevations()
      Jekyll.logger.warn "CreateStats", elevations

      # Now we have the database we need. Write it out somewhere.
      # I think a js file would be best, as Leaflet is a js library.
      e_file = PageWithoutAFile.new(@site, site.source, "", "elevation_data.js")
      json_stuff = JSON.pretty_generate(elevations)
      javascript = "var elevation_data = " + json_stuff + ";"
      e_file.content = javascript
      @site.pages << e_file
    end
  end
end

