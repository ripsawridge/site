require 'fileutils'
require 'pathname'
require 'json'

module Jekyll
  class CreateStats < Jekyll::Generator

    def readelevations()

      elevations = {}

      trips = @site.collections["cma"].docs
      trips.each do |trip|
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
      elevations
    end

    def generate(site)
      # Create a hash of locations mapping location name
      # (string) to a list of trips.
      @site = site
      elevations = readelevations()
      Jekyll.logger.warn "CreateStats", elevations
    end
  end
end

