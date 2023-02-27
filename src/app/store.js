import { configureStore } from '@reduxjs/toolkit'
import gameReducer from '../features/game/gameSlice'
import { socketMiddleware } from '../utils/middlware'
import socketReducer from '../features/socket/socketSlice'


export const store = configureStore({
  reducer: {
    game: gameReducer,
    socket: socketReducer
  },
  middleware: (getDefaultMiddleware) =>
  getDefaultMiddleware({serializableCheck: false}).concat(socketMiddleware),
})