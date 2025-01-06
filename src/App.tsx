import restaurants from '../data/restaurants.json';
import * as logo from '../public/logo.svg';
import './App.css';

import { Loader } from '@googlemaps/js-api-loader';
import { generateTagColors } from './utils/color';

const uniqueTags = [...new Set(restaurants.flatMap(restaurant => restaurant.tags))];
const uniqueColors = generateTagColors(uniqueTags.length);
const tagColors = Object.fromEntries(
  uniqueTags.map((tag, index) => [tag, uniqueColors[index]])
);

function App() {
  const loader = new Loader({
    apiKey: import.meta.env.VITE_GOOGLE_MAPS_API_KEY!,
    version: "weekly",
    libraries: ["places"],
  });
  const [lat, lng] = import.meta.env.VITE_MAPS_COORDINATES!.split(',');
  const centerCoordinates = {
    lat: parseFloat(lat),
    lng: parseFloat(lng)
  };
  const mapOptions = {
    center: centerCoordinates,
    zoom: parseInt(import.meta.env.VITE_MAPS_ZOOM || "15"),
    mapId: import.meta.env.VITE_GOOGLE_MAPS_MAP_ID!
  };

  Promise
    .all([
      loader.importLibrary("maps"),
      loader.importLibrary("marker")
    ])
    .then(([mapsLibrary, markerLibrary]) => {
      const mapElement: HTMLElement = document.getElementById('map')!;
      const map = new mapsLibrary.Map(mapElement, mapOptions);

      const logoElement = document.createElement('img');
      logoElement.src = logo.default;

      new markerLibrary.AdvancedMarkerElement({
        position: centerCoordinates,
        map: map,
        title: "Center",
        content: logoElement,
      });

      for (const restaurant of restaurants) {
        const restaurantPinElement = new markerLibrary.PinElement({
          background: '#FBBC04',
        });

        new markerLibrary.AdvancedMarkerElement({
          position: restaurant.location,
          map: map,
          title: restaurant.name,
          content: restaurantPinElement.element,
        });
      }
    });

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
      <div id='map' className='map'></div>
    </>
  )
}

export default App
