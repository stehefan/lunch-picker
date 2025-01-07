export type Restaurant = {
    name: string;
    tags: string[]
    placeId: string;
    address: Address;
    location: Location;
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
