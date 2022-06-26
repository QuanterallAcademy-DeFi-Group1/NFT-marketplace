import React from 'react';
import { Route, Routes } from 'react-router-dom';
import './App.css';
import Header from "./components/Header/Header"
import Swap from './components/Swap/Swap';
import NFT from './components/NFT/NFT';
import Team from './components/Team/Team';


function App() {
  return (
    <div>
      <Header></Header>

      <Routes>
        <Route path='/swap' element={<Swap />} />
        <Route path='/nft' element={<NFT />} />
        <Route path='/' element={<Team />} />
      </Routes>
    
    </div>
  );
}

export default App;
