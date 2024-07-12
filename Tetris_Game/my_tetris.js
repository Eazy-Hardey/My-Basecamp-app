const btnStart = document.getElementById("start-button");
const btnPause = document.getElementById("pause-button");

const myAudioFile = new Audio("./audio/audio.mp3");
const clearAudioFile = new Audio("./audio/clear.mp3");
const themeSongFile = new Audio("./audio/Tetris Theme Song.mp3");

function playClearAudio() {
  clearAudioFile.play();
}

function playAudio() {
  myAudioFile.play();
}

function startThemeSong() {
  themeSongFile.loop = true;
  themeSongFile.play();
}

function stopThemeSong() {
  themeSongFile.pause();
}

const CI = [
  [
    [0, 0, 0, 0],
    [1, 1, 1, 1],
    [0, 0, 0, 0],
    [0, 0, 0, 0],
  ],
  [
    [0, 0, 1, 0],
    [0, 0, 1, 0],
    [0, 0, 1, 0],
    [0, 0, 1, 0],
  ],
  [
    [0, 0, 0, 0],
    [0, 0, 0, 0],
    [1, 1, 1, 1],
    [0, 0, 0, 0],
  ],
  [
    [0, 1, 0, 0],
    [0, 1, 0, 0],
    [0, 1, 0, 0],
    [0, 1, 0, 0],
  ],
];

const CJ = [
  [
    [1, 0, 0],
    [1, 1, 1],
    [0, 0, 0],
  ],
  [
    [0, 1, 1],
    [0, 1, 0],
    [0, 1, 0],
  ],
  [
    [0, 0, 0],
    [1, 1, 1],
    [0, 0, 1],
  ],
  [
    [0, 1, 0],
    [0, 1, 0],
    [1, 1, 0],
  ],
];

const CL = [
  [
    [0, 0, 1],
    [1, 1, 1],
    [0, 0, 0],
  ],
  [
    [0, 1, 0],
    [0, 1, 0],
    [0, 1, 1],
  ],
  [
    [0, 0, 0],
    [1, 1, 1],
    [1, 0, 0],
  ],
  [
    [1, 1, 0],
    [0, 1, 0],
    [0, 1, 0],
  ],
];

const CO = [
  [
    [0, 0, 0, 0],
    [0, 1, 1, 0],
    [0, 1, 1, 0],
    [0, 0, 0, 0],
  ],
];

const CS = [
  [
    [0, 1, 1],
    [1, 1, 0],
    [0, 0, 0],
  ],
  [
    [0, 1, 0],
    [0, 1, 1],
    [0, 0, 1],
  ],
  [
    [0, 0, 0],
    [0, 1, 1],
    [1, 1, 0],
  ],
  [
    [1, 0, 0],
    [1, 1, 0],
    [0, 1, 0],
  ],
];

const CT = [
  [
    [0, 1, 0],
    [1, 1, 1],
    [0, 0, 0],
  ],
  [
    [0, 1, 0],
    [0, 1, 1],
    [0, 1, 0],
  ],
  [
    [0, 0, 0],
    [1, 1, 1],
    [0, 1, 0],
  ],
  [
    [0, 1, 0],
    [1, 1, 0],
    [0, 1, 0],
  ],
];

const CZ = [
  [
    [1, 1, 0],
    [0, 1, 1],
    [0, 0, 0],
  ],
  [
    [0, 0, 1],
    [0, 1, 1],
    [0, 1, 0],
  ],
  [
    [0, 0, 0],
    [1, 1, 0],
    [0, 1, 1],
  ],
  [
    [0, 1, 0],
    [1, 1, 0],
    [1, 0, 0],
  ],
];

const mainGameCanvas = document.getElementById("main-game-canvas");
const mainCanvasContext = mainGameCanvas.getContext("2d");
const scoreElement = document.getElementById("score");
const lineElement = document.getElementById("line");
let currLine = (setLine = 0);
const ROW = (setRow = 20);
const COL = (setColumn = 10);
const SQ = (squareSize = 20);
const VACANT = "WHITE"; // color of an empty square

