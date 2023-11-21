import { observer } from 'mobx-react';
import React, { FC, useCallback } from 'react';
import { FeatureGroup } from 'react-leaflet';
import { EditControl } from 'react-leaflet-draw';
import dataPointsStore from '../../../Store/data-points';
import filterDataStore from '../../../Store/filtering-data';

type LatLngType = {
    lat: number;
    lng: number;
}[][];

type MapLayerType = {
    getLatLngs: () => LatLngType;
};

type MapCreateEvent = {
    layer: MapLayerType;
};

type MapEditEvent = {
    layers: {
        getLayers: () => MapLayerType[];
    };
};

const PolygonDrawerComponent: FC = () => {
    const onCreated = useCallback((e: MapCreateEvent) => {
        const { layer } = e;

        const newPolygon: [number, number][] = layer
            .getLatLngs()[0]
            .map((latLng: { lat: number; lng: number }) => [latLng.lat, latLng.lng]);
        filterDataStore.setSpatialFilterWithValue(true);
        dataPointsStore.setDrawnPolygon(newPolygon);
    }, []);

    const onEdited = useCallback((e: MapEditEvent) => {
        filterDataStore.setSpatialFilterWithValue(true);
        dataPointsStore.setDrawnPolygon(
            e.layers
                .getLayers()[0]
                .getLatLngs()[0]
                .map(({ lat, lng }) => [lat, lng])
        );
    }, []);

    const onDeleted = useCallback(() => {
        filterDataStore.setSpatialFilterWithValue(false);
        dataPointsStore.setDrawnPolygon([]);
    }, []);

    return (
        <FeatureGroup>
            <EditControl
                draw={{
                    polygon: {
                        allowIntersection: false,
                        shapeOptions: { color: 'blue' },
                        showLength: true,
                        showArea: true,
                    },
                    rectangle: false,
                    polyline: false,
                    circlemarker: false,
                    marker: false,
                }}
                onCreated={onCreated}
                onDeleted={onDeleted}
                onEdited={onEdited}
                position="topleft"
            />
        </FeatureGroup>
    );
};

export const PolygonDrawerObserver = observer(PolygonDrawerComponent);
