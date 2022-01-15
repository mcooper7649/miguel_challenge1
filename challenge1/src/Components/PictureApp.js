import React, { useEffect, useState } from 'react';
import axios from 'axios';

function PictureApp() {
  const [picture, setPicture] = useState('');
  const MyStyles = {
    width: '60%',
    alignSelf: 'center',
  };

  const handleClick = () => {
    axios
      .get('https://source.unsplash.com/random')
      .then((response) => setPicture(response.request.responseURL));
  };

  useEffect(() => {
    // GET request using axios inside useEffect React hook
    axios
      .get('https://source.unsplash.com/random')
      .then((response) => setPicture(response.request.responseURL));

    // empty dependency array means this effect will only run once (like componentDidMount in classes)
  }, []);

  return (
    <div>
      <img alt="" style={MyStyles} src={picture}></img>
      <div>
        <button onClick={handleClick}>Load a new image</button>
      </div>
    </div>
  );
}

export default PictureApp;
