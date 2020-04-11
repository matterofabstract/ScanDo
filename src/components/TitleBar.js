import React from 'react';
const { BrowserWindow } = require('electron').remote;

export const TitleBar = () => {
  const handleButton = (cmd) => {
    const window = BrowserWindow.getFocusedWindow();
    cmd === 'minimize' && window.minimize();
    cmd === 'maximize' && window.maximize();
    cmd === 'close' && window.close();
  };
  return (
    <div id="title-bar">
      <div id="title">ScanDo</div>
      <div id="title-bar-btns">
        <button id="min-btn" onClick={() => handleButton('minimize')}>
          -
        </button>
        <button id="max-btn" onClick={() => handleButton('maximize')}>
          +
        </button>
        <button id="close-btn" onClick={() => handleButton('close')}>
          x
        </button>
      </div>
    </div>
  );
};
