import { connectSocket,emitGetNewShapes } from '../features/socket/socketSlice'
import io from "socket.io-client";
import {
  canMoveTo,
  addBlockToGrid
} from '../utils'
const SERVER_URL = `${process.env.REACT_APP_URL}:${process.env.REACT_APP_SERVER_PORT}`
const REACT_APP_SECRET = process.env.REACT_APP_SECRET

export const socketMiddleware = (store) => {

  return (next) => (action) => {
    if (action.type === "socket/attemptConnection") {
      const socket = io(SERVER_URL, {
        extraHeaders: {
          "X-Red-Tetris-Client": REACT_APP_SECRET
        },
        path: "/socket"
      })
      store.dispatch(connectSocket(socket))
      let stateSocket = store.getState().socket
      stateSocket.connection?.on('connect', () => {
        // console.log('socket connected');
        // console.log(stateSocket.connection?.id);
      })
    }

    if(store.getState().game?.shape === undefined){
       next({ type: "game/errorGame", payload: {} })
    }

    if(action.type === "game/moveDown") {
     const {
      shape, grid, x, y, rotation,
      roomShapes
     } = store.getState().game
     
     const maybeY = (action.type === "game/moveDown" && y + 1) || y
    // check if we need more shapes then emit event
    if(roomShapes.length === 2 && !canMoveTo(shape, grid, x, maybeY, rotation)) {
      const roomData = store.getState().socket.roomData
      store.dispatch(emitGetNewShapes(roomData))
      // console.log('firing...');
    }
    }

    if( action.type === "game/hardDrop") {
      const {
       shape, grid, x, y, rotation,
       roomShapes
      } = store.getState().game
      let maybeY = y 
      while (canMoveTo(shape, grid, x, maybeY, rotation))
        maybeY++
     // check if we need more shapes then emit event
     if(roomShapes.length === 2 && !canMoveTo(shape, grid, x, maybeY, rotation)) {
       const roomData = store.getState().socket.roomData
       store.dispatch(emitGetNewShapes(roomData))
      //  console.log('firing...');
     }
    }
    next(action);
  }
}