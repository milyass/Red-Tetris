

export const utils = {
  dark: {
    '--bs-body-bg': '#292929',
    '--g-text-color-light': '#ededed',
    '--g-text-color-secondary-light': '#cccccc',
    '--light-bg': '#292929',
    '--light-bg-dark-shadow': '#141414',
    '--light-bg-light-shadow': '#515151',
    '--primary': '#0791b4',
    '--g-display-color': '#ededed',
    '--tetrimino-shadow-color': 'rgba(0, 0, 0, 0.4)',
  },
  light: {
    '--bs-body-bg': '#f0f0f0',
    '--g-text-color-light': '#000000',
    '--g-text-color-secondary-light': '#000000',
    '--light-bg': '#f0f0f0',
    '--light-bg-dark-shadow': '#AEAEC0',
    '--light-bg-light-shadow': '#FFFFFF',
    '--primary': '#04809f',
    '--g-display-color': '#363636',
    '--tetrimino-shadow-color': 'rgba(255, 255, 255, 0.4)',
  },
  setCSSRootVariables: (vars = {}) => {
    for (const key in vars) {
      const value = vars[key]
      document.documentElement.style.setProperty(`${key}`, `${value}`)
    }
  }
}


export const random = (min, max) => {
  return Math.floor(Math.random() * (max - min + 1)) + min
}

export const gridDefault = () => {
  const rows = 20
  const cols = 10
  const array = []

  for (let row = 0; row < rows; row++) {
    array.push([])
    for (let col = 0; col < cols; col++) {
      array[row].push(0)
    }
  }

  return array
}

// Define block shapes and their rotations as arrays.
export const shapes = [
  // none
  [[[0, 0, 0, 0],
  [0, 0, 0, 0],
  [0, 0, 0, 0],
  [0, 0, 0, 0]]],

  // I
  [
    [[0, 0, 0, 0],
    [1, 1, 1, 1],
    [0, 0, 0, 0],
    [0, 0, 0, 0]],
    [[0, 1, 0, 0],
    [0, 1, 0, 0],
    [0, 1, 0, 0],
    [0, 1, 0, 0]],
  ],

  // T
  [[[0, 0, 0, 0],
  [1, 1, 1, 0],
  [0, 1, 0, 0],
  [0, 0, 0, 0]],

  [[0, 1, 0, 0],
  [1, 1, 0, 0],
  [0, 1, 0, 0],
  [0, 0, 0, 0]],

  [[0, 1, 0, 0],
  [1, 1, 1, 0],
  [0, 0, 0, 0],
  [0, 0, 0, 0]],

  [[0, 1, 0, 0],
  [0, 1, 1, 0],
  [0, 1, 0, 0],
  [0, 0, 0, 0]]],

  // L
  [[[0, 0, 0, 0],
  [1, 1, 1, 0],
  [1, 0, 0, 0],
  [0, 0, 0, 0]],

  [[1, 1, 0, 0],
  [0, 1, 0, 0],
  [0, 1, 0, 0],
  [0, 0, 0, 0]],

  [[0, 0, 1, 0],
  [1, 1, 1, 0],
  [0, 0, 0, 0],
  [0, 0, 0, 0]],

  [[0, 1, 0, 0],
  [0, 1, 0, 0],
  [0, 1, 1, 0],
  [0, 0, 0, 0]]],

  // J
  [[[1, 0, 0, 0],
  [1, 1, 1, 0],
  [0, 0, 0, 0],
  [0, 0, 0, 0]],

  [[0, 1, 1, 0],
  [0, 1, 0, 0],
  [0, 1, 0, 0],
  [0, 0, 0, 0]],

  [[0, 0, 0, 0],
  [1, 1, 1, 0],
  [0, 0, 1, 0],
  [0, 0, 0, 0]],

  [[0, 1, 0, 0],
  [0, 1, 0, 0],
  [1, 1, 0, 0],
  [0, 0, 0, 0]]],

  // Z
  [[[0, 0, 0, 0],
  [1, 1, 0, 0],
  [0, 1, 1, 0],
  [0, 0, 0, 0]],

  [[0, 0, 1, 0],
  [0, 1, 1, 0],
  [0, 1, 0, 0],
  [0, 0, 0, 0]]],

  // S
  [[[0, 0, 0, 0],
  [0, 1, 1, 0],
  [1, 1, 0, 0],
  [0, 0, 0, 0]],

  [[0, 1, 0, 0],
  [0, 1, 1, 0],
  [0, 0, 1, 0],
  [0, 0, 0, 0]]],

  // O
  [[[0, 1, 1, 0],
  [0, 1, 1, 0],
  [0, 0, 0, 0],
  [0, 0, 0, 0]]]
]

// Random Shape
export const randomShape = () => {
  return random(1, shapes.length - 1)
  // return 1
}


