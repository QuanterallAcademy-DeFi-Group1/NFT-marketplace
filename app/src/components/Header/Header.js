import React from 'react';
import './Header.scss';
import Logo from "../../logo.svg"
import OnBoard from '@web3-onboard/core';
import injectedModule from '@web3-onboard/injected-wallets';
import {useState} from "react";
import { RouterLink, Link } from 'react-router-dom';
import { ethers } from 'ethers';
import { useEffect } from 'react';
import { useLocation } from 'react-router';


const Header = () => {
  
    return (
      <div></div>
    );
    // return (
    //   <button>Header</button>
    //     // <Box className='header-div'>
    //     //     <Box className='header-grid'>
    //     //         <Grid container={true} spacing={0}>
    //     //             <Grid item={true} md={2} className='header-grid-content'>
    //     //                 <Typography variant='h5' className='name-logo'>
    //     //                     Project Defi
    //     //                 </Typography>
    //     //             </Grid>
                    
    //     //             <Grid item={true} md={4}>
    //     //                 <Button className='nav-buttons' variant="text" component={Link} to="/Swap">Swap</Button>
    //     //                 <Button className='nav-buttons' variant="text" component={Link} to="/NFT">NFT</Button>
    //     //                 <Button className='nav-buttons' variant="text" component={Link} to="/">Team</Button>
    //     //             </Grid>

    //     //             <Grid item={true} md={6} container justifyContent="flex-end">
    //     //                 <Button className='connect-button' variant="contained" onClick={async () => {
    //     //                     console.log("connect clicked")
    //     //                     const wallets = await onboard.connectWallet();
    //     //                     setProvider(wallets[0].provider);
    //     //                     console.log(wallets);
    //     //                     }}
    //     //                 >Connect Wallet</Button>
    //     //             </Grid>
    //     //         </Grid>
    //     //     </Box>
    //     // </Box>
    //     <div></div>
    // );
}

export default Header