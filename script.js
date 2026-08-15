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
  return { getBoard, dropToken };
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
