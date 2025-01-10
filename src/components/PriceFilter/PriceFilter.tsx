import { useMapsLibrary } from '@vis.gl/react-google-maps';
import { useAtom } from 'jotai';
import { Suspense, useEffect } from 'react';
import { selectedPriceAtom, priceLevelsAtom } from '../../atoms/restaurantAtoms';
import './PriceFilter.css';

function mapPriceLevelToLabel(priceLevel: string): string {
    return priceLevel.split('_').map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase()).join(' ');
}

export function PriceFilter() {
    const placesLibrary = useMapsLibrary('places');
    const [selectedPrice, setSelectedPrice] = useAtom(selectedPriceAtom);
    const [priceLevels, setPriceLevels] = useAtom(priceLevelsAtom);

    useEffect(() => {
        if (!placesLibrary) {
            return;
        }
        const priceLevels = Object.values(placesLibrary.PriceLevel).filter(priceLevel => priceLevel !== placesLibrary.PriceLevel.FREE);
        setPriceLevels(priceLevels);
    }, [placesLibrary, setPriceLevels]);

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
                        onChange={() => setSelectedPrice(undefined)}
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
                                onChange={() => setSelectedPrice(priceLevel)}
                            />
                        </label>
                    )
                })}
            </div>
        </Suspense>);
}