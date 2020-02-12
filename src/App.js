import React from 'react';
import logo from './logo.svg';
import './App.css';

import { WraptorComponent } from '@w3stside/wraptor'

function App() {
  console.debug('window.web3', window.web3)
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <WraptorComponent 
          type="ETH"
          provider={window.web3}
          contractAddress="0xc778417E063141139Fce010982780140Aa0cD5Ab"
          userAddress="0xfa3a5ba1864C4567aC77D50EcD91a2AaE92B650D"
        />
      </header>
    </div>
  );
}

export default App;
