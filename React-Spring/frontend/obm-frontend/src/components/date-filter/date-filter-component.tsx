import React, { useState, useEffect, useCallback } from 'react';
import DateFnsUtils from '@date-io/date-fns';
import { useTranslation } from 'react-i18next'
import { DatePickerView, KeyboardDatePicker, MuiPickersUtilsProvider } from '@material-ui/pickers';
import { Grid, Select, FormControl, createStyles, makeStyles, InputLabel } from '@material-ui/core';
import { MonthSelectorComponent } from './month-selector-component';
import { ClearButton } from '../common/clear-button';

import filterDataStore from '../../Store/filtering-data';

const useStyles = makeStyles(() =>
    createStyles({
        formControl: {
            width: '100%',
            alignSelf: 'center',
        },
    })
);

export enum DateSelectionType {
    EXACT,
    FROM_TO,
    PERIOD,
}

type DateFilterType = {
    filterName: string;
    filterViews: DatePickerView[];
    secondPickerDisabled: boolean;
    filterFormat: string;
    filterType: DateSelectionType;
};

export const DateFilterComponent = () => {
    const { t } = useTranslation();
    const filterList: DateFilterType[] = [
        {
            filterName: t('exact_date'),
            filterViews: ['date'],
            secondPickerDisabled: true,
            filterFormat: 'yyyy/MM/dd',
            filterType: DateSelectionType.EXACT,
        },
        {
            filterName: t('period_of_months'),
            filterViews: ['month'],
            secondPickerDisabled: false,
            filterFormat: 'MMM',
            filterType: DateSelectionType.PERIOD,
        },
        {
            filterName: t('period_between_dates'),
            filterViews: ['date'],
            secondPickerDisabled: false,
            filterFormat: 'yyyy/MM/dd',
            filterType: DateSelectionType.FROM_TO,
        },
    ];
    const [selectedFromDate, setSelectedFromDate] = useState<Date | null>(null);
    const [selectedToDate, setSelectedToDate] = useState<Date | null>(null);
    const [selectedFilter, setSelectedFilter] = useState<DateFilterType>(filterList[0]);
    const [selectedToMonth, setSelectedToMonth] = useState<number>(0);
    const [selectedFromMonth, setSelectedFromMonth] = useState<number>(0);

    useEffect(() => {
        switch (selectedFilter.filterType) {
            case DateSelectionType.FROM_TO:
                setSelectedFromMonth(0);
                setSelectedToMonth(0);
                filterDataStore.setFilteringDate(selectedFromDate, selectedToDate, null, null);
                break;
            case DateSelectionType.PERIOD:
                setSelectedFromDate(null);
                setSelectedToDate(null);
                filterDataStore.setFilteringDate(
                    selectedFromDate,
                    selectedToDate,
                    selectedFromMonth,
                    selectedToMonth
                );
                break;
            default:
                setSelectedToDate(null);
                setSelectedFromMonth(0);
                setSelectedToMonth(0);
                filterDataStore.setFilteringDate(selectedFromDate, selectedToDate, null, null);
                break;
        }
    }, [selectedFromDate, selectedToDate, selectedFromMonth, selectedToMonth, selectedFilter]);

    const handleChange = useCallback((event: React.ChangeEvent<{ name?: string; value: unknown }>) => {
        const index = Number.parseInt(event.target.value as string, 10);
        const elem: DateFilterType =
            filterList.find((element) => element.filterType === index) || filterList[0];
        setSelectedFilter(elem);
    // eslint-disable-next-line
    },[]);

    const clearFilters = useCallback(() => {
        setSelectedFromDate(null);
        setSelectedToDate(null);
        setSelectedFromMonth(0);
        setSelectedToMonth(0);
    },[]);

    const classes = useStyles();
    return (
        <Grid alignItems="center" container direction="column">
            <FormControl className={classes.formControl} variant="outlined">
                <InputLabel id="labelId">{t('date_selection_type')}</InputLabel>
                <Select
                    label="Date selection type"
                    labelId="labelId"
                    native
                    onChange={handleChange}
                    value={selectedFilter.filterType}
                >
                    {filterList.map((filter) => (
                        <option key={filter.filterName} value={filter.filterType}>
                            {filter.filterName}
                        </option>
                    ))}
                </Select>
            </FormControl>
            <MuiPickersUtilsProvider utils={DateFnsUtils}>
                {selectedFilter.filterType === DateSelectionType.PERIOD ? (
                    <MonthSelectorComponent
                        selectedFromMonth={selectedFromMonth}
                        selectedToMonth={selectedToMonth}
                        setSelectedFromMonth={setSelectedFromMonth}
                        setSelectedToMonth={setSelectedToMonth}
                    />
                ) : (
                    <Grid
                        alignItems="center"
                        container
                        direction="row"
                        item
                        justifyContent="space-between"
                        spacing={2}
                    >
                        <Grid item xs={6}>
                            <KeyboardDatePicker
                                clearable
                                format={selectedFilter.filterFormat}
                                label={t("from")}
                                onChange={setSelectedFromDate}
                                value={selectedFromDate}
                                views={selectedFilter.filterViews}
                            />
                        </Grid>
                        <Grid item xs={6}>
                            <KeyboardDatePicker
                                clearable
                                disabled={selectedFilter.secondPickerDisabled}
                                format={selectedFilter.filterFormat}
                                label={t("to")}
                                minDate={selectedFromDate}
                                onChange={setSelectedToDate}
                                value={selectedToDate}
                                views={selectedFilter.filterViews}
                            />
                        </Grid>
                    </Grid>
                )}
            </MuiPickersUtilsProvider>
            <ClearButton clearFilters={clearFilters} />
        </Grid>
    );
};
