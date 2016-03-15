var GameField = function() {
  this.canvas = document.getElementsByTagName('canvas')[0];
  this.ctx = this.canvas.getContext('2d');
  this.field = [];
  this._getRandomCell = function() {
    var randomCell;

    do {
        randomCell = [ Math.floor(Math.random() * this.field.length),
                       Math.floor(Math.random() * this.field.length)];
    }
    while (this.field[randomCell[0]][randomCell[1]] != 0);

    return randomCell;
  };
  this._spawnNewCell = function(value) {
    var cell;
    if (this._checkIfFieldFull() == false) {
      cell = this._getRandomCell();
      this.field[cell[0]][cell[1]] = value;
    };
  };
  this._initializeGameField = function() {
    this.field = [ [0, 0, 0, 0],
                   [0, 0, 0, 0],
                   [0, 0, 0, 0],
                   [0, 0, 0, 0] ];

    this._spawnNewCell(2);
  };
  this._checkIfFieldFull = function () {
    for(var y in this.field) {
      if ( this.field[y].find(function(elem) { return elem == 0; }) == 0 ) {
        return false
      }
    }

    alert('Game over!');
    return true;
  };
  this.clear = function () {
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    this.field = [];
  };
  this.drawField = function () {
    this.ctx.fillStyle = '#e6eeff';
    this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);
    this.ctx.fillStyle = 'black';
    for(var y in this.field) {
      for(var x in this.field[y]) {
        this.ctx.strokeRect(0+100*x, 0+100*y, 100, 100);
      }
    }
  };
  this.drawCell = function(x, y, color, text) {
    this.ctx.fillStyle = 'black';
    this.ctx.strokeRect(x, y, 100, 100);
    this.ctx.fillStyle = color;
    this.ctx.fillRect(x, y, 100, 100);
    this.ctx.font = '39px serif';
    this.ctx.textAlign = 'center';
    this.ctx.fillStyle = 'white';
    this.ctx.fillText(text, x+50, y+60);
    
  };
  this.render = function () {
    this.drawField();
    for(var y in this.field) {
      for(var x in this.field[y]) {
        if (this.field[y][x] != 0) {
          this.drawCell(0 + 100*x, 0 + 100*y, '#80a8ff', this.field[y][x]);
        }
      }
    }
  };
}

document.addEventListener('DOMContentLoaded', function() {
  var gameField = new GameField();

  document.getElementById('start-game').onclick = function() {
    gameField._initializeGameField();
    //setInterval(gameField.render(), 20);
    gameField.render();
  };

  document.getElementById('reset').onclick = function() {
    gameField.clear();
    gameField._initializeGameField();
    gameField.render();
  };

  document.getElementById('spawn-cell').onclick = function() {
    gameField._spawnNewCell(2);
    gameField.render();
  };
});


//document.addEventListener('DOMContentLoaded', function() {
//  setInterval(draw, 20);
//}, false);
