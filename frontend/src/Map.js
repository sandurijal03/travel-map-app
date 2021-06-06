import React, { useEffect, useState } from 'react';
import ReactMapGL, { Marker, Popup } from 'react-map-gl';
import { Room, Star } from '@material-ui/icons';
import styled from 'styled-components';

const Map = () => {
  const currentUser = 'sandy';
  const [pins, setPins] = useState([]);
  const [currentPlaceId, setCurrentPlaceId] = useState(null);
  const [newPlace, setNewPlace] = useState(null);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [rating, setRating] = useState(0);
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
        const response = await fetch('http://localhost:3001/api/pins', {
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

  const handleMarkerClick = (id, lat, lng) => {
    setCurrentPlaceId(id);
    setViewport({ ...viewport, latitude: lat, longitude: lng });
  };

  const handleAddClick = (e) => {
    const [longitude, latitude] = e.lngLat;
    setNewPlace({
      lat: latitude,
      lng: longitude,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newPin = {
      username: currentUser,
      title,
      description,
      rating,
      lat: newPlace.lat,
      lng: newPlace.lng,
    };
    try {
      const response = await fetch('/pins', {
        method: 'POST',
        body: newPin,
      });
      // const res = response.json();
      // setPins([...pins, res]);
      console.log(response);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <ReactMapGL
      {...viewport}
      onViewportChange={(nextViewport) => setViewport(nextViewport)}
      mapStyle='mapbox://styles/sandurijal03/ckns0j8bj007i17rxfo53pduc'
      mapboxApiAccessToken={process.env.REACT_APP_MAPBOX_TOKEN}
      onDblClick={handleAddClick}
      transitionDuration='200'
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
              onClick={() => handleMarkerClick(pin._id, pin.lat, pin.lng)}
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
          {newPlace && (
            <Popup
              latitude={newPlace.lat}
              longitude={newPlace.lng}
              closeButton={true}
              closeOnClick={false}
              anchor='left'
              onClose={() => setNewPlace(null)}
            >
              <InputFormStyled>
                <form>
                  <label htmlFor='title'>Title</label>
                  <input
                    type='text'
                    onChange={(e) => setTitle(e.target.value)}
                  />
                  <label htmlFor='review'>Review</label>
                  <textarea
                    className='description'
                    name='review'
                    id='review'
                    cols='10'
                    rows='2'
                    onChange={(e) => setDescription(e.target.value)}
                  />
                  <label htmlFor='rating'>Rating</label>
                  <select onChange={(e) => setRating(e.target.value)}>
                    <option value='1'>1</option>
                    <option value='2'>2</option>
                    <option value='3'>3</option>
                    <option value='4'>4</option>
                    <option value='5'>5</option>
                  </select>
                  <button className='submit' type='submit'>
                    add pin
                  </button>
                </form>
              </InputFormStyled>
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

const InputFormStyled = styled.div`
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
  form {
    width: 250px;
    height: 250px;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    input {
      border: none;
      border-bottom: 1px solid gray;
      font-size: 12px;
      color: rgb(172, 169, 169);
      outline: none;
    }
    textarea {
      font-size: 12px;
      color: rgb(172, 169, 169);
    }
    .submit {
      outline: none;
      margin-top: 5px;
      border: none;
      padding: 5px;
      border-radius: 5px;
      background-color: tomato;
      cursor: pointer;
    }
  }
  .description {
    font-size: 14px;
  }
`;

export default Map;
