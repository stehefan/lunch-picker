export type Restaurant = {
    name: string;
    tags: string[]
    placeId: string;
    location: Location;
    place?: google.maps.places.Place;
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
