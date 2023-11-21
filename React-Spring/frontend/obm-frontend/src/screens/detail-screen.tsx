import {
    Box,
    Card,
    CardContent,
    CardHeader,
    CardMedia,
    Grid,
    makeStyles,
    Typography,
} from '@material-ui/core';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router';
import { DetailedCheckitoutDto } from '../api/dto/checkitout';
import { getObservationById } from '../api/observation-api';
import { ObmAppBar } from '../components/header/obm-app-bar';
import { DetailScreenMap } from '../components/common/detail-screen-map';
import { DetailCardSkeleton } from '../components/common/detail-card-skeleton';
import { useTranslation } from 'react-i18next';
import { observationToMapElement } from '../api/assembler/checkitout-assembler';
import { MapElementDto } from '../models/observation';

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

type detailInput = {
    observationId: string | undefined;
};

export const DetailScreenComponent = () => {
    const classes = useStyles();
    const { t } = useTranslation();
    const { observationId } = useParams<detailInput>();
    const [element, setElement] = useState<DetailedCheckitoutDto>();
    const [error, setError] = useState<boolean>(false);
    const [isLoading, setIsLoading] = useState<boolean>(true);
    const [mapElement, setMapElement] = useState<MapElementDto>();

    useEffect(() => {
        const getCheckitoutDto = async () => {
            try {
                setIsLoading(true);
                if (observationId !== undefined && observationId !== null) {
                    const checkitoutDto = await getObservationById(Number.parseInt(observationId, 10));

                    setElement(checkitoutDto);
                    setMapElement(observationToMapElement(checkitoutDto));
                    setIsLoading(false);
                } else {
                    setError(true);
                }
            } catch (e) {
                console.log('Error occurred while fetching data: ', e);
                setError(true);
            }
        };
        getCheckitoutDto();
    }, [observationId]);

   

    if (error) {
        return <div>{t('not_found')}</div>;
    }

    if (isLoading || element === undefined || mapElement === undefined) {
        return (
            <>
                <ObmAppBar />
                <DetailCardSkeleton />
            </>
        );
    }
    return (
        <>
            <ObmAppBar />
            <Card className={classes.root} variant="elevation">
                <Grid alignItems="flex-start" container direction="column">
                    <CardHeader
                        className={classes.title}
                        color="textPrimary"
                        subheader={element.type}
                        title={element.species}
                    />
                    <CardContent>
                        <Typography>
                            <Box display="flex" flexDirection="row" justifyContent="flex-start">
                                {t('number')}:
                                {` ${element.number}` ?? ' -'}
                            </Box>
                        </Typography>
                        <Typography>
                            <Box display="flex" flexDirection="row" justifyContent="flex-start">
                                {t('gender')}:
                                {` ${element.gender ?? '-'}`}
                            </Box>
                        </Typography>
                        <Typography>
                            <Box display="flex" flexDirection="row" justifyContent="flex-start">
                            {t('date')}:
                                {` ${element.date ?? '-'}`}
                            </Box>
                        </Typography>
                        <Typography>
                            <Box display="flex" flexDirection="row" justifyContent="flex-start">
                            {t('location')}:
                                {` ${element.location ?? '-'}`}
                            </Box>
                        </Typography>
                        <Typography>
                            <Box display="flex" flexDirection="row" justifyContent="flex-start">
                            {t('country_group_code')}:
                                {` ${element.countryGroupCode ?? '-'}`}
                            </Box>
                        </Typography>
                        <Typography>
                            <Box display="flex" flexDirection="row" justifyContent="flex-start">
                            {t('corpse')}:
                                {` ${element.corpse ?? '-'}`}
                            </Box>
                        </Typography>
                    </CardContent>
                </Grid>
                {element.geoElement === null || element.geoElement === undefined ? (
                    ''
                ) : (
                    <CardMedia className={classes.cover}>
                        <DetailScreenMap coordinates={ mapElement.coordinates } markerType={ mapElement.type} />
                    </CardMedia>
                )}
            </Card>
        </>
    );
};
