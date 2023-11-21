import React, { useCallback, useState } from 'react';
import { fetchUploadFilteredSpeciesName } from '../../../api/species-api';

import uploadDataStore from '../../../Store/upload-data';
import { DropDownValue, UploadAutocompleteSelect } from './upload-autocomplete-select';

export const SpeciesAutocompleteSelect = ({ label }: { label: string }) => {
    const [filteredList, setFilteredList] = useState<DropDownValue[]>([]);

    const filter = useCallback(async (search: string): Promise<void> => {
        const returnList = await fetchUploadFilteredSpeciesName(search);
        console.log(returnList);
        setFilteredList(
            returnList.map(
                (specie: { speciesId: number; nameLatin: string; nameCommon: string }) => ({
                    name: specie.nameCommon,
                    id: specie.speciesId,
                })
            )
        );
    }, []);

    const onChange = useCallback(
        (_e: React.ChangeEvent<unknown>, newValue: DropDownValue | null) => {
            if (newValue) {
                uploadDataStore.setSpeciesId(newValue.id);
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
