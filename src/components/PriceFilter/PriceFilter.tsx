import { Suspense, useEffect } from 'react';
import { useState } from 'react';
import './PriceFilter.css';
import { useMapsLibrary } from '@vis.gl/react-google-maps';

interface PriceFilterProps {
    handlePriceChange: (price: google.maps.places.PriceLevel | undefined) => void;
    selectedPrice: google.maps.places.PriceLevel | undefined;
}

function mapPriceLevelToLabel(priceLevel: string): string {
    return priceLevel.split('_').map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase()).join(' ');
}

export function PriceFilter({ handlePriceChange, selectedPrice }: PriceFilterProps) {
    const placesLibrary = useMapsLibrary('places');
    const [priceLevels, setPriceLevels] = useState<google.maps.places.PriceLevel[]>([]);

    useEffect(() => {
        if (!placesLibrary) {
            return;
        }
        const priceLevels = Object.values(placesLibrary.PriceLevel).filter(priceLevel => priceLevel !== placesLibrary.PriceLevel.FREE);
        setPriceLevels(priceLevels);
    }, [placesLibrary]);

    return (
        <Suspense fallback={<div>Loading...</div>}>
            <div className='price-filter'>
                <label key={`price-all`} className='price'>
                    All
                    <input
                        key={`price-all`}
                        type='radio'
                        id={`price-all`}
                        name='selected-price'
                        value={undefined}
                        checked={selectedPrice === undefined}
                        onChange={() => handlePriceChange(undefined)}
                    />
                </label>
                {priceLevels.map((priceLevel, index) => {
                    return (
                        <label key={`price-${index}`} className='price'>
                            {mapPriceLevelToLabel(priceLevel)}
                            <input
                                key={priceLevel}
                                type='radio'
                                id={`price-${index}`}
                                name='selected-price'
                                value={priceLevel}
                                checked={selectedPrice === priceLevel}
                                onChange={() => handlePriceChange(priceLevel)}
                            />
                        </label>
                    )
                })}
            </div>
        </Suspense>);
}