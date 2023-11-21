import React, { useCallback,useState } from 'react';
import { fetchAllCountries } from '../../../api/country-api';

import uploadDataStore from '../../../Store/upload-data';
import { DropDownValue, UploadAutocompleteSelect } from './upload-autocomplete-select';

type Props = {
    label: string;
};

export const CountryAutocompleteSelect = ({ label }: Props) => {
    const [filteredList, setFilteredList] = useState<DropDownValue[]>([]);

    const filter = useCallback(async (search: string): Promise<void> => {
        const returnList = await fetchAllCountries();
        returnList.filter((txt: { countryName: string; id: number }) =>
            txt.countryName.includes(search)
        );
        setFilteredList(
            returnList.map((country: { countryId: number; countryName: string }) => ({
                name: country.countryName,
                id: country.countryId,
            }))
        );
    }, []);

    const onChange = useCallback(
        (_event: React.ChangeEvent<unknown>, newValue: DropDownValue | null) => {
            console.log(newValue);
            if(newValue){
                uploadDataStore.setCountryId(newValue.id);
            }
        },
        []
    );

    return (
        <UploadAutocompleteSelect
            filter={filter}
            items={filteredList}
            label={label}
            onChange={onChange}
        />
    );
};