// draw a square
function drawSquare(xCoordinate, yCoordinate, squareColor) {
  mainCanvasContext.fillStyle = squareColor;
  mainCanvasContext.fillRect(xCoordinate * SQ, yCoordinate * SQ, SQ, SQ);

  mainCanvasContext.strokeStyle = "white";
  mainCanvasContext.strokeRect(xCoordinate * SQ, yCoordinate * SQ, SQ, SQ);
}

//drawing piece for next tetromino

const secondCanvas = document.getElementById("second-canvas");
const secondCanvasContext = secondCanvas.getContext("2d");

const NUM_ROWS = (setRows = 4);
const NUM_COLS = (setCols = 4);
const NUM_SQUARES = (setSQrs = 20);
const VACANTs = (vacantColor = "WHITE"); // color of an empty square

// using x and y coordinate draw a square and specify a color
const drawSquaresToCanvas = (xCoordinate, yCoordinate, color) => {
  secondCanvasContext.fillStyle = color;
  secondCanvasContext.fillRect(
    xCoordinate * NUM_SQUARES,
    yCoordinate * NUM_SQUARES,
    NUM_SQUARES,
    NUM_SQUARES
  );

  secondCanvasContext.strokeStyle = "black";
  secondCanvasContext.strokeRect(
    xCoordinate * NUM_SQUARES,
    yCoordinate * NUM_SQUARES,
    NUM_SQUARES,
    NUM_SQUARES
  );
};

const PIECES = [
  [CZ, "red"],
  [CS, "green"],
  [CT, "purple"],
  [CO, "yellow"],
  [CL, "orange"],
  [CI, "cyan"],
  [CJ, "blue"],
];

let isGameRunning = false;

btnStart.addEventListener("click", () => {
  if (!isGameRunning) {
    isGameRunning = true;
    document.addEventListener("keydown", CONTROL);
    btnStart.disabled = true;
    btnPause.disabled = false;
    // cal the function to start the game
    startThemeSong();
    drop();
  }
});

btnPause.addEventListener("click", () => {
  if (isGameRunning) {
    isGameRunning = false;
    btnStart.disabled = false;
    btnPause.disabled = true;
    document.removeEventListener("keydown", CONTROL);
    stopThemeSong();
    // call the function to Pause the game
    stop_animation();
  }
});

// create the game board

let board_ = [];
for (rw = 0; rw < ROW; rw++) {
  board_[rw] = [];
  for (cl = 0; cl < COL; cl++) {
    board_[rw][cl] = VACANT;
  }
}

function drawGameBoard_() {
  for (r = 0; r < ROW; r++) {
    for (c = 0; c < COL; c++) {
      drawSquare(c, r, board_[r][c]);
    }
  }
}

drawGameBoard_();

// object piece
function generateRandomPiece() {
  let r = (randomN = Math.floor(Math.random() * PIECES.length)); // 0 -> 6

  f = new Piece(PIECES[r][0], PIECES[r][1]);
  return f;
}

/**
 *
 *
 *
 *
 * STOP SATURDAY 20th April
 *
 *
 *
 *
 */

// Create an empty 2D array for the next tetrimino board
let nextShapesBoard = [];
for (let r = 0; r < NUM_ROWS; r++) {
  nextShapesBoard[r] = [];
  for (let c = 0; c < NUM_COLS; c++) {
    nextShapesBoard[r][c] = VACANTs;
  }
}

// Draw the next tetrimino board
function drawNextShapeBoard() {
  for (let r = 0; r < NUM_ROWS; r++) {
    for (let c = 0; c < NUM_COLS; c++) {
      drawSquaresToCanvas(c, r, nextShapesBoard[r][c]);
    }
  }
}

