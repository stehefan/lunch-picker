import {
    SplitLayout
} from '@googlemaps/extended-component-library/react';
import { AdvancedMarker, ColorScheme, Map, useApiLoadingStatus, useMapsLibrary } from "@vis.gl/react-google-maps";
import { useEffect, useState } from "react";
import { ZoomSettings } from '../../types/App';
import { Location, Restaurant } from '../../types/Place';
import { MarkerTag } from "../MarkerTag/MarkerTag";
import { RestaurantList } from '../RestaurantList/RestaurantList';
import { TagList } from '../TagList/TagList';
import './LunchMap.css';

export interface LunchMapProps {
    centerCoordinates: Location;
    zoomSettings: ZoomSettings;
    restaurants: Restaurant[];
    logo: string;
}

export function LunchMap({ centerCoordinates, zoomSettings, restaurants, logo }: LunchMapProps) {
    const uniqueTags = [...new Set(restaurants.flatMap(restaurant => restaurant.tags))];
    const [selectedTags, setSelectedTags] = useState<string[]>(uniqueTags);
    const [bounds, setBounds] = useState<google.maps.LatLngBoundsLiteral>();
    const coreLibrary: google.maps.CoreLibrary | null = useMapsLibrary('core');
    const status = useApiLoadingStatus();

    useEffect(() => {
        console.log(status);
    }, [status]);

    const shownRestaurants = restaurants.filter(restaurant => {
        const hasSelectedTags = selectedTags.some(tag => restaurant.tags.includes(tag));
        const isInBounds = coreLibrary && new coreLibrary.LatLngBounds(bounds).contains(restaurant.location);
        return hasSelectedTags && isInBounds;
    });

    const handleTagChange = (tag: string) => {
        const updatedSelectedTags = selectedTags.includes(tag)
            ? selectedTags.filter((t: string) => t !== tag)
            : [...selectedTags, tag];

        setSelectedTags(updatedSelectedTags);
    };

    return (
        <SplitLayout rowReverse rowLayoutMinWidth={700}>
            <div className="control-slot" slot="fixed">
                <span className='title'>What kind of food do you want?</span>
                <TagList tags={uniqueTags} selectedTags={selectedTags} handleTagChange={handleTagChange} />
                <span className='title'>Restaurants</span>
                <RestaurantList restaurants={shownRestaurants} />
            </div>
            <div className="map-slot" slot="main">
                <Map
                    className='map'
                    colorScheme={ColorScheme.FOLLOW_SYSTEM}
                    disableDefaultUI
                    zoomControl
                    fullscreenControl={false}
                    reuseMaps
                    defaultCenter={centerCoordinates}
                    defaultZoom={zoomSettings.default}
                    maxZoom={zoomSettings.max}
                    minZoom={zoomSettings.min}
                    mapId={import.meta.env.VITE_GOOGLE_MAPS_MAP_ID}
                    onBoundsChanged={(event) => setBounds(event.detail.bounds)}
                    onTilesLoaded={(event) => setBounds(event.map.getBounds()?.toJSON())}>
                    <AdvancedMarker position={centerCoordinates} title='Work Location'>
                        <img src={logo} alt='Lunch Picker' />
                    </AdvancedMarker>
                    {shownRestaurants.map((restaurant, index) => (
                        <AdvancedMarker key={`marker-${index}`} position={restaurant.location} title={restaurant.name} >
                            <MarkerTag title={restaurant.name} tags={uniqueTags.filter(tag => restaurant.tags.includes(tag))} />
                        </AdvancedMarker>
                    ))}
                </Map>
            </div>
        </SplitLayout >
    )
}   