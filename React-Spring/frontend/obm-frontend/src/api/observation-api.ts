import { DateService } from '../service/date-service';
import dataPointsStore from '../Store/data-points';
import filterDataStore from '../Store/filtering-data';
import { FilterObservationDto, ObvservationCreationDto } from './dto/observation';
import { axiosWithCredentials } from './obm-axios';

export const fetchAllObservations = async () => {
  try {
    const response = await axiosWithCredentials.get(
      'http://localhost:8082/api/observations'
    );
    console.log('all obsrvations in fetch = ', response.data);
    return response.data;
  } catch (error) {
    console.log('Problem with fetching observations: ', error);
    return [];
  }
};

export const deleteObservationByObservationId = async (observationId: number | string) => {
  try {
    await axiosWithCredentials.delete(
      `http://localhost:8082/api/observations/${observationId}`,
    );
  } catch (error) {
    console.log('Problem with deleting data: ', error);
  }
};

export const getObservationById = async (observationId: number) => {
  try {
    const response = await axiosWithCredentials.get(
      `http://localhost:8082/api/observations/${observationId}`,
    );
    return await response.data;
  } catch (error) {
    console.debug('Problem with fetching data: ', error);
    return;
  }
};

export const saveObservation = async (newObservation: ObvservationCreationDto) => {
  try{
    const axiosConfig = {
      headers: {
         'Content-Type': 'application/json',
         'Access-Control-Allow-Origin': '*',
      }
    };

   const postData = JSON.stringify(newObservation);
   console.log(postData)
    const response = await axiosWithCredentials.post(
      'http://localhost:8082/api/observations', postData, axiosConfig
    )
    console.log(response);
    return response.data;
  } catch (error) {
    console.debug("Problem with saving observation: ", error);
    return;
  }
}

export const fetchSpatialFilteredData = async () => {
  try {
    const response = await axiosWithCredentials.get('http://localhost:8080/api/checkitout/area', {
      params: {
        coordinates: dataPointsStore.drawnPolygon.join(','),
      },
    });
    return response.data;
  } catch (error) {
    console.debug('Problem while fetching filtered data: ', error);
    return [];
  }
};

export const fetchFilteredDataBySpeciesNameOrDate = async (filter: FilterObservationDto) => {
  try {
    const polygon = dataPointsStore.drawnPolygon.join(',');
    const response = await axiosWithCredentials.get(
      'http://localhost:8082/api/observations/filter', {
      params: {
        speciesList: filter.speciesList?.join(','),
        dateFrom: DateService.formatDate(filter.dateFrom),
        dateTo: DateService.formatDate(filter.dateTo),
        monthFrom: filter.monthFrom,
        monthTo: filter.monthTo,
        coordinates: filterDataStore.spatialFilter ? polygon : null,
      },
    },
    );

    return response.data;
  } catch (error) {
    console.debug('Problem while fetching filtered data: ', error);
    return [];
  }
};