import { Loader } from '@googlemaps/js-api-loader';
import './App.css';
import * as logo from '../public/logo.svg';

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
    });

  return (
    <>
      <h1>Lunch Picker</h1>
      <div id='map' className='map'></div>
    </>
  )
}

export default App
