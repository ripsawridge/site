function make_flickr(apiKey) {
  // Pass arguments as pairs.
  function flickr_url(request) {
    var args = [].slice.apply(arguments);
    args = args.slice(1);
    var url = 'https://api.flickr.com/services/rest/?&method=';
    url += request;
    url += "&api_key=" + apiKey;
    for (var i = 0; i < args.length/2; i++) {
      url += "&" + args[i*2];
      url += "=" + args[i*2 + 1];
    }
    url += "&format=json&jsoncallback=?";
    return url;
  }

  function flickr_image_url(item, size) {
    var imageURL = 'https://farm' + item.farm + '.static.flickr.com/';
    var secret = item.secret;
    if (item.originalsecret) {
      secret = item.originalsecret;
    }
    imageURL += item.server + '/' + item.id + '_' + secret + '_';
    imageURL += size + '.jpg';
    return imageURL;
  }

  function flickr_map_url(location) {
    var map_url = "https://www.flickr.com/map?";
    map_url += "fLat=" + location.latitude;
    map_url += "&fLon=" + location.longitude + "&zl=1";
    return map_url;
  }

  function flickr_photo_url(photo) {
    var photo_url = "https://www.flickr.com/photos/" + photo.owner.nsid;
    photo_url += "/" + photo.id;
    return photo_url;
  }

  function flickr_author_url(owner) {
    var author_url = "https://flickr.com/photos/" + owner.nsid;
    return author_url;
  }

  function flickr_tag_url(tag) {
    var tag_url = "https://www.flickr.com/photos/tags/" + tag._content;
    return tag_url;
  }

  var f = {
    url: flickr_url,
    image_url: flickr_image_url,
    photo_url: flickr_photo_url,
    author_url: flickr_author_url,
    map_url: flickr_map_url,
    tag_url: flickr_tag_url
  };
  return f;
}

// Steph's key:
var flickr = make_flickr('eb1315cb0cb09613a0a62cc53f8726d2');

