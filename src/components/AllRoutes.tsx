import { useEffect } from 'react'
import { Button, Container, Paper, Stack, Typography } from '@mui/material'
import AddIcon from '@mui/icons-material/Add'
import EditIcon from '@mui/icons-material/Edit'
import { useSelector, useDispatch } from 'react-redux'
import axios from 'axios'
import NightlightRoundOutlinedIcon from '@mui/icons-material/NightlightRoundOutlined'
import LightModeOutlinedIcon from '@mui/icons-material/LightModeOutlined'
import { modeChanger } from '../reducers/themeSlice'
import RouteItem from './RouteItem'
import RouteHandler from './RouteHandler'
import { isDone, isFail, isLoading } from '../reducers/routeSlice'
import { RootState } from '../store'
import { onAdd } from '../reducers/inputSlice'

const AllRoutes = () => {
  const { allRoutes } = useSelector((state: RootState) => state.routes)
  const { isEdit, isShow } = useSelector((state: RootState) => state.inputState)
  const { mode } = useSelector((state: RootState) => state.themeMode)
  const dispatch = useDispatch()
  useEffect(() => {
    const getRoutes = async () => {
      dispatch(isLoading())
      try {
        const { data } = await axios.get('/socials')
        dispatch(isDone(data))
      } catch (error) {
        dispatch(isFail('Something Went Wrong!'))
      }
    }
    getRoutes()
  }, [dispatch])

  return (
    <Container fixed>
      <Paper elevation={2} sx={{ padding: '20px' }}>
        <Stack>
          <Stack direction='row' justifyContent='space-between'>
            <Typography sx={{ color: '#707984' }}> مسیرهای ارتباطی </Typography>
            <span
              style={{ cursor: 'pointer' }}
              onClick={() => dispatch(modeChanger())}
            >
              {mode === 'dark' ? (
                <LightModeOutlinedIcon />
              ) : (
                <NightlightRoundOutlinedIcon />
              )}
            </span>
          </Stack>
          <Stack direction='row' sx={{ alignItems: 'center' }}>
            <Button
              variant='text'
              startIcon={
                isEdit ? (
                  <EditIcon fontSize='small' />
                ) : (
                  <AddIcon fontSize='small' />
                )
              }
              color='secondary'
              onClick={() => {
                if (!isEdit) dispatch(onAdd())
              }}
            >
              {isEdit ? (
                <span>ویرایش مسیر ارتباطی</span>
              ) : (
                <span>افزودن مسیر ارتباطی</span>
              )}
            </Button>
          </Stack>

          {isShow && <RouteHandler />}
          <div style={{ maxHeight: '40vh', overflow: 'auto' }}>
            {allRoutes.map((item, index) => (
              <RouteItem key={index} item={item} />
            ))}
          </div>
        </Stack>
      </Paper>
    </Container>
  )
}

export default AllRoutes
