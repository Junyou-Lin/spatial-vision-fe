import { useState } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import { baseURL } from '../../api/api'
import dayjs from 'dayjs'
import Notification from '../../components/Notification/Notification'
import UserTextFields from '../../components/UserTextFields/UserTextFields'
import Loading from '../../components/Loading/Loading'

export default function Signup() {
  const [loading, setLoading] = useState(false)
  const [errorMessage, setErrorMessage] = useState()
  const navigate = useNavigate()
  const [data, setData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    dob: null,
    address: '',
    location: {
      longitude: 144.9631,
      latitude: -37.8136,
    },
  })

  const handleSubmit = (event) => {
    event.preventDefault()
    if (dayjs(data.dob).isAfter(dayjs())) {
      setErrorMessage('Date of Birth must be in the past')
      return
    }
    setLoading(true)
    axios
      .post(`${baseURL}/users`, data)
      .then((res) => {
        navigate('/')
      })
      .catch((err) => {
        setLoading(false)
        setErrorMessage(err.response.data)
      })
  }

  return (
    <>
      {loading && <Loading loading={loading} />}
      {errorMessage && <Notification severity="error" message={errorMessage} />}
      <UserTextFields
        data={data}
        setData={setData}
        handleSubmit={handleSubmit}
        buttonName="Sign Up"
      />
    </>
  )
}
