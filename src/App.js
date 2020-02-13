import React from 'react'
import logo from './logo.png'
import './App.css'

import { WraptorComponent } from '@w3stside/wraptor'
import useWeb3Setup from './hooks/useWeb3Setup'
import useInterval from './hooks/useInterval'
import useUserWallet from './hooks/useUserWallet'

const WETH_CONTRACTS = {
  1: "0xc02aaa39b223fe8d0a0e5c4f27ead9083c756cc2",
  4: "0xc778417E063141139Fce010982780140Aa0cD5Ab"
}

function App() {
  const { web3, error } = useWeb3Setup()
  const { userAddress, networkId } = useUserWallet(web3)
  const interval = useInterval(1500)
  
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        {error && <div style={{ background: '#c15050', color: 'black', padding: '0 30px' }}><p>An error has occurred :(</p><p>Error message: {error.message}</p></div>}
        {web3  && userAddress && networkId ? <WraptorComponent 
          type="ETH"
          provider={web3}
          contractAddress={WETH_CONTRACTS[networkId]}
          userAddress={userAddress}
          // Auto updater
          catalyst={interval}
          header="WRAPTOR | ETH ⇋ W.ETH"
          customStyle={`
            color: black
            font-weight: bolder
            width: 60%
          `}
        /> : <div>Waiting for Web3 to initiate...</div>}
      </header>
    </div>
  )
}

export default App
