import './AddRestaurantDialog.css';
import { PlacePicker as TPlacePicker } from '@googlemaps/extended-component-library/place_picker.js';
import { IconButton, PlaceOverview, PlacePicker } from "@googlemaps/extended-component-library/react";
import { useRef } from "react";
import { useAtom, useSetAtom } from 'jotai';
import { restaurantAtom, selectedRestaurantAtom, tagsAtom } from '../../atoms/restaurantAtoms';
import { createRestaurantFromGooglePlace } from '../../utils/restaurant';
import { TagFilter } from '../TagFilter/TagFilter';

interface AddRestaurantDialogProps {
    hide: () => void;
}

export const AddRestaurantDialog = ({ hide }: AddRestaurantDialogProps) => {
    const [selectedRestaurant, setSelectedRestaurant] = useAtom(selectedRestaurantAtom);
    const [selectedTags] = useAtom(tagsAtom);
    const setRestaurantInfos = useSetAtom(restaurantAtom);
    const placePickerRef = useRef<TPlacePicker>(null);

    const addRestaurant = () => {
        if (selectedRestaurant) {
            setRestaurantInfos(prev => [...prev, (createRestaurantFromGooglePlace(selectedRestaurant, [...selectedTags.filter(tag => tag.selected).map(tag => tag.name)]))]);
            setSelectedRestaurant(undefined);
            hide();
        }
    };

    return (
        <div className="add-restaurant-content">
            <PlacePicker
                ref={placePickerRef}
                className="place-picker"
                forMap="gmap"
                country={['de']}
                type="restaurant"
                placeholder="Enter a restaurant"
                onPlaceChange={() => {
                    if (placePickerRef.current?.value) {
                        setSelectedRestaurant(placePickerRef.current?.value);
                    } else {
                        setSelectedRestaurant(undefined);
                    }
                }}
            />
            <PlaceOverview
                size="medium"
                className="place-overview"
                place={selectedRestaurant}
                googleLogoAlreadyDisplayed>
                <div slot="action">
                    <IconButton
                        slot="action"
                        variant="filled"
                        onClick={addRestaurant}>
                        Add to restaurant list
                    </IconButton>
                </div>
            </PlaceOverview>
            {selectedRestaurant && <div className="place-tags">
                <div className="place-tags-title">Tags for this restaurant</div>
                <div className="place-tags-list">
                    <TagFilter allowAdd={true} showHint={false} />
                </div>
            </div>}
        </div>
    );
};
