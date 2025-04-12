
export type HomeSlideImage = {
    imgName: string;
    text: string;
}

export type RealEstate = {
    id: number;
    size: number;
    price: number;
    location: string;
    amenities: string[];
    photos: string[];
    type: string;
    rooms: number;
    locationUrl: string;
}

export type FormData = {
    search: string;
    sortByPrice: string;
    apartmentsCheck: boolean;
    housesCheck: boolean;
}