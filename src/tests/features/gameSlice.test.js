import reducer, { startGame, moveRight, moveLeft, rotate, moveDown, hardDrop, pause, resume, restart, gameOver, errorGame, updateShapes, initializeShapes, updateGame, initializeCompletedLines, addCompletedLines } from '../../features/game/gameSlice'
import { defaultState, gridDefault,  } from '../../utils'

it('should return the initial state', () => {
  expect(reducer(undefined, { type: undefined })).toEqual(
    defaultState()
  )
})

it('should start the game', () => {
  const previousState = {
    grid: gridDefault(),
    shape: 0,
    roomShapes: [2, 7, 5, 1, 3, 4, 6],
    rotation: 0,
    x: 3,
    y: -4,
    nextShape: 0,
    isRunning: false,
    score: 0,
    level: 0,
    line: 0,
    completedLines: 0,
    speed: 500,
    gameOver: false
  }

  expect(reducer(previousState, startGame())).toEqual(
    { ...previousState, isRunning: true, shape: previousState.roomShapes[0], nextShape: previousState.roomShapes[1], roomShapes: previousState.roomShapes.slice(1) }
  )
})

it('should should move the tetrimino right', () => {
  const previousState = {
    grid: gridDefault(),
    shape: 3,
    roomShapes: [4, 5, 7, 6, 2, 1],
    rotation: 0,
    x: 3,
    y: 2,
    nextShape: 4,
    isRunning: true,
    score: 0,
    level: 0,
    line: 0,
    completedLines: 0,
    speed: 500,
    gameOver: false
  }

  expect(reducer(previousState, moveRight())).toEqual(
    { ...previousState, x: previousState.x + 1 }
  )
})

it('should should not move the tetrimino right', () => {
  const previousState = {
    grid: gridDefault(),
    shape: 7,
    roomShapes: [4, 2, 1, 3, 5],
    rotation: 0,
    x: 7,
    y: 1,
    nextShape: 4,
    isRunning: true,
    score: 0,
    level: 0,
    line: 0,
    completedLines: 0,
    speed: 500,
    gameOver: false
  }

  expect(reducer(previousState, moveRight())).toEqual(
    previousState
  )
})

it('should should move the tetrimino left', () => {
  const previousState = {
    grid: gridDefault(),
    shape: 3,
    roomShapes: [4, 5, 7, 6, 2, 1],
    rotation: 0,
    x: 3,
    y: 2,
    nextShape: 4,
    isRunning: true,
    score: 0,
    level: 0,
    line: 0,
    completedLines: 0,
    speed: 500,
    gameOver: false
  }

  expect(reducer(previousState, moveLeft())).toEqual(
    { ...previousState, x: previousState.x - 1 }
  )
})


it('should should not move the tetrimino left', () => {
  const previousState = {
    grid: gridDefault(),
    shape: 5,
    roomShapes: [6, 2, 3, 1, 4, 7],
    rotation: 0,
    x: 0,
    y: 0,
    nextShape: 6,
    isRunning: true,
    score: 0,
    level: 0,
    line: 0,
    completedLines: 0,
    speed: 500,
    gameOver: false
  }

  expect(reducer(previousState, moveLeft())).toEqual(
    previousState
  )
})

it('should rotate the tetrimino ', () => {
  const previousState = {
    grid: gridDefault(),
    shape: 3,
    roomShapes: [4, 5, 7, 6, 2, 1],
    rotation: 0,
    x: 3,
    y: 2,
    nextShape: 4,
    isRunning: true,
    score: 0,
    level: 0,
    line: 0,
    completedLines: 0,
    speed: 500,
    gameOver: false
  }

  expect(reducer(previousState, rotate())).toEqual(
    { ...previousState, rotation: 1 }
  )
})

it('should rotate the tetrimino in case x === 8', () => {
  const previousState = {
    grid: gridDefault(),
    shape: 7,
    roomShapes: [4, 5, 7, 6, 2, 1],
    rotation: 0,
    x: 8,
    y: 2,
    nextShape: 4,
    isRunning: true,
    score: 0,
    level: 0,
    line: 0,
    completedLines: 0,
    speed: 500,
    gameOver: false
  }

  expect(reducer(previousState, rotate())).toEqual(
    { ...previousState, rotation: 0, x: 6 }
  )
})

it('should rotate the tetrimino in case x === -1', () => {
  const previousState = {
    grid: gridDefault(),
    shape: 3,
    roomShapes: [4, 5, 7, 6, 2, 1],
    rotation: 0,
    x: -1,
    y: 2,
    nextShape: 4,
    isRunning: true,
    score: 0,
    level: 0,
    line: 0,
    completedLines: 0,
    speed: 500,
    gameOver: false
  }

  expect(reducer(previousState, rotate())).toEqual(
    { ...previousState, rotation: 1, x: 0 }
  )
})

