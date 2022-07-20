import React from 'react';
import './Header.scss';
import { Box, Grid, Typography, Button } from '@mui/material';
import { useState, useEffect } from "react";
import { Link } from 'react-router-dom';



const Header = () => {

  const [connectState, setConnectedState] = React.useState(localStorage.getItem('connected-mode') === 'true');
  const [data, setData] = useState(false);

  React.useEffect(() => {
    connectState ? localStorage.setItem('connected-mode', true) : localStorage.setItem('connected-mode', false);
    localStorage.setItem('connected-mode', connectState);
  }, [connectState]);

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
        window.ethereum.isConnected() ? localStorage.setItem('connected-mode', true) : localStorage.setItem('connected-mode', false);
        setConnectedState(true);
        console.log("eth request");
      });
  }
  
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
              className='connect-button' variant="contained"
              onClick={connectWebsite}> {connectState ? "Connected" : "Connect Wallet" }
            </Button>
          </Grid>
        </Grid>
      </Box>
    </Box>
  );
}

export default Header