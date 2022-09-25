import { AppBar, Button, Toolbar, Typography } from '@mui/material'
import { Box } from '@mui/system'
import { Outlet, useNavigate } from 'react-router-dom'

export default function UserLayout() {
  const navigate = useNavigate()
  const handleLogOut = () => {
    localStorage.removeItem('token')
    navigate('/')
  }
  return (
    <Box>
      <AppBar position="static" sx={{ mb: 6 }}>
        <Toolbar>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            User Profile
          </Typography>
          <Button color="inherit" onClick={handleLogOut}>
            Log Out
          </Button>
        </Toolbar>
      </AppBar>
      <Outlet />
    </Box>
  )
}
