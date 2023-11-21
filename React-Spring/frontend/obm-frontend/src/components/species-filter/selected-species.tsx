import React from 'react';
import { Box, Chip, makeStyles } from '@material-ui/core';

interface SelectedSpeciesProps {
    removeSpecies: (specie: string) => void;
    species: string[];
}

const useStyles = makeStyles({
    chip: {
        margin: 5,
    },
});

export const SelectedSpecies = ({ removeSpecies, species }: SelectedSpeciesProps) => {
    const classes = useStyles();
    return (
        <Box display="flex" flexWrap="wrap">
            {species.map((s: string) => (
                <Chip
                    className={classes.chip}
                    color="primary"
                    key={s}
                    label={s}
                    // eslint-disable-next-line react/jsx-no-bind
                    onDelete={() => removeSpecies(s)}
                />
            ))}
        </Box>
    );
};
