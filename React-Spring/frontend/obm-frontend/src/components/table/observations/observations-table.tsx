/* eslint-disable react/jsx-no-bind */
import { Paper, InputBase, IconButton, makeStyles } from '@material-ui/core';
import React, { useCallback, useEffect, useState } from 'react';
import { ObservationDto } from '../../../models/observation';
import dataPointsStore from '../../../Store/data-points';
import { TableComponent } from '../table-component';
import SearchIcon from '@material-ui/icons/Search';
import { DeleteAlertDialog } from '../delete-alert-dialog';
import { deleteObservationByObservationId } from '../../../api/observation-api';
import loginData from '../../../Store/login-data';

const useStyles = makeStyles({
    paper: {
        p: '2px 4px',
        display: 'flex',
        alignItems: 'center',
        width: 400,
        marginLeft: 'auto',
        marginRight: 'auto',
        marginTop: '10px',
        marginBottom: '10px',
        paddingLeft: '25px'
    },
    input: {
        marginLeft: 1,
        flex: 1
    }
});

export const ObservationsTable = () => {
    const classes = useStyles();
    const heads = ['Common name', 'Development', 'Number', 'Location', 'Date', 'Status', 'Uploader'];
    const [rowsWithAllData, setRowsWithAllData] = useState<(string | number)[][]>([]);
    const [rows, setRows] = useState<(string | number)[][]>([]);
    const [searchText, setSearchText] = useState<string | null>(null);
    const [visible, setVisible] = useState(false);
    const [id, setId] = useState<string | number>(0);
    const openDialog = useCallback(() => setVisible(true), []);
    const closeDialog = useCallback(() => {
        setVisible(false);
        setId(0);
    }, []);

    const thisUsername = localStorage.getItem('username');
    
    useEffect(() => {
        dataPointsStore.loadAllObservations();
        let listOfObservations = dataPointsStore.observationsDto.map((obs: ObservationDto) => {
            console.log(obs);
            return [obs.species.nameCommon,
            obs.development,
            obs.number,
            obs.location.locationName,
            obs.date.toString(),
            obs.status,
            obs.uploader.username
            ]
        })

        // console.log(isScientistUser(thisUsername))
        if (loginData.isScientistUser()) {
            listOfObservations = listOfObservations.filter((obs) => {console.log(`"${obs[6]}"` == thisUsername); return `"${obs[6]}"` == thisUsername})
        }
        
        console.log(listOfObservations)
        setRowsWithAllData(listOfObservations);
        setRows(listOfObservations);
    }, [thisUsername]);

    useEffect(() => {
        console.log(searchText)
        if (searchText && searchText.length > 0) {
            const newRows = rowsWithAllData.filter((obs) => {
                return obs.some((item) => typeof (item) === 'string' && item.includes(searchText));
            });
            setRows(newRows);
        } else {
            setRows(rowsWithAllData);
        }
    }, [rowsWithAllData, searchText]);

    const handleChange = useCallback((e) => {
        setSearchText(e.target.value)
    }, [])

    function handleEdit(value: string | number) {
        console.log(value);
    }

    function handleDelete(value: string | number) {
        console.log(value);
        setId(value);
        openDialog();
    }

    async function triggerDelete() {
        await deleteObservationByObservationId(id);
        closeDialog()
    }

    return (
        <>
            <Paper
                className={classes.paper}
                component="form"
            >
                <InputBase
                    className={classes.input}
                    onChange={handleChange}
                    placeholder="Search"
                />
                <IconButton aria-label="search" type="submit">
                    <SearchIcon />
                </IconButton>
            </Paper>
            <TableComponent
                handleDelete={handleDelete}
                handleEdit={handleEdit}
                heads={heads}
                rows={rows}
            />
            <DeleteAlertDialog closeDialog={closeDialog} id={id} item="observations"
                triggerDelete={triggerDelete} visible={visible} />
        </>
    );
};
