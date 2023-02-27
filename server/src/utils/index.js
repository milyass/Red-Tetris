// Define block shapes and their rotations as arrays.
const shapes = [
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

  const gridDefault = () => {
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
  
  const initialGameState = {
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
    speed: 800,
    // Game isn't over yet
    gameOver: false,
    gameStatus: 'pending',
  }

  const CONSTANTS = {
    DISCONNECT: "disconnect",
    SEND_MESSAGE:"SEND_MESSAGE",
    CREATE_OR_JOIN_ROOM: "CREATE_OR_JOIN_ROOM",
    START_GAME: "START_GAME",
    RESTART_GAME: "RESTART_GAME",
    GET_NEW_SHAPES: "GET_NEW_SHAPES",
    ADD_COMPLETED_LINES: "ADD_COMPLETED_LINES",
    SHARE_OPPONENT_STATE_WITH_ROOM: "SHARE_OPPONENT_STATE_WITH_ROOM"
  }

  const isValidCreationRoom = (creationString) => {
    const regexPattern = new RegExp(/^\/\#\w+\[\w+\]/)
    return regexPattern.test(creationString) && creationString.length <= 100
  }


  module.exports = {shapes, initialGameState, CONSTANTS, isValidCreationRoom}