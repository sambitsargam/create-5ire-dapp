<p align="center">
    <img align="center" src="https://docs.5ire.org/img/ms-icon-150x150.png" width="175"></img>
</p>

<h1 align="center">create-5ire-dapp</h1>

<div align="center">
    <img src="https://img.shields.io/badge/platform-5ire-blue.svg?style=flat-square" alt="Platform">
    <img src="https://img.shields.io/github/license/sambitsargam/create-5ire-dapp?color=orange&style=flat-square" alt="License">
    <img src="https://img.shields.io/github/v/release/sambitsargam/create-5ire-dapp?color=blue&style=flat-square" alt="Release">
    <img src="https://img.shields.io/npm/dw/create-5ire-dapp?style=flat-square" alt="Downloads">
</div><br>

A full-stack starter template with React & Hardhat or Truffle to develop, deploy, and test Solidity smart contracts on the 5ire testnet network. The starter kit also includes pre-installed ` hardhat full code`,`Truffle code`, `tailwindcss`,`Metamask SDK`, `web3.js`, etc. packages.

## 📺 Quickstart

<div align="center">
</div>

## 🛠️ Installation guide
### It Contains Both for Hardhat and Truffle Individually

## 🛠️ Installation guide for Truffle

Install this for first time by running the following command in your terminal:

```sh
npm install -g create-5ire-dapp
```

### ⌛️ create-5ire-dapp command

Open up your terminal (or command prompt) and type the following command:

```sh
npx create-5ire-dapp <your-dapp-name>

# cd into the directory
cd <your-dapp-name>
```

### 🔑 Mnemonic

Ensure you create a `.secret` file in the `root` directory. Then paste your [Metamask mnemonic](https://metamask.zendesk.com/hc/en-us/articles/360015289512-How-to-reveal-your-Secret-Recovery-Phrase) in `.env` with the variable name `MNEMONIC` as follows:

```sh
xxxx ,xxxx ,xxxx ,xxxx ,xxxx ,xxxx ,xxxx ,xxxx ,xxxx ,xxxx ,xxxx ,xxxx
```

### ⚙️ Compile

Now, you can write your contracts in `./contracts/` directory, replace `Greeter.sol` with `<your-contracts>.sol` file. To write tests, go to `./test` directory and create `<your-contracts>.test.js`.

```sh
truffle compile

# for testing the smart contracts
truffle test
```

After successful compilation, the artifacts directory will be created in `./src/abis` with a JSON `/<your-contracts>.json` containing ABI and Bytecode of your compiled smart contracts.

### ⛓️ Deploy

Before deploying the smart contracts, please make sure you have a `5ire testnet` in your Metamask wallet with sufficient funds, follow this [quickstart](https://docs.5ire.org/) guide if you do not have one.

Also, make changes in `./migrations/2_deploy_contracts.js` (replace the greeter contract name with `<your-contract-name>`).

For deploying the smart contracts to 5ire testnet network, type the following command:

```sh
truffle deploy --network testnet
```

Copy-paste the deployed contract address [here](https://github.com/sambitsargam/create-5ire-dapp/blob/main/src/App.js#L40)


## 🛠️ Installation guide for Hardhat
### 📦 Install the Package Specified in the Package.json

```sh
Install this for first time by running the following command in your terminal:

```sh
npm install -g create-5ire-dapp@0.0.4
```

### ⌛️ create-5ire-dapp command

Open up your terminal (or command prompt) and type the following command:

```sh
npx create-5ire-dapp <your-dapp-name>

# cd into the directory
cd <your-dapp-name>
```

### 🔑 Private key

Ensure you create a `.env` file in the `root` directory. Then paste your [Metamask private key](https://metamask.zendesk.com/hc/en-us/articles/360015289632-How-to-export-an-account-s-private-key) in `.env` with the variable name `PRIVATE_KEY` as follows:

```sh
PRIVATE_KEY=0x734...
```

### ⚙️ Compile

Now, you can write your contracts in `./contracts/` directory, replace `Greeter.sol` with `<your-contracts>.sol` file. To write tests, go to `./test` directory and create `<your-contracts>.test.js`.

```sh
npx hardhat compile

# for testing the smart contracts
npx hardhat test
```

After successful compilation, the artifacts directory will be created in `./src/artifacts` with a JSON `/contracts/<your-contracts>.sol/<your-contracts>.json` containing ABI and Bytecode of your compiled smart contracts.

Please make the changes while [Importing](https://github.com/sambitsargam/create-5ire-dapp/blob/main/src/App.js#L7) the JSON in `./src/app.js`.


### ⛓️ Deploy

Before deploying the smart contracts, please make sure you have a `5ire testnet` in your Metamask wallet with sufficient funds, follow this [quickstart](https://docs.5ire.org/) guide if you do not have one.

Also, make changes in `./scripts/deploy.js` (replace the greeter contract name with `<your-contract-name>`).

For deploying the smart contracts to 5ire testnet network, type the following command:

```sh
npx hardhat run scripts/deploy.js
```

Copy-paste the deployed contract address [here](https://github.com/sambitsargam/create-5ire-dapp/blob/main/src/App.js#L35)

```sh
<your-contract> deployed to: 0x...
```

### 💻 React client

start react app

```sh
npm start
# Starting the development server...
```


## ⚖️ License

create-5ire-dapp is licensed under the [MIT License](https://github.com/sambitsargam/create-5ire-dapp/blob/main/LICENSE).

<hr>
Don't forget to leave a star ⭐️ ~ <a href="https://twitter.com/sambitsargam" target="_blank"><img src="https://img.shields.io/twitter/follow/sambitsargam?style=social" alt="twitter" /></a>
