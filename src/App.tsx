import { Loader } from '@googlemaps/js-api-loader';
import './App.css';

function App() {
  const apiKey = import.meta.env.VITE_GOOGLE_MAPS_API_KEY!;

  console.log(apiKey);
  const loader = new Loader({
    apiKey: apiKey,
    version: "weekly",
    libraries: ["places"]
  });

  const mapOptions = {
    center: {
      lat: 53.5502,
      lng: 9.9920
    },
    zoom: 15
  };

  loader
    .importLibrary('maps')
    .then(({ Map }) => {
      new Map(document.getElementById("map") as HTMLElement, mapOptions);
    })
    .catch((e) => {
      console.error(e);
    });

  return (
    <>
      <h1>Lunch Picker</h1>
      <div id='map' className='map'></div>
    </>
  )
}

export default App
