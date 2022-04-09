import { Container } from '@mui/material'
import AllRoutes from './components/AllRoutes'

function App() {
  return (
    <Container
      disableGutters
      sx={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100vh',
      }}
    >
      <AllRoutes />
    </Container>
  )
}

export default App
