function fetch_feed() {
  chrome.extension.sendRequest({'action' : 'fetch_feed', 'url' : 'http://www.andrewsouthpaw.com/rss/'}, 
    function(response) {
      display_stories(response);
    }
  );
}

function display_stories(feed_data) {
  var xml_doc = $.parseXML(feed_data);
  $xml = $(xml_doc);
  $('#popup').html('<h1 class="logo"><img src="images/logo2.png" id="logo" />Coding as a Southpaw</h1><br clear="all" />');
  $('#logo')[0].addEventListener('click', function() {
    open_item('http://www.andrewsouthpaw.com/')
    window.close() } )

  var items = $xml.find("item");
  items.each(function(index, element) {
    var post = parse_post(element);
    var item = '';
    var class2 = '';
    if (index >= localStorage['unread_count']) {
      // // console.log('visited');
      item += '<div class="post read">';
    }
    else {
      item += '<div class="post">'
    }
    item += '<span class="tag">' + post.tag + '</span>\
          <a href="' + post.url + '">\
            <div id="' + post.id + '" class="item">\
              <img src="' + post.img + '" width="107" height="60" />\
              <h4>' + post.title + '</h4>\
              <span class="description">' + post.description + '...</span>\
            </div>\
          </a>';
    item += '</div>';
    $('#popup').append(item);
    // TODO why isn't jQuery's .on defined?
    var $item = $('div[id="' + post.id + '"]')
    console.log('$item', $item)
    $item[0].addEventListener('click', function() {
      open_item(post.url) } )
  });
}

$(document).ready(function() {
  fetch_feed();
});