// Function to display the next tetrimino shape
function displayNextShape(nextPiece_) {
  // Clear the next tetrimino board
  for (let r = 0; r < NUM_ROWS; r++) {
    for (let c = 0; c < NUM_COLS; c++) {
      nextShapesBoard[r][c] = VACANTs;
    }
  }
  // Draw the next tetrimino shape on the board
  for (let r = 0; r < nextPiece_.tetromino[nextPiece_.tetrominoN].length; r++) {
    for (
      let c = 0;
      c < nextPiece_.tetromino[nextPiece_.tetrominoN].length;
      c++
    ) {
      if (nextPiece_.tetromino[nextPiece_.tetrominoN][r][c]) {
        nextShapesBoard[r][c] = nextPiece_.color;
      }
    }
  }
  drawNextShapeBoard();
}

let nextPiece = generateRandomPiece();
displayNextShape(nextPiece);

let p = generateRandomPiece();

function Piece(tetromino, color) {
  this.tetromino = tetromino;
  this.color = color;

  this.tetrominoN = 0; // we start from the first pattern
  this.activeTetromino = this.tetromino[this.tetrominoN];

  // we need to control the pieces

  if (color == "yellow" || color == "cyan") {
    this.x = 3;
    this.y = -1;
  }
  if (color == "green" || color == "red") {
    this.x = 2;
    this.y = -1;
  } else {
    this.x = 3;
    this.y = -1;
  }
}

// fill function

Piece.prototype.fill = function (color) {
  for (r = 0; r < this.activeTetromino.length; r++) {
    for (c = 0; c < this.activeTetromino.length; c++) {
      // we draw only occupied squares
      if (this.activeTetromino[r][c]) {
        drawSquare(this.x + c, this.y + r, color);
      }
    }
  }
};

// draw a piece to the board

Piece.prototype.draw = function () {
  this.fill(this.color);
};

Piece.prototype.unDraw = function () {
  this.fill(VACANT);
};

p.draw();

let score = 0;

// move piece down
Piece.prototype.moveDown = function () {
  if (!this.collision(0, 1, this.activeTetromino)) {
    this.unDraw();
    this.y++;
    this.draw();
    // score += 10;
  } else {
    // we lock the piece and generate a new one
    p = nextPiece;

    this.lockShape();
    nextPiece = generateRandomPiece();
    displayNextShape(nextPiece);
  }
  // scoreElement.innerHTML = score;
};

// move Right the piece
Piece.prototype.moveRight = function () {
  if (!this.collision(1, 0, this.activeTetromino)) {
    this.unDraw();
    this.x++;
    this.draw();
  }
};

// move Left the piece
Piece.prototype.moveShapeToLeft = function () {
  if (!this.collision(-1, 0, this.activeTetromino)) {
    this.unDraw();
    this.x--;
    this.draw();
  }
};

// rotate the piece
Piece.prototype.rotateShape = function () {
  let nextPatternToDisplay =
    this.tetromino[(this.tetrominoN + 1) % this.tetromino.length];
  let _kick__ = 0;

  if (this.collision(0, 0, nextPatternToDisplay)) {
    if (this.x > COL / 2) {
      // it's the right wall
      _kick__ = -1; // we need to move the piece to the left
    } else {
      // it's the left wall
      _kick__ = 1; // we need to move the piece to the right
    }
  }

  if (!this.collision(_kick__, 0, nextPatternToDisplay)) {
    this.unDraw();
    this.x += _kick__;
    this.tetrominoN = (this.tetrominoN + 1) % this.tetromino.length; // (0+1)%4 => 1
    this.activeTetromino = this.tetromino[this.tetrominoN];
    this.draw();
  }
};

