import React from 'react';
import { observer } from 'mobx-react';
import dataPointsStore from '../../../Store/data-points';
import { LoaderComponent } from './loader-component';
import 'leaflet/dist/leaflet.css';
import '../../../App.css';

const LoadingScreen = () => {
    const tiles = Array.from(
        document.getElementsByClassName('leaflet-tile') as HTMLCollectionOf<HTMLElement>
    );

    tiles.forEach((tile) => {
        tile.style.filter = dataPointsStore.isLoading ? 'blur(10px)' : 'blur(0px)';
    });

    if (!dataPointsStore.isLoading) {
        return null;
    }

    return <div id="loader">{dataPointsStore.isLoading && <LoaderComponent />}</div>;
};

export const LoaderObserver = observer(LoadingScreen);
