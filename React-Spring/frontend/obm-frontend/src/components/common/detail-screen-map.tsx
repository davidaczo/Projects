import L from 'leaflet';
import React, { FC, useEffect, useState } from 'react';
import { MapContainer, Marker, Polygon, TileLayer } from 'react-leaflet';
import { PLOT_COLOR } from '../../constants/assets/colors';

export const greenIcon = new L.Icon({
    iconUrl:
        'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-green.png',
    iconSize: [25, 41],
    iconAnchor: [12, 41],
    popupAnchor: [1, -34],
    shadowSize: [41, 41],
});

type DetailScreenMapCoords = [
    x: number,
    y: number,
][];

type DetailScreenMapProps = {
    coordinates: DetailScreenMapCoords;
    markerType: string;
};

export const DetailScreenMap: FC<DetailScreenMapProps> = ({ coordinates, markerType }) => {
    const [center, setCenter] = useState<DetailScreenMapCoords>();

    useEffect(() => {
        setCenter(coordinates);
    }, [coordinates]);

    if (center === undefined) {
        return null;
    }

    return (
        <MapContainer
            center={center[0]}
            closePopupOnClick={false}
            doubleClickZoom={false}
            dragging={false}
            scrollWheelZoom={false}
            touchZoom={false}
            trackResize={false}
            /*ha poligon 20, a pont 11*/
            zoom={markerType === "Point" ? 11 : 15}
            zoomControl={false}
            zoomDelta={0}
            zoomSnap={0}
        >
            <TileLayer
                attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
                updateWhenIdle
                updateWhenZooming={false}
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />

            {
                markerType === "Point" ?
                    <Marker icon={greenIcon} position={[coordinates[0][0], coordinates[0][1]]} />
                    :
                    <Polygon
                        pathOptions={{ color: PLOT_COLOR }}
                        positions={coordinates}
                        weight={5}
                    />
            }
        </MapContainer>
    );
};
