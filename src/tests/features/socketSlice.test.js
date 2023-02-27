import reducer, { connectSocket, updateRoomDataMessages, updateRoomData, 
    attemptConnection, emitCreateOrJoinRoom,emitStartGame,emitGetNewShapes,  
    emitAddCompletedLines, emitSendMessage, emitRestartGame
} from '../../features/socket/socketSlice'

const defaultState = {
    connection: null,
    roomData: {},
}

const mockRoomData = {

}

it('should return the initial state', () => {
  expect(reducer(undefined, { type: undefined })).toEqual(
    defaultState
  )
})

// return { ...initialState, isRunning: true, shape: roomShapes[0], nextShape: roomShapes[1], roomShapes: roomShapes.slice(1) }

it('connect the socket', () => {
    const mockFunc = jest.fn()
    expect(reducer(defaultState, connectSocket(mockFunc))).toEqual({...defaultState, connection: mockFunc})
})

it('should attempt connection', () => {
    expect(reducer(defaultState, attemptConnection())).toEqual(defaultState)
})

it('should emitCreateOrJoinRoom', () => {
    expect(reducer(defaultState, emitCreateOrJoinRoom("test payload"))).toEqual(defaultState)
})

it('should emitStartGame', () => {
    expect(reducer(defaultState, emitStartGame("test payload"))).toEqual(defaultState)
})

it('should emitGetNewShapes', () => {
    expect(reducer(defaultState, emitGetNewShapes("test payload"))).toEqual(defaultState)
})

it('should emitAddCompletedLines', () => {
    expect(reducer(defaultState, emitAddCompletedLines("test payload"))).toEqual(defaultState)
})

it('should emitSendMessage', () => {
    expect(reducer(defaultState, emitSendMessage("test payload"))).toEqual(defaultState)
})

it('should emitRestartGame', () => {
    expect(reducer(defaultState, emitRestartGame("test payload"))).toEqual(defaultState)
})

it('should update room data', () => {
    const roomData = {
        roomName: "test"
    }
    expect(reducer(defaultState, updateRoomData(roomData))).toEqual({...defaultState,roomData })
})

it('should update room data', () => {
    const payload = {
        playerName: "testPlayer", 
        socketId: "<id>", 
        roomName: "testRoom", 
        message: "hello world"
    }
    const expectedRoomData = {
    messages: [payload]
    }
    expect(reducer({ ...defaultState, roomData:{ messages: []}}, updateRoomDataMessages(payload))).toEqual({...defaultState, roomData: expectedRoomData })
})