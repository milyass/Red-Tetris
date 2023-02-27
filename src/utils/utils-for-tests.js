import React from "react";
import { render } from "@testing-library/react";
import { configureStore } from "@reduxjs/toolkit";
import { Provider } from "react-redux";
// As a basic setup, import your same slice reducers
import gameReducer from '../features/game/gameSlice'
import { socketMiddleware } from './middlware'
import socketReducer from '../features/socket/socketSlice'


export function renderWithProviders(
  ui, // component ex: <Chat />
  {
    preloadedState = {}, // state to override ex: { game: { gameOver: true} }
    // Automatically create a store instance if no store was passed in
    store = configureStore({

        reducer: {
          game: gameReducer,
          socket: socketReducer
        },

        middleware: (getDefaultMiddleware) =>

        getDefaultMiddleware({serializableCheck: false}).concat(socketMiddleware),

        preloadedState, // the variable in params passed in the function here renderWithProviders
      }),
    ...renderOptions // RTL's render options just like wrapper() ex: container, legacy...
  } = {}
) {
  function Wrapper({ children }) { // our custom redux Provider component
    return <Provider store={store}>{children}</Provider>;
  }

  // Return an object with the store and all of RTL's query functions
  return { store, 
    ...render(ui, // our tested componant
    { wrapper: // render option [render] that requires a component that wraps our testing component
      Wrapper, // component that wraps our testing component
      ...renderOptions  // RTL's render options just like wrapper() ex: container, legacy...
    })
   };
}