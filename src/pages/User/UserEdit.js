import { Avatar, Card, CardContent, Typography } from '@mui/material'
import { useEffect, useState } from 'react'
import Notification from '../../components/Notification/Notification'
import dayjs from 'dayjs'
import { useNavigate } from 'react-router-dom'
import { baseURL } from '../../api/api'
import axios from 'axios'
import Loading from '../../components/Loading/Loading'
import UserTextFields from '../../components/UserTextFields/UserTextFields'

export default function UserEdit() {
  const navigate = useNavigate()
  const [loading, setLoading] = useState(true)
  const [data, setData] = useState()
  const [errorMessage, setErrorMessage] = useState(null)
  const config = {
    headers: {
      Authorization: `Bearer ${localStorage.getItem('token')}`,
    },
  }

  useEffect(() => {
    const token = localStorage.getItem('token')
    if (!token) {
      navigate('/')
    }
    axios
      .get(`${baseURL}/users`, config)
      .then((res) => {
        setData({
          ...res.data,
          location: {
            longitude: res.data.location.coordinates[0],
            latitude: res.data.location.coordinates[1],
          },
          password: '',
        })
        setLoading(false)
      })
      .catch((err) => {
        navigate('/')
      })
  }, [])

  const handleSubmit = (event) => {
    event.preventDefault()
    if (dayjs(data.dob).isAfter(dayjs())) {
      setErrorMessage('Date of Birth must be in the past')
      return
    }

    axios
      .put(`${baseURL}/users`, data, config)
      .then((res) => {
        navigate('/user')
      })
      .catch((err) => {
        setErrorMessage(err.response.data)
      })
  }

  return loading ? (
    <Loading loading={loading} />
  ) : (
    <Card variant="outlined" sx={{ width: '80%', m: 'auto' }}>
      <CardContent
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}>
        <Avatar sx={{ my: 1 }}>{data.firstName[0] + data.lastName[0]}</Avatar>
        <Typography component="h1" variant="h5">
          Edit Profile
        </Typography>

        {errorMessage && (
          <Notification severity="error" message={errorMessage} />
        )}
        <UserTextFields
          data={data}
          setData={setData}
          handleSubmit={handleSubmit}
          buttonName={'Edit'}
        />
      </CardContent>
    </Card>
  )
}
