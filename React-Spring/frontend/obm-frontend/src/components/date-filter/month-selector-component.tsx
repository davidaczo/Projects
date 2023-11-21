import { createStyles, FormControl, Grid, InputLabel, makeStyles, Select } from '@material-ui/core';
import React, { FC, useCallback } from 'react';
import { useTranslation } from 'react-i18next';

const useStyles = makeStyles(() =>
    createStyles({
        formControl: {
            width: '100%',
            alignSelf: 'center',
        },
    })
);

type MonthSelectorType = {
    selectedFromMonth: number;
    setSelectedFromMonth: (n: number) => void;
    selectedToMonth: number;
    setSelectedToMonth: (n: number) => void;
};

const months = [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December',
];

export const MonthSelectorComponent: FC<MonthSelectorType> = ({
    selectedFromMonth,
    setSelectedFromMonth,
    selectedToMonth,
    setSelectedToMonth,
}: MonthSelectorType) => {
    const classes = useStyles();
    const { t } = useTranslation();
    const handleFromChange = useCallback(
        (event: React.ChangeEvent<{ name?: string; value: unknown }>) => {
            const index = Number.parseInt(event.target.value as string, 10);
            setSelectedFromMonth(index);
        },
        [setSelectedFromMonth]
    );

    const handleToChange = useCallback(
        (event: React.ChangeEvent<{ name?: string; value: unknown }>) => {
            const index = Number.parseInt(event.target.value as string, 10);
            setSelectedToMonth(index);
        },
        [setSelectedToMonth]
    );

    return (
        <Grid
            alignItems="center"
            container
            direction="row"
            item
            justifyContent="space-between"
            spacing={2}
        >
            <Grid item xs={6}>
                <FormControl className={classes.formControl} variant="standard">
                    <InputLabel id="labelFromId">{t('from')}</InputLabel>
                    <Select
                        label="From"
                        labelId="labelFromId"
                        native
                        onChange={handleFromChange}
                        value={selectedFromMonth}
                    >
                        {months.map((month, index) => (
                            <option key={month} value={index}>
                                {t(`${month}`)}
                            </option>
                        ))}
                    </Select>
                </FormControl>
            </Grid>
            <Grid item xs={6}>
                <FormControl className={classes.formControl} variant="standard">
                    <InputLabel id="labelToId">{t('to')}</InputLabel>
                    <Select
                        label="To"
                        labelId="labelToId"
                        native
                        onChange={handleToChange}
                        value={selectedToMonth}
                    >
                        {months.map((month, index) => (
                            <option key={month} value={index}>
                                {t(`${month}`)}
                            </option>
                        ))}
                    </Select>
                </FormControl>
            </Grid>
        </Grid>
    );
};
