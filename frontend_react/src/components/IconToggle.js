import React, { useState } from 'react';
import { LightModeIcon, DarkModeIcon } from '../utils/constants';

const IconToggle = () => {
  const [currentIcon, setCurrentIcon] = useState('lightmode');

  const handleClick = () => {
    setCurrentIcon(currentIcon === 'lightmode' ? 'darkmode' : 'lightmode');
  };

  return (
    <div onClick={handleClick}>
      {currentIcon === 'lightmode' ? <LightModeIcon sx={{ fontSize: 30, color: '#fff', cursor: 'pointer' }} /> : <DarkModeIcon sx={{ fontSize: 30, color: '#fff', cursor: 'pointer' }} />}
    </div>
  );
};

export default IconToggle;