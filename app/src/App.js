import React from 'react';
import { Route, Routes } from 'react-router-dom';
import './App.css';
import Logo from "./logo.svg"
import OnBoard from '@web3-onboard/core';
import injectedModule from '@web3-onboard/injected-wallets';
import async_hooks from 'node:async_hooks';
import {useState} from "react";
import { ethers } from 'ethers';
import deploy from './scripts/deploy.js';
import UploadImage from './components/UploadImage.js';
import Header from "./components/Header/Header"
import Swap from './components/Swap/Swap';
import NFT from './components/NFT/NFT';
import Team from './components/Team/Team';
import Marketplace from './components/Marketplace';
import Profile from './components/Profile';
import SellNFT from './components/SellNFT';
import NFTPage from './components/NFTpage';



function App() {
  return (
    <div className="App">
      <UploadImage/>
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

        <button  onClick={deploy}>Mint</button>
      </header>
    <div>
      <Header></Header>

      <Routes>
       
        <Route path='/' element={<Team />} />
        <Route path="/nftPage" element={<NFTPage />}/>        
          <Route path="/profile" element={<Profile />}/>
          <Route path="/sellNFT" element={<SellNFT />}/>   
      </Routes>
    
    </div>
    </div>
  );
}

export default App;
