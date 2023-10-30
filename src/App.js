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
      const contractAddr = '0xC080004ea96f2daeDCE1C0d7E81B3526C120f721'
      const abi = [
        {
          "inputs": [
            {
              "internalType": "string",
              "name": "str",
              "type": "string"
            }
          ],
          "name": "store",
          "outputs": [],
          "stateMutability": "nonpayable",
          "type": "function"
        },
        {
          "inputs": [
            {
              "internalType": "string",
              "name": "str",
              "type": "string"
            }
          ],
          "name": "storePaidMsg",
          "outputs": [],
          "stateMutability": "payable",
          "type": "function"
        },
        {
          "inputs": [],
          "name": "message",
          "outputs": [
            {
              "internalType": "string",
              "name": "",
              "type": "string"
            }
          ],
          "stateMutability": "view",
          "type": "function"
        },
        {
          "inputs": [],
          "name": "retrievePaidMsg",
          "outputs": [
            {
              "internalType": "string",
              "name": "",
              "type": "string"
            }
          ],
          "stateMutability": "view",
          "type": "function"
        }
      ]
      const contract = new ethers.Contract(contractAddr, abi, signer);
      let tx = await contract.store("Free fish!")
      await tx.wait()
      let msg = await contract.message()
      console.log(msg)

      let payEtherAmount = ethers.parseEther("0.00001");
      let ptx = await contract.storePaidMsg(
        "Paid fish!",
        {value: payEtherAmount}
      )
      let response = await ptx.wait()
      console.log(response)
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
