$(function () {
  const root = $('#root');
  const status = $("#status");
  const help = $("#help");
  const header = $("h1");
  const next = $("#next");

  const pageMosaic = {
    script: 'mosaic.js',
    header: 'Ułóż mozaikę',
    help: "<p>Kliknij lewym żeby zaznaczyć, że jest</p>" +
      "<p>Kliknij prawym żeby zaznaczyć, że nie ma</p>",
    render: function (then) {
      root.html('<div id="board"></div>');
      then();
    }
  };

  const pagePassword = {
    script: 'password.js',
    header: 'Podaj PIN ',
    help: "",
    render: function (then) {
      $('<div id="password"><form id="pin-form">\n' +
        '        <input id="pin-1" type="text" min="0" max="9" step="1" value="0" inputmode="numeric" pattern="[0-9]">\n' +
        '        <input id="pin-2" type="text" min="0" max="9" step="1" value="0" inputmode="numeric" pattern="[0-9]">\n' +
        '        <input id="pin-3" type="text" min="0" max="9" step="1" value="0" inputmode="numeric" pattern="[0-9]">\n' +
        '        <input id="pin-4" type="text" min="0" max="9" step="1" value="0" inputmode="numeric" pattern="[0-9]">\n' +
        '        <button type="submit">Unlock</button>\n' +
        '    </form></div>').hide().appendTo(root);
      root.children().fadeToggle(1000, function () {
        then();
        $("#board").remove();
      });
    }
  };

  const pageGrandFinale = {
    header: "Wszystkiego najlepszego!",
    help: "<span>Spotkajmy się o 16:00 na rynku</span>",
    render: function (then) {
      root.children().fadeToggle(1000, function () {
        next.remove();
        root.append("<img src='zdjecie.png' alt='Szymus'>");
        then();
      });

    }
  };

  const pages = [
    pageMosaic,
    pagePassword,
    pageGrandFinale
  ];

  let currentPage = -1;

  function loadPage(page) {
    if (!page) return;
    header.css('visibility', 'hidden');
    help.css('visibility', 'hidden');
    status.children().remove();
    next.prop('disabled', true);
    page.render(function () {
      if (page.script) {
        $.getScript(page.script)
      }
      header.text(page.header);
      help.html(page.help);
      header.css('visibility', 'visible');
      help.css('visibility', 'visible');
      status.css('visibility', 'visible');
    });
  }

  window.progress = function() {
    ++currentPage;
    loadPage(pages[currentPage])
  };

  window.success = function () {
    next.prop('disabled', false);
  };

  progress();
  next.click(progress);
});