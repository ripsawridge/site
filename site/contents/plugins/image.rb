require 'fileutils'
require 'pathname'

module Jekyll
  class Image < Liquid::Tag

    def initialize(tag_name, markup, tokens)
      @markup = markup
      @markup.strip!
      # Insert thumbs directory
      @thumbs = @markup.gsub("cmaimages", "cmaimages/thumbs")
      super
    end

    def render(context)
      # Markup should have two arguments.
      "<span class='image fit'>"\
      "  <a href=\"#{@markup}\"><img src=\"#{@thumbs}\"></a>"\
      "</span>"
    end
  end
end

Liquid::Template.register_tag('image', Jekyll::Image)

