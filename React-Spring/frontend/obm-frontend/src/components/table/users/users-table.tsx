/* eslint-disable react/jsx-no-bind */
import React, { useEffect, useState, useCallback } from 'react';
import { TableComponent } from '../table-component';
import { fetchAllUsers, deleteUserByUserId } from '../../../api/user-api';
import { User } from '../../../api/dto/user';
import { DeleteAlertDialog } from '../delete-alert-dialog';

export const UserTable = () => {
    const heads = ['Role', 'First Name', 'Last Name', 'Username', 'Email', 'Date Of Birth'];
    const [rows, setRows] = useState<(string | number)[][]>([]);

    async function load() {
        const dataOfUsers = await fetchAllUsers();
        const listOfUsers = dataOfUsers.map((user: User) => {
            return [user.role, user.firstName, user.lastName, user.username, user.email, user.dateOfBirth];
        });
        setRows(listOfUsers);
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
    
    function handleEdit(value: string | number) {
        console.log(value);
    }

    function handleDelete(value: string | number) {
        console.log(value);
        setId(value);
        openDialog();
    }

    async function triggerDelete() {
        await deleteUserByUserId(id);
        closeDialog()
    }

    return (
        <>
            <TableComponent
                handleDelete={handleDelete}
                handleEdit={handleEdit}
                heads={heads}
                rows={rows}
            />
            <DeleteAlertDialog closeDialog = {closeDialog} id = {id} item = "user" triggerDelete={triggerDelete}  visible = {visible} />
        </>
    );
};
