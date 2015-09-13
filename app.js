page.base('/pagejs-example');

var $el = $('#result');
var controller = function(context) {
  var path = context.path;
  var name = path === '/' ? 'index' : context.path.substr(1);
  var url = 'content/' + name + '.html';

  $.get(url)
  .done(function(html) {
    $el.html(html);
  })
  .fail(function() {
    $el.html('<p>ページは存在しません。</p>');
  });
};

page('/', controller);
page('/:name', controller);
page.start()

$(document.body).on('click', 'a[href]', function(evt) {

  var target = evt.currentTarget;
  var href = target.getAttribute('href');

  if (!href.match(/^https?:\/\//)) {
    page(href);
    evt.preventDefault();
  }
});