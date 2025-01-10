import {
    SplitLayout
} from '@googlemaps/extended-component-library/react';
import { PlusCircleIcon } from '@heroicons/react/20/solid';
import { AdvancedMarker, ControlPosition, Map, MapControl } from "@vis.gl/react-google-maps";
import { useAtom, useSetAtom } from 'jotai';
import {
    boundsAtom,
    selectedRestaurantAtom,
    showAddDialogAtom,
    shownRestaurantsAtom
} from '../../atoms/restaurantAtoms';
import { ZoomSettings } from '../../types/App';
import { Location } from '../../types/Place';
import { AddRestaurantDialog } from '../AddRestaurantDialog/AddRestaurantDialog';
import { FilterSection } from '../FilterSection/FilterSection';
import { MarkerTag } from "../MarkerTag/MarkerTag";
import { PriceFilter } from '../PriceFilter/PriceFilter';
import { RestaurantList } from '../RestaurantList/RestaurantList';
import { TagFilter } from '../TagFilter/TagFilter';
import './LunchMap.css';

export interface LunchMapProps {
    centerCoordinates: Location;
    zoomSettings: ZoomSettings;
    logo: string;
}

export function LunchMap({ centerCoordinates, zoomSettings, logo }: LunchMapProps) {
    const setBounds = useSetAtom(boundsAtom);

    const [showAddDialog, setShowAddDialog] = useAtom(showAddDialogAtom);
    const [shownRestaurants] = useAtom(shownRestaurantsAtom);
    const [selectedRestaurant] = useAtom(selectedRestaurantAtom);

    return (
        <SplitLayout rowReverse rowLayoutMinWidth={700}>
            <div className="control-slot" slot="fixed">
                {showAddDialog && <AddRestaurantDialog hide={() => setShowAddDialog(false)} />}
                {!showAddDialog && (
                    <>
                        <div className='filters'>
                            <FilterSection title='What kind of food do you want?' className='filter-section'>
                                <TagFilter />
                            </FilterSection>
                            <FilterSection title='How much do you want to spend?' className='filter-section'>
                                <PriceFilter />
                            </FilterSection>
                        </div>
                        <div className='restaurant-list-wrapper'>
                            <RestaurantList restaurants={shownRestaurants} />
                        </div>
                    </>
                )}
            </div>
            <div className="map-slot" slot="main">
                <Map
                    className='map'
                    disableDefaultUI
                    zoomControl
                    fullscreenControl={false}
                    reuseMaps
                    defaultCenter={centerCoordinates}
                    defaultZoom={zoomSettings.default}
                    maxZoom={zoomSettings.max}
                    minZoom={zoomSettings.min}
                    mapId={import.meta.env.VITE_GOOGLE_MAPS_MAP_ID}
                    onBoundsChanged={(event) => setBounds(event.detail.bounds)}>
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
                            <MarkerTag title={restaurant.name} />
                        </AdvancedMarker>
                    ))}
                </Map>
            </div>
        </SplitLayout >
    )
}   