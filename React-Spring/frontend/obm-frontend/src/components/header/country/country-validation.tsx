import { fetchAllCountries } from '../../../api/country-api';

export const validCountryName = new RegExp(
    '^[A-Z][a-z]*$'
 );

export const checkCountry = (name: string) =>
    name.length > 4 && validCountryName.test(name)

export const checkIfCountryExists = async (name: string) => {
    const response = await fetchAllCountries();

    return response.some((country: { countryName: string; }) => country.countryName === name);

};

