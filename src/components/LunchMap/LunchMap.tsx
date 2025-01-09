import {
    SplitLayout
} from '@googlemaps/extended-component-library/react';
import { AdvancedMarker, ColorScheme, Map, useMapsLibrary } from "@vis.gl/react-google-maps";
import { useEffect, useState } from "react";
import { ZoomSettings } from '../../types/App';
import { Location, Restaurant } from '../../types/Place';
import { MarkerTag } from "../MarkerTag/MarkerTag";
import { RestaurantList } from '../RestaurantList/RestaurantList';
import { TagList } from '../TagList/TagList';
import './LunchMap.css';
import { AddRestaurantDialog } from '../AddRestaurantDialog/AddRestaurantDialog';
import { createRestaurantFromGooglePlace, fetchRestaurantDetails, isRestaurantShown } from '../../utils/restaurant';
import { toggleTag } from '../../utils/tags';
import { FilterSection } from '../FilterSection/FilterSection';

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
    const [restaurantInfos, setRestaurantInfos] = useState<Restaurant[]>([]);
    const [shownRestaurants, setShownRestaurants] = useState<Restaurant[]>([]);
    const [showAddDialog, setShowAddDialog] = useState(false);
    const [selectedRestaurant, setSelectedRestaurant] = useState<google.maps.places.Place | undefined>(undefined);

    const coreLibrary: google.maps.CoreLibrary | null = useMapsLibrary('core');
    const placesLibrary: google.maps.PlacesLibrary | null = useMapsLibrary('places');

    useEffect(() => {
        if (restaurants.length == 0 || !placesLibrary) {
            return;
        }
        const placeRequestPromises: Promise<Restaurant>[] = restaurants.map(fetchRestaurantDetails);
        Promise
            .all(placeRequestPromises)
            .then(details => {
                setRestaurantInfos(details);
            });
    }, [restaurants, placesLibrary]);

    useEffect(() => {
        setShownRestaurants(restaurantInfos.filter(restaurant => isRestaurantShown(restaurant, coreLibrary, bounds, selectedTags)));
    }, [bounds, selectedTags, restaurantInfos, coreLibrary]);

    const handleTagChange = (tag: string) => {
        setSelectedTags(toggleTag(selectedTags, tag));
    };

    const addRestaurant = (googlePlace: google.maps.places.Place) => {
        setRestaurantInfos([...restaurantInfos, createRestaurantFromGooglePlace(googlePlace)]);
        setSelectedRestaurant(undefined);
    };

    const showRestaurant = (restaurant: google.maps.places.Place | undefined) => {
        setSelectedRestaurant(restaurant);
    };

    return (
        <SplitLayout rowReverse rowLayoutMinWidth={700}>
            <div className="control-slot" slot="fixed">
                {showAddDialog && <AddRestaurantDialog hide={() => setShowAddDialog(false)} addRestaurant={addRestaurant} showRestaurant={showRestaurant} />}
                {!showAddDialog && (
                    <>
                        <div className='filters'>
                            <FilterSection title='What kind of food do you want?' className='filter-section'>
                                <TagList tags={uniqueTags} selectedTags={selectedTags} handleTagChange={handleTagChange} />
                            </FilterSection>
                        </div>
                        <div className='restaurant-list-wrapper'>
                            <RestaurantList restaurants={shownRestaurants} />
                        </div>
                        <button onClick={() => setShowAddDialog(true)}>Add restaurant</button>
                    </>
                )}
            </div>
            <div slot="overlay">
                <div className='overlay-content'>
                    <span className='overlay-title'>{shownRestaurants.length} {shownRestaurants.length === 1 ? 'restaurant' : 'restaurants'} found</span>
                </div>
            </div>
            <div className="map-slot" slot="main">
                <Map
                    className='map'
                    colorScheme={ColorScheme.DARK}
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
                    {selectedRestaurant && (
                        <AdvancedMarker position={selectedRestaurant.location!.toJSON()} title={selectedRestaurant.displayName!} >

                        </AdvancedMarker>
                    )}
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