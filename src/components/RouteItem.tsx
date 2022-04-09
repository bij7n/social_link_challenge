import { Button, Grid, Paper, Stack, Typography } from '@mui/material'
import EditIcon from '@mui/icons-material/Edit'
import DeleteForeverIcon from '@mui/icons-material/DeleteForever'
import { useDispatch, useSelector } from 'react-redux'
import { onEdit } from '../reducers/inputSlice'
import RouteIcon from './RouteIcon'
import { menuItem } from './RouteInput'
import { showHandler } from '../reducers/modalSlice'
import DeleteModal from './DeleteModal'
import { RouteObj } from '../reducers/routeSlice'
import { RootState } from '../store'

const RouteItem: React.FC<{ item: RouteObj }> = ({ item }) => {
  const dispatch = useDispatch()
  const { show } = useSelector((state: RootState) => state.showModal)
  return (
    <Paper elevation={2} sx={{ padding: '10px', margin: '10px 0' }}>
      <Grid container>
        <Grid item xs={1}>
          <RouteIcon value={item.type} />
        </Grid>
        <Grid item xs={1}>
          <Typography>{menuItem[+item.type - 1].name}</Typography>
        </Grid>
        <Grid item xs={1}>
          <Typography sx={{ color: '#707984', whiteSpace: 'nowrap' }}>
            آی دی(ID):
          </Typography>
        </Grid>
        <Grid item xs={2} sx={{ textAlign: 'center' }}>
          <Typography style={{ direction: 'ltr' }}>{item.social_id}</Typography>
        </Grid>
        <Grid item xs={1}>
          <Typography sx={{ color: '#707984' }}>لینک:</Typography>
        </Grid>
        <Grid item xs={3}>
          <Typography color='secondary'>{item.social_link}</Typography>
        </Grid>

        <Grid item xs={3}>
          <Stack direction='row-reverse'>
            <Button
              variant='text'
              startIcon={<DeleteForeverIcon />}
              color='error'
              onClick={() => dispatch(showHandler(item))}
            >
              حذف
            </Button>
            <Button
              variant='text'
              startIcon={<EditIcon />}
              color='secondary'
              onClick={() => dispatch(onEdit(item))}
            >
              ویرایش
            </Button>
          </Stack>
        </Grid>
      </Grid>
      {show && <DeleteModal />}
    </Paper>
  )
}

export default RouteItem
