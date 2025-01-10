import { PriceLevel } from "../../types/Enum";
import { OpeningHoursPeriod, Restaurant } from "../../types/Place";
import './RestaurantCard.css';
interface RestaurantCardProps {
    restaurant: Restaurant;
}

function getPriceIndicator(priceLevel: PriceLevel) {
    switch (priceLevel) {
        case PriceLevel.FREE:
            return '🆓';
        case PriceLevel.INEXPENSIVE:
            return '€';
        case PriceLevel.MODERATE:
            return '€€';
        case PriceLevel.EXPENSIVE:
            return '€€€';
        case PriceLevel.VERY_EXPENSIVE:
            return '€€€€';
        default:
            return '💸';
    }
}

export function RestaurantCard({ restaurant }: RestaurantCardProps) {
    const googleMapsUrl = `https://www.google.com/maps/search/?api=1&query=${restaurant.location.lat},${restaurant.location.lng}&query_place_id=${restaurant.placeId}`;
    const now: Date = new Date()
    let opensAt: Date | null = null;
    const isOpen = restaurant.openingHours?.some(
        period => {
            const isSameDay = period.open.day === now.getDay();
            if (!isSameDay) return false;

            const currentHour = now.getHours();
            // if there is no close time, the restaurant is open
            return currentHour >= period.open.hour && period.close ? currentHour < period.close.hour : true;
        }) || false;

    if (!isOpen) {
        const openeningHoursForToday: OpeningHoursPeriod | undefined = restaurant.openingHours?.find(period => period.open.day === now.getDay());

        if (openeningHoursForToday) {
            const { hour, minute } = openeningHoursForToday.open;
            opensAt = new Date(now.getFullYear(), now.getMonth(), now.getDate(), hour, minute);
        }
    }

    return (
        <div className='card'>
            <span className='card-name'>
                <a href={googleMapsUrl} target="_blank" rel="noopener noreferrer">{restaurant.name}</a> <small>🔗</small>
            </span>
            <div className='card-details'>
                <span>∅ {restaurant.rating}</span>
                {getPriceIndicator(restaurant.priceLevel) && <span>{getPriceIndicator(restaurant.priceLevel)}</span>}
                {isOpen && <span>{isOpen ? 'Open' : 'Closed'}</span>}
                {opensAt && <time dateTime={opensAt.toISOString()}>{opensAt.toLocaleDateString()}</time>}
            </div>
            <div className='card-tags'>
                {restaurant.tags.map((tag, index) => (
                    <span key={`tag-${index}`} className='card-tag' >
                        {tag}
                    </span>
                ))}
            </div>
        </div>)


}