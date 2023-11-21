/* eslint-disable react/jsx-max-depth */
import React, { useState, useCallback, ChangeEvent } from 'react';
import {
    Button,
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    Snackbar,
    makeStyles,
    Grid,
    Slider,
} from '@material-ui/core';
import { Alert} from '@material-ui/lab';
import L, { LeafletMouseEvent } from 'leaflet';
import 'leaflet/dist/leaflet.css';
import 'leaflet-draw/dist/leaflet.draw.css';
import { useTranslation } from 'react-i18next';
import { KeyboardDatePicker, MuiPickersUtilsProvider } from '@material-ui/pickers';
import DateFnsUtils from "@date-io/date-fns";
import moment from 'moment';

import { MapConsumer, MapContainer, Marker, TileLayer, ZoomControl } from 'react-leaflet';
import { PolygonDrawerObserver } from '../../map/spatial-filter/polygon-drawer'
import uploadDataStore from '../../../Store/upload-data';
import dataPointsStore from '../../../Store/data-points';
import { CountryAutocompleteSelect } from './country-autocomplete-select';
import { LocationAutocompleteSelect } from './location-autocomplete-select';
import { SpeciesAutocompleteSelect } from './species-autocomplete-select';
import { StatusSelection } from './status-selection';
import { UploadTextInput } from './upload-text-input';
import { User } from '../../../models/user';
import { findUserByUsername } from '../../../api/user-api';
import loginData from '../../../Store/login-data';

const useStyles = makeStyles(theme => ({
    dialogWrapper: {
        padding: theme.spacing(2),
        position: 'absolute',
        top: theme.spacing(5),
        background: '#884E26'
    },
    dialogTitle: {
        paddingRight: '0px',
        fontSize: 60
    },
    typography: {
        fontSize: 15,
    },
    cover: {
        margin: 25,
        minHeight: 250,
        minWidth: 100,
        border: "solid"
    },
}));

type Props = {
    visible: boolean;
    closeDialog: () => void;
};

export const greenIcon = new L.Icon({
    iconUrl:
        'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-green.png',
    iconSize: [25, 41],
    iconAnchor: [12, 41],
    popupAnchor: [1, -34],
    shadowSize: [41, 41],
});

const marks = [
  {
    value: 0,
    label: 'EGG',
  },
  {
    value: 25,
    label: 'HATCHLING',
  },
  {
    value: 50,
    label: 'JUVENILE',
  },
  {
    value: 75,
    label: 'ADULT',
  },
  {
    value: 100,
    label: 'PARENT',
  }
];

