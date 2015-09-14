var $el = $('#result');
var $title = $('title');
var site_title = 'Page.js の例';

var controller = function(context) {
  var path = context.path;
  var name = path === '/' ? 'index' : context.path.substr(1);
  var url = 'content/' + name + '.html';

  $.get(url)
  .done(function(data) {
    var splited = data.split(/(-)+/);

    if (splited.length > 1) {
      var json = (JSON.parse(splited[0]));
      var title = json.title;
      var body = splited[2];
      $('title').html(title +  ' - ' + site_title);
    } else {
      var body = data;
    }

    $el.html(body);
  })
  .fail(function() {
    $title.html('エラー - ' + site_title);
    $el.html('<p>ページは存在しません。</p>');
  });
};

page.base('/pagejs-example');
page('/', controller);
page('/:name', controller);
page.start();

$(document.body).on('click', 'a[href]', function(evt) {

  var target = evt.currentTarget;
  var href = target.getAttribute('href');

  if (!href.match(/^https?:\/\//)) {
    page(href);
    evt.preventDefault();
  }
});