Piece.prototype.lockShape = function () {
  for (r = 0; r < this.activeTetromino.length; r++) {
    for (c = 0; c < this.activeTetromino.length; c++) {
      // we skip the vacant squares
      if (!this.activeTetromino[r][c]) {
        continue;
      }
      // pieces to lock on top = game over
      if (this.y + r < 0) {
        alert("Game Over");
        stopThemeSong();
        window.location.reload(true);
        // stop request animation frame
        stop_animation();
        gameOver = true;
        break;
      }
      // we lock the piece
      board_[this.y + r][this.x + c] = this.color;
    }
  }
  // remove full rows
  for (r = 0; r < ROW; r++) {
    let isRowFull = true;
    for (c = 0; c < COL; c++) {
      isRowFull = isRowFull && board_[r][c] != VACANT;
    }
    if (isRowFull) {
      // if the row is full
      // we move down all the rows above it
      for (y = r; y > 1; y--) {
        for (c = 0; c < COL; c++) {
          board_[y][c] = board_[y - 1][c];
        }
      }
      // the top row board[0][..] has no row above it
      for (c = 0; c < COL; c++) {
        board_[0][c] = VACANT;
      }
      // increment the score
      currLine += 1;
      playClearAudio();
    }
  }

  // call function to update the game board
  drawGameBoard_();

  // update the score
  lineElement.innerHTML = currLine;
};

// collision function
Piece.prototype.collision = function (xCoord_, yCoord_, currentPiece) {
  for (r = 0; r < currentPiece.length; r++) {
    for (c = 0; c < currentPiece.length; c++) {
      // if the square is empty, we skip it
      if (!currentPiece[r][c]) {
        continue;
      }
      // coordinates of the Piece after movement
      let newX = this.x + c + xCoord_;
      let newY = this.y + r + yCoord_;

      // conditions
      if (newX < 0 || newX >= COL || newY >= ROW) {
        return true;
      }
      // skip newY < 0; board[-1] will crush our game
      if (newY < 0) {
        continue;
      }
      // check if there is a locked Piece alrady in place
      if (board_[newY][newX] != VACANT) {
        return true;
      }
    }
  }
  return false;
};

// hard drop function drop piece instantlly to board

Piece.prototype.hardDrop = function () {
  while (!this.collision(0, 1, this.activeTetromino)) {
    this.unDraw();
    this.y++;
    this.draw();
  }

  this.lockShape();
  playAudio();
};

let stop_anime;

// control piece key function
// document.addEventListener("keydown",CONTROL);

function CONTROL(event) {
  if (event.keyCode == 37 || event.keyCode == 52) {
    playAudio();
    p.moveShapeToLeft();
    dropStart = Date.now();
  } else if (
    event.keyCode == 38 ||
    event.keyCode == 49 ||
    event.keyCode == 53 ||
    event.keyCode == 57
  ) {
    playAudio();
    p.rotateShape();
    dropStart = Date.now();
  } else if (event.keyCode == 39 || event.keyCode == 54) {
    playAudio();
    p.moveRight();
    dropStart = Date.now();
  } else if (event.keyCode == 40 || event.keyCode == 56) {
    score += 1;
    playAudio();
    p.moveDown();
  } else if (event.keyCode == 80) {
    if (isGameRunning == true) {
      isGameRunning = false;
      btnStart.disabled = false;
      btnPause.disabled = true;

      stopThemeSong();
      stop_animation();
    } else {
      isGameRunning = true;
      btnStart.disabled = true;
      btnPause.disabled = false;

      startThemeSong();
      drop();
    }
  } else if (event.keyCode == 32) {
    p.hardDrop();
    score += 12;
  } else if (event.keyCode == 27) {
    window.close();
  }
  scoreElement.innerHTML = score;
}

let dropStart = Date.now();

function drop() {
  let now = Date.now();
  let delta = now - dropStart;

  if (delta > 1000) {
    p.moveDown();
    dropStart = Date.now();
  }
  // p.moveDown();
  stop_anime = requestAnimationFrame(drop);
}

function stop_animation() {
  cancelAnimationFrame(stop_anime);
}

function startAnimation() {
  if (!animationFrameId) {
    draw(); // Start the animation
  }
}
