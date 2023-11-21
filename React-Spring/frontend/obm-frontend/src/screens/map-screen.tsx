import React from 'react';
import ObmScreen from '../components/common/obm-screen';
import { MapComponent } from '../components/map/map-component';

export const MapScreen = () => (
    <ObmScreen>
        <div className="mapscreen-container">
            <MapComponent />
        </div>
    </ObmScreen>
);
