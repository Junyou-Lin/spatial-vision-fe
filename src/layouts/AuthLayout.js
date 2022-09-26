import { Avatar, CssBaseline, Grid, Paper, Typography } from '@mui/material'
import { Box } from '@mui/system'
import LockOutlinedIcon from '@mui/icons-material/LockOutlined'
import { Link, Outlet, useLocation } from 'react-router-dom'

export default function AuthLayout() {
  const location = useLocation()
  return (
    <Grid container sx={{ height: '100vh' }}>
      <CssBaseline />
      <Grid
        item
        xs={false}
        sm={4}
        md={6}
        sx={{
          backgroundImage: 'url(./bg.jpg)',
          backgroundRepeat: 'no-repeat',
          backgroundPosition: 'center',
        }}
      />
      <Grid item xs={12} sm={8} md={6} component={Paper} elevation={6} square>
        <Box
          sx={{
            my: 8,
            mx: 4,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}>
          <Avatar sx={{ m: 1, bgcolor: 'primary.main' }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            {location.pathname === '/' ? 'Sign in' : 'Sign Up'}
          </Typography>
          <Outlet />
          <Grid container>
            <Grid item>
              <Link to={location.pathname === '/' ? '/signup' : '/'}>
                <Typography variant="body2">
                  {location.pathname === '/'
                    ? `Don't have an account? Sign Up`
                    : 'Already have an account? Sign In'}
                </Typography>
              </Link>
            </Grid>
          </Grid>
        </Box>
      </Grid>
    </Grid>
  )
}
