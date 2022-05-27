import { ethers } from "ethers";
import testMint from "./artifacts/contracts/MichaelRainey.sol/WhereIs22.json";
import "./App.css";

const testMintAddress = "0x9317e2751CcFCA87e5e7a741F93014d8c6ED8aA6";

function App() {
  console.log("you won't find 22 here . . .")
  async function requestAccount() {
    const delay = ms => new Promise(res => setTimeout(res, ms));

    const provider = new ethers.providers.Web3Provider(window.ethereum)
    window.provider = provider;
/*    document.getElementById("connectButton").style.display = 'none'
    console.log(provider)
    var account = ""
    try {
      var accounts = await provider.listAccounts();
      console.log(accounts)
      if (accounts) {
        account = accounts[0]
      } else {
        accounts = await provider.provider.listAccounts();
        account = accounts[0]
      }
    } catch {
      account = ""
    }

    var connectedString = "Hello,\n" + String(account).substring(0, 5) + "..." + String(account).substring(String(account).length - 4, String(account).length)*/
    var connectedString = "Connected\n"
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
    if (!window.provider) {
      await requestAccount();
    }


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
            <h3 id="address"> </h3>
            <button id="connectButton" onClick={requestAccount}>Connect</button>
            <button onClick={ClaimNFT}>Mint</button>
          </div>
        </section>
      </div>
  );
}

export default App;