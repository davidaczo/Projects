import React, { FC, useCallback, useEffect, useState } from 'react'
import { Grid, Box, makeStyles } from '@material-ui/core'
import { Skeleton } from '@material-ui/lab'
import { Popup } from 'react-leaflet'
import { checkitoutDtoToDataPoint } from '../../api/assembler/checkitout-assembler'
import { getObservationById } from '../../api/observation-api'
// import { fetchedDataPoint } from '../../models/data-point'
import { useTranslation } from 'react-i18next'
import { Observation } from '../../models/observation'

const useStyles = makeStyles({
    title: {
        fontSize: 14,
    },

    skeleton: {
        width: '100%',
        height: 20,
        marginLeft: 5,
    },

    detailBox: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'flex-start',
        margin: 5,
        fontWeight: 'bolder',
    },

    detailValueBox: {
        marginLeft: 5,
        fontWeight: 'normal',
    },

});

type DataPointsPopupProps = {
    observationId: number;
    selectedPlot: number;
};

export const DataPointsPopup: FC<DataPointsPopupProps> = ({ observationId, selectedPlot }) => {
    const classes = useStyles();
    const { t } = useTranslation();
    const [inProgress, setInProgress] = useState<boolean>(false);
    const [selectedData, setSelectedData] = useState<Observation | null>(null);


    const fetchNewSelectedData = useCallback(async () => {
        setInProgress(true);
        const res = await getObservationById(observationId);
        setSelectedData(checkitoutDtoToDataPoint(res));
        setInProgress(false);
    }, [observationId]);

    useEffect(() => {
        if (observationId == selectedPlot) {
            fetchNewSelectedData()
        }
    }, [fetchNewSelectedData, observationId, selectedPlot])
    let day, year, month;
    if(selectedData) {
        day = ('0' + selectedData.date.getDate()).slice(-2);
        year = selectedData.date.getFullYear();
        month = ('0' + (selectedData.date.getMonth() + 1)).slice(-2);
    }
    return (
        <Popup>
            <Grid container spacing={2}>
                <Box className={classes.detailBox}>
                    {t('obm_identity')}:
                    <Box className={classes.detailValueBox}>
                        {observationId}
                    </Box>
                </Box>
                <Box className={classes.detailBox}>
                    {t('specie')}:
                    {inProgress
                        ? <Skeleton className={classes.skeleton} />
                        : (
                            <Box className={classes.detailValueBox}>
                                {selectedData?.speciesName}
                            </Box>
                        )}
                </Box>
                <Box className={classes.detailBox}>
                    {t('date')}:
                    {inProgress
                        ? <Skeleton className={classes.skeleton} />
                        : (
                            <Box className={classes.detailValueBox}>
                                {year + '-' + month + '-' + day}
                            </Box>
                        )}
                </Box>
                <Box className={classes.detailBox}>
                    {t('location')}:
                    {inProgress
                        ? <Skeleton className={classes.skeleton} />
                        : (
                            <Box className={classes.detailValueBox}>
                                {selectedData?.locationName}
                            </Box>
                        )}
                </Box>
                <Box className={classes.detailBox}>
                    {t('number')}:
                    {inProgress
                        ? <Skeleton className={classes.skeleton} />
                        : (
                            <Box className={classes.detailValueBox}>
                                {selectedData?.number}
                            </Box>
                        )}
                </Box>
                {/* <Box display="flex" fontWeight="fontWeightBold" justifyContent="flex-end">
                        <Link to={`/detailed/${observationId}`}> */}
                {/* {t('more_info')} */}
                {/* </Link>
                    </Box>  */}

            </Grid>
        </Popup>

    )
}
