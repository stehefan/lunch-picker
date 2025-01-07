import { RestaurantCard } from "../RestaurantCard/RestaurantCard";
import { Restaurant } from "../../types/Place";

interface RestaurantListProps {
    restaurants: Restaurant[];
}

export function RestaurantList({ restaurants }: RestaurantListProps) {
    return (
        <div className='restaurant-list'>
            {restaurants.map((restaurant, index) => (
                <RestaurantCard key={`restaurant-${index}`} restaurant={restaurant} />
            ))}
        </div>
    )
}
