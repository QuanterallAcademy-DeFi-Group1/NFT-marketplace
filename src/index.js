import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";
import SellNFT from './components/SellNFT';
import Marketplace from './components/Marketplace';
import Profile from './components/Profile';
import NFTPage from './components/NFTpage';
import Header from "./components/Header/Header"
import NFT from './components/NFT/NFT';
import Team from './components/Team/Team';

ReactDOM.render(
  <React.StrictMode>
    <BrowserRouter>
    <Header></Header>
      <Routes>
        <Route path="/" element={<Marketplace />}/>
        <Route path="/team" element={<Team />}/>
        <Route path="/sellNFT" element={<SellNFT />}/>  
        <Route path='/nft' element={<NFT />} />
        <Route path="/nftPage/:tokenId" element={<NFTPage />}/>        
        <Route path="/profile" element={<Profile />}/> 
      </Routes>
    </BrowserRouter>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