it('should move tetrimino then rotate the tetrimino ', () => {
  const previousState = {
    grid: gridDefault(),
    shape: 3,
    roomShapes: [4, 5, 7, 6, 2, 1],
    rotation: 0,
    x: -10,
    y: 2,
    nextShape: 4,
    isRunning: true,
    score: 0,
    level: 0,
    line: 0,
    completedLines: 0,
    speed: 500,
    gameOver: false
  }

  expect(reducer(previousState, rotate())).toEqual(
    { ...previousState }
  )
})




it('should move down the tetrimino ', () => {
  const previousState = {
    grid: gridDefault(),
    shape: 3,
    roomShapes: [4, 5, 7, 6, 2, 1],
    rotation: 0,
    x: 3,
    y: 2,
    nextShape: 4,
    isRunning: true,
    score: 0,
    level: 0,
    line: 0,
    completedLines: 0,
    speed: 500,
    gameOver: false
  }

  expect(reducer(previousState, moveDown())).toEqual(
    { ...previousState, y: 3 }
  )
})

it('move down case game over', () => {
  const previousState = {
    grid: gridDefault(),
    shape: 1,
    roomShapes: [1, 1, 1, 1, 1, 1],
    rotation: 0,
    x: 3,
    y: -1,
    nextShape: 1,
    isRunning: true,
    score: 0,
    level: 0,
    line: 0,
    completedLines: 0,
    speed: 500,
    gameOver: false
  }
  previousState.grid[1] = [
    0, 0, 0, 1, 1,
    1, 1, 0, 0, 0
  ]

  const expectedState = {
    ...previousState,
    roomShapes: [1, 1, 1, 1, 1 ],
    y: -4,
    gameOver: true
  }

  expectedState.grid[0] = [
    0, 0, 0, 1, 1,
    1, 1, 0, 0, 0
  ]

  expect(reducer(previousState, moveDown())).toEqual(
    { ...expectedState}
  )
})


it('should  hard drop the tetrimino ', () => {
  const previousState = {
    grid: gridDefault(),
    shape: 3,
    roomShapes: [4, 5, 7, 6, 2, 1],
    rotation: 0,
    x: 3,
    y: 2,
    nextShape: 4,
    isRunning: true,
    score: 0,
    level: 0,
    line: 0,
    completedLines: 0,
    speed: 500,
    gameOver: false

  }

  const grid = gridDefault()

  grid[18] = [
    0, 0, 0, 3, 3,
    3, 0, 0, 0, 0
  ]

  grid[19] = [
    0, 0, 0, 3, 0,
    0, 0, 0, 0, 0
  ]


  const expectedNewState = {
    ...previousState,
    grid: grid,
    shape: 4,
    nextShape: 5,
    roomShapes: [5, 7, 6, 2, 1],
    x: 3,
    y: -4
  }

  expect(reducer(previousState, hardDrop())).toEqual(expectedNewState)
})

it('hard drop case game over', () => {
  const previousState = {
    grid: gridDefault(),
    shape: 1,
    roomShapes: [1, 1, 1, 1, 1, 1],
    rotation: 0,
    x: 3,
    y: -1,
    nextShape: 1,
    isRunning: true,
    score: 0,
    level: 0,
    line: 0,
    completedLines: 0,
    speed: 500,
    gameOver: false
  }
  previousState.grid[1] = [
    0, 0, 0, 1, 1,
    1, 1, 0, 0, 0
  ]

  const expectedState = {
    ...previousState,
    roomShapes: [1, 1, 1, 1, 1 ],
    y: -4,
    gameOver: true
  }

  expectedState.grid[0] = [
    0, 0, 0, 1, 1,
    1, 1, 0, 0, 0
  ]

  expect(reducer(previousState, hardDrop())).toEqual(
    { ...expectedState}
  )
})

it('should pause the game', () => {
  const previousState = {
    grid: gridDefault(),
    shape: 3,
    roomShapes: [4, 5, 7, 6, 2, 1],
    rotation: 0,
    x: 3,
    y: 2,
    nextShape: 4,
    isRunning: true,
    score: 0,
    level: 0,
    line: 0,
    completedLines: 0,
    speed: 500,
    gameOver: false
  }

  expect(reducer(previousState, pause())).toEqual(
    { ...previousState, isRunning: false }
  )
})

it('should resume the game', () => {
  const previousState = {
    grid: gridDefault(),
    shape: 3,
    roomShapes: [4, 5, 7, 6, 2, 1],
    rotation: 0,
    x: 3,
    y: 2,
    nextShape: 4,
    isRunning: false,
    score: 0,
    level: 0,
    line: 0,
    completedLines: 0,
    speed: 500,
    gameOver: false
  }

  expect(reducer(previousState, resume())).toEqual(
    { ...previousState, isRunning: true }
  )
})

