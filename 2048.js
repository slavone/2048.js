var GameField = function() {
  this.canvas = document.getElementsByTagName('canvas')[0];
  this.ctx = this.canvas.getContext('2d');
  this.field = [];
  this.score = 0;
  //inner logic
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
      return true;
    };

    console.log('Field is full');
    return false;
  };

  this._initializeGameField = function() {
    this.field = [ [0, 0, 0, 0],
                   [0, 0, 0, 0],
                   [0, 0, 0, 0],
                   [0, 0, 0, 0] ];

    this.score = 0;
    this._spawnNewCell(2);
    this._spawnNewCell(2);
  };

  this._checkIfFieldFull = function () {
    for(var y in this.field) {
      if ( this.field[y].find(function(elem) { return elem == 0; }) == 0 ) {
        return false
      }
    }

    return true;
  };

  this.shiftField = function (axis, direction) {
    var changed;

    if (axis == 'x') {
      if (direction == '1') {
        changed = this._shiftRight();
      } else if (direction == '-1') {
        changed = this._shiftLeft();
      }
    } else if (axis == 'y') {
      if (direction == '1') {
        changed = this._shiftTop();
      } else if (direction == '-1') {
        changed = this._shiftBottom();
      }
    }

    this._spawnNewCell(2);
  };

  this._shiftLeft = function () {
    var changed = false;

    for(var y in this.field) {
      for(var inPlace = 0; inPlace < this.field[y].length; inPlace++) {
        for(var i = 0; i < this.field[y].length; i++) {
          if (i <= inPlace)
            continue;
          if ( this.field[y][i] != 0 && this.field[y][inPlace] == 0 ||
               this.field[y][inPlace] == this.field[y][i] && 
               this.field[y][inPlace] != 0 && this.field[y][i] != 0 && 
               (this.field[y][i-1] == 0 && this.field[y][inPlace+1] == 0
                || i-1 == inPlace) 
             ) {

            var addScore = this.field[y][inPlace] + this.field[y][i];
            if (addScore > 2)
              this.score += addScore;
            this.field[y][inPlace] = this.field[y][inPlace] + this.field[y][i];
            this.field[y][i] = 0;
            // move cell somehow
            //this.ctx.fillStyle = 'black';
            //this.ctx.fillRect(0 + 100*i, 0 + 100*y, 100, 100);
            //this.drawCell(0 + 100*inPlace, 0 + 100*y, '#80a8ff', this.field[y][inPlace]);
            // stop moving

            changed = true;
          }
        }
      }
    }

    return changed;
  };

  this._shiftRight = function () {
    var changed = false;

    for(var y in this.field) {
      for(var inPlace = this.field[y].length - 1; inPlace >= 0; inPlace--) {
        for(var i = this.field[y].length - 1; i >= 0; i--) {
          if (i >= inPlace)
            continue;
          if (this.field[y][i] != 0 && this.field[y][inPlace] == 0 ||
              this.field[y][inPlace] == this.field[y][i] && 
              this.field[y][inPlace] != 0 && this.field[y][i] != 0 && 
              (this.field[y][i+1] == 0 && this.field[y][inPlace-1] == 0
               || i+1 == inPlace)
             ) {

            var addScore = this.field[y][inPlace] + this.field[y][i];
            if (addScore > 2)
              this.score += addScore;
            this.field[y][inPlace] = this.field[y][inPlace] + this.field[y][i];
            this.field[y][i] = 0;
            changed = true;
          }
        }
      }
    }

    return changed;
  };

  this._shiftTop= function () {
    var changed = false;

    for(var x in this.field) {
      for(var inPlace = 0; inPlace < this.field.length; inPlace++) {
        for(var i = 0; i < this.field.length; i++) {
          if (i <= inPlace)
            continue;
          if (this.field[i][x] != 0 && this.field[inPlace][x] == 0 ||
              this.field[inPlace][x] == this.field[i][x] && 
              this.field[inPlace][x] != 0 && this.field[i][x] != 0 && 
              (this.field[i-1][x] == 0 && this.field[inPlace+1][x] == 0
               || i-1 == inPlace)
             ) {
            var addScore = this.field[inPlace][x] + this.field[i][x];
            if (addScore > 2)
              this.score += addScore;
            this.field[inPlace][x] = this.field[inPlace][x] + this.field[i][x];
            this.field[i][x] = 0;
            changed = true;
          }
        }
      }
    }

    return changed;
  };

  this._shiftBottom = function () {
    var changed = false;

    for(var x in this.field) {
      for(var inPlace = this.field.length - 1; inPlace >= 0; inPlace--) {
        for(var i = this.field.length - 1; i >= 0; i--) {
          if (i >= inPlace)
            continue;
          if (this.field[i][x] != 0 && this.field[inPlace][x] == 0 ||
              this.field[inPlace][x] == this.field[i][x] && 
              this.field[inPlace][x] != 0 && this.field[i][x] != 0 && 
              (this.field[i+1][x] == 0 && this.field[inPlace-1][x] == 0
               || i+1 == inPlace)
             ) {
            var addScore = this.field[inPlace][x] + this.field[i][x];
            if (addScore > 2)
              this.score += addScore;
            this.field[inPlace][x] = this.field[inPlace][x] + this.field[i][x];
            this.field[i][x] = 0;
            changed = true;
          }
        }
      }
    }

    return changed;
  };

  //rendering functions
  
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
    document.getElementById('score').innerHTML = this.score;
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

  gameField._initializeGameField();
  gameField.render();

  document.getElementById('reset').onclick = function() {
    gameField.clear();
    gameField._initializeGameField();
    gameField.render();
  };

  document.onkeydown = function(event) {
    switch (event.keyCode) {
      case 37:
        gameField.shiftField('x', '-1');
        gameField.render();
        break;
      case 38:
        gameField.shiftField('y', '1');
        gameField.render();
        break;
      case 39:
        gameField.shiftField('x', '1');
        gameField.render();
        break;
      case 40:
        gameField.shiftField('y', '-1');
        gameField.render();
        break;
      case 72:
        gameField.shiftField('x', '-1');
        gameField.render();
        break;
      case 75:
        gameField.shiftField('y', '1');
        gameField.render();
        break;
      case 76:
        gameField.shiftField('x', '1');
        gameField.render();
        break;
      case 74:
        gameField.shiftField('y', '-1');
        gameField.render();
        break;
    }
  };

});

//document.addEventListener('DOMContentLoaded', function() {
//  setInterval(draw, 20);
//}, false);
