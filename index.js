$(function () {
  const root = $('#root');

  const pages = [
    'password',
    'mosaic',
    'index'
  ];

  let currentPage = -1;

  function loadPage(page) {
    $.get(`/${page}.html`, function (data) {
      root.html(data);
      $.getScript(`/${page}.js`)
    });
  }

  window.progress = function() {
    ++currentPage;
    loadPage(pages[currentPage])
  };

  progress()
});