var View = function (game, $el) {
  this.game = game;
  this.el = $el;
  this.grid = this.setupBoard();
  $el.append(this.grid);
  this.bindEvents();
};

View.prototype.bindEvents = function () {
  this.el.on("click", "li", (e) => {
    const square = e.currentTarget;
    const idx = this.grid.children().index(square);
    const pos = [Math.floor(idx / 3), idx % 3];

    try {
      this.game.playMove(pos);
      this.makeMove($(square));
    }
    catch(err) {
      alert(err.msg);
    }
  });
};

View.prototype.makeMove = function ($square) {
  $square.addClass("mark");
  const currentPlayer = this.game.currentPlayer;
  $square.addClass(currentPlayer);
  $square.append($("<h1></h1>").text(currentPlayer));
  console.log(this.game.isOver());
  console.log(this.game);
  if (this.game.isOver()) {
    let $msg = "";
    const winner = this.game.winner();
    if (winner) {
      $msg = $("<h2></h2>").text(winner + " wins!");
      $(".mark").attr("style", "color: red");
      $("." + currentPlayer).css("background", "green");
      $("." + currentPlayer).css("color", "white");
    } else {
      $("h1").css("color", "red");
      $msg = $("<h2></h2>").text("Draw!");
    }
    $("body").append($msg);
    this.el.off("click");
  }
};

View.prototype.setupBoard = function () {
  const $grid = $("<ul></ul>");
  for (let i = 0; i < 9; i++) {
    $grid.append($("<li></li>"));
  }
  console.log($grid.children());

  return $grid;
};

module.exports = View;
