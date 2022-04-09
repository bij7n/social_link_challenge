import { useSelector, useDispatch } from 'react-redux'
import * as yup from 'yup'
import { Box, Button, Modal, Stack, TextField, Typography } from '@mui/material'
import axios from 'axios'
import { useFormik } from 'formik'
import { RootState } from '../store'
import { closeHandler } from '../reducers/modalSlice'
import { deleteRoute } from '../reducers/routeSlice'

const style = {
  position: 'absolute' as 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
}

const validationSchema = yup.object({
  confirm: yup.string().required('لطفا تایید را بنویسید'),
})

const DeleteModal = () => {
  const dispatch = useDispatch()
  const { show, link } = useSelector((state: RootState) => state.showModal)

  const formik = useFormik({
    initialValues: {
      confirm: '',
    },
    validationSchema: validationSchema,
    onSubmit: async (values) => {
      try {
        await axios.delete(`/socials/${link.id}`)
        dispatch(deleteRoute(link))
        dispatch(closeHandler())
      } catch (error) {}
    },
  })
  return (
    <Modal
      open={show}
      onClose={() => {
        dispatch(closeHandler())
      }}
      aria-labelledby='modal-modal-title'
      aria-describedby='modal-modal-description'
    >
      <Box sx={style}>
        <Stack>
          <Typography id='modal-modal-title' variant='h6' component='h2'>
            آیا از تصمیم خود مطمئن هستید؟
          </Typography>
          <Typography
            variant='caption'
            display='block'
            gutterBottom
            id='modal-modal-description'
            sx={{ mt: 2 }}
          >
            برای حذف مسیر ارتباطی {link.social_link} لطفا تایید را بنویسید
          </Typography>
          <TextField
            id='confirm'
            name='confirm'
            placeholder='تایید'
            type='confirm'
            value={formik.values.confirm}
            onChange={formik.handleChange}
            autoComplete='off'
          />
          <Stack direction='row-reverse'>
            <Button
              variant='text'
              color='error'
              onClick={() => formik.handleSubmit()}
              disabled={formik.values.confirm !== 'تایید'}
            >
              حذف
            </Button>
            <Button
              variant='text'
              color='secondary'
              onClick={() => dispatch(closeHandler())}
            >
              انصراف
            </Button>
          </Stack>
        </Stack>
      </Box>
    </Modal>
  )
}

export default DeleteModal
