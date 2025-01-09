export type Restaurant = {
    name: string;
    tags: string[]
    placeId: string;
    location: Location;
    openingHours: google.maps.places.OpeningHoursPeriod[];
    priceLevel?: google.maps.places.PriceLevel;
    rating?: number;
};

export type Location = {
    lat: number;
    lng: number;
};

export type Address = {
    street: string;
    number: string;
    postal: string;
    city: string;
};
