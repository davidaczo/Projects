import React, { useCallback, useEffect, useState } from 'react';
import TextField from '@material-ui/core/TextField';
import { Box, Typography } from '@material-ui/core';
import { Autocomplete } from '@material-ui/lab';

type Props = {
    label: string;
    onChange: (e: React.ChangeEvent<unknown>, newValue: DropDownValue | null) => void;
    filter: (search: string) => Promise<void>;
    items: DropDownValue[];
};

export type DropDownValue = {
    name: string;
    id: number;
};

export const UploadAutocompleteSelect = ({ label, filter, items, onChange }: Props) => {
    const [inputValue, setInputValue] = useState<string>('');

    const renderInput = useCallback(
        (params) => (
            /* eslint-disable react/jsx-props-no-spreading */
            <TextField {...params} placeholder={label} variant="outlined" />
        ),
        [label]
    );

    const onInputChange = useCallback((_event: React.ChangeEvent<unknown>, value: string) => {
        setInputValue(value);
    }, []);

    useEffect(() => {
        if (inputValue.length > 0) {
            filter(inputValue);
        }
    }, [filter, inputValue]);

    const getOptionLabel = useCallback((option: DropDownValue): string => option.name, []);

    return (
        <Box display="flex" flexDirection="column">
            <Typography style={{ fontSize: 15 }} variant="subtitle2">
                {label}
            </Typography>
            <Autocomplete
                getOptionLabel={getOptionLabel}
                onChange={onChange}
                onInputChange={onInputChange}
                options={items}
                renderInput={renderInput}
                style={{ width: '100%', paddingBottom: 20 }}
            />
        </Box>
    );
};
