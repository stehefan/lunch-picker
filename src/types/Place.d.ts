export type Restaurant = {
    name: string;
    tags: string[]
    placeId: string;
    location: Location;
    openingHours: OpeningHoursPeriod[];
    priceLevel?: PriceLevel;
    rating?: number;
};

export type OpeningHoursPeriod = {
    open: OpeningHoursPoint;
    close: OpeningHoursPoint;
}

export type OpeningHoursPoint = {
    day: number;
    hour: number;
    minute: number;
}

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
