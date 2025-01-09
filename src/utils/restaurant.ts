import { Restaurant } from "../types/Place";

export const isRestaurantShown = (restaurant: Restaurant, coreLibrary: google.maps.CoreLibrary | null, bounds: google.maps.LatLngBoundsLiteral | undefined, selectedTags: string[], selectedPrice: google.maps.places.PriceLevel | undefined) => {
    const hasSelectedTags = restaurant.tags.length === 0 || selectedTags.some(tag => restaurant.tags.includes(tag));
    const isInBounds = coreLibrary && bounds && new coreLibrary.LatLngBounds(bounds).contains(restaurant.location);
    const isInPriceRange = selectedPrice ? restaurant.priceLevel === selectedPrice : true;
    return hasSelectedTags && isInBounds && isInPriceRange;
}

export function createRestaurantFromGooglePlace(googlePlace: google.maps.places.Place): Restaurant {
    return {
        name: googlePlace.displayName!,
        tags: [],
        placeId: googlePlace.id,
        location: googlePlace.location!.toJSON(),
        openingHours: googlePlace.regularOpeningHours?.periods || [],
        priceLevel: googlePlace.priceLevel || undefined,
        rating: googlePlace.rating || undefined,
    };
}

export async function fetchRestaurantDetails(restaurant: Restaurant): Promise<Restaurant> {
    return new google.maps.places.Place({
        id: restaurant.placeId,
        requestedLanguage: 'en',
    }).fetchFields({
        fields: ['rating', 'priceLevel', 'photos', 'regularOpeningHours']
    }).then(details => {
        return {
            ...restaurant,
            openingHours: details.place.regularOpeningHours?.periods || [],
            priceLevel: details.place.priceLevel || undefined,
            rating: details.place.rating || undefined,
        };
    }).catch(error => {
        console.error(error);
        return restaurant;
    });
}