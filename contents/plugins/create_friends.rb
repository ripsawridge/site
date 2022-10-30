require 'fileutils'
require 'pathname'
require 'json'

module Jekyll
  class CreateFriends < Jekyll::Generator

    def addGuest(guests, guest)
      if guests[guest]
        return
      end
      guests[guest] = {}
    end

    def generate(site)
      # Create one simple friend page for now.
      @site = site
      dir = "friends"

      guests = {}
      trips = @site.collections["cma"].docs
      trips.each do |trip|
        trip_guests = trip.data["guests"]
        if trip_guests.is_a?(Array)
          trip_guests.each do |trip_guest|
            addGuest(guests, trip_guest)
          end
        elsif trip_guests
          addGuest(guests, trip_guests)
        end
      end

      # Create a page for each unique guest.
      guests.keys.each  do |guest|
        site.pages << FriendPage.new(site, site.source, \
                                     File.join(dir, guest), guest)
        Jekyll.logger.warn "CreateFriends", guest
      end
    end
  end


  class FriendPage < Jekyll::Page
    def initialize(site, base, dir, friend)
      @site = site
      @base = base
      @dir = dir
      @name = "index.html"

      self.process(@name)
      self.read_yaml(File.join(base, "_layouts"), 'friend.html')
      self.data['friend'] = friend
      self.data["friend_description"] = "Here are my reports with " + friend + "."
      self.data["title"] = "My friend " + friend
    end
  end
end

