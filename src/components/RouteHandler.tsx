import { Paper, Typography } from '@mui/material'
import RouteInput from './RouteInput'

const RouteHandler = () => {
  return (
    <Paper elevation={2} sx={{ padding: '10px', margin: '10px 0' }}>
      <Typography sx={{ m: 1 }}>ویرایش مسیر ارتباطی</Typography>
      <RouteInput />
    </Paper>
  )
}

export default RouteHandler
