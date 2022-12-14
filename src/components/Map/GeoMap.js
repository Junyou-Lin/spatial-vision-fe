import Map, {
  Marker,
  NavigationControl,
  FullscreenControl,
  ScaleControl,
  GeolocateControl,
} from 'react-map-gl'

import Pin from './Pin'

export default function GeoMap({ location, viewState, setViewState }) {
  return (
    <Map
      {...viewState}
      onMove={(evt) => setViewState(evt.viewState)}
      style={{ height: '30vh' }}
      mapStyle="mapbox://styles/mapbox/streets-v9"
      mapboxAccessToken={process.env.REACT_APP_MAPBOX_TOKEN}>
      <GeolocateControl position="top-left" />
      <FullscreenControl position="top-left" />
      <NavigationControl position="top-left" />
      <ScaleControl />
      <Marker
        longitude={location.longitude}
        latitude={location.latitude}
        anchor="bottom">
        <Pin />
      </Marker>
    </Map>
  )
}
