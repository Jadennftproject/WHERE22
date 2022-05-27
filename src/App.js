import { ethers } from "ethers";
import testMint from "./artifacts/contracts/MichaelRainey.sol/WhereIs22.json";
import "./App.css";
import WalletConnectProvider from "@walletconnect/web3-provider";
import Web3Modal from "web3modal";

const testMintAddress = "0x9317e2751CcFCA87e5e7a741F93014d8c6ED8aA6";

function App() {
  console.log("you won't find 22 here . . .")
  async function requestAccount() {
    const delay = ms => new Promise(res => setTimeout(res, ms));
    const providerOptions = {
      walletconnect: {
        package: WalletConnectProvider, // required
        options: {
          infuraId: "9e4c4b48907f4beba4ca0f3cc9d50ea2" // required
        }
      }
    };
    const web3Modal = new Web3Modal({
      network: "mainnet", // optional
      cacheProvider: false, // optional
      providerOptions // required
    });

    const connection = await web3Modal.connect();
    const provider = new ethers.providers.Web3Provider(connection);
    window.provider = provider;
    document.getElementById("connectButton").style.display = 'none'
    var accounts = await provider.listAccounts();
    var account = accounts[0]
    var connectedString = "Hello,\n" + String(account).substring(0, 5) + "..." + String(account).substring(String(account).length - 4, String(account).length)
    
    var waitString = connectedString + "\n\nChecking presale allowlist"
    document.getElementById("address").innerText = waitString
    
    var waitTime = Math.random() * 1000;
    await delay(waitTime);
    document.getElementById("address").innerText = waitString + "."

    waitTime = Math.random() * 1000;
    await delay(waitTime);
    document.getElementById("address").innerText = waitString + ".."

    waitTime = Math.random() * 1000;
    await delay(waitTime);
    document.getElementById("address").innerText = waitString + "..."
    
    await delay(300);
    document.getElementById("address").innerText = connectedString + "\n\nCongrats!  You are allowed to mint!\n\nWill you find 22?"
  }
  
  async function ClaimNFT() {
    if (!window.provider)
      await requestAccount();
    
    const signer = window.provider.getSigner();
    const contract = new ethers.Contract(
        testMintAddress,
        testMint.abi,
        signer
    );

    const txn = await contract["presaleMint()"]({value:"250000000000000000"});
    await txn.wait();
  }

  return (
    
    <div className="App">
  <header>
    <h2>WHEREIS22</h2>
    <nav>
      <li><a href="https://www.whereis22.io/">Home</a></li>
      <li><a href="https://discord.gg/5su2hwfhcj">Discord</a></li>
      
    </nav>
  </header>

  <section className="hero">
    <div className="background-image"></div>
    <div className="hero-content-area">
      <h1>WHEREIS22 NFT</h1>
      <h3>Presale Price: 0.25 eth</h3>
      <h3 id="address"></h3>
      <button id="connectButton" onClick={requestAccount}>Connect</button>
            <button onClick={ClaimNFT}>Mint</button>
    </div>
  </section>
    </div>
  );
}

export default App;
