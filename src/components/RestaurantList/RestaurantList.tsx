import { useAtom } from "jotai";
import { shownRestaurantsAtom, numberOfRestaurantsAtom } from "../../atoms/restaurantAtoms";
import { RestaurantCard } from "../RestaurantCard/RestaurantCard";
import './RestaurantList.css';


export function RestaurantList() {
    const [restaurants] = useAtom(shownRestaurantsAtom);
    const [numberOfRestaurants] = useAtom(numberOfRestaurantsAtom);
    return (
        <>
            <div className='restaurant-list'>
                {restaurants.map((restaurant, index) => (
                    <RestaurantCard key={`restaurant-${index}`} restaurant={restaurant} />
                ))}
            </div>
            <div className='restaurant-count'>{restaurants.length} {restaurants.length === 1 ? 'restaurant' : 'restaurants'} found (out of {numberOfRestaurants})</div>
        </>
    )
}
