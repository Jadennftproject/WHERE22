# 24hrs

FLOW:
1. Upload images/videos to IPFS
2. Use CID from upload in MetaGenerator as urls
3. Upload generated .json files from MetaGenerator to IPFS
4. Use CID from .json files as baseTokenURI in contract
5. Deploy contract

## Compile
npx hardhat compile

## Deploy
npx hardhat run scripts/deploy.js --network rinkeby

## Verify on Etherscan
npx hardhat verify 0x6338762815fE9d8660F4F32e487D194a295494Fd --network rinkeby

## Generate Metadata
node .\MetaGenerator.js

## Store data on IPFS
node .\storeIPFS.mjs



