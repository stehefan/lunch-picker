import './AddRestaurantDialog.css';
import { PlacePicker as TPlacePicker } from '@googlemaps/extended-component-library/place_picker.js';

import { IconButton, PlaceOverview, PlacePicker } from "@googlemaps/extended-component-library/react";
import { useEffect, useRef, useState } from "react";

interface AddRestaurantDialogProps {
    hide: () => void;
    addRestaurant: (restaurant: google.maps.places.Place) => void;
    showRestaurant: (restaurant: google.maps.places.Place | undefined) => void;
}

export const AddRestaurantDialog = ({ hide, addRestaurant, showRestaurant }: AddRestaurantDialogProps) => {
    const [restaurant, setRestaurant] = useState<google.maps.places.Place | undefined>(undefined);
    const placePickerRef = useRef<TPlacePicker>(null);

    useEffect(() => {
        if (restaurant) {
            showRestaurant(restaurant);
        }
    }, [restaurant, showRestaurant]);

    return (
        <div className="add-restaurant-content">
            <PlacePicker
                ref={placePickerRef}
                className="CollegePicker"
                forMap="gmap"
                country={['de']}
                type="restaurant"
                placeholder="Enter a restaurant"
                onPlaceChange={() => {
                    if (placePickerRef.current?.value) {
                        setRestaurant(placePickerRef.current?.value);
                    } else {
                        setRestaurant(undefined);
                    }
                }}
            />
            <PlaceOverview
                size="large"
                place={restaurant}
                googleLogoAlreadyDisplayed>
                <div slot="action">
                    <IconButton
                        slot="action"
                        variant="filled"
                        onClick={() => {
                            if (restaurant) {
                                addRestaurant(restaurant);
                                hide();
                            }
                        }}>
                        Add to restaurant list
                    </IconButton>
                </div>
            </PlaceOverview>
        </div>
    );
};
