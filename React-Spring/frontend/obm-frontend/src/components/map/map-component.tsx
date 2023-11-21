import React, { useCallback } from 'react'
import {
  MapContainer, TileLayer, ZoomControl, LayersControl,
} from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import 'leaflet-draw/dist/leaflet.draw.css';
import '../../App.css';
import { DataPointsObserver } from './data-points-component'
import { LoaderObserver } from './loading-indicator/loading-screen'
import { PolygonDrawerObserver } from './spatial-filter/polygon-drawer'

enum MAP_VIEWS {
  BLACK_WHITE = 'blackandwhite',
  COLORED = 'colored'
}

const chosenLayer = localStorage.getItem('chosenLayer');

export const MapComponent = () => {
  const selectColoredMapView = useCallback(() => {
    localStorage.setItem('chosenLayer', MAP_VIEWS.COLORED);
  }, [])

  const selectBlackAndWhiteMapView = useCallback(() => {
    localStorage.setItem('chosenLayer', MAP_VIEWS.BLACK_WHITE);
  }, [])

  return (
    <MapContainer
      center={[47.498333, 19.040833]}
      id="map-container"
      minZoom={2.5}
      preferCanvas
      renderer={L.canvas()}
      scrollWheelZoom
      zoom={7}
      zoomControl={false}
    >
      <DataPointsObserver />
      <LoaderObserver />
      <PolygonDrawerObserver />
      <ZoomControl position="bottomright" />
      <TileLayer
        attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
        updateWhenIdle
        updateWhenZooming={false}
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      <LayersControl position="topright">
        <LayersControl.BaseLayer checked={chosenLayer === MAP_VIEWS.COLORED} name="Colored">
          <TileLayer
            attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
            eventHandlers={{
              add: selectColoredMapView
            }}
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
        </LayersControl.BaseLayer>
        <LayersControl.BaseLayer checked={chosenLayer === MAP_VIEWS.BLACK_WHITE} name="BlackAndWhite">
          <TileLayer
            attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
            eventHandlers={{
              add: selectBlackAndWhiteMapView
            }}
            url="https://tiles.wmflabs.org/bw-mapnik/{z}/{x}/{y}.png"
          />
        </LayersControl.BaseLayer>

      </LayersControl>
    </MapContainer>
  )
};
