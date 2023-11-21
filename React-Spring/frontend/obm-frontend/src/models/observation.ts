export type ObservationDto = {
    observationId: number;
    geometry: string;
    species: {
        speciesId: number;
        nameLatin: string;
        nameCommon: string;
    };
    number: number;
    development: string;
    date: string;
    status: string;
    location: {
        locationId: number;
        locationName: string;
        country: {
            countryId: number;
            countryName: string;
        };
        active: boolean;
    };
    uploader: {
        active: boolean;
        dateOfBirth: Date | undefined;
        email: string;
        firstName: string;
        lastName: string;
        role: string;
        userId: number;
        username: string;
    };
};

export type Observation = {
    observationId: number;
    geometry: [number, number][];
    speciesName: string;
    uploaderName: string;
    locationName: string;
    number: number;
    development: string;
    date: Date;
    status: string;
};

export type MapElementDto = {
    coordinates: [number, number][];
    observationId: number;
    type: string;
}