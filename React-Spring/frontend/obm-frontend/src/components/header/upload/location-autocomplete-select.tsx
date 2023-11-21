import React, { useCallback, useState } from 'react';
import { fetchAllLocations } from '../../../api/location-api';

import uploadDataStore from '../../../Store/upload-data';
import { DropDownValue, UploadAutocompleteSelect } from './upload-autocomplete-select';

type Props = {
    label: string;
};

export const LocationAutocompleteSelect = ({ label }: Props) => {
    const [filteredList, setFilteredList] = useState<DropDownValue[]>([]);

    const filter = useCallback(async (search: string): Promise<void> => {
        const returnList = await fetchAllLocations();
        returnList.filter((txt: { locationName: string; id: number }) => txt.locationName.includes(search));
        setFilteredList(
            returnList.map((location: { locationId: number; locationName: string }) => ({
                name: location.locationName,
                id: location.locationId,
            }))
        );
    }, []);

    const onChange = useCallback(
        (_e: React.ChangeEvent<unknown>, newValue: DropDownValue | null) => {
            console.log(newValue);
            if (newValue) {
                uploadDataStore.setLocationId(newValue.id);
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
