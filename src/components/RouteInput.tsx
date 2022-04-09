import { useState, useEffect } from 'react'
import { useFormik } from 'formik'
import * as yup from 'yup'
import { useDispatch, useSelector } from 'react-redux'
import {
  Button,
  InputAdornment,
  MenuItem,
  Stack,
  TextField,
} from '@mui/material'
import axios from 'axios'
import { addNewRoute, RouteObj, modifyRoute } from '../reducers/routeSlice'
import { RootState } from '../store'
import { onHide } from '../reducers/inputSlice'
import RouteIcon from './RouteIcon'

export const menuItem: { name: string; value: string }[] = [
  { name: 'اینستاگرام', value: '1' },
  { name: 'فیسبوک', value: '2' },
  { name: 'تلگرام', value: '3' },
  { name: 'تویتر', value: '4' },
  { name: 'لینکدین', value: '5' },
  { name: 'وب‌سایت', value: '6' },
]

const validationSchema = yup.object({
  type: yup.string().required('نوع ارتباط را مشخص کنید'),
  social_link: yup.string().required('لینک را وارد نمایید'),
  social_id: yup.string().required('آی‌دی را وارد نمایید'),
})

const RouteInput = () => {
  const [initialValues, setInitialValues] = useState<RouteObj>({
    id: '',
    type: '',
    social_id: '',
    social_link: '',
  })
  const dispatch = useDispatch()

  const { isEdit, oneRoute } = useSelector(
    (state: RootState) => state.inputState
  )

  useEffect(() => {
    if (isEdit) {
      formik.values.social_link = oneRoute.social_link
      formik.values.social_id = oneRoute.social_id
      formik.values.type = oneRoute.type
    }

    return () => {
      setInitialValues({
        id: '',
        type: '',
        social_id: '',
        social_link: '',
      })
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isEdit, oneRoute])

  const formik = useFormik({
    initialValues,
    validationSchema: validationSchema,
    onSubmit: async (values, { resetForm }) => {
      if (isEdit) {
        try {
          const { data } = await axios.put(`/socials/${oneRoute.id}`, {
            ...values,
            id: undefined,
          })
          dispatch(modifyRoute(data))
          dispatch(onHide())
        } catch (error) {}
      } else {
        try {
          const { data } = await axios.post('/socials', {
            ...values,
            id: undefined,
          })
          dispatch(addNewRoute(data))
          resetForm()
        } catch (error) {}
      }
    },
  })
  return (
    <form onSubmit={formik.handleSubmit}>
      <Stack direction='row' spacing={2} sx={{ m: 1 }}>
        <TextField
          fullWidth
          InputProps={{
            startAdornment: (
              <InputAdornment position='start'>
                <RouteIcon value={formik.values.type} />
              </InputAdornment>
            ),
          }}
          id='type'
          name='type'
          label='نوع*'
          value={formik.values.type}
          onChange={formik.handleChange}
          error={formik.touched.type && Boolean(formik.errors.type)}
          helperText={formik.touched.type && formik.errors.type}
          select
        >
          {menuItem.map((item, index) => (
            <MenuItem key={index} value={item.value}>
              {item.name}
            </MenuItem>
          ))}
        </TextField>
        <TextField
          dir='ltr'
          fullWidth
          id='social_link'
          name='social_link'
          label='لینک*'
          type='social_link'
          value={formik.values.social_link}
          onChange={formik.handleChange}
          error={
            formik.touched.social_link && Boolean(formik.errors.social_link)
          }
          helperText={formik.touched.social_link && formik.errors.social_link}
        />
        <TextField
          fullWidth
          dir='ltr'
          id='social_id'
          name='social_id'
          label='آی دی (ID)*'
          type='social_id'
          value={formik.values.social_id}
          onChange={formik.handleChange}
          error={formik.touched.social_id && Boolean(formik.errors.social_id)}
          helperText={formik.touched.social_id && formik.errors.social_id}
        />
      </Stack>
      <Stack direction='row-reverse' spacing={3} sx={{ m: 1 }}>
        <Button variant='contained' color='secondary' type='submit'>
          {isEdit ? (
            <span>ویرایش مسیر ارتباطی</span>
          ) : (
            <span>افزودن مسیر ارتباطی</span>
          )}
        </Button>
        <Button
          variant='outlined'
          color='inherit'
          onClick={() => dispatch(onHide())}
        >
          انصراف
        </Button>
      </Stack>
    </form>
  )
}

export default RouteInput
