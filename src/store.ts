import { configureStore } from '@reduxjs/toolkit'
import routesReducer from './reducers/routeSlice'
import inputReducer from './reducers/inputSlice'
import themeReducer from './reducers/themeSlice'
import modalReducer from './reducers/modalSlice'

export const store = configureStore({
  reducer: {
    routes: routesReducer,
    inputState: inputReducer,
    themeMode: themeReducer,
    showModal: modalReducer,
  },
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
