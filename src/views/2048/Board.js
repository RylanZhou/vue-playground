export const UP = 'UP'
export const DOWN = 'DOWN'
export const LEFT = 'LEFT'
export const RIGHT = 'RIGHT'

export const BOARD = [
  [0, 0, 0, 0],
  [0, 0, 0, 0],
  [0, 0, 0, 0],
  [0, 0, 0, 0]
]

export const BOARD_STATE = [
  [false, false, false, false],
  [false, false, false, false],
  [false, false, false, false],
  [false, false, false, false]
]

export const EMPTY_SLOTS = []

function initBoard() {
  for (let i = 0; i < BOARD.length; i++) {
    for (let j = 0; j < BOARD[0].length; j++) {
      BOARD[i][j] = 0
      BOARD_STATE[i][j] = false
    }
  }
}

function judgeGameover() {
  for (let i = 1; i < BOARD.length - 1; i++) {
    for (let j = 0; j < BOARD[0].length; j++) {
      // UP, DOWN and LEFT are 0
      if (
        !BOARD[i - 1][j] ||
        !BOARD[i + 1][j] ||
        (j + 1 < BOARD[0].length && !BOARD[i][j + 1])
      ) {
        return false
      }
      // UP, DOWN and LEFT equals itself
      if (
        BOARD[i - 1][j] === BOARD[i][j] ||
        BOARD[i + 1][j] === BOARD[i][j] ||
        (j + 1 < BOARD[0].length && BOARD[i][j + 1] === BOARD[i][j])
      ) {
        return false
      }
    }
  }
  return true
}

function generateNewValue() {
  let row = Math.floor(Math.random() * 4)
  let col = Math.floor(Math.random() * 4)

  // TODO: Optimize
  while (BOARD[row][col]) {
    row = Math.floor(Math.random() * 4)
    col = Math.floor(Math.random() * 4)
  }

  const val = Math.random() < 0.7 ? 2 : 4
  BOARD[row][col] = val

  return {
    row,
    col,
    val
  }
}

function resetBoardState() {
  for (let i = 0; i < BOARD_STATE.length; i++) {
    for (let j = 0; j < BOARD_STATE[0].length; j++) {
      BOARD_STATE[i][j] = false
    }
  }
}

/**
 * @param {number} row
 * @param {number} col
 * @param {string} direction UP|DOWN|LEFT|RIGHT
 * @returns {number} Final destination
 */
function isMovable(row, col, direction) {
  let destination = null
  switch (direction) {
    case UP:
      destination = row
      while (destination - 1 >= 0) {
        if (!BOARD[destination - 1][col]) {
          destination--
        } else if (BOARD[destination - 1][col] === BOARD[row][col]) {
          // If BOARD[destination - 1][col] is a newly merged value, it should not be able to merge again
          if (BOARD_STATE[destination - 1][col]) {
            return destination
          } else {
            BOARD_STATE[destination - 1][col] = true
            return destination - 1
          }
        } else {
          return destination
        }
      }
      return destination
    case DOWN:
      destination = row
      while (destination + 1 < BOARD.length) {
        if (!BOARD[destination + 1][col]) {
          destination++
        } else if (BOARD[destination + 1][col] === BOARD[row][col]) {
          if (BOARD_STATE[destination + 1][col]) {
            return destination
          } else {
            BOARD_STATE[destination + 1][col] = true
            return destination + 1
          }
        } else {
          return destination
        }
      }
      return destination
    case LEFT:
      destination = col
      while (destination - 1 >= 0) {
        if (!BOARD[row][destination - 1]) {
          destination--
        } else if (BOARD[row][destination - 1] === BOARD[row][col]) {
          if (BOARD_STATE[row][destination - 1]) {
            return destination
          } else {
            BOARD_STATE[row][destination - 1] = true
            return destination - 1
          }
        } else {
          return destination
        }
      }
      return destination
    case RIGHT:
      destination = col
      while (destination + 1 < BOARD[0].length) {
        if (!BOARD[row][destination + 1]) {
          destination++
        } else if (BOARD[row][destination + 1] === BOARD[row][col]) {
          if (BOARD_STATE[row][destination + 1]) {
            return destination
          } else {
            BOARD_STATE[row][destination + 1] = true
            return destination + 1
          }
        } else {
          return destination
        }
      }
      return destination
    default:
      return destination
  }
}

export default {
  initBoard,
  judgeGameover,
  generateNewValue,
  resetBoardState,
  isMovable
}
