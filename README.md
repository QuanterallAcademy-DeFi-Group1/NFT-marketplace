# DeFi project Nft Marketplace

## In the server folder there is initial implementation of the contracts with needed functionality from the task assigment
https://github.com/DeFi-Group1/nft-mint-final-assigment/tree/main/server/contracts

## We have also frontend React app with initial view of the nft marketplace running
### Here are the demo screenshots of the nft marketplace in the frontend app folder

<img src="https://github.com/DeFi-Group1/nft-mint-final-assigment/blob/main/app/demo/view%20nfts.png?raw=true" alt="view nft marketplace" width="200"> <img src="https://github.com/DeFi-Group1/nft-mint-final-assigment/blob/main/app/demo/list%20nft.png?raw=true" alt="sell nft" width="200"> <img src="https://github.com/DeFi-Group1/nft-mint-final-assigment/blob/main/app/demo/view%20selected%20nft.png?raw=true" alt="view selected" width="200"> <img src="https://github.com/DeFi-Group1/nft-mint-final-assigment/blob/main/app/demo/group%201.png?raw=true" alt="developers" width="200">


## Run React frontend
```
cd app
npm install --force
--
setup your api keys for Pinata and Alchemy APIs - in the app/.env file
Use goerli test network to have pinata API working
NOTE: I have made a setup with own private key, alchemy project and pinata api keys in .env file

--
compile and run hardhat deploy   
1.    cd app
2.    npx hardhat compile   
3.    npx run scripts/deploy.js
```

## We have server app that watermarks the images

```
cd server

npm install --force
```