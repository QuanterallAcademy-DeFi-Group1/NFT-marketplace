import './App.css';
import Logo from "./logo.svg"
import OnBoard from '@web3-onboard/core';
import injectedModule from '@web3-onboard/injected-wallets';
import {useState} from "react";
import { ethers } from 'ethers';
const injected = injectedModule();
const onboard = OnBoard({
  wallets: [injected],
  chains: [
    {
      id: "0x3",
      token: "tROP",
      label: "Etherieum Ropsten Testnet",
      rpcUrl: 'https://ropsten.infura.io/v3/da99ebc8c0964bb8bb757b6f8cc40f1f'
    },
  ],
  appMetadata: {
    name: "Token Swap",
    icon: Logo, // svg string icon
    logo: Logo, // svg string logo
    description: "Swap tokens for other tokens",
    recommendedInjectedWallets: [ 
      { name: 'Coinbase', url: 'https://wallet.coinbase.com/' },
      { name: 'MetaMask', url: 'https://metamask.io' }
    ]
  }
})

function App() {
  const [provider, setProvider] = useState(null);
  return (
    <div className="App">
      <header className="App-header">
        <button className="App-link" onClick={async () => {
          const wallets = await onboard.connectWallet();
          setProvider(wallets[0].provider);
          console.log(wallets);
        }}
        >Connect</button>
        <button className="App-link" onClick={async () => {
         const signer = new ethers.providers.Web3Provider(provider);
         await signer.getSigner().sendTransaction({
           to: "0x06012c8cf97bead5deae237070f9587f8e7a266d",
           value: ethers.utils.parseEther("0.1"),
         });
        }}
        >Send</button>
      </header>
    </div>
  );
}

export default App;
