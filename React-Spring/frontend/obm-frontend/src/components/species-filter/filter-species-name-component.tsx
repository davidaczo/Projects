import React, { useState, useEffect, useCallback } from 'react';
import TextField from '@material-ui/core/TextField';
import { IconButton, Box, makeStyles } from '@material-ui/core';
import AddCircleIcon from '@material-ui/icons/AddCircle';
import { fetchFilteredSpeciesName } from '../../api/species-api';
import { SelectedSpecies } from './selected-species';
import { checkSpeciesFilter } from './species-util';
import { ClearButton } from '../common/clear-button';

import filterDataStore from '../../Store/filtering-data';
import { Autocomplete } from '@material-ui/lab';
import { useTranslation } from 'react-i18next';

const useStyles = makeStyles({
    box: {
        width: '100%',
        alignSelf: 'center',
    },
    clearFilterButton: {
        margin: 5,
    },
});

export const FilterBySpeciesNameComponent = () => {
    const {t} = useTranslation();
    const [species, setSpecies] = useState<string[]>([]);

    const [open, setOpen] = useState(false);
    const [inputValue, setInputValue] = useState<string>('');

    const [filteredSpecies, setFilteredSpecies] = useState<string[]>([]);

    const classes = useStyles();

    const filterSpecies = async (search: string) => {
        const returnList = await fetchFilteredSpeciesName(search);
        setFilteredSpecies(returnList);
    };

    useEffect(() => {
        filterDataStore.setSpeciesList(species);
    }, [species]);

    useEffect(() => {
        if (checkSpeciesFilter(inputValue)) {
            setOpen(true);
            filterSpecies(inputValue);
        } else {
            setOpen(false);
        }
    }, [inputValue]);

    const handleChange = useCallback((_event: React.ChangeEvent<unknown>, value: string) => {
        setInputValue(value);
    }, []);

    const addSpecies = useCallback(
        (specie: string) => {
            if (checkSpeciesFilter(specie) && !species.find((s) => s === specie)) {
                setSpecies((originalSpecies) => [...originalSpecies, specie]);
                setInputValue('');
            }
        },
        // eslint-disable-next-line react-hooks/exhaustive-deps
        []
    );

    const removeSpecies = useCallback((specie: string) => {
        setSpecies((localSpecies) => localSpecies.filter((s) => s !== specie));
    }, []);

    const handleClick = useCallback(() => {
        addSpecies(inputValue);
    }, [addSpecies, inputValue]);

    const clearFilters = useCallback(() => {
        setSpecies([]);
    }, []);

    const renderInput = useCallback(
        (params) => (
            /* eslint-disable react/jsx-props-no-spreading */
            <TextField {...params} label={t('species')} variant="outlined" />
        ),
        [t]
    );

    return (
        <Box className={classes.box}>
            <Box display="flex" flexDirection="row">
                <Autocomplete
                    inputValue={inputValue}
                    onInputChange={handleChange}
                    open={open}
                    options={filteredSpecies}
                    renderInput={renderInput}
                    style={{ width: 300 }}
                />
                <IconButton color="primary" onClick={handleClick}>
                    <AddCircleIcon fontSize="large" />
                </IconButton>
            </Box>
            <SelectedSpecies removeSpecies={removeSpecies} species={species} />
            <ClearButton clearFilters={clearFilters} />
        </Box>
    );
};
