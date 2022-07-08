import { Typography, Box, Grid} from "@mui/material";
import './Marketplace.scss';
import NFTTile from "./NFTTile";
import NFTcard from "./NFTcard";
import MarketplaceJSON from "../Marketplace.json";
import axios from "axios";
import { useState } from "react";

export default function Marketplace() {
const sampleData = [
    {
        "name": "NFT#1",
        "description": "Test 1",
        "website":"http://",
        "image":"https://",
        "price":"0.03ETH",
        "currentlySelling":"True",
        "address":"0x",
    },
    {
        "name": "NFT#2",
        "description": "Test 2",
        "website":"http://",
        "image":"https://",
        "price":"0.03ETH",
        "currentlySelling":"True",
        "address":"0x",
    },
    {
        "name": "NFT#3",
        "description": "Test 3",
        "website":"http://",
        "image":"https://",
        "price":"0.03ETH",
        "currentlySelling":"True",
        "address":"0x",
    },
];
const [data, updateData] = useState(sampleData);
const [dataFetched, updateFetched] = useState(false);

async function getAllNFTs() {
    const ethers = require("ethers");
    //After adding your Hardhat network to your metamask, this code will get providers and signers
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const signer = provider.getSigner();
    //Pull the deployed contract instance
    let contract = new ethers.Contract(MarketplaceJSON.address, MarketplaceJSON.abi, signer)
    //create an NFT Token
    let transaction = await contract.getAllNFTs()

    //Fetch all the details of every NFT from the contract and display
    const items = await Promise.all(transaction.map(async i => {
        const tokenURI = await contract.tokenURI(i.tokenId);
        let meta = await axios.get(tokenURI);
        meta = meta.data;

        let price = ethers.utils.formatUnits(i.price.toString(), 'ether');
        let item = {
            price,
            tokenId: i.tokenId.toNumber(),
            seller: i.seller,
            owner: i.owner,
            image: meta.image,
            name: meta.name,
            description: meta.description,
        }
        return item;
    }))

    updateFetched(true);
    updateData(items);
}

if(!dataFetched)
    getAllNFTs();



return (
    <Box className="body-marketplace">
        <Box className="banner">
            <Box className="top-nfts">
                <Typography className="text">
                    Top NFTs
                </Typography>
            </Box>
            <Box className="nft-grid">
                <Grid container={true} spacing={2}>   
                    {data.map((value, index) => {
                    return <Grid item xs={12} sm={6} md={4}>
                            <NFTcard data={value} key={index}></NFTcard>
                        </Grid>
                    })}    
                </Grid>
            </Box>
        </Box>
    </Box>
);

}