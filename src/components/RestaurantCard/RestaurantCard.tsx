import { useEffect } from "react";
import { useState } from "react";
import { Restaurant } from "../../types/Place";
import './RestaurantCard.css';
interface RestaurantCardProps {
    restaurant: Restaurant;
}

export function RestaurantCard({ restaurant }: RestaurantCardProps) {
    const [isOpen, setIsOpen] = useState<boolean | null>(null);
    const [opensAt, setOpensAt] = useState<Date | null>(null);
    const [priceIndicator, setPriceIndicator] = useState<string | null>(null);

    const googleMapsUrl = restaurant.place?.googleMapsURI || `https://www.google.com/maps/search/?api=1&query=${restaurant.location.lat},${restaurant.location.lng}&query_place_id=${restaurant.placeId}`;

    useEffect(() => {
        const now: Date = new Date()
        restaurant.place?.isOpen(now).then(isOpen => {
            setIsOpen(isOpen ?? false);

            if (!isOpen) {
                const openeningHoursForToday: google.maps.places.OpeningHoursPeriod | undefined = restaurant.place?.regularOpeningHours?.periods.find(period => period.open.day === now.getDay());

                if (openeningHoursForToday) {
                    const { hour, minute } = openeningHoursForToday.open;
                    setOpensAt(new Date(now.getFullYear(), now.getMonth(), now.getDate(), hour, minute));
                }
            }
        });

        switch (restaurant.place?.priceLevel) {
            case google.maps.places.PriceLevel.FREE:
                setPriceIndicator('🆓');
                break;
            case google.maps.places.PriceLevel.INEXPENSIVE:
                setPriceIndicator('€');
                break;
            case google.maps.places.PriceLevel.MODERATE:
                setPriceIndicator('€€');
                break;
            case google.maps.places.PriceLevel.EXPENSIVE:
                setPriceIndicator('€€€');
                break;
            case google.maps.places.PriceLevel.VERY_EXPENSIVE:
                setPriceIndicator('€€€€');
                break;
            default:
                setPriceIndicator('💸');
                break;
        }
    }, [restaurant]);

    return (
        <div className='card'>
            <span className='name'>
                <a href={googleMapsUrl} target="_blank" rel="noopener noreferrer">{restaurant.name}</a> <small>🔗</small>
            </span>
            <div className='details'>
                <span className='rating'>∅ {restaurant.place?.rating}</span>
                {priceIndicator && <span className='price'>{priceIndicator}</span>}
                {isOpen && <span className='open-state'>{isOpen ? 'Open' : 'Closed'}</span>}
                {opensAt && <time className='open-time' dateTime={opensAt.toISOString()}>{opensAt.toLocaleDateString()}</time>}
            </div>
            <div className='tags'>
                {restaurant.tags.map((tag, index) => (
                    <div key={`tag-${index}`} className='tag' >
                        {tag}
                    </div>
                ))}
            </div>
        </div>)
}