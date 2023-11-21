import { MapElementDto, Observation, ObservationDto } from '../../models/observation';
import { DetailedCheckitoutDto } from '../dto/checkitout';

type Geometry = {
    coordinates: { x: number; y: number }[];
    type: string;
};

  export function geoElementMapper(geoElement: string): [number, number][] {
      if (geoElement) {
          const geometry: Geometry = JSON.parse(geoElement);

          return geometry.coordinates.map((item) => [item.x, item.y]);
      }

      return [];
    }

  export const checkitoutDtoToDataPoint = (element: ObservationDto): Observation => {
      return {
          // element.geoElement.coordinates structure modification:
          // [ {x, y}; {x, y}; ...; {x, y} ]   ==>  [ [x, y], [x, y], ... [x, y] ]
          // where x is longitude and y is latitude
          observationId: element.observationId,
          speciesName: element.species.nameCommon,
          uploaderName: element.uploader.username,
          locationName: element.location.locationName,
          development: element.development,
          status: element.status,
          number: element.number,
          date: new Date(element.date),
          geometry: geoElementMapper(element.geometry),
      };
  };

export const checkitoutDtoToDataPointList = (list: ObservationDto[]) => {
    if (list) return list.map((el) => checkitoutDtoToDataPoint(el));
    return [];
};

export const detailedCheckitoutDtoToFetchedDataPoint = (element: DetailedCheckitoutDto) => ({
    specie: element.species,
    number: element.number,
    type: element.type,
    date: element.date,
    corpse: element.corpse,
    location: element.location,
    countryGroupCode: element.countryGroupCode,
    sex: element.gender,
});

export const observationToMapElement = (observation: ObservationDto): MapElementDto => {
  return ({
      coordinates: geoElementMapper(observation.geometry),
      observationId: observation.observationId,
      type: (JSON.parse(observation.geometry) as Geometry).type
  });
}