/* eslint-disable react/jsx-no-bind */
import React, { useEffect, useState } from 'react';
import { TableComponent } from '../table-component'
import { fetchAllLocations } from '../../../api/location-api';
import { Location } from '../../../api/dto/location';

export const LocationTable = () => {
    const heads = ['Location Name', 'Country Name'];
    const [rows, setRows] = useState<(string|number)[][]>([]);

    async function load() {
        const locations = await fetchAllLocations();
        const listOfLocations = locations.map((location: Location) => {
            return [location.locationName, location.country.countryName];
        });
        setRows(listOfLocations);    
    }

    useEffect(() => {
        load();
    }, []);


    function handleEdit(value:string | number){
        console.log(value);
    }

    function handleDelete(value:string | number){
        console.log(value);
    }
    
    return (
        <TableComponent 
            handleDelete={handleDelete} 
            handleEdit={handleEdit} 
            heads={heads} 
            rows={rows} 
        />
    );
};