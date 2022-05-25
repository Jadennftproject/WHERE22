import logo from './logo.svg';
import { useState } from 'react';
import { ethers } from 'ethers';
import testMint from "./artifacts/contracts/TestShit.sol/TestMint.json"
import './App.css';

const testMintAddress = "0x88a03f3016Ffb6fF160560325A5F73C9694c1867"



function App() {
  

  const [greeting, setGreetingValue] = useState('')

  async function requestAccount() {
    await window.ethereum.request({method: 'eth_requestAccounts' })
  }

  async function ClaimNFT() {
    if (typeof window.ethereum !== 'undefined') {
      await requestAccount()
      const provider = new ethers.providers.Web3Provider(window.ethereum)
      const signer = provider.getSigner()
      const contract = new ethers.Contract(testMintAddress, testMint.abi, signer)
      
      const txn = await contract.setBaseURI('ipfs://bafybeia7epcga7lz3aowuhheeigq4ghr4jyu7bmidn66jhw7wpcglh5joe')
      await txn.wait()
    }
  }

  async function getTokenURI() {
    if (typeof window.ethereum !== 'undefined') {
      const provider = new ethers.providers.Web3Provider(window.ethereum)
      const signer = provider.getSigner()
      const contract = new ethers.Contract(testMintAddress, testMint.abi, signer)
      try {
        const data = await contract.tokenURI(2)
        console.log('data: ', data)
      } catch (err) {
        console.log("Error: ", err)
      }
    } 
  }

  return (
    <div className="App">
      <div className='overlay'>

      
      <header className="App-header">
        <h1> WHEREIS22 NFT</h1>
        <p>WHEREIS22 is an exclusive NFT membership built on the Ethereum blockchain. With WHEREIS22 NFT you'll get utilities across the digital and physical world.</p>
        <button onClick={requestAccount}>Connect</button>
        <button onClick={getTokenURI}>Mint this bitch</button>
      </header>

<div className='moving-background'></div>
      </div>
    </div>
    
  );
}

export default App;
