import restaurants from '../data/restaurants.json';
import './App.css';
import logo from './assets/logo.svg';

import { LunchMap } from './components/LunchMap/LunchMap';
import { Location } from './types/Place';

function App() {
  const [lat, lng] = import.meta.env.VITE_MAPS_COORDINATES!.split(',');
  const zoomSettings = {
    default: parseInt(import.meta.env.VITE_MAPS_ZOOM || "15"),
    min: 14,
    max: 17
  }
  const centerCoordinates: Location = {
    lat: parseFloat(lat),
    lng: parseFloat(lng)
  };

  return (
    <LunchMap
      centerCoordinates={centerCoordinates}
      zoomSettings={zoomSettings}
      restaurants={restaurants}
      logo={logo}
    />
  )
}

export default App
