import React from 'react';
import { Route, Routes } from 'react-router-dom';
import UploadImage from './components/UploadImage.js';
import Header from "./components/Header/Header"
import Swap from './components/Swap/Swap';
import NFT from './components/NFT/NFT';
import Team from './components/Team/Team';
import Profile from './components/Profile';
import SellNFT from './components/SellNFT';
import NFTPage from './components/NFTpage';
import Marketplace from './components/Marketplace';



function App() {
  return (
    <div className="App">
      
      <Header></Header>
      <Routes>
        <Route path="/" element={<Marketplace />}/>
        <Route path="/team" element={<Team />}/>
        <Route path="/sellNFT" element={<SellNFT />}/>  
        <Route path='/nft' element={<NFT />} />
        <Route path="/nftPage/:tokenId" element={<NFTPage />}/>        
        <Route path="/profile" element={<Profile />}/> 
      </Routes>
    </div>
  );
}

export default App;
