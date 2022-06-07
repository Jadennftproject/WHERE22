import react from "react";

const NavBar = ({accounts, setAccounts}) => {
    const isConnected= Boolean(accounts[0]);


    async function connectAccount() {
        if(window.ethereum) {
            const accounts = await window.ethereum.request({
                method: "eth_requestAccounts"
            })
            setAccounts(accounts);
        }
    }

    return (
  <div className="nav">
      <div>Instagram</div>
      <div>Twitter</div>
      <div>Discord</div>

        {isConnected ? (
            <p>Connected</p>
        ) : (
            <button onClick={connectAccount}>Coonect</button>
        )}
  </div>
    );
};