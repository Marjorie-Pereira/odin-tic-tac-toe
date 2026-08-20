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
    console.log(boardWithCellValues);
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

const game = ((playerOneName = "Player One", playerTwoName = "Player Two") => {
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
    activePlayer = activePlayer === players[0] ? players[0] : players[1];
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
    return checkForWinner() || gameBoard.isBoardFilled();
  };

  const printNewRound = () => {
    board.printBoard();
    console.log(`${getActivePlayer().name}'s turn.`);
  };

  return { getActivePlayer, getBoard: gameBoard.getBoard, isGameOver };
})();

gameBoard.printBoard();

const first = gameBoard.getBoard().at(0);
const second = gameBoard.getBoard().at(1);
const third = gameBoard.getBoard().at(2);

// line test
// first.forEach((cell) => gameBoard.dropToken(cell, "X"));

// column test
// gameBoard.dropToken(first[0], "X");
// gameBoard.dropToken(second[0], "X");
// gameBoard.dropToken(third[0], "X");
// gameBoard.dropToken(first[1], "X");
// gameBoard.dropToken(second[1], "X");
// gameBoard.dropToken(third[1], "X");

//diagonal test
// gameBoard.dropToken(first[0], "X");
// gameBoard.dropToken(second[1], "X");
// gameBoard.dropToken(third[2], "X");
// gameBoard.dropToken(first[2], "X");
// gameBoard.dropToken(second[1], "X");
// gameBoard.dropToken(third[0], "X");

first.forEach((cell, idx) => {
  const token = idx % 2 === 0 ? "X" : "O";
  gameBoard.dropToken(cell, token);
});

second.forEach((cell, idx) => {
  const token = idx % 2 != 0 ? "X" : "O";
  gameBoard.dropToken(cell, token);
});
third.forEach((cell, idx) => {
  const token = idx % 2 === 0 ? "1" : "2";
  gameBoard.dropToken(cell, token);
});
gameBoard.printBoard();

const isOver = game.isGameOver();
console.log(isOver);
