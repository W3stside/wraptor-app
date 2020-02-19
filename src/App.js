import React from 'react'
import dinoLogo from './logo192.png'
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
        <div>
          <img src={dinoLogo} className="App-logo" alt="dino-logo" />  
          <img src={logo} className="App-logo App-logo-spin" alt="logo" />
        </div>
        {error && <div style={{ background: '#c15050', color: 'black', padding: '0 30px' }}><p>An error has occurred :(</p><p>Error message: {error.message}</p></div>}
        {web3  && userAddress && networkId ? <WraptorComponent 
          type="ETH"
          provider={web3}
          contractAddress={WETH_CONTRACTS[networkId]}
          userAddress={userAddress}
          // Auto updater
          catalyst={interval}
          header="🦖 WRAPPTOR | ETH ⇋ WETH"
          buttonLabels={{
            showAllowance: 'Allowance',
            showBalance: 'Balance',
            approve: 'Approve WETH',
            wrap: 'Wrap ETH',
            unwrap: 'Unwrap WETH'
          }}
          customStyle={`
            background: #2813485e !important;
            color: #c9cbce;
            font-weight: bolder;
            width: 60%;

            @media only screen and (max-width: 768px){
              width: 80%;
            }

            button, input, code {
              font-size: large;
            }

            button {
              &:disabled {
                background: rgba(58, 57, 57, 0.3);
                color: #fdfdfd33;
              }
            }

            input {
              &:focus {
                color: white;
                font-weight: 900;
              }
            }
          `}
        /> : <div>Waiting for Web3 to initiate...</div>}
      </header>
    </div>
  )
}

export default App
