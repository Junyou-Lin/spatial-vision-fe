import { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios'
import { baseURL } from '../../api/api'
import {
  Avatar,
  Button,
  Card,
  CardContent,
  Divider,
  List,
  ListItem,
  ListItemText,
} from '@mui/material'
import dayjs from 'dayjs'
import GeoMap from '../../components/Map/GeoMap'
import Loading from '../../components/Loading/Loading'
import { setInputLabel } from '../../utils/setInput'

export default function User() {
  const navigate = useNavigate()
  const [loading, setLoading] = useState(true)
  const [user, setUser] = useState(null)
  const [viewState, setViewState] = useState()
  const ListItems = ['firstName', 'lastName', 'email', 'dob', 'address']

  useEffect(() => {
    const token = localStorage.getItem('token')
    if (!token) {
      navigate('/')
    }
    axios
      .get(`${baseURL}/users`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      })
      .then((res) => {
        setUser(res.data)
        setViewState({
          longitude: res.data.location.coordinates[0],
          latitude: res.data.location.coordinates[1],
          zoom: 12,
        })
        setLoading(false)
      })
      .catch((err) => {
        navigate('/')
      })
  }, [])

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
        <Avatar sx={{ my: 1 }}>{user.firstName[0] + user.lastName[0]}</Avatar>
        <List component="nav" aria-label="mailbox folders">
          <Divider />
          {ListItems.map((item, index) => (
            <ListItem divider key={index}>
              <ListItemText
                primary={`${setInputLabel(item)} : ${
                  item === 'dob'
                    ? dayjs(user[item]).format('DD/MM/YYYY')
                    : user[item]
                }
                `}
              />
            </ListItem>
          ))}
          <ListItem>
            <GeoMap
              location={{
                longitude: user.location.coordinates[0],
                latitude: user.location.coordinates[1],
              }}
              viewState={viewState}
              setViewState={setViewState}
            />
          </ListItem>
        </List>
        <Link to="/user/edit">
          <Button sx={{ my: 1 }} size="medium" variant="contained">
            Edit
          </Button>
        </Link>
      </CardContent>
    </Card>
  )
}
