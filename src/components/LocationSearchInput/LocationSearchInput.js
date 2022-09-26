import { TextField } from '@mui/material'
import PlacesAutocomplete, {
  geocodeByAddress,
  getLatLng,
} from 'react-places-autocomplete'
import { useState } from 'react'
import GeoMap from '../Map/GeoMap'

export default function LocationSearchInput({
  address,
  location,
  data,
  setData,
}) {
  const [viewState, setViewState] = useState({
    latitude: location.latitude,
    longitude: location.longitude,
    zoom: 12,
  })

  const handleChange = (address) => {
    setData({ ...data, address })
  }

  const handleSelect = (address) => {
    geocodeByAddress(address)
      .then((results) => getLatLng(results[0]))
      .then((latLng) => {
        setViewState({
          latitude: latLng.lat,
          longitude: latLng.lng,
        })
        setData({
          ...data,
          location: {
            latitude: latLng.lat,
            longitude: latLng.lng,
          },
          address,
        })
      })
      .catch((error) => console.error('Error', error))
  }

  return (
    <>
      <PlacesAutocomplete
        value={address}
        onChange={handleChange}
        onSelect={handleSelect}>
        {({ getInputProps, suggestions, getSuggestionItemProps, loading }) => (
          <div>
            <TextField
              margin="normal"
              required
              fullWidth
              value={address}
              label="Address"
              {...getInputProps({
                placeholder: 'Search Places ...',
                className: 'location-search-input',
              })}
            />
            <div className="autocomplete-dropdown-container">
              {loading && <div>Loading...</div>}
              {suggestions.map((suggestion) => {
                const className = suggestion.active
                  ? 'suggestion-item--active'
                  : 'suggestion-item'
                // inline style for demonstration purpose
                const style = suggestion.active
                  ? { backgroundColor: '#fafafa', cursor: 'pointer' }
                  : { backgroundColor: '#fafafa', cursor: 'pointer' }
                return (
                  <div
                    key={suggestion.placeId}
                    {...getSuggestionItemProps(suggestion, {
                      className,
                      style,
                    })}>
                    <span>{suggestion.description}</span>
                    <hr />
                  </div>
                )
              })}
            </div>
          </div>
        )}
      </PlacesAutocomplete>
      <GeoMap
        location={location}
        viewState={viewState}
        setViewState={setViewState}
      />
    </>
  )
}
