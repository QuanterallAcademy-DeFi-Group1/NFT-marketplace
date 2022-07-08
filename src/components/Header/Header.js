import React from 'react';
import './Header.scss';
import {Box, Grid, Typography, Button} from '@mui/material';
import Logo from "../../logo.svg"
import OnBoard from '@web3-onboard/core';
import injectedModule from '@web3-onboard/injected-wallets';
import {useState} from "react";
import { RouterLink, Link } from 'react-router-dom';
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

const Header = () => {
    const [provider, setProvider] = useState(null);
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
                        <Button className='nav-buttons' variant="text" component={Link} to="/NFT">Watermark</Button>
                        <Button className='nav-buttons' variant="text" component={Link} to="/team">Team</Button>
                        <Button className='nav-buttons' variant="text" component={Link} to="/profile">Profile</Button>
                        <Button className='nav-buttons' variant="text" component={Link} to="/sellNFT">Sell NFT</Button>
                    </Grid>

                    <Grid item={true} md={4} container justifyContent="flex-end">
                        <Button className='connect-button' variant="contained" onClick={async () => {
                            console.log("connect clicked")
                            const wallets = await onboard.connectWallet();
                            setProvider(wallets[0].provider);
                            console.log(wallets);
                            }}
                        >Connect Wallet</Button>
                    </Grid>
                </Grid>
            </Box>
        </Box>
    );
}

export default Header