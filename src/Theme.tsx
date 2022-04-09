import { createTheme, responsiveFontSizes } from '@mui/material/styles'
import { ThemeProvider } from '@mui/material/styles'
import { CacheProvider } from '@emotion/react'
import rtlPlugin from 'stylis-plugin-rtl'
import createCache from '@emotion/cache'
import { prefixer } from 'stylis'
import { CssBaseline } from '@mui/material'
import { useSelector } from 'react-redux'
import { RootState } from './store'
import './assets/fonts/fonts.css'

const fontFamily = [
  'IRANYekan',
  'Open Sans',
  'Roboto',
  '-apple-system',
  'BlinkMacSystemFont',
  'Segoe UI',
  'Oxygen',
  'Ubuntu',
  'Cantarell',
  'Fira Sans',
  'Droid Sans',
  'Helvetica Neue',
  'sans-serif',
].join(',')

const cacheRtl = createCache({
  key: 'muirtl',
  stylisPlugins: [prefixer, rtlPlugin],
})

const Theme = (props: { children: React.ReactNode }) => {
  const { mode } = useSelector((state: RootState) => state.themeMode)
  const theme = responsiveFontSizes(
    createTheme({
      direction: 'rtl',
      typography: { fontFamily },
      palette: {
        mode,
        secondary: {
          main: '#fda526',
        },
      },
    })
  )
  return (
    <CacheProvider value={cacheRtl}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        {props.children}
      </ThemeProvider>
    </CacheProvider>
  )
}

export default Theme
