/* eslint-disable react/jsx-no-bind */
import React, { useEffect, useState, useCallback } from 'react';
import { TableComponent } from '../table-component'
import { fetchAllCountries, deleteCountryByCountryId } from '../../../api/country-api';
import { Country } from '../../../api/dto/country';
import { DeleteAlertDialog } from '../delete-alert-dialog';

export const CountriesTable = () => {
    const heads = ['Name'];
    const [rows, setRows] = useState<(string|number)[][]>([]);

    async function load() {
        const dataCountryList = await fetchAllCountries();

        // const locations = await Promise.all(dataCountryList.map(async (country: Country) => {
        //         return (await fetchLocationsByCountry(country.countryId)).length;
        // }));
        const listOfCountries = dataCountryList.map((country: Country) => {
            console.log(country.numberOfLocations)
            return [country.countryName];
        });
     
       setRows(listOfCountries);    
    }
    
    useEffect(() => {      
        load();
    }, []);

    const [visible, setVisible] = useState(false);
    const [id, setId] = useState<string | number>(0);

    const openDialog = useCallback(() => setVisible(true), []);
    const closeDialog = useCallback(() => {
        setVisible(false);
        setId(0);
    }, []);

    function handleEdit(value:string | number){
        console.log(value);
    }

    function handleDelete(value:string | number){
        console.log(value);
        setId(value);
        openDialog();
    }

    async function triggerDelete() {
        await deleteCountryByCountryId(id);
        closeDialog()
    }
    
    return (
        <>
            <TableComponent handleDelete = {handleDelete} handleEdit = {handleEdit} heads = {heads} rows = {rows} />
            <DeleteAlertDialog closeDialog = {closeDialog} id = {id} item = "country" triggerDelete={triggerDelete}  visible = {visible} />
        </>
    );
}