$(function () {
  const boardHints = [
    [0,1,2,2,2,2,2,1,0],
    [1,3,5,5,5,5,5,3,1],
    [2,5,8,8,8,8,8,5,2],
    [2,5,8,9,9,9,8,5,1],
    [1,3,6,8,9,8,6,3,1],
    [0,1,3,6,7,6,3,1,0],
    [0,0,1,3,4,3,1,0,0],
    [0,0,0,1,1,1,0,0,0]
  ];

  // JESLI TO OGLADASZ TO ZNACZY, ZE OSZUKUJESZ, ALE I TAK CIE KOCHAM :D
  const solution = [
    [false, false, false, false, false, false, false, false, false],
    [false, false, true, true, false, true, true, false, false],
    [false, true, true, true, true, true, true, true, false],
    [false, true, true, true, true, true, true, true, false],
    [false, false, true, true, true, true, true, false, false],
    [false, false, false, true, true, true, false, false, false],
    [false, false, false, false, true, false, false, false, false],
    [false, false, false, false, false, false, false, false, false]
  ];

  const result = [];

  const columns = boardHints[0].length;
  const board = $("#board");
  const next = $("#next");
  next.click(progress);

  board.css('grid-template-columns', '1fr '.repeat(columns));
  board.css('width', `${columns * 30}px`);
  boardHints.forEach((row, rowIdx) => {
    result.push([]);
    row.forEach((cell, cellIdx) => {
      board.append(`<div class="cell" data-row="${rowIdx}" data-col="${cellIdx}"><span>${cell}</span></div>`);
      result[rowIdx].push(false)
    });
  });

  const cells = $('.cell');

  function checkSolution() {
    for (let row=0; row < result.length; row++) {
      for (let col=0; col < result[row].length; col++)  {
        if (result[row][col] !== solution[row][col]) {
          return
        }
      }
    }

    cells.unbind('click', 'contextmenu');
    $('#status').html("<p class='success'>Mozajka poprawna!</p>");
    next.prop('disabled', false);
  }

  function toggleCellActive(evt) {
    const el = $(evt.currentTarget);
    el.toggleClass('active').removeClass('sure-not');
    result[el.data('row')][el.data('col')] = !result[el.data('row')][el.data('col')];
    checkSolution();
  }

  function toggleCellSureNot(evt) {
    const el = $(evt.currentTarget);
    el.toggleClass('sure-not').removeClass('active');
    result[el.data('row')][el.data('col')] = false;
  }


  cells
    .click(toggleCellActive)
    .contextmenu(e => {
      e.preventDefault();
      toggleCellSureNot(e)
    });

});