import React from "react";
// import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { useState, useEffect } from "react";
import MetaMaskSDK from '@metamask/sdk';
import detectEthereumProvider from '@metamask/detect-provider';
// eslint-disable-next-line no-unused-vars
import { ethers } from "ethers";
import Web3 from "web3";
import "./App.css";
// JSON containing ABI and Bytecode of compiled smart contracts
import contractJson from "./abis/Greeter.json";

new MetaMaskSDK({
  useDeeplink: false,
  communicationLayerPreference: "socket",
});

function App() {
  const [mmStatus, setMmStatus] = useState("Not connected!");
  const [isConnected, setIsConnected] = useState(false);
  const [accountAddress, setAccountAddress] = useState(undefined);
  const [displayMessage, setDisplayMessage] = useState("");
  // eslint-disable-next-line
  const [web3, setWeb3] = useState(undefined);
  const [getNetwork, setGetNetwork] = useState(undefined);
  const [contracts, setContracts] = useState(undefined);
  // eslint-disable-next-line
  const [contractAddress, setContractAddress] = useState(undefined);
  const [loading, setLoading] = useState(false);
  const [txnHash, setTxnHash] = useState(null);




  useEffect(() => {
    (async () => {
      // Define web3
      const web3 = new Web3(window.ethereum);
      setWeb3(web3);
      // get networkId
      const networkId = await web3.eth.getChainId();
      setGetNetwork(networkId);
      // INSERT deployed smart contract address
      const contractAddress = "0xECbfe4D32D478F7D16Cf959eD2B0Fb1253a842EB";
      setContractAddress(contractAddress);
      // Instantiate smart contract instance
      const Greeter = new web3.eth.Contract(contractJson.abi, contractAddress);
      setContracts(Greeter);
      // Set provider
      Greeter.setProvider(window.ethereum);
    })();
  }, []);
  

  // eslint-disable-next-line no-undef
  if (ethereum._metamask.isUnlocked()) {
    console.log('Metamask is unlocked')
  }
  else {
    console.log('Metamask is locked')
  }



  // change account if metamask account is changed
  useEffect(() => {
    if (isConnected) {
      window.ethereum.on("accountsChanged", function (accounts) {
        setAccountAddress(accounts[0]);
      });
    }
  }, [isConnected]);

  // Connect to Metamask
  async function ConnectWallet() {
    const provider = await detectEthereumProvider();
    if (provider) {
      // From now on, this should always be true:
       // eslint-disable-next-line no-unused-expressions
       provider === window.ethereum
      // eslint-disable-next-line no-undef
      console.log('Metamask Available')
    } else {
      window.alert('Please install MetaMask!');
    }
    // Check if Metamask is installed
    if (typeof window.ethereum !== "undefined") {
      // Request account access if needed
      window.ethereum
      .request({
        method: "eth_requestAccounts",
        params: [],
      })
      .then((res) => console.log("request accounts", res))
      .catch((e) => console.log("request accounts ERR", e));

      const accounts = await window.ethereum.request({
        method: "eth_accounts",
      });
      setAccountAddress(accounts[0]);
      // Set Metamask status
      setMmStatus("Connected!");
      setIsConnected(true);
    } else {
      alert("Please install Metamask!");
    }
  }

  const addChain = async () => {
    const networkId = await window.ethereum.request({ method: 'net_version' });
    try {
      await window.ethereum.request({
        method: "wallet_addEthereumChain",
        params: [
          {
            chainId: "0x3e5",
            chainName: "5ire Testnet",
            blockExplorerUrls: ["https://explorer.5ire.network/"],
            nativeCurrency: { symbol: "5IRE", decimals: 18 },
            rpcUrls: ["https://rpc-testnet.5ire.network/"],
          },
        ],
      });
      window.alert("5ire Testnet added");
      window.location.reload();
    } catch (error) {
      console.log("Error adding 5ire Testnet:", error);
    }
  
    if (networkId !== "997") { // 997 is the network ID for 5ire Testnet
      try {
        await window.ethereum.request({
          method: 'wallet_switchEthereumChain',
          params: [{ chainId: '0x3e5' }]
        });
        window.alert('Switched to 5ire Testnet')
      } catch (error) {
        if (error.code === 4902) { // User rejected the network switch
          window.alert('User rejected network switch');
        } else {
          window.alert('Error switching network:', error);
        }
        return;
      }
    }
  
   
  };
  

  // Read message from smart contract
  async function receive() {
    // Display message
    var displayMessage = await contracts.methods.read().call();
    setDisplayMessage(displayMessage);
  }

  // Write message to smart contract
  async function send() {
    // Get input value of message
    var getMessage = document.getElementById("message").value;
    setLoading(true);
    // Send message to smart contract
    await contracts.methods
      .write(getMessage)
      .send({ from: accountAddress })
      .on("transactionHash", function (hash) {
        setTxnHash(hash);
      });
    setLoading(false);
  }

  return (
    <div className="App">
      {/* Metamask status */}
      <div className="text-center">
        <h1>
          {getNetwork !== 0x3e5
            ? "Please make sure you're on the 5ire testnet network"
            : mmStatus}
        </h1>
      </div>
      <hr />
      <h1 className="text-center text-4xl font-bold mt-8">
        create-5ire-app template 🚀
      </h1>

      <center>{getNetwork !== 0x3e5 && <button
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-md mt-8 mb-6"
              onClick={addChain}
            >Add /  Switch Network</button>}</center>
      {/* Connect to Metamask */}

      <center>
        {isConnected && (
          // Show message if connected
          <div className="text-center text-xl mt-12">
            {/* Show account address */}
            <h1>Connected to {accountAddress}</h1>
          </div>
        )}
        {!isConnected && (
          <>
            <button
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-md mt-8 mb-6"
              onClick={ConnectWallet}
            >
              Connect with Metamask
            </button>
          </>
        )}
      </center>

      {/* Send message */}
      <center className="mt-16">
        <input
          type={"text"}
          placeholder={"Enter message"}
          id="message"
          className="w-60 bg-white rounded border border-gray-300 focus:ring-2 focus:ring-indigo-200 focus:bg-white focus:border-indigo-500 text-base outline-none text-gray-700 px-3 leading-8 transition-colors duration-200 ease-in-out"
        />
        <button
          className="text-center bg-blue-500 hover:bg-blue-700 text-white font-bold py-1 px-4 rounded ml-3"
          onClick={isConnected && send}
        >
          Send
        </button>
        {/* Receive message */}
        <button
          className="text-center  bg-blue-500 hover:bg-blue-700 text-white font-bold py-1 px-3 rounded ml-3"
          onClick={isConnected && receive}
        >
          Receive
        </button>
      </center>
      <p className="text-center text-sm mt-6">
        {loading === true ? (
          <>
            loading..
            <p className="mt-4 text-xs ">
              Txn hash:{" "}
              <a
                className="text-blue-500"
                href={"https://explorer.5ire.network/evm/tx/" + txnHash}
                target="_blank"
                rel="noopener noreferrer"
              >
                {txnHash}
              </a>
            </p>
            <p className="mt-2 text-xs">
              Please wait till the Txn is completed :)
            </p>
          </>
        ) : (
          ""
        )}
      </p>
      {/* Display message */}
      <div className="text-center text-3xl mt-10">
        <b>{displayMessage}</b>
      </div>
      {/* Footer developer content */}
      <footer className="footer">
        <img src="https://docs.5ire.org/img/ms-icon-150x150.png" className="App-logo" alt="logo" />
        <h1 className="mt-4 text-xs sm:text-sm text-black">
          Learn more about 5ire  Docs {""}
          <a
            className="text-blue-500 no-underline hover:underline hover:text-blue-400"
            href="https://docs.5ire.org/"
            target="_blank"
            rel="noopener noreferrer"
          >
            here
          </a>
          .
        </h1>
      </footer>
    </div>
  );
}

export default App;