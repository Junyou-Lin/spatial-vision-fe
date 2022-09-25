import {
  Avatar,
  Box,
  Button,
  Card,
  CardContent,
  CircularProgress,
  Grid,
  TextField,
  Typography,
} from '@mui/material'
import { useEffect, useState } from 'react'
import Notification from '../../components/Notification/Notification'
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider'
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'
import { DesktopDatePicker } from '@mui/x-date-pickers/DesktopDatePicker'
import dayjs from 'dayjs'
import { Link, useNavigate } from 'react-router-dom'
import { baseURL } from '../../api/api'
import axios from 'axios'
import LocationSearchInput from '../../components/LocationSearchInput/LocationSearchInput'
import Loading from '../../components/Loading/Loading'

export default function UserEdit() {
  const navigate = useNavigate()
  const [loading, setLoading] = useState(true)
  const [user, setUser] = useState(null)
  const [errorMessage, setErrorMessage] = useState(null)
  const [address, setAddress] = useState('')
  const [location, setLocation] = useState()
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
        setUser(res.data)
        setAddress(res.data.address)
        setLocation({
          longitude: res.data.location.coordinates[0],
          latitude: res.data.location.coordinates[1],
        })
        setLoading(false)
      })
      .catch((err) => {
        navigate('/')
      })
  }, [])

  const handleSubmit = (event) => {
    event.preventDefault()
    axios
      .put(`${baseURL}/users`, { ...user, address, location }, config)
      .then((res) => {
        navigate('/user')
      })
      .catch((err) => {
        setErrorMessage(err.response.data)
      })
  }

  return loading ? (
    <Loading />
  ) : (
    <Card variant="outlined" sx={{ width: '80%', m: 'auto' }}>
      <CardContent
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}>
        <Avatar sx={{ my: 1 }}>{user.firstName[0] + user.lastName[0]}</Avatar>
        <Typography component="h1" variant="h5">
          Edit Profile
        </Typography>

        {errorMessage && (
          <Notification severity="error" message={errorMessage} />
        )}
        <Box component="form" onSubmit={handleSubmit} sx={{ mx: 3 }}>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <TextField
                margin="normal"
                name="firstName"
                required
                fullWidth
                id="firstName"
                label="First Name"
                value={user.firstName}
                onChange={(e) =>
                  setUser({ ...user, firstName: e.target.value })
                }
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                margin="normal"
                required
                fullWidth
                id="lastName"
                label="Last Name"
                name="lastName"
                value={user.lastName}
                onChange={(e) => setUser({ ...user, lastName: e.target.value })}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                margin="normal"
                required
                fullWidth
                id="email"
                label="Email Address"
                name="email"
                value={user.email}
                onChange={(e) => setUser({ ...user, email: e.target.value })}
              />
            </Grid>
            <Grid item xs={12}>
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DesktopDatePicker
                  label="Date of Birth"
                  inputFormat="DD/MM/YYYY"
                  value={dayjs(user.dob)}
                  onChange={(newValue) => {
                    setUser({ ...user, dob: newValue })
                  }}
                  renderInput={(params) => (
                    <TextField fullWidth required {...params} />
                  )}
                />
              </LocalizationProvider>
            </Grid>
            <Grid item xs={12}>
              <TextField
                margin="normal"
                required
                fullWidth
                name="password"
                label="Password"
                type="password"
                id="password"
                onChange={(e) => setUser({ ...user, password: e.target.value })}
              />
            </Grid>
            <Grid item xs={12}>
              <LocationSearchInput
                address={address}
                setAddress={setAddress}
                location={location}
                setLocation={setLocation}
              />
            </Grid>
          </Grid>
          <Box sx={{ display: 'flex', justifyContent: 'center', mt: 2 }}>
            <Link to="/user">
              <Button sx={{ my: 1, mr: 2 }} size="medium" variant="contained">
                Back
              </Button>
            </Link>
            <Button
              sx={{ my: 1 }}
              size="medium"
              variant="contained"
              onClick={handleSubmit}>
              Submit
            </Button>
          </Box>
        </Box>
      </CardContent>
    </Card>
  )
}
