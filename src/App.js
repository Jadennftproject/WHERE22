import { ethers } from "ethers";
import testMint from "./artifacts/contracts/MichaelRainey.sol/WhereIs22.json";
import "./App.css";
import WalletConnectProvider from "@walletconnect/web3-provider";
import Web3Modal from "web3modal";

const testMintAddress = "0x9317e2751CcFCA87e5e7a741F93014d8c6ED8aA6";

function App() {
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

    try {
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
    } catch (e) {
      document.getElementById("info").innerText = "Error connecting wallet.  Please try again later."
    }
    
  }

  async function ClaimNFT() {
    if (!window.provider)
      await requestAccount();
    
    try {
      const signer = window.provider.getSigner();
      const contract = new ethers.Contract(
          testMintAddress,
          testMint.abi,
          signer
      );

      const txn = await contract["mint()"]({value:"120000000000000000"});
      await txn.wait();
    } catch (e) {
      if (e.code === "INSUFFICIENT_FUNDS") {
        document.getElementById("info").innerText = "Not enough eth for transaction.\nPlease have a little more than .12 eth."
      }
    }

  }

  return (
    
    <div className="App">
  <header>
    <h2>WHEREIS22</h2>
    <nav>
      <li><a className="nav"href="https://www.whereis22.io/">Home</a></li>
      <li><a className="nav" href="https://discord.gg/5su2hwfhcj">Discord</a></li>
      
    </nav>
  </header>

  <section className="hero">
    <div className="background-image"></div>
    <div className="hero-content-area">
      <h1>WHEREIS22 NFT</h1>
      <h3>Presale Price: 0.12 eth</h3>
      <h4>1. Click connect to connect your wallet</h4>
      <h4>2. When connected, you will see "Congrats! You are allowed to Mint"</h4>
      <h4>3. Now click mint and get your NFT</h4>
      <h4>4. After minting, your NFT will be in your crypto wallet. </h4>
      <h3 id="address"> </h3>
      <button id="connectButton" onClick={requestAccount}>Connect</button>
      <button onClick={ClaimNFT}>Mint</button>

      
    

      <h3 id="info"> </h3>
      


    </div>
  </section>
    </div>
  );
}

export default App;
