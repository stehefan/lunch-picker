import { AdvancedMarker, APIProvider, ColorScheme, Map } from "@vis.gl/react-google-maps";
import { ZoomSettings } from '../../types/App';
import { Location, Place } from '../../types/Place';
import { MarkerTag } from "../MarkerTag/MarkerTag";

interface LunchMapProps {
    centerCoordinates: Location;
    zoomSettings: ZoomSettings;
    restaurants: Place[];
    selectedTags: string[];
    tagColors: Record<string, string>;
    logo: string;
}

export function LunchMap({ centerCoordinates, zoomSettings, restaurants, selectedTags, tagColors, logo }: LunchMapProps) {
    return (
        <APIProvider apiKey={import.meta.env.VITE_GOOGLE_MAPS_API_KEY!}>
            <Map className='map' colorScheme={ColorScheme.FOLLOW_SYSTEM} disableDefaultUI zoomControl fullscreenControl={false} reuseMaps defaultCenter={centerCoordinates} defaultZoom={zoomSettings.default} maxZoom={zoomSettings.max} minZoom={zoomSettings.min} mapId={import.meta.env.VITE_GOOGLE_MAPS_MAP_ID}>
                <AdvancedMarker position={centerCoordinates} title='Work Location'>
                    <img src={logo} alt='Lunch Picker' />
                </AdvancedMarker>
                {restaurants.filter(restaurant => selectedTags.some(tag => restaurant.tags.includes(tag))).map((restaurant, index) => (
                    <AdvancedMarker key={`marker-${index}`} position={restaurant.location} title={restaurant.name} >
                        <MarkerTag title={restaurant.name} tags={Object.fromEntries(Object.entries(tagColors).filter(([tag]) => restaurant.tags.includes(tag)))} />
                    </AdvancedMarker>
                ))}
            </Map>
        </APIProvider>
    )
}   