import restaurants from '../data/restaurants.json';
import './App.css';
import logo from './assets/logo.svg';
import { tagsAtom, restaurantAtom } from './atoms/restaurantAtoms';
import { useSetAtom } from 'jotai';

import { LunchMapWrapper } from './components/LunchMap/LunchMapWrapper';
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

  const setRestaurantInfos = useSetAtom(restaurantAtom);
  const setTags = useSetAtom(tagsAtom);

  setRestaurantInfos(restaurants);
  setTags([...new Set(restaurants.flatMap(detail => detail.tags))].map(tag => ({ name: tag, selected: true })));

  return (
    <LunchMapWrapper
      centerCoordinates={centerCoordinates}
      zoomSettings={zoomSettings}
      logo={logo}
    />
  )
}

export default App
