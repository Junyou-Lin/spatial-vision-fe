import { Button, TextField } from '@mui/material'
import { Box } from '@mui/system'
import { DesktopDatePicker, LocalizationProvider } from '@mui/x-date-pickers'
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'
import { setInputLabel, setInputType } from '../../utils/setInput'
import LocationSearchInput from '../LocationSearchInput/LocationSearchInput'

export default function UserTextFields({
  data,
  setData,
  handleSubmit,
  buttonName,
}) {
  const textFieldInputs = ['firstName', 'lastName', 'email', 'password']
  const handleDobChange = (newDob) => {
    setData({ ...data, dob: newDob })
  }
  return (
    <Box component="form" onSubmit={handleSubmit} sx={{ width: '100%', mx: 4 }}>
      {textFieldInputs.map((input, index) => (
        <TextField
          key={index}
          margin="normal"
          required
          fullWidth
          autoComplete={input}
          value={data[input]}
          onChange={(e) => setData({ ...data, [input]: e.target.value })}
          label={setInputLabel(input)}
          type={setInputType(input)}
        />
      ))}
      <Box sx={{ mt: 2, mb: 1 }}>
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <DesktopDatePicker
            required
            label="Date of Birth"
            inputFormat="DD/MM/YYYY"
            value={data.dob}
            onChange={handleDobChange}
            renderInput={(params) => (
              <TextField fullWidth required {...params} />
            )}
          />
        </LocalizationProvider>
      </Box>
      <LocationSearchInput
        address={data.address}
        location={data.location}
        setData={setData}
        data={data}
      />
      <Button type="submit" fullWidth variant="contained" sx={{ mt: 3, mb: 2 }}>
        {buttonName}
      </Button>
    </Box>
  )
}
