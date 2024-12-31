import './App.css'

import type { LatLngTuple } from 'leaflet'
import { MapContainer, Marker, Popup, TileLayer } from 'react-leaflet'
import { Icon } from 'leaflet'
import markerIcon2x from 'leaflet/dist/images/marker-icon-2x.png';
import markerIcon1x from 'leaflet/dist/images/marker-icon.png';

function App() {
  const position: LatLngTuple = [53.5502, 9.9920]
  const markerIcon = new Icon({
    iconUrl: markerIcon1x,
    iconRetinaUrl: markerIcon2x,
    iconSize: [25, 41],
  });

  return (
    <>
      <h1>Lunch Picker</h1>
      <MapContainer center={position} zoom={13} scrollWheelZoom={false}>
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <Marker position={position} icon={markerIcon}>
          <Popup>
            A pretty CSS3 popup. <br /> Easily customizable.
          </Popup>
        </Marker>
      </MapContainer>
    </>
  )
}

export default App
