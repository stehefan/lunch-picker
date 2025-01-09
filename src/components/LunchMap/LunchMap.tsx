import './LunchMap.css';
import {
    SplitLayout
} from '@googlemaps/extended-component-library/react';
import { AdvancedMarker, ColorScheme, ControlPosition, Map, MapControl, useMapsLibrary } from "@vis.gl/react-google-maps";
import { useEffect, useState } from "react";
import { ZoomSettings } from '../../types/App';
import { Location, Restaurant } from '../../types/Place';
import { MarkerTag } from "../MarkerTag/MarkerTag";
import { RestaurantList } from '../RestaurantList/RestaurantList';
import { TagFilter } from '../TagFilter/TagFilter';
import { AddRestaurantDialog } from '../AddRestaurantDialog/AddRestaurantDialog';
import { createRestaurantFromGooglePlace, fetchRestaurantDetails, isRestaurantShown } from '../../utils/restaurant';
import { toggleTag } from '../../utils/tags';
import { FilterSection } from '../FilterSection/FilterSection';
import { PriceFilter } from '../PriceFilter/PriceFilter';
import { PlusCircleIcon } from '@heroicons/react/20/solid';

export interface LunchMapProps {
    centerCoordinates: Location;
    zoomSettings: ZoomSettings;
    restaurants: Restaurant[];
    logo: string;
}

export function LunchMap({ centerCoordinates, zoomSettings, restaurants, logo }: LunchMapProps) {
    const uniqueTags = [...new Set(restaurants.flatMap(restaurant => restaurant.tags))];
    const [selectedTags, setSelectedTags] = useState<string[]>(uniqueTags);
    const [selectedPrice, setSelectedPrice] = useState<google.maps.places.PriceLevel | undefined>(undefined);
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
        setShownRestaurants(restaurantInfos.filter(restaurant => isRestaurantShown(restaurant, coreLibrary, bounds, selectedTags, selectedPrice)));
    }, [bounds, selectedTags, selectedPrice, restaurantInfos, coreLibrary]);

    const handleTagChange = (tag: string) => {
        setSelectedTags(toggleTag(selectedTags, tag));
    };

    const handlePriceChange = (price: google.maps.places.PriceLevel | undefined) => {
        setSelectedPrice(price);
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
                                <TagFilter tags={uniqueTags} selectedTags={selectedTags} handleTagChange={handleTagChange} />
                            </FilterSection>
                            <FilterSection title='How much do you want to spend?' className='filter-section'>
                                <PriceFilter selectedPrice={selectedPrice} handlePriceChange={handlePriceChange} />
                            </FilterSection>
                        </div>
                        <div className='restaurant-list-wrapper'>
                            <RestaurantList restaurants={shownRestaurants} />
                        </div>
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
                    <MapControl position={ControlPosition.TOP_RIGHT}>
                        <button className='map-control-add' onClick={() => setShowAddDialog(!showAddDialog)} title={showAddDialog ? 'Close' : 'Add Restaurant to List'}>
                            <PlusCircleIcon className={`map-control-icon ${showAddDialog ? 'map-control-icon-active' : ''}`} />
                        </button>
                    </MapControl>
                    <AdvancedMarker position={centerCoordinates} title='Work Location'>
                        <img src={logo} alt='Lunch Picker' />
                    </AdvancedMarker>
                    {selectedRestaurant && (
                        <AdvancedMarker position={selectedRestaurant.location!.toJSON()} title={selectedRestaurant.displayName!} />
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