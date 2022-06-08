const express = require('express');
const app = express();
const port = 8080;
const Web3 = require('web3');
const cors = require('cors');
const axios = require('axios');
const API_KEY = process.env.API_KEY;

app.use(cors({origin: 'http://localhost:3000'}))

function getWeb3() {
  const web3 = new Web3("https://ropsten.infura.io/v3/8b9f6e263de346398eedaa9c561dc2ef");
  return web3;
}

async function getBlock (tx) {
  try{
    const block = await getWeb3().eth.getBlock(tx);
    console.log(block);
    return block;
  }
  catch (e) {
    console.log(e);
    return e;
  }
}

async function getTransaction (tx) {
  try{
    let transaction = await getWeb3().eth.getTransaction(tx);

    const receipt = await getWeb3().eth.getTransactionReceipt(tx);
    transaction.status = receipt.status;
    transaction.contractAddress = receipt.contractAddress;
    return transaction;

  }
  catch(e) {
    console.log(e);
    return e;
  }
}

async function getAccountInfo (tx) {
  try{
    let accountInfo = {account: tx};
    let balance = await getWeb3().eth.getBalance(tx);
    balance = getWeb3().utils.fromWei(balance, 'ether');

    const transactions = await axios.get(`https://api-ropsten.etherscan.io/api?module=account&action=txlist&address=${tx}&startblock=0&endblock=99999999&page=1&offset=10&sort=asc&apikey=${API_KEY}`)
    const data = transactions.data.result;
    accountInfo.balance = balance;
    accountInfo.transactions = data.map((el) => {
      return {
        hash: el.hash,
        blockNumber: el.blockNumber,
        timeStamp: el.timeStamp,
        from: el.from,
        to: el.to,
        contractAddress: el.contractAddress,
        value: getWeb3().utils.fromWei(el.value, 'ether')
      }
    })
    return accountInfo;
  }
  catch(e){
    console.log(e)
  }
}

app.get('/getTransaction/:tx', (req, res) => {
  getTransaction(req.params.tx)
    .then((transaction) => {

    let transactionEther={...transaction, value: getWeb3().utils.fromWei(transaction.value, "ether"), gasPrice: getWeb3().utils.fromWei(transaction.gasPrice, "ether")}
    res.send(transactionEther);
    })
})

app.get('/getblock/:tx', (req, res) => {
  getBlock(req.params.tx)
    .then((block) => {
      res.send(block);
    })
})

app.get('/getAccountInfo/:tx', (req, res) => {
  getAccountInfo(req.params.tx)
    .then((info) => {
      console.log(info)
      res.send(info);
    })
})

app.listen(port, () => {
  console.log('Listening...');
})
