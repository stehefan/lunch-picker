import { Restaurant } from "../../types/Place";
import './RestaurantCard.css';
interface RestaurantCardProps {
    restaurant: Restaurant;
}

export function RestaurantCard({ restaurant }: RestaurantCardProps) {
    return (
        <div className='card'>
            <div className='name'>
                {restaurant.name}
            </div>
            <div className='tags'>
                {restaurant.tags.map((tag, index) => (
                    <div key={`tag-${index}`} className='restaurant-list--tag'>
                        {tag}
                    </div>
                ))}
            </div>
        </div>)
}