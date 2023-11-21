import React, { useState, useEffect, FC } from 'react';
import { observer } from 'mobx-react';
import { Polygon } from 'react-leaflet';
// import { DataPointsPopup } from './data-points-popup'
import dataPointsStore from '../../Store/data-points';
import 'leaflet/dist/leaflet.css';
import '../../App.css';
import { SELECTED_PLOT_COLOR, PLOT_COLOR } from '../../constants/assets/colors';
import { toJS } from 'mobx';
import { DataPointsPopup } from './data-points-popup';

const DataPointsComponent: FC = () => {
    const [selectedPlot, setselectedPlot] = useState<number>(-1);


    useEffect(() => {
        if (dataPointsStore.firstLoad && dataPointsStore.dataPoints.length === 0) {
            dataPointsStore.setIsLoading(true);
        } else {
            dataPointsStore.setIsLoading(false);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [dataPointsStore.dataPoints.length]);
    return (
        <>
            {
                toJS(dataPointsStore.dataPoints).map((data) => (
                    <Polygon
                        eventHandlers={{
                            click: async () => {
                                setselectedPlot(data.observationId);
                            },
                        }}
                        key={data.observationId}
                        pathOptions={{ color: selectedPlot === data.observationId ? SELECTED_PLOT_COLOR : PLOT_COLOR }}
                        positions={data.coordinates}
                        weight={data.type === 'Point' ? 15 : 5}
                    >
                        <DataPointsPopup observationId={data.observationId} selectedPlot={selectedPlot} />
                    </Polygon>
                ))}
        </>
    );
};

export const DataPointsObserver = observer(DataPointsComponent);
