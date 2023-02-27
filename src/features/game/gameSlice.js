import { createSlice } from '@reduxjs/toolkit'
import {
    defaultState,
    nextRotation,
    canMoveTo,
    addBlockToGrid,
    checkRows,
    addRows
} from '../../utils'

const initialState = defaultState()


export const gameSlice = createSlice({
    name: 'game',
    initialState
    ,
    reducers: {
        startGame: (state) => {
            let { roomShapes, grid, x, y, rotation, score, isRunning } = state
            return { ...initialState, isRunning: true, shape: roomShapes[0], nextShape: roomShapes[1], roomShapes: roomShapes.slice(1) }

        },
        moveRight: (state) => {
            const { shape, grid, x, y, rotation } = state
            if(y < -1) return state
            if (canMoveTo(shape, grid, x + 1, y, rotation)) {
                return { ...state, x: x + 1 }
            }
            return state
        },
        moveLeft: (state) => {
            const { shape, grid, x, y, rotation } = state
            if(y < -1) return state
            // subtract 1 from the x and check if this new position is possible by calling `canMoveTo()     
            if (canMoveTo(shape, grid, x - 1, y, rotation)) {
                return { ...state, x: x - 1 }
            }
            return state
        },
        rotate: (state) => {
            const { shape, rotation, grid, x, y } = state
            const newRotation = nextRotation(shape, rotation)
            if (!canMoveTo(shape, grid, x, y, newRotation)) {
                if (x === 8) // means left
                    return { ...state, x: 6, rotation: newRotation }
                if (x === -1) // means right
                    return { ...state, x: 0, rotation: newRotation }
                return state
            }
            state.rotation = newRotation
        },
        moveDown: (state) => {
            let { shape, grid, x, y, rotation, nextShape, score, isRunning } = state
            //Get the next potential Y position
            const maybeY = y + 1
            // Check if the current block can move here
            if (canMoveTo(shape, grid, x, maybeY, rotation)) {
                // If so move the block
                return { ...state, y: maybeY }
            }
            // if not place the block
            // (this returns an object with a grid and gameover bool)
            const obj = addBlockToGrid(shape, grid, x, y, rotation)
            const newGrid = obj.grid
            const gameOver = obj.gameOver

            if (gameOver) {
                // Game Over
                // console.log("Game Should be over...")
                state.shape = 0
                // state.isRunning = false
                state.grid = newGrid
                state.gameOver = true
                state.isRunning = false
            }

            // reset some things to start a new shape/block
            state.grid = newGrid
            state.shape = state.roomShapes[0]
            state.nextShape = state.roomShapes[1]
            state.roomShapes = state.roomShapes.slice(1)
            state.score = score
            state.isRunning = isRunning
            state.y = -4
            state.x = 3
            state.rotation = 0
            // Update the score and line based on if rows were completed or not
            const { score: scoreGameInfo, line: lineGameInfo } = checkRows(newGrid)
            state.completedLines = lineGameInfo
            state.score += scoreGameInfo
            state.line += lineGameInfo
            state.speed -= state.completedLines * 10 
            state.level = Math.trunc((state.line || 1) / 3) 
        },
        hardDrop: (state) => {
            const { shape, grid, x, y, rotation, nextShape, score, isRunning } = state
            let maybeY = y
            while (canMoveTo(shape, grid, x, maybeY, rotation)) {
                maybeY++
            }
            const obj = addBlockToGrid(shape, grid, x, maybeY - 1, rotation)
            const newGrid = obj.grid
            const gameOver = obj.gameOver

            if (gameOver) {
                // Game Over
                // console.log("Game Should be over...")
                state.shape = 0
                state.grid = newGrid
                state.gameOver = true
            }
            state.grid = newGrid
            state.shape = state.roomShapes[0]
            state.nextShape = state.roomShapes[1]
            state.roomShapes = state.roomShapes.slice(1)
            state.score = score
            state.isRunning = isRunning
            state.y = -4
            state.x = 3
            state.rotation = 0
            const { score: scoreGameInfo, line: lineGameInfo } = checkRows(newGrid)
            state.completedLines = lineGameInfo
            state.score += scoreGameInfo
            state.line += lineGameInfo
            state.speed -= state.completedLines * 10 
            state.level = Math.trunc((state.line || 1) / 3)
            
        }, 
        pause: (state) => {
            return { ...state, isRunning: false }
        },
        resume: (state) => {
            return { ...state, isRunning: true }
        },
        restart: (state) => {
            // console.log("restart game slice ")
            let { roomShapes, grid, x, y, rotation, score, isRunning, gameOver } = state
            return { ...initialState, isRunning: true, gameOver: false, shape: roomShapes[0], nextShape: roomShapes[1], roomShapes: roomShapes.slice(1) }
        },
        gameOver: (state) => initialState,
        updateShapes: (state, { payload }) => {
            // console.log('updating shapes...');
            state.roomShapes = [...state.roomShapes, ...payload]
        },
        initializeShapes: (state, { payload }) => {
            state.roomShapes = payload
        },
        addCompletedLines: (state, { payload: numAddedLines }) => {
            if (numAddedLines > 1) {
                state.y -= numAddedLines
                if (state.y < -4) state.y = -4
                state.grid = addRows(state.grid, numAddedLines)
                state.completedLines = 0
            }
        },
        updateGame: (state, { payload }) => {
            state = { ...state, ...payload }
        },
        initializeCompletedLines: (state, { payload }) => {
            state.completedLines = 0
        },
        errorGame: (state) => {
            state.gameOver = true
            state.isRunning = false
        }
    },


})

export const { updateGame, errorGame, startGame, moveRight, moveLeft, rotate, moveDown, pause, resume, restart, gameOver, hardDrop, updateShapes, initializeShapes, addCompletedLines, initializeCompletedLines } = gameSlice.actions

export default gameSlice.reducer
