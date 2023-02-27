import { createSlice } from '@reduxjs/toolkit'


const events = {
    CREATE_OR_JOIN_ROOM: "CREATE_OR_JOIN_ROOM",
    START_GAME : "START_GAME",
    GET_NEW_SHAPES : 'GET_NEW_SHAPES',
    ADD_COMPLETED_LINES : 'ADD_COMPLETED_LINES',
    SEND_MESSAGE : 'SEND_MESSAGE',
    RESTART_GAME :'RESTART_GAME',
}


const initialState = {
    connection: null,
    roomData: {},
}


export const socketSlice = createSlice({
    name: 'socket',
    initialState,
    reducers: {
        connectSocket: (state, {payload}) => {
            state.connection = payload
        },
        attemptConnection: (state) => {
            // console.log("Attempting connection...")
            state = state
        },
        emitCreateOrJoinRoom: (state,{payload}) => {
            // console.log("joining...");
            state.connection?.emit(events.CREATE_OR_JOIN_ROOM, payload)
            state.connection = state.connection
        },
        updateRoomData: (state,{payload}) => {
            state.roomData = payload
        },
        updateRoomDataMessages: (state, { payload }) => {
            state.roomData.messages = state.roomData.messages.concat(payload)
        },
        emitStartGame: (state,{payload}) => {
            state.connection?.emit(events.START_GAME,payload)
            state.connection = state.connection
        },
        emitGetNewShapes: (state,{payload}) => {
            state.connection?.emit(events.GET_NEW_SHAPES,payload)
            state.connection = state.connection
        },
        emitAddCompletedLines : (state,{payload}) =>{
            state.connection?.emit(events.ADD_COMPLETED_LINES,payload)
            state.connection = state.connection
        },
        emitSendMessage: (state,{payload}) => {
            state.connection?.emit(events.SEND_MESSAGE,payload)
            state.connection = state.connection
        },
        emitRestartGame: (state,{payload}) => {
            state.connection?.emit(events.RESTART_GAME, payload)
            state.connection = state.connection
        },
    }
})

export const { connectSocket, attemptConnection , emitCreateOrJoinRoom ,updateRoomData, updateRoomDataMessages, emitStartGame , emitGetNewShapes ,emitAddCompletedLines,emitSendMessage , emitRestartGame , emitAddPendingPlayers } = socketSlice.actions

export default socketSlice.reducer