import React from 'react';
import logo from './logo.png';
import './App.css';

import { WraptorComponent, useWeb3Setup } from '@w3stside/wraptor'

function App() {
  const { web3, error } = useWeb3Setup()
  
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        {error && <div style={{ background: '#c15050', color: 'black', padding: '0 30px' }}><p>An error has occurred :(</p><p>Error message: {error.message}</p></div>}
        {web3 ? <WraptorComponent 
          type="ETH"
          provider={web3}
          contractAddress="0xc778417E063141139Fce010982780140Aa0cD5Ab"
          userAddress="0xfa3a5ba1864C4567aC77D50EcD91a2AaE92B650D"
          customStyle={`
            color: black;
            font-weight: bolder;
            width: 60%;
          `}
        /> : <div>Waiting for Web3 to initiate...</div>}
      </header>
    </div>
  );
}

export default App;
