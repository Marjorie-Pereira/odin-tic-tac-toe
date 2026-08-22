const gameBoard = (() => {
  const rows = 3;
  const columns = 3;
  const board = [];

  for (let i = 0; i < rows; i++) {
    board[i] = [];
    for (let j = 0; j < columns; j++) {
      board[i].push(Cell());
    }
  }

  const getBoard = () => board;

  const findCellPosition = (cell) => {
    const positions = [];
    board.forEach((row) => {
      const foundCell = row.find((element) => element === cell);
      if (foundCell) {
        const rowIndex = board.indexOf(row);
        const cellIndex = row.indexOf(cell);
        positions.push(rowIndex);
        positions.push(cellIndex);
      }
    });

    return positions;
  };

  const dropToken = (cell, token) => {
    if (cell.getValue() != "") return;

    const [row, selectedCell] = findCellPosition(cell);

    board[row][selectedCell].addToken(token);
  };

  const printBoard = () => {
    const boardWithCellValues = board.map((row) =>
      row.map((cell) => cell.getValue()),
    );

    boardWithCellValues.forEach((row) => {
      console.log(row);
    });
  };

  const isBoardFilled = () => {
    const isFilled = board.flat().every((cell) => cell.getValue() != "");

    return isFilled;
  };

  return { getBoard, dropToken, printBoard, isBoardFilled };
})();

function Cell() {
  let value = "";

  const addToken = (token) => {
    value = token;
  };

  const getValue = () => value;

  return {
    addToken,
    getValue,
  };
}

function TicTacToe(playerOneName = "Player One", playerTwoName = "Player Two") {
  const players = [
    {
      name: playerOneName,
      token: "X",
    },
    {
      name: playerTwoName,
      token: "O",
    },
  ];

  let activePlayer = players[0];

  const switchPlayerTurn = () => {
    activePlayer = activePlayer === players[0] ? players[1] : players[0];
  };

  const getActivePlayer = () => activePlayer;

  const checkCellValue = (array, token) => {
    return array.every((cell) => cell.getValue() === token);
  };

  const checkForWinner = () => {
    const playerToken = getActivePlayer().token;

    const board = gameBoard.getBoard();
    let winner = false;

    for (let i = 0; i < board[0].length; i++) {
      const row = board[i];

      const boardColumn = [board[0][i], board[1][i], board[2][i]];

      winner =
        checkCellValue(row, playerToken) ||
        checkCellValue(boardColumn, playerToken);

      if (winner) {
        return true;
      }
    }

    const diagonal = [board[0][0], board[1][1], board[2][2]];
    const reverseDiagonal = [board[0][2], board[1][1], board[2][0]];

    winner =
      checkCellValue(diagonal, playerToken) ||
      checkCellValue(reverseDiagonal, playerToken);

    return winner;
  };

  const isGameOver = () => {
    const gameOver = checkForWinner() || gameBoard.isBoardFilled();

    if (gameOver) {
      const message = checkForWinner()
        ? `${getActivePlayer().name} is the winner`
        : "The Game is Over, No One Wins";
      console.log(message);
    }
    return gameOver;
  };

  const printNewRound = () => {
    gameBoard.printBoard();
    console.log(`${getActivePlayer().name}'s turn.`);
  };

  const playRound = (cell) => {
    console.log(
      `Dropping ${getActivePlayer().name}'s token into selected cell...`,
    );

    gameBoard.dropToken(cell, getActivePlayer().token);
    const gameOver = isGameOver();

    if (gameOver) {
      gameBoard.printBoard();
      return;
    }

    switchPlayerTurn();
    printNewRound();
  };

  printNewRound();

  return { getActivePlayer, getBoard: gameBoard.getBoard, playRound };
}

const startBtn = document.querySelector("#start-btn");
const startScreen = document.querySelector("#start-screen");
const playerOneInput = document.querySelector("#playerOne");
const playerTwoInput = document.querySelector("#playerTwo");
let playerOneName;
let playerTwoName;

startBtn.addEventListener("click", () => {
  startScreen.innerHTML = "";
  playerOneName = playerOneInput.value.trim();
  playerTwoName = playerTwoInput.value.trim();

  startScreen.innerHTML = `
  <div class="score">
        <div class="p1-score">
          <h2>${playerOneName || "Player One"}</h2>
          <p>Score: 0</p>
        </div>
        <div class="p2-score">
          <h2>${playerTwoName || "Player Two"}</h2>
          <p>Score: 0</p>
        </div>
  </div>
  `;
});
