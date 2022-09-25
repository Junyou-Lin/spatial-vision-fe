import { Card, CircularProgress } from '@mui/material'

export default function Loading() {
  return (
    <Card
      variant="outlined"
      sx={{
        display: 'flex',
        justifyContent: 'center',
        width: '80%',
        py: 6,
        mx: 'auto',
      }}>
      <CircularProgress />
    </Card>
  )
}
