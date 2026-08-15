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

  return { getBoard, dropToken, printBoard };
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

  return { getActivePlayer, getBoard: gameBoard.getBoard };
})();
