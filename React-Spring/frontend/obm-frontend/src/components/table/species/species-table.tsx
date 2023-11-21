/* eslint-disable react/jsx-no-bind */
import React, { useEffect, useState } from 'react';
import { TableComponent } from '../table-component'
import { fetchAllSpecies } from '../../../api/species-api';
import { Species } from '../../../api/dto/species';

export const SpeciesTable = () => {
    const heads = ['Common Name', 'Latin Name'];
    const [rows, setRows] = useState<(string|number)[][]>([]);

    async function load() {
        const species = await fetchAllSpecies();
        const listOfSpecies = species.map((item: Species) => {
            return [item.nameCommon, item.nameLatin];
        });
        setRows(listOfSpecies);    
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