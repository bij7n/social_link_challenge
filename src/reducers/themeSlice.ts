import { createSlice } from '@reduxjs/toolkit'
import { PaletteMode } from '@mui/material'

export const themeSlice = createSlice({
  name: 'themeMode',
  initialState: {
    mode: 'dark' as PaletteMode,
  },
  reducers: {
    modeChanger: (state) => {
      state.mode = state.mode === 'dark' ? 'light' : 'dark'
    },
  },
})

export const { modeChanger } = themeSlice.actions

export default themeSlice.reducer
