import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { RouteObj } from './routeSlice'
interface RouteState {
  isAdd: boolean
  isEdit: boolean
  isShow: boolean
  oneRoute: RouteObj
}

const initialState: RouteState = {
  isAdd: false,
  isEdit: false,
  isShow: false,
  oneRoute: { id: '', type: '', social_id: '', social_link: '' },
}

export const inputSlice = createSlice({
  name: 'inputHandler',
  initialState,
  reducers: {
    onEdit: (state, action: PayloadAction<RouteObj>) => {
      state.isShow = true
      state.isEdit = true
      state.isAdd = false
      state.oneRoute = action.payload
    },
    onAdd: (state) => {
      state.isShow = true
      state.isEdit = false
      state.isAdd = true
    },
    onHide: (state) => {
      state.isShow = false
      state.isEdit = false
      state.isAdd = false
      state.oneRoute = { id: '', type: '', social_id: '', social_link: '' }
    },
  },
})

export const { onEdit, onAdd, onHide } = inputSlice.actions

export default inputSlice.reducer
