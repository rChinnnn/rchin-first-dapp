import logo from './logo.svg';
import './App.css';
import Web3Modal from "web3modal";
import { useEffect } from 'react';

const web3Modal = new Web3Modal({
  network: "rinkeby",
  providerOptions: {}
});

function App() {
  useEffect(() => {
    async function init() {
      const instance = await web3Modal.connect();
      console.log(instance)
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
