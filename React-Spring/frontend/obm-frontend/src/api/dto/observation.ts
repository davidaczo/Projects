export type ObvservationCreationDto = {
    uploaderId: number,
    locationId : number,
    speciesId : number,
    date: string,
    geometry:  string,
    number: number,
    developement: string,
    status: string;
}

export type FilterObservationDto = {
    speciesList: string[];
    dateFrom: Date | null;
    dateTo: Date | null;
    monthFrom: number | null;
    monthTo: number | null;
    spatialFilter: boolean | null;
    [key: string]: number | Date | string[] | boolean |null;
};