// src/components/Crosshair.js
import React from 'react';

export const Crosshair = () => (
  <div style={{
    position: 'absolute',
    top: '50%',
    left: '50%',
    width: '10px',
    height: '10px',
    backgroundColor: 'red',
    borderRadius: '50%',
    transform: 'translate(-50%, -50%)'
  }}></div>
);
