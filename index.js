const TicTacToeGame= () => {
  const board = [];
  const setBoard = () => {
    for (let i = 0; i < 3; i += 1) {
      board[i][0] = 0;
      board[i][1] = 0;
      board[i][2] = 0;
    }
  };
  const flipTile = (playercode, row, col) => {
    if (playercode === 1)board[row][col] = 1;
  };
  return { flipTile };
};

const aGame = TicTacToeGame();
