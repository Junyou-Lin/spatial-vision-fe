import { Alert } from '@mui/material'

export default function Notification({ severity, message }) {
  return (
    <Alert severity={severity} sx={{ my: 2 }}>
      {message}
    </Alert>
  )
}
