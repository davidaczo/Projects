import { DateService } from '../service/date-service';
import { axiosWithCredentials } from './obm-axios';
import { FilterObservationDto } from './dto/observation';

export const fetchAllSpecies = async () => {
  try {

    const response = await axiosWithCredentials.get(
      'http://localhost:8082/api/species'
    );
    console.log(response)
    return response.data;
  } catch (error) {
    console.log('Problem with fetching species: ', error);
    return [];
  }
};

export const fetchFilteredSpeciesName = async (search: string) => {
  try {
    const response = await axiosWithCredentials.get(
      'http://localhost:8082/api/species/search',
      {
        params: {
          search
        },
      },
    );
    console.log(response.data)
    return response.data;
  } catch (error) {
    console.debug('Problem with fetching filtered data: ', error);
    return [];
  }
};

export const fetchUploadFilteredSpeciesName = async (search: string) => {
  try {
    const response = await axiosWithCredentials.get(
      'http://localhost:8082/api/species/upload-search',
      {
        params: {
          search,
        },
      },
    );
    console.log(response.data)
    return response.data;
  } catch (error) {
    console.debug('Problem with fetching filtered data: ', error);
    return [];
  }
};

export const fetchFilteredDataBySpeciesNameOrDate = async (filter: FilterObservationDto) => {
  try {
    console.log(filter)
    const response = await axiosWithCredentials.get(
      'http://localhost:8082/api/observations/filter', {
      params: {
        speciesList: filter.speciesList.join(','),
        dateFrom: DateService.formatDate(filter.dateFrom),
        dateTo: DateService.formatDate(filter.dateTo),
        monthFrom: filter.monthFrom,
        monthTo: filter.monthTo
        // gender: filter.gender,
        // type: filter.type,
      },
    },
    );
    return response.data;
  } catch (error) {
    console.debug('Problem while fetching filtered data: ', error);
    return [];
  }
};