export const UploadDialog = ({ visible, closeDialog }: Props) => {
    const { t } = useTranslation();
    const classes = useStyles();
    const [visibleSuccess, setVisibleSuccess] = useState(false);
    const [visibleError, setVisibleError] = useState(false);
    const [value, setValue] = useState<Date | null>(null);
    const [selectedStatus, setSelectedStatus] = useState('a');
    const [markerPosition, setMarkerPosition] = useState<[number,number]>([10,10])
    
    const closeSuccessAlert = useCallback(() => setVisibleSuccess(false), []);
    const closeErrorAlert = useCallback(() => setVisibleError(false), []);
    
    const handleChange = useCallback((event: { target: { value: React.SetStateAction<string>; }; }) => {
        setSelectedStatus(event.target.value);
    },[]);
    
    const handleSubmit = useCallback(async () => {
        const date = moment(value).format('YYYY-MM-DD')
        uploadDataStore.setDate(date);
        
        const userModel: User = await findUserByUsername(loginData.username);
        uploadDataStore.setUploader(userModel.userId);

        uploadDataStore.setStatus(selectedStatus == 'alive' ? 'ALIVE' : 'DEAD');
        
        uploadDataStore.setCoordinates(
            dataPointsStore.drawnPolygon.length ? dataPointsStore.drawnPolygon : [markerPosition]
        );

        await uploadDataStore.saveObservation();

        if(!uploadDataStore.checkValidity()) {
            setVisibleError(true);
        } else {
            closeDialog();
            setVisibleSuccess(true);
        }
    }, [closeDialog, markerPosition, selectedStatus, value]);

    const handleDevChange = useCallback(
        (_e: ChangeEvent<unknown>, newValue: number | number[]) =>
            uploadDataStore.setDevelopment(newValue),
        []
    );

    return (
        <>
            <Dialog
                classes={{ paper: classes.dialogWrapper }}
                maxWidth="md"
                onClose={closeDialog}
                open={visible}
            >
                <DialogTitle className={classes.dialogTitle}>{t('add_observation')}</DialogTitle>

                <DialogContent dividers>
                    <Grid container justifyContent="center" spacing={4}>
                        <Grid item xs={6}>
                            <SpeciesAutocompleteSelect label={t('specie')} />
                            <CountryAutocompleteSelect label={t('country')} />
                            <LocationAutocompleteSelect label={t('location')} />
                            <UploadTextInput
                                errorMess="Only numbers are allowed!"
                                placeholder={t('number')}
                                regex={/^[0-9]*$/}
                            />
                            <Slider
                                aria-label="Restricted values"
                                color="secondary"
                                defaultValue={0}
                                marks={marks}
                                onChange={handleDevChange}
                                step={null}
                                style={{ width: '100%', paddingTop: 50 }}
                            />
                        </Grid>
                        <Grid item xs={6}>
                            <Grid container justifyContent="center" spacing={6}>
                                <Grid item>
                                    <MuiPickersUtilsProvider utils={DateFnsUtils}>
                                        <KeyboardDatePicker
                                            label="Date"
                                            // eslint-disable-next-line react/jsx-no-bind
                                            onChange={(newValue) => {
                                                setValue(newValue);
                                                console.log(newValue);
                                            }}
                                            value={value}
                                            variant="inline"
                                        />
                                    </MuiPickersUtilsProvider>
                                </Grid>
                                <StatusSelection
                                    handleChange={handleChange}
                                    selectedStatus={selectedStatus}
                                />
                            </Grid>
                            <Grid className={classes.cover} item>
                                <MapContainer
                                    center={[47.498333, 19.040833]}
                                    id="map-container"
                                    minZoom={2.5}
                                    preferCanvas
                                    renderer={L.canvas()}
                                    scrollWheelZoom
                                    style={{ height: '250px', width: '100%' }}
                                    zoom={7}
                                    zoomControl={false}
                                >
                                    <MapConsumer>
                                        {(map) => {
                                            map.on('click', function (e: LeafletMouseEvent) {
                                                const { lat, lng } = e.latlng;
                                                setMarkerPosition([lat, lng]);
                                            });
                                            console.log(markerPosition);
                                            return null;
                                        }}
                                    </MapConsumer>
                                    <Marker icon={greenIcon} position={markerPosition} />
                                    <PolygonDrawerObserver />
                                    <ZoomControl position="bottomright" />
                                    <TileLayer
                                        attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
                                        updateWhenIdle
                                        updateWhenZooming={false}
                                        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                                    />
                                </MapContainer>
                            </Grid>
                        </Grid>
                        <Snackbar
                            autoHideDuration={3000}
                            onClose={closeErrorAlert}
                            open={visibleError}
                        >
                            <Alert severity="error" variant="filled">
                                {t('upload_error')}
                            </Alert>
                        </Snackbar>
                    </Grid>
                </DialogContent>

                <DialogActions>
                    <Button onClick={closeDialog}>{t('cancel')}</Button>
                    <Button onClick={handleSubmit}>{t('submit')}</Button>
                </DialogActions>
            </Dialog>

            <Snackbar autoHideDuration={3000} onClose={closeSuccessAlert} open={visibleSuccess}>
                <Alert severity="success" variant="filled">
                    {t('succes_upload')}
                </Alert>
            </Snackbar>
        </>
    );
};
