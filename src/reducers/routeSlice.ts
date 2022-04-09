import { createSlice, PayloadAction } from '@reduxjs/toolkit'

export type RouteObj = {
  id: string
  social_id: string
  social_link: string
  type: string
}
export interface RouteState {
  loading: boolean
  error: string
  allRoutes: RouteObj[]
}

const initialState: RouteState = {
  loading: false,
  error: '',
  allRoutes: [],
}

export const routeSlice = createSlice({
  name: 'routes',
  initialState,
  reducers: {
    isLoading: (state) => {
      state.loading = true
    },
    isDone: (state, action: PayloadAction<RouteObj[]>) => {
      state.loading = false
      state.allRoutes = action.payload
    },
    isFail: (state, action: PayloadAction<string>) => {
      state.loading = false
      state.error = action.payload
    },
    addNewRoute: (state, action: PayloadAction<RouteObj>) => {
      state.allRoutes = state.allRoutes.concat(action.payload)
    },
    modifyRoute: (state, action: PayloadAction<RouteObj>) => {
      const existingItemIndex = state.allRoutes.findIndex(
        (item) => item.id === action.payload.id
      )
      if (existingItemIndex >= 0) {
        state.allRoutes[existingItemIndex] = action.payload
      }
    },
    deleteRoute: (state, action: PayloadAction<RouteObj>) => {
      const existingItemIndex = state.allRoutes.findIndex(
        (item) => item.id === action.payload.id
      )
      if (existingItemIndex >= 0) {
        state.allRoutes.splice(existingItemIndex, 1)
      }
    },
  },
})

export const {
  isLoading,
  isDone,
  isFail,
  addNewRoute,
  modifyRoute,
  deleteRoute,
} = routeSlice.actions

export default routeSlice.reducer
