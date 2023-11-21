/**
 * @deprecated
 */
export type DetailedCheckitoutDto = {
    observationId: number;
    geoElement: {
        coordinates: {
            y: number;
            x: number;
        }[];
        type: string;
    };
    species: string;
    number: number;
    type: string;
    date: Date;
    corpse: boolean;
    location: string;
    countryGroupCode: string;
    gender: string;
};
