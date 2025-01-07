import restaurants from '../data/restaurants.json';
import './App.css';
import logo from './assets/logo.svg';

import { AdvancedMarker, APIProvider, Map } from '@vis.gl/react-google-maps';
import { generateTagColors } from './utils/color';

const BASE_ZOOM = parseInt(import.meta.env.VITE_MAPS_ZOOM || "15");
const uniqueTags = [...new Set(restaurants.flatMap(restaurant => restaurant.tags))];
const uniqueColors = generateTagColors(uniqueTags.length);
const tagColors = Object.fromEntries(
  uniqueTags.map((tag, index) => [tag, uniqueColors[index]])
);

function MarkerTag({ title }: { title: string }) {
  return (
    <div className='map-tag'>
      {title}
    </div>
  )
}

function App() {
  const [lat, lng] = import.meta.env.VITE_MAPS_COORDINATES!.split(',');
  const centerCoordinates = {
    lat: parseFloat(lat),
    lng: parseFloat(lng)
  };

  return (
    <>
      <h1>Lunch Picker</h1>
      <div className='tag-container'>
        {uniqueTags.map((tag, index) => (
          <button key={`tag-${index}`} className='tag' style={{ backgroundColor: tagColors[tag] }}>
            {tag}
          </button>
        ))}
      </div>
      <APIProvider apiKey={import.meta.env.VITE_GOOGLE_MAPS_API_KEY!}>
        <Map className='map' reuseMaps defaultCenter={centerCoordinates} defaultZoom={BASE_ZOOM} maxZoom={17} minZoom={14} mapId={import.meta.env.VITE_GOOGLE_MAPS_MAP_ID}>
          <AdvancedMarker position={centerCoordinates} title='Work Location'>
            <img src={logo} alt='Lunch Picker' />
          </AdvancedMarker>
          {restaurants.map((restaurant, index) => (
            <AdvancedMarker key={`marker-${index}`} position={restaurant.location} title={restaurant.name} >
              <MarkerTag title={restaurant.name} />
            </AdvancedMarker>
          ))}
        </Map>
      </APIProvider>
    </>
  )
}

export default App
