const check5Sequence = (
  board: number[][],
  x: number,
  y: number,
  dx: number,
  dy: number,
  player: number
): boolean => {
  if (board[x][y] !== player) {
    return false;
  }
  for (let i = 0; i < 5; i++) {
    const tx = x + dx * i;
    const ty = y + dy * i;
    if (tx < 0 || tx >= 10 || ty < 0 || ty >= 10 || board[tx][ty] !== player) {
      return false;
    }
  }
  return true;
}

export const checkWinningCondition = (board: number[][], player: number): boolean => {
  const dx: number[] = [-1, 0, 1, -1, 1, -1, 0, 1];
  const dy: number[] = [-1, -1, -1, 0, 0, 1, 1, 1];
  for (let i = 0; i < 10; i++) {
    for (let j = 0; j < 10; j++) {
      for (let k = 0; k < 8; k++) {
        if (check5Sequence(board, i, j, dx[k], dy[k], player)) {
          return true;
        }
      }
    }
  }
  return false;
}