import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { RouteObj } from './routeSlice'

export const modalSlice = createSlice({
  name: 'showModal',
  initialState: {
    show: false,
    link: { id: '', type: '', social_id: '', social_link: '' } as RouteObj,
  },
  reducers: {
    showHandler: (state, action: PayloadAction<RouteObj>) => {
      state.show = true
      state.link = action.payload
    },
    closeHandler: (state) => {
      state.show = false
      state.link = { id: '', type: '', social_id: '', social_link: '' }
    },
  },
})

export const { showHandler, closeHandler } = modalSlice.actions

export default modalSlice.reducer
