import React from 'react';
import QrReader from 'react-qr-reader';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { debounce } from 'lodash';
import fetch from 'electron-fetch';

import { ReactComponent as Throbber } from './img/rings.svg';

const store = new window.Store();

export default class App extends React.Component {
  state = {
    nowServing: 0,
    santaCode: '',
    showSettingsDropdown: false,
    alwaysOnTop: false,
  }

  componentDidMount() {
    // window.ipcRenderer.on('info' , function(event , data){ console.log(data.msg) });
    const nowServingFromStore = store.get('nowServing');
    this.setState({ nowServing: nowServingFromStore });
  }

  componentDidUpdate(prevProps, prevState, snapshot) {
    if (this.state !== prevState) {
      store.store = this.state;
    }

    // window.ipcRenderer.on('info' , function(event , data){ console.log(data.msg) });

    // Progress Now-Serving when new Code is detected
    if ((this.state.santaCode !== prevState.santaCode) && (this.state.santaCode !== '')) {
      const nextNum = prevState.nowServing + 1;
      this.setState({ nowServing: nextNum })
      this.handleNextDebounce(nextNum);
    }
  }

  handlePrev = () => {
    const nextNum = this.state.nowServing - 1;
    this.setState({ nowServing: nextNum });
    this.handlePrevDebounce(nextNum);
  }
  handlePrevDebounce = debounce((nextNum) => {
    // this.setState(prevState => ({ show: !prevState.show }));
    window.fetch('https://easttroy.org/santa/count/' + nextNum + '/')
      .then(response => response.json())
      .then(data => console.log(data));

  }, 1500);

  handleNext = () => {
    const nextNum = this.state.nowServing + 1;
    this.setState({ nowServing: nextNum });
    this.handleNextDebounce(nextNum);
  }
  handleNextDebounce = debounce((nextNum) => {
    // this.setState(prevState => ({ show: !prevState.show }));
    window.fetch('https://easttroy.org/santa/count/' + nextNum + '/')
      .then(response => response.json())
      .then(data => console.log(data));

  }, 1500);



  // react-qr-reader
  handleScan = (data) => {
    let d;
    if (data) {
      d = data.replace('https://easttroy.org/santa/', '');
      this.setState({ santaCode: d });
      window.ipcRenderer.send('async', d);
    }
  }
  handleError = (err) => {
    console.error(err);
  }
  handleClear = () => {
    this.setState({ santaCode: '' });
  }

  render() {
    const { nowServing, santaCode, showSettingsDropdown, alwaysOnTop } = this.state;


        return (
          <div className="app">

            {showSettingsDropdown
              && (
                <ul className="setings-menu-dropdown">
                  <li onClick={() => {
                    // window.shell.openItem('/Users/bpk/Downloads/SantaPhotos');
                    window.shell.showItemInFolder('/Users/bpk/Downloads/SantaPhotos');
                    this.setState({ showSettingsDropdown: false });
                  }}>
                    <FontAwesomeIcon icon="folder-open" style={{ position: 'relative', left: -20, marginRight: -16 }} />
                    {' '}
                    Show Photos in Finder
                  </li>
                  <li className="divider" />
                  {/* <li onClick={() => this.setState({ showSettingsDropdown: false, nowServing: 0 })}>Reset Count</li> */}
                  {/* <li onClick={() => this.setState({ alwaysOnTop: !alwaysOnTop })}>
                    {alwaysOnTop && <FontAwesomeIcon icon="check" style={{ position: 'relative', left: -20, marginRight: -16 }} />} Always on top
                  </li> */}
                  <li onClick={() => store.openInEditor()}>Edit Settings...</li>
                  <li className="divider" />
                  <li>Quit</li>
                </ul>
              )
            }

            <div className="settings-menu">
              <button
                onClick={() => this.setState({
                  showSettingsDropdown: !showSettingsDropdown
                })}
              >
                <FontAwesomeIcon icon="cog" style={{ color: showSettingsDropdown ? '#328fff' : '#5D5D5D' }} />
              </button>
            </div>

            <div className="card-counter-wrapper">
            <h3>Now Serving</h3>
              <div className="card-counter">
              <button onClick={this.handlePrev} disabled={(nowServing === 0) && true}>
                <FontAwesomeIcon icon="minus" />
              </button>
              <span style={{ display: 'inline-block', width: 50 }}>{nowServing}</span>
              <button onClick={this.handleNext}>
                <FontAwesomeIcon icon="plus" />
              </button>
              </div>
            </div>

            <QrReader
               onError={this.handleError}
               onScan={this.handleScan}
               style={{ width: 280, margin: '2px auto 0 auto', WebkitAppRegion: 'drag', }}
             />

            {santaCode === ''
              ? (
                  <div style={{ marginTop: 2 }}>
                    <Throbber style={{ display: 'inline-block', margin: 0, padding: 0, height: 32, width: 32 }} />
                    <div style={{ top: -11, color: '#7d7d7d', fontSize: '0.8rem', position: 'relative', display: 'inline-block' }}>
                      Scan when ready...
                    </div>
                  </div>
              )
              : (
                <h2 className="armed" style={{ color: '#DF2929', margin: 5, fontSize: '1.3rem', fontWeight: 400 }}>
                  <span onClick={this.handleSendMessage}>{santaCode}</span>
                  {' '}
                  <span style={{ cursor: 'pointer', position: 'relative', top: -3, fontSize: '0.8rem', color: '#3C3C3C' }} onClick={this.handleClear}>
                    <FontAwesomeIcon icon="times-circle" />
                  </span>
                </h2>
              )
            }

            </div>
        )

  }
}
