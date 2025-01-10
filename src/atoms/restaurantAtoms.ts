import { atom } from 'jotai';
import { Restaurant } from '../types/Place';
import { isRestaurantShown } from '../utils/restaurant';
import { Tag } from '../types/Filter';
import { PriceLevel } from '../types/Enum';

export const tagsAtom = atom<Tag[]>([]);
export const selectedPriceAtom = atom<PriceLevel | undefined>(undefined);
export const boundsAtom = atom<google.maps.LatLngBoundsLiteral | undefined>(undefined);
export const restaurantAtom = atom<Restaurant[]>([]);
export const showAddDialogAtom = atom<boolean>(false);
export const selectedRestaurantAtom = atom<google.maps.places.Place | undefined>(undefined);
export const priceLevelsAtom = atom<PriceLevel[]>([]);

export const shownRestaurantsAtom = atom<Restaurant[]>((get) => {
    const restaurants = get(restaurantAtom);
    const bounds = get(boundsAtom);
    const selectedTags = get(tagsAtom);
    const selectedPrice = get(selectedPriceAtom);

    return restaurants.filter(restaurant => isRestaurantShown(restaurant, bounds, selectedTags, selectedPrice));
}); 
