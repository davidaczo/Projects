/* eslint-disable react/jsx-no-bind */
import React from 'react';

import { User } from '../../components/table/users/users';
import {
    Box,
    Card,
    CardContent,
    CardHeader,
    Grid,
    makeStyles,
    Typography
} from '@material-ui/core';
import { t } from 'i18next';

type ScientistCardProp = {
    user: User
}

const useStyles = makeStyles({
    root: {
        minWidth: 575,
        margin: 25,
        display: 'flex',
        alignContent: 'flex-start',
    },
    bullet: {
        display: 'inline-block',
        margin: '5px',
        transform: 'scale(0.8)',
    },
    title: {
        fontSize: 14,
    },
    pos: {
        marginBottom: 12,
    },
    cover: {
        margin: 25,
        minHeight: 300,
        minWidth: 300,
    },
    skeletonCover: {
        minHeight: 300,
        minWidth: 300,
    },
    skeleton: {
        marginBottom: 6,
    },
});



export const ScientistCard = ({ user }: ScientistCardProp) => {
    const classes = useStyles();
    console.log("asdasd")
    return (
        <Card className={classes.root} variant="elevation">
            <Grid alignItems="flex-start" container direction="column">
                <CardHeader
                    className={classes.title}
                    color="primary"
                    subheader={t('scientist')}
                    title={user.firstName + user.lastName}
                />
                <CardContent>
                    <Typography>
                        <Box display="flex" flexDirection="row" justifyContent="flex-start">
                            {t('first_name')}:
                            {` ${user.firstName}` ?? ' -'}
                        </Box>
                    </Typography>
                    <Typography>
                        <Box display="flex" flexDirection="row" justifyContent="flex-start">
                            {t('last_name')}:
                            {` ${user.lastName}` ?? ' -'}
                        </Box>
                    </Typography>
                    <Typography>
                        <Box display="flex" flexDirection="row" justifyContent="flex-start">
                            {t('email')}:
                            {` ${user.email ?? '-'}`}
                        </Box>
                    </Typography>
                    <Typography>
                        <Box display="flex" flexDirection="row" justifyContent="flex-start">
                            {t('date_of_birth')}:
                            {` ${user.dateOfBirth ?? '-'}`}
                        </Box>
                    </Typography>
                </CardContent>
            </Grid>
        </Card>
    );
};

