import React, { useEffect, useState } from 'react';
import ReactMapGL, { Marker, Popup } from 'react-map-gl';
import { Room, Star } from '@material-ui/icons';
import styled from 'styled-components';

const Map = () => {
  const currentUser = 'sandy';
  const [pins, setPins] = useState([]);
  const [currentPlaceId, setCurrentPlaceId] = useState(null);

  const [viewport, setViewport] = useState({
    width: '100vw',
    height: '100vh',
    latitude: 27,
    longitude: 85,
    zoom: 4,
  });

  useEffect(() => {
    const getPins = async () => {
      try {
        const response = await fetch('/pins', {
          method: 'GET',
        });
        const data = await response.json();
        console.log(data);
        setPins(data);
      } catch (err) {
        console.log(err);
      }
    };
    getPins();
  }, []);

  const handleMarkerClick = (id) => {
    setCurrentPlaceId(id);
  };

  return (
    <ReactMapGL
      {...viewport}
      onViewportChange={(nextViewport) => setViewport(nextViewport)}
      mapStyle='mapbox://styles/sandurijal03/ckns0j8bj007i17rxfo53pduc'
      mapboxApiAccessToken={process.env.REACT_APP_MAPBOX_TOKEN}
    >
      {pins.map((pin, index) => (
        <>
          <Marker
            latitude={pin.lat}
            longitude={pin.lng}
            offsetLeft={-20}
            offsetTop={-10}
          >
            <Room
              style={{
                fontSize: viewport.zoom * 4,
                color: pin.username === currentUser ? 'tomato' : 'slateblue',
                cursor: 'pointer',
              }}
              onClick={() => handleMarkerClick(pin._id)}
            />
          </Marker>
          {pin._id === currentPlaceId && (
            <Popup
              latitude={pin.lat}
              longitude={pin.lng}
              closeButton={true}
              closeOnClick={false}
              anchor='left'
              onClose={() => setCurrentPlaceId(null)}
            >
              <CardStyled>
                <label htmlFor='place'>Place</label>
                <h4 className='place'>{pin.title}</h4>
                <label htmlFor='review'>Review</label>
                <p className='description'>{pin.description}</p>
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
                  created by <b>{<pin className='username'></pin>}</b>
                </span>
                <span className='date'>1 hr ago</span>
              </CardStyled>
            </Popup>
          )}
        </>
      ))}
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
