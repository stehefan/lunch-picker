import { OpeningHoursPeriod, Restaurant } from "../types/Place";
import { Tag } from "../types/Filter";
import { PriceLevel } from "../types/Enum";

const isInBounds = (restaurant: Restaurant, bounds: google.maps.LatLngBoundsLiteral) => {
    const { lat, lng } = restaurant.location;
    const { north, south, east, west } = bounds;
    return lat >= south && lat <= north && lng >= west && lng <= east;
}

export const isRestaurantShown = (restaurant: Restaurant, bounds: google.maps.LatLngBoundsLiteral | undefined, selectedTags: Tag[], selectedPrice: PriceLevel | undefined) => {
    const hasSelectedTags = restaurant.tags.length === 0 || selectedTags.some(tag => tag.selected && restaurant.tags.includes(tag.name));
    const isVisibleOnMap = bounds && isInBounds(restaurant, bounds);
    const isInPriceRange = selectedPrice ? restaurant.priceLevel === selectedPrice : true;

    return hasSelectedTags && isVisibleOnMap && isInPriceRange;
}

export const createRestaurantFromGooglePlace = (googlePlace: google.maps.places.Place): Restaurant => {
    return {
        name: googlePlace.displayName!,
        tags: [],
        placeId: googlePlace.id,
        location: googlePlace.location!.toJSON(),
        openingHours: extractOpeningHours(googlePlace),
        priceLevel: googlePlace.priceLevel || undefined,
        rating: googlePlace.rating || undefined,
    };
}

const extractOpeningHours = (googlePlace: google.maps.places.Place): OpeningHoursPeriod[] => {
    return googlePlace.regularOpeningHours?.periods.map(period => ({
        open: period.open!,
        close: period.close!
    })) || [];
}