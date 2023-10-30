import logo from './logo.svg';
import './App.css';
import Web3Modal from "web3modal";
import { useEffect } from 'react';
import { ethers } from "ethers";

const web3Modal = new Web3Modal({
  network: "SepoliaETH",
  providerOptions: {}
});

function App() {
  useEffect(() => {
    async function init() {
      const instance = await web3Modal.connect();
      const provider = new ethers.BrowserProvider(instance);
      const signer = await provider.getSigner();
      const address = await signer.getAddress();
      const balance = await provider.getBalance(address);
      console.log(ethers.formatEther(balance) + " ETH"); // this is big number
      
      // const ensAddress = await provider.lookupAddress(address);
      // console.log(ensAddress); // only available in mainnet
    }
    init()
  }, [])
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
}

export default App;
