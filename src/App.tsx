import restaurants from '../data/restaurants.json';
import logo from './assets/logo.svg';
import './App.css';

import { useState } from 'react';
import { LunchMap } from './components/LunchMap/LunchMap';
import { TagList } from './components/TagList/TagList';
import { generateTagColors } from './utils/color';
import { Location } from './types/Place';
const zoomSettings = {
  default: parseInt(import.meta.env.VITE_MAPS_ZOOM || "15"),
  min: 14,
  max: 17
}
const uniqueTags = [...new Set(restaurants.flatMap(restaurant => restaurant.tags))];
const uniqueColors = generateTagColors(uniqueTags.length);
const tagColors: Record<string, string> = Object.fromEntries(
  uniqueTags.map((tag, index) => [tag, uniqueColors[index]])
);

function App() {
  const [selectedTags, setSelectedTags] = useState<string[]>(uniqueTags);
  const [lat, lng] = import.meta.env.VITE_MAPS_COORDINATES!.split(',');
  const centerCoordinates: Location = {
    lat: parseFloat(lat),
    lng: parseFloat(lng)
  };

  const handleTagChange = (tag: string) => {
    const updatedSelectedTags = selectedTags.includes(tag)
      ? selectedTags.filter((t: string) => t !== tag)
      : [...selectedTags, tag];

    setSelectedTags(updatedSelectedTags);
  };

  return (
    <>
      <h1>Lunch Picker</h1>
      <TagList tags={tagColors} selectedTags={selectedTags} handleTagChange={handleTagChange} />
      <LunchMap
        centerCoordinates={centerCoordinates}
        zoomSettings={zoomSettings}
        restaurants={restaurants}
        selectedTags={selectedTags}
        tagColors={tagColors}
        logo={logo}
      />
    </>
  )
}

export default App
