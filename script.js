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

  const getAvailableCells = () => {
    const availableCells = [];

    board.forEach((row) => {
      row.forEach((column) => {
        if (column.getValue() === "") {
          availableCells.push(column.getValue());
        }
      });
    });

    return availableCells;
  };

  const dropToken = (cell, token) => {};

  return { getBoard, getAvailableCells };
})();

console.log(gameBoard.getAvailableCells());

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
