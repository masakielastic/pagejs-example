page.base('/pagejs-example');

var $el = $('#result');
var controller = function(context) {
  var path = context.path;
  var name = path === '/' ? 'index' : context.path.substr(1);
  $el.html(name + ' のページです。');
};

page('/', controller);
page('/:name', controller);

$(document.body).on('click', 'a[href]', function(evt) {

  var target = evt.currentTarget;
  var href = target.getAttribute('href');

  if (!href.match(/^https?:\/\//)) {
    page(href);
    evt.preventDefault();
  }
}