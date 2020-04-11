import React from 'react';
import { FaTimes } from 'react-icons/fa';

import { TitleBar } from './TitleBar';

import '../media/css/style.css';

export const SdApp = () => {
  return (
    <div className="app">
      <TitleBar />
      <button className="close-window">
        <FaTimes />
      </button>
      Hello World
    </div>
  );
};
