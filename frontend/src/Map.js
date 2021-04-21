import React, { useState } from 'react';
import ReactMapGL, { Marker, Popup } from 'react-map-gl';
import { Room, Star } from '@material-ui/icons';
import styled from 'styled-components';

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
      mapStyle='mapbox://styles/sandurijal03/ckns0j8bj007i17rxfo53pduc'
      mapboxApiAccessToken={process.env.REACT_APP_MAPBOX_TOKEN}
    >
      <Marker
        latitude={27.69}
        longitude={85.3708}
        offsetLeft={-20}
        offsetTop={-10}
      >
        <Room style={{ fontSize: viewport.zoom * 4, color: 'red' }} />
      </Marker>
      <Popup
        latitude={27.69}
        longitude={85.3708}
        closeButton={true}
        closeOnClick={false}
        anchor='left'
      >
        <CardStyled>
          <label htmlFor='place'>Place</label>
          <h4 className='place'>Pepsicola</h4>
          <label htmlFor='review'>Review</label>
          <p className='description'>Beautiful Place</p>
          <label htmlFor='rating'>Rating</label>
          <div className='stars'>
            <Star className='star' />
            <Star className='star' />
            <Star className='star' />
            <Star className='star' />
            <Star className='star' />
          </div>
          <label htmlFor='info'>Information</label>
          <span className='username'>
            created by <b>sandy</b>
          </span>
          <span className='date'>1 hr ago</span>
        </CardStyled>
      </Popup>
    </ReactMapGL>
  );
};

const CardStyled = styled.div`
  width: 250px;
  height: 250px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  label {
    width: max-content;
    color: tomato;
    font-size: 13px;
    border-bottom: 1px solid tomato;
    margin: 3px 0;
  }
  .description {
    font-size: 14px;
  }
  .stars {
    .star {
      color: gold;
    }
  }
  .username {
    font-size: 14px;
  }
  .date {
    font-size: 10px;
  }
`;

export default Map;