// Return the default state for the game
export const defaultState = () => {
  return {
    // Create an empty grid
    grid: gridDefault(),
    // Get a new random shape
    shape: 0,
    // Room Shapes
    roomShapes: [],
    // set rotation of the shape to 0
    rotation: 0,
    // set the 'x' position of the shape to 5 and y to -4, which puts the shape in the center of the grid, above the top
    x: 3,
    y: -4,
    // set the index of the next shape to a new random shape
    nextShape: 0,
    // Tell the game that it's currently running
    isRunning: false,
    // Set the score to 0
    score: 0,
    // Set the default level
    level: 0,
    // Set the default Line 
    line: 0,
    completedLines: 0,
    // Set the default speed
    speed: 500,
    // Game isn't over yet
    gameOver: false,
  }
}



// Returns the next rotation for a shape
// rotation can't exceed the last index of the the rotations for the given shape.
export const nextRotation = (shape, rotation) => {
  return (rotation + 1) % shapes[shape].length
}

export const canMoveTo = (shape, grid, x, y, rotation) => {
  const currentShape = shapes[shape][rotation]
  // Get the width and height of the grid
  const gridWidth = grid[0].length - 1
  const gridHeight = grid.length - 1
  // Loop through all rows and cols of the **shape**
  for (let row = 0; row < currentShape.length; row++) {
    for (let col = 0; col < currentShape[row].length; col++) {
      // Look for a 1 here
      if (currentShape[row][col] !== 0) {
        // x offset on grid
        const proposedX = col + x
        // y offset on grid
        const proposedY = row + y
        // Get the possible row. This might be undefined if we're above the top
        const possibleRow = grid[proposedY]
        // prevent moving block before is showed in the grid board
        // if ((proposedX < 3 || proposedX > 6) && possibleRow === undefined)
        //   return false
        // Off the left or right side or off the bottom return false
        if (proposedX < 0 || proposedX > gridWidth || proposedY > gridHeight) {
          return false
        } else if (possibleRow !== undefined) {
          // If the row is not undefined you're on the grid
          if (possibleRow[proposedX] !== 0) {
            // This square must be filled
            return false
          }
        }
      }
    }
  }
  return true
}

// Adds current shape to grid
export const addBlockToGrid = (shape, grid, x, y, rotation) => {
  // At this point the game is not over
  let blockOffGrid = false
  // Get the block array
  const block = shapes[shape][rotation];
  // console.log(`const block = shapes[${shape}][${rotation}]`);
  // console.log(`const block = ${block}`);
  // Copy the grid
  const newGrid = [...grid];
  // Map the Block onto the grid 
  for (let row = 0; row < block.length; row++) {
    for (let col = 0; col < block[row].length; col++) {

      const yIndex = row + y
      const xIndex = col + x
      // console.log(`[row = ${row}] [col = ${col}])`, `[yIndex = ${yIndex}] [xIndex = ${xIndex}])`);

      if (yIndex < 0 && !canMoveTo(shape, newGrid, 3, 0, rotation)) {
        blockOffGrid = true
        break;
      }

      else if (block[row][col] && newGrid[yIndex] !== undefined && newGrid[yIndex][xIndex] !== undefined) {
        // console.log(
        //   `add block to grid if block[${row}][${col}] => (${block[row][col]})`,
        //   `add block to grid newGrid[${yIndex}][${xIndex}] => (${newGrid[yIndex][xIndex]})`,
        //   `add block to grid newGrid[yIndex][xIndex] = ${shape}`,
        // )
        newGrid[yIndex][xIndex] = shape;
      }
    }
  }
  return { grid: newGrid, gameOver: blockOffGrid };
}

// Checks for completed rows and scores points
export const checkRows = (grid) => {
  let completedRows = 0
  let score = 0
  for (let row = 0; row < grid.length; row++) {
    // No empty cells means it can't find a 0, so the row must be complete!
    if (grid[row].indexOf(0) === -1 && grid[row].indexOf(8) === -1) {
      completedRows += 1
      // Remove the row and add a new empty one at the top
      grid.splice(row, 1)
      grid.unshift(Array(10).fill(0))
    }
  }
  // i.e. 50 points for completing each row, 100 points for two rows,...s
  score = completedRows * 50

  return { score, 'line': completedRows }
}


export const addRows = (grid, numAddedLines) => {

  if (numAddedLines === 1) {
    grid.shift(1)
    grid.push(Array(10).fill(8))
  }

  for (let index = 0; index < numAddedLines - 1; index++) {
    grid.shift(1)
    grid.push(Array(10).fill(8))
  }
  return grid
}


export const scrollToBottom = (messagesEndRef) => {
    messagesEndRef?.current?.scrollIntoView()
}