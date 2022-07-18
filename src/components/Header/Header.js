import React from 'react';
import './Header.scss';
import { Box, Grid, Typography, Button } from '@mui/material';
import { useState, useEffect } from "react";
import { Link } from 'react-router-dom';


const Header = () => {

  const [connected, toggleConnect] = useState(false);

  const [currAddress, updateAddress] = useState('0x');

  async function getAddress() {
    const ethers = require("ethers");
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const signer = provider.getSigner();
    const addr = await signer.getAddress();
    updateAddress(addr);
  }



  async function connectWebsite() {

    const chainId = await window.ethereum.request({ method: 'eth_chainId' });
    if (chainId !== '0x5') {
      //alert('Incorrect network! Switch your metamask network to Rinkeby');
      await window.ethereum.request({
        method: 'wallet_switchEthereumChain',
        params: [{ chainId: '0x5' }],
      })
    }
    await window.ethereum.request({ method: 'eth_requestAccounts' })
      .then(() => {
        toggleConnect(true);
        console.log("here");
        getAddress();
      });
  }


  useEffect(() => {
    let val = window.ethereum.isConnected();
    toggleConnect(val);
    if (val) {
      getAddress();
      toggleConnect(val);
    }


  });

  return (
    <Box className='header-div'>
      <Box className='header-grid'>
        <Grid container={true} spacing={0}>
          <Grid item={true} md={2} className='header-grid-content'>
            <Typography variant='h5' className='name-logo'>
              Project Defi
            </Typography>
          </Grid>

          <Grid item={true} md={6}>
            <Button className='nav-buttons' variant="text" component={Link} to="/">Marketplace</Button>
            <Button className='nav-buttons' variant="text" component={Link} to="/team">Team</Button>
            <Button className='nav-buttons' variant="text" component={Link} to="/profile">Profile</Button>
            <Button className='nav-buttons' variant="text" component={Link} to="/sellNFT">Sell NFT</Button>
          </Grid>

          <Grid item={true} md={4} container justifyContent="flex-end">
            <Button
              className='enableEthereumButton connect-button' variant="contained"
              textContent={window.ethereum.isConnected() ? "Connected" : "Connect Wallet"}
              onClick={connectWebsite}>
              {
                  window.ethereum.isConnected() ? "Connected" : "Connect Wallet"
              }
            </Button>
          </Grid>
        </Grid>
      </Box>
    </Box>
  );
}

export default Header