it('should restart the game', () => {
  const previousState = {
    grid: gridDefault(),
    shape: 3,
    roomShapes: [4, 5, 7, 6, 2, 1],
    rotation: 0,
    x: 3,
    y: 2,
    nextShape: 4,
    isRunning: true,
    score: 0,
    level: 0,
    line: 0,
    completedLines: 0,
    speed: 500,
    gameOver: false
  }

  const expectedState = {
    ...previousState,
    grid: gridDefault(),
    shape: 4,
    roomShapes: [5, 7, 6, 2, 1],
    rotation: 0,
    x: 3,
    y: -4,
    nextShape: 5,
  }

  expect(reducer(previousState, restart())).toEqual(expectedState)
})

it('should game over', () => {
  const previousState = {
    grid: gridDefault(),
    shape: 3,
    roomShapes: [4, 5, 7, 6, 2, 1],
    rotation: 0,
    x: 3,
    y: 2,
    nextShape: 4,
    isRunning: true,
    score: 0,
    level: 0,
    line: 0,
    completedLines: 0,
    speed: 500,
    gameOver: false
  }
  expect(reducer(previousState, gameOver())).toEqual(defaultState())
})

it('should update shapes ', () => {
  const newShapes = [4, 5, 7, 6, 2, 1]
  const previousState = {
    grid: gridDefault(),
    shape: 3,
    roomShapes: [],
    rotation: 0,
    x: 3,
    y: 2,
    nextShape: 4,
    isRunning: true,
    score: 0,
    level: 0,
    line: 0,
    completedLines: 0,
    speed: 500,
    gameOver: false
  }

  const expectedState = {
    ...previousState,
    roomShapes: newShapes
  }

  expect(reducer(previousState, updateShapes(newShapes))).toEqual(expectedState)
})


it('should initialize shapes', () => {
  const newShapes = [4, 5, 7, 6, 2, 1]
  const previousState = {
    grid: gridDefault(),
    shape: 3,
    roomShapes: [],
    rotation: 0,
    x: 3,
    y: 2,
    nextShape: 4,
    isRunning: true,
    score: 0,
    level: 0,
    line: 0,
    completedLines: 0,
    speed: 500,
    gameOver: false
  }

  const expectedState = {
    ...previousState,
    roomShapes: newShapes
  }

  expect(reducer(previousState, initializeShapes(newShapes))).toEqual(expectedState)
})

it('should update the game state', () => {
  const previousState = defaultState()
  expect(reducer(previousState, updateGame(previousState))).toEqual(previousState)
})

it('should add completed lines', () => {
  const previousState = defaultState()
  expect(reducer(previousState, addCompletedLines(1))).toEqual(previousState)
})


it('should add completed lines > 1', () => {
  const previousState = {
    grid: gridDefault(),
    shape: 3,
    roomShapes: [],
    rotation: 0,
    x: 3,
    y: 4,
    nextShape: 4,
    isRunning: true,
    score: 0,
    level: 0,
    line: 0,
    completedLines: 0,
    speed: 500,
    gameOver: false
  }

  const grid = gridDefault()

  grid[19] = [
    8, 8, 8, 8, 8,
    8, 8, 8, 8, 8
  ]

  const expectedState = {
    ...previousState,
    grid,
    rotation: 0,
    x: 3,
    y: 2,
  }


  expect(reducer(previousState, addCompletedLines(2))).toEqual(expectedState)
})

it('should add completed lines > 1 &&  y < -4', () => {
  const previousState = {
    grid: gridDefault(),
    shape: 3,
    roomShapes: [],
    rotation: 0,
    x: 3,
    y: -10,
    nextShape: 4,
    isRunning: true,
    score: 0,
    level: 0,
    line: 0,
    completedLines: 0,
    speed: 500,
    gameOver: false
  }

  const grid = gridDefault()

  grid[19] = [
    8, 8, 8, 8, 8,
    8, 8, 8, 8, 8
  ]

  const expectedState = {
    ...previousState,
    grid,
    rotation: 0,
    x: 3,
    y: -4,
  }


  expect(reducer(previousState, addCompletedLines(2))).toEqual(expectedState)
})


it('should initilize completed lines', () => {
  const previousState = {
    grid: gridDefault(),
    shape: 3,
    roomShapes: [],
    rotation: 0,
    x: 3,
    y: 2,
    nextShape: 4,
    isRunning: true,
    score: 0,
    level: 0,
    line: 0,
    completedLines: 5,
    speed: 500,
    gameOver: false
  }
  expect(reducer(previousState, initializeCompletedLines())).toEqual({ ...previousState, completedLines: 0 })
})

it('should error game ', () => {
  const previousState = {
    grid: gridDefault(),
    shape: 3,
    roomShapes: [4, 5, 7, 6, 2, 1],
    rotation: 0,
    x: 3,
    y: 2,
    nextShape: 4,
    isRunning: true,
    score: 0,
    level: 0,
    line: 0,
    completedLines: 0,
    speed: 500,
    gameOver: false
  }

  const expectedState = {
    ...previousState,
    gameOver: true,
    isRunning: false
  }
  expect(reducer(previousState, errorGame())).toEqual(expectedState)
})
