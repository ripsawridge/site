require 'fileutils'
require 'pathname'

module Jekyll
  class Image < Liquid::Tag

    def initialize(tag_name, markup, tokens)
      @markup = markup
      @markup.strip!
      super
    end

    def render(context)
      # Markup should have two arguments.
      "<span class='image fit'>"\
      "  <img src=\"#{@markup}\">"\
      "</span>"
    end
  end
end

Liquid::Template.register_tag('image', Jekyll::Image)

