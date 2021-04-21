import React, { useState } from 'react';
import ReactMapGL, { Marker } from 'react-map-gl';
import { Room } from '@material-ui/icons';

const Map = () => {
  const [viewport, setViewport] = useState({
    width: '100vw',
    height: '100vh',
    latitude: 27,
    longitude: 85,
    zoom: 4,
  });
  return (
    <ReactMapGL
      {...viewport}
      onViewportChange={(nextViewport) => setViewport(nextViewport)}
      mapboxApiAccessToken={process.env.REACT_APP_MAPBOX_TOKEN}
    >
      <Marker
        latitude={27.69}
        longitude={85.3708}
        offsetLeft={-20}
        offsetTop={-10}
      >
        <Room style={{ fontSize: viewport.zoom * 4 }} />
      </Marker>
    </ReactMapGL>
  );
};

export default Map;
