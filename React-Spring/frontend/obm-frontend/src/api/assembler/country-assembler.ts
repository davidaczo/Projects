import { Country } from '../dto/country';

export const checkitoutDtoToCountry = (element: Country) => {
  return ({
    countryId: element.countryId,
    countryName: element.countryName,
    numberOfLocations: 0,
  });
}

export const checkitoutDtoToCountryList = (list: Country[]) => {
  if (list) return list.map((el) => checkitoutDtoToCountry(el));
  return [];
};