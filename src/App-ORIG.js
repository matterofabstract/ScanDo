import React from 'react';
import QrReader from 'react-qr-reader';
import QRCode from 'qrcode';
import SearchInput, { createFilter } from 'react-search-input';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const Store = window.require('electron-store');
const store = new Store();

store.set('unicorn', '🦄');
store.set('prefIncomingDir', `${__dirname}photos/incoming`);

const folderList = [
  { id: 1, helperNum: 32, santaCode: 'XKH7T', count: 5, created: '0m', },
  { id: 2, helperNum: 33, santaCode: 'ECNHE', count: 3, created: '2m', },
  { id: 3, helperNum: 34, santaCode: 'DKS8Q', count: 3, created: '5m', },
  { id: 4, helperNum: 35, santaCode: 'QID7E', count: 2, created: '14m', },
  { id: 5, helperNum: 36, santaCode: '7JSUC', count: 6, created: '19m', },
  { id: 6, helperNum: 37, santaCode: 'NAD2A', count: 4, created: '24m', },
  { id: 7, helperNum: 38, santaCode: 'LA3FX', count: 3, created: '29m', },
  { id: 8, helperNum: 39, santaCode: 'WCX3I', count: 2, created: '35m', },
  { id: 9, helperNum: 40, santaCode: 'P4AC8', count: 7, created: '40m', },
];

const KEYS_TO_FILTERS = ['helperNum', 'santaCode', ];

export default class App extends React.Component {
  state = {
    santaCode: '',
    showQrCamera: false,
    delay: 300,  // QrReader
    result: 'QID7E',  // QrReader
    searchTerm: '',  // SearchInput
    currentCountNum: 0,
  }

  // react-qr-reader
  handleScan = (data) => {
    if (data) {
      this.setState({ result: data });
    }
  }
  handleError = (err) => {
    console.error(err);
  }

  // react-search-input
  searchUpdated = (term) => {
    this.setState({searchTerm: term})
  }


  toggle = () => {
    const { showQrCamera } = this.state;
    this.setState({
      showQrCamera: !showQrCamera,
      santaCode: '',
    });
  };

  selectFolder = dirname => (
    this.setState({ santaCode: dirname, })
  )

  render() {
    const { currentCountNum, searchTerm, showQrCamera } = this.state;


    const filteredFolderList = folderList.filter(
      createFilter(searchTerm, KEYS_TO_FILTERS)
    );

    const generateQR = async text => {
      try {
        await QRCode.toDataURL(text)
      } catch (err) {
        console.error(err)
      }
    }

    return (
      <div className="app">
        <div className="left-sidebar">

          <div
            style={{
              WebkitAppRegion: 'drag',
              transition: 'all 300ms',
              height: showQrCamera ? 255 : 0,
              opacity: showQrCamera ? 1 : 0,
              overflow: 'hidden',
            }}
          >
            {showQrCamera
              && (
                <QrReader
                   delay={this.state.delay}
                   onError={this.handleError}
                   onScan={this.handleScan}
                   style={{ width: "100%", }}
                 />
              )
            }
          </div>


          <img src={generateQR} alt="" />

          <div
            className="search-input-wrapper"
            style={{
              marginTop: showQrCamera ? 10 : 30,
              transition: 'all 300ms',
            }}
          >
            <FontAwesomeIcon
              icon={this.state.searchTerm !== '' ? 'search' : 'qrcode'}
              onClick={this.toggle}
              style={{
                color: showQrCamera && 'red',
                transition: 'all 100ms',
              }}
            />

            <SearchInput
              className="search-input"
              onChange={this.searchUpdated}
            />
          </div>

           <ul className="folder-list">
            {filteredFolderList.map(o => (
              <li
                key={o.id}
                onClick={() => this.selectFolder(o.santaCode)}
                style={{ background: this.state.santaCode === o.santaCode && '#383B41' }}
              >
                <span className="name">
                  {o.helperNum} {o.santaCode}
                </span>
                <span className="meta">
                  {o.created}
                  <div className="count">
                    {o.count}
                  </div>
                </span>
              </li>
            ))}
          </ul>

        </div>
        <div className="main-container">
          photos
          <p>QR Result: {this.state.result}</p>
          <p>Selected Folder: {this.state.santaCode}</p>
          <p>{store.get('unicorn')}</p>
          <p>Incoming directory: {store.get('prefIncomingDir')}</p>


          <div className="card-counter-wrapper">
          <h2>Now Serving</h2>
            <div className="card-counter">
            <button>-</button>
            <span>{currentCountNum}</span>
            <button>+</button>
            </div>
          </div>

        </div>
      </div>
    );
  }
}
