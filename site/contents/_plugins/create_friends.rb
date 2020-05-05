require 'fileutils'
require 'pathname'
require 'json'

module Jekyll
  class CreateFriends < Jekyll::Generator

    def generate(site)
      # Create one simple friend page for now.
      @site = site
      dir = "friends"
      friend = "georg"
      site.pages << FriendPage.new(site, site.source, \
                                   File.join(dir, friend), friend)
      Jekyll.logger.warn "CreateFriends", "I've been called"
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
      self.data["title"] = "My friend " + friend
    end
  end
end

