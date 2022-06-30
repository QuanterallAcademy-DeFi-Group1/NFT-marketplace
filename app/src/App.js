import React from 'react';
import { Route, Routes } from 'react-router-dom';
import './App.css';
import Logo from "./logo.svg"
import OnBoard from '@web3-onboard/core';
import injectedModule from '@web3-onboard/injected-wallets';
import {useState} from "react";
import { ethers } from 'ethers';
import UploadImage from './components/UploadImage.js';
import Header from "./components/Header/Header"
import Swap from './components/Swap/Swap';
import NFT from './components/NFT/NFT';
import Team from './components/Team/Team';

import Navbar from './components/Navbar.js';
import Marketplace from './components/Marketplace';
import Profile from './components/Profile';
import SellNFT from './components/SellNFT';
import NFTPage from './components/NFTpage';



function App() {
  return (
    
     

    <div className="container">
    <Routes>
      <Route path="/" element={<Marketplace />}/>
      <Route path="/team" element={<Team />}/>
      <Route path="/nftPage" element={<NFTPage />}/>        
      <Route path="/profile" element={<Profile />}/>
      <Route path="/sellNFT" element={<SellNFT />}/>             
    </Routes>
</div>
    
   
  );
}

export default App;
