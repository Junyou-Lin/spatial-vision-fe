// import { Card, CircularProgress } from '@mui/material'

// export default function Loading() {
//   return (
//     <Card
//       variant="outlined"
//       sx={{
//         display: 'flex',
//         justifyContent: 'center',
//         width: '80%',
//         py: 6,
//         mx: 'auto',
//       }}>
//       <CircularProgress />
//     </Card>
//   )
// }

import Backdrop from '@mui/material/Backdrop'
import CircularProgress from '@mui/material/CircularProgress'

export default function Loading({ loading }) {
  return (
    <div>
      <Backdrop
        sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={loading}>
        <CircularProgress color="inherit" />
      </Backdrop>
    </div>
  )
}
