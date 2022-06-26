import React from 'react';
import './NFT.scss';
import '../UploadImage'
import {Box, Typography} from '@mui/material';
import UploadImage from '../UploadImage';

const NFT = () => {
    return (
        <Box className="body">
            <Box className='banner'>
                <Typography className="text" variant='h2'>
                    NFT
                </Typography>
                <Box className='upload-image'>
                    <UploadImage />
                </Box>
            </Box>
        </Box>
    );
}

export default NFT