import { useState } from 'react'
import Button from '@mui/material/Button'
import TextField from '@mui/material/TextField'
import Box from '@mui/material/Box'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import { baseURL } from '../../api/api'
import Notification from '../../components/Notification/Notification'
import { setInputLabel, setInputType } from '../../utils/setInput'
import Loading from '../../components/Loading/Loading'

export default function SignIn() {
  const navigate = useNavigate()
  const [loading, setLoading] = useState(false)
  const [data, setData] = useState({
    email: '',
    password: '',
  })
  const textFieldInputs = ['email', 'password']
  const [errorMessage, setErrorMessage] = useState()

  const handleSubmit = (event) => {
    event.preventDefault()
    axios
      .post(`${baseURL}/users/login`, data)
      .then((res) => {
        localStorage.setItem('token', res.data.token)
        navigate('/user')
      })
      .catch((err) => {
        setLoading(false)
        setErrorMessage(err.response.data)
      })
  }

  return (
    <>
      {loading && <Loading loading={loading} />}

      <Box component="form" onSubmit={handleSubmit} sx={{ width: '100%' }}>
        {errorMessage && (
          <Notification severity="error" message={errorMessage} />
        )}
        {textFieldInputs.map((input, index) => (
          <TextField
            key={index}
            margin="normal"
            required
            fullWidth
            label={setInputLabel(input)}
            type={setInputType(input)}
            autoComplete={input}
            value={data.input}
            onChange={(e) => setData({ ...data, [input]: e.target.value })}
          />
        ))}
        <Button
          type="submit"
          fullWidth
          variant="contained"
          sx={{ mt: 3, mb: 2 }}>
          Sign In
        </Button>
      </Box>
    </>
  )
}
