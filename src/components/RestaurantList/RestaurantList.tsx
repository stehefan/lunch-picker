import { RestaurantCard } from "../RestaurantCard/RestaurantCard";
import { Restaurant } from "../../types/Place";
import './RestaurantList.css';

interface RestaurantListProps {
    restaurants: Restaurant[];
}

export function RestaurantList({ restaurants }: RestaurantListProps) {
    return (
        <>
            <div className='restaurant-list'>
                {restaurants.map((restaurant, index) => (
                    <RestaurantCard key={`restaurant-${index}`} restaurant={restaurant} />
                ))}
            </div>
            <div className='restaurant-count'>{restaurants.length} {restaurants.length === 1 ? 'restaurant' : 'restaurants'} found</div>
        </>
    )
}
