export type Place = {
    name: string;
    tags: string[]
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
