const express = require('express');
const app = express();
const port = 8080;
const Web3 = require('web3');
const Contract = require('web3-eth-contract')

function getWeb3() {
  const web3 = new Web3(new Web3.providers.HttpProvider('http://127.0.0.1:8545'));
  return web3;
}

async function getAccounts() {
  try{
    const accounts = await getWeb3().eth.getAccounts();
    console.log(accounts);
    return accounts;
  }
  catch(e){
    console.log(e);
    return e;
  }
}

async function getGasPrice() {
  try {
    const gasPrice = await getWeb3().eth.getGasPrice();
    console.log(gasPrice);
    return gasPrice;
  }
  catch(e) {
    console.log(e);
    return e;
  }
}

async function getBlock () {
  try{
    const block = await getWeb3().eth.getBlock("latest");
    console.log(block);
    return block;
  }
  catch (e) {
    console.log(e);
    return e;
  }
}

async function helloWorld() {
  try{
    const abi = [{
      "inputs": [],
      "name": "renderHelloWorld",
      "outputs":[
        {
          "internalType": "string",
          "name": "greeting",
          "type": "string"
        }
      ],
      "stateMutability": "pure",
      "type": "function"
    }];
    //배포한 컨트랙트의 주소
    const address = '0x357E036CeCfa741a8B07758EdDFB77B837cc8aAD'
    Contract.setProvider('http://127.0.0.1:8545');
    const contract = new Contract(abi, address);
    const result = await contract.methods.renderHelloWorld().call();
    console.log(result);
  }
  catch(e){
    console.log(e);
    return e;
  }
}

async function deploy() {
  try{
    const abi = [
      {
        "inputs": [
          {
            "internalType": "string",
            "name": "getName",
            "type": "string"
          },
          {
            "internalType": "string",
            "name": "getSymbol",
            "type": "string"
          }
        ],
        "stateMutability": "nonpayable",
        "type": "constructor"
      },
      {
        "anonymous": false,
        "inputs": [
          {
            "indexed": true,
            "internalType": "address",
            "name": "owner",
            "type": "address"
          },
          {
            "indexed": true,
            "internalType": "address",
            "name": "spender",
            "type": "address"
          },
          {
            "indexed": false,
            "internalType": "uint256",
            "name": "oldAmount",
            "type": "uint256"
          },
          {
            "indexed": false,
            "internalType": "uint256",
            "name": "amount",
            "type": "uint256"
          }
        ],
        "name": "Approval",
        "type": "event"
      },
      {
        "anonymous": false,
        "inputs": [
          {
            "indexed": true,
            "internalType": "address",
            "name": "from",
            "type": "address"
          },
          {
            "indexed": true,
            "internalType": "address",
            "name": "to",
            "type": "address"
          },
          {
            "indexed": false,
            "internalType": "uint256",
            "name": "amount",
            "type": "uint256"
          }
        ],
        "name": "Transfer",
        "type": "event"
      },
      {
        "anonymous": false,
        "inputs": [
          {
            "indexed": true,
            "internalType": "address",
            "name": "spender",
            "type": "address"
          },
          {
            "indexed": true,
            "internalType": "address",
            "name": "from",
            "type": "address"
          },
          {
            "indexed": true,
            "internalType": "address",
            "name": "to",
            "type": "address"
          },
          {
            "indexed": false,
            "internalType": "uint256",
            "name": "amount",
            "type": "uint256"
          }
        ],
        "name": "Transfer",
        "type": "event"
      },
      {
        "inputs": [
          {
            "internalType": "address",
            "name": "",
            "type": "address"
          },
          {
            "internalType": "address",
            "name": "",
            "type": "address"
          }
        ],
        "name": "_allowances",
        "outputs": [
          {
            "internalType": "uint256",
            "name": "",
            "type": "uint256"
          }
        ],
        "stateMutability": "view",
        "type": "function"
      },
      {
        "inputs": [],
        "name": "_decimals",
        "outputs": [
          {
            "internalType": "uint8",
            "name": "",
            "type": "uint8"
          }
        ],
        "stateMutability": "view",
        "type": "function"
      },
      {
        "inputs": [],
        "name": "_name",
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
        "name": "_symbol",
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
        "name": "_totalSupply",
        "outputs": [
          {
            "internalType": "uint256",
            "name": "",
            "type": "uint256"
          }
        ],
        "stateMutability": "view",
        "type": "function"
      },
      {
        "inputs": [
          {
            "internalType": "address",
            "name": "owner",
            "type": "address"
          },
          {
            "internalType": "address",
            "name": "spender",
            "type": "address"
          }
        ],
        "name": "allowance",
        "outputs": [
          {
            "internalType": "uint256",
            "name": "",
            "type": "uint256"
          }
        ],
        "stateMutability": "view",
        "type": "function"
      },
      {
        "inputs": [
          {
            "internalType": "address",
            "name": "spender",
            "type": "address"
          },
          {
            "internalType": "uint256",
            "name": "amount",
            "type": "uint256"
          }
        ],
        "name": "approve",
        "outputs": [
          {
            "internalType": "bool",
            "name": "",
            "type": "bool"
          }
        ],
        "stateMutability": "nonpayable",
        "type": "function"
      },
      {
        "inputs": [
          {
            "internalType": "address",
            "name": "account",
            "type": "address"
          }
        ],
        "name": "balanceOf",
        "outputs": [
          {
            "internalType": "uint256",
            "name": "",
            "type": "uint256"
          }
        ],
        "stateMutability": "view",
        "type": "function"
      },
      {
        "inputs": [],
        "name": "decimals",
        "outputs": [
          {
            "internalType": "uint8",
            "name": "",
            "type": "uint8"
          }
        ],
        "stateMutability": "view",
        "type": "function"
      },
      {
        "inputs": [],
        "name": "name",
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
        "name": "symbol",
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
        "name": "totalSupply",
        "outputs": [
          {
            "internalType": "uint256",
            "name": "",
            "type": "uint256"
          }
        ],
        "stateMutability": "view",
        "type": "function"
      },
      {
        "inputs": [
          {
            "internalType": "address",
            "name": "recipient",
            "type": "address"
          },
          {
            "internalType": "uint256",
            "name": "amount",
            "type": "uint256"
          }
        ],
        "name": "transfer",
        "outputs": [
          {
            "internalType": "bool",
            "name": "",
            "type": "bool"
          }
        ],
        "stateMutability": "nonpayable",
        "type": "function"
      },
      {
        "inputs": [
          {
            "internalType": "address",
            "name": "sender",
            "type": "address"
          },
          {
            "internalType": "address",
            "name": "recipient",
            "type": "address"
          },
          {
            "internalType": "uint256",
            "name": "amount",
            "type": "uint256"
          }
        ],
        "name": "transferFrom",
        "outputs": [
          {
            "internalType": "bool",
            "name": "",
            "type": "bool"
          }
        ],
        "stateMutability": "nonpayable",
        "type": "function"
      }
    ];
    const byteCode = "60806040523480156200001157600080fd5b5060405162001ac938038062001ac9833981810160405281019062000037919062000331565b81600390805190602001906200004f929190620000e4565b50806004908051906020019062000068929190620000e4565b506012600560006101000a81548160ff021916908360ff1602179055506a52b7d2dcc80cd2e40000006002819055506002546000803373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1681526020019081526020016000208190555050506200041b565b828054620000f290620003e5565b90600052602060002090601f01602090048101928262000116576000855562000162565b82601f106200013157805160ff191683800117855562000162565b8280016001018555821562000162579182015b828111156200016157825182559160200191906001019062000144565b5b50905062000171919062000175565b5090565b5b808211156200019057600081600090555060010162000176565b5090565b6000604051905090565b600080fd5b600080fd5b600080fd5b600080fd5b6000601f19601f8301169050919050565b7f4e487b7100000000000000000000000000000000000000000000000000000000600052604160045260246000fd5b620001fd82620001b2565b810181811067ffffffffffffffff821117156200021f576200021e620001c3565b5b80604052505050565b60006200023462000194565b9050620002428282620001f2565b919050565b600067ffffffffffffffff821115620002655762000264620001c3565b5b6200027082620001b2565b9050602081019050919050565b60005b838110156200029d57808201518184015260208101905062000280565b83811115620002ad576000848401525b50505050565b6000620002ca620002c48462000247565b62000228565b905082815260208101848484011115620002e957620002e8620001ad565b5b620002f68482856200027d565b509392505050565b600082601f830112620003165762000315620001a8565b5b815162000328848260208601620002b3565b91505092915050565b600080604083850312156200034b576200034a6200019e565b5b600083015167ffffffffffffffff8111156200036c576200036b620001a3565b5b6200037a85828601620002fe565b925050602083015167ffffffffffffffff8111156200039e576200039d620001a3565b5b620003ac85828601620002fe565b9150509250929050565b7f4e487b7100000000000000000000000000000000000000000000000000000000600052602260045260246000fd5b60006002820490506001821680620003fe57607f821691505b60208210811415620004155762000414620003b6565b5b50919050565b61169e806200042b6000396000f3fe608060405234801561001057600080fd5b50600436106100ea5760003560e01c80633eaaf86b1161008c578063a9059cbb11610066578063a9059cbb14610263578063b09f126614610293578063d28d8852146102b1578063dd62ed3e146102cf576100ea565b80633eaaf86b146101f757806370a082311461021557806395d89b4114610245576100ea565b806318160ddd116100c857806318160ddd1461016d57806323b872dd1461018b578063313ce567146101bb57806332424aa3146101d9576100ea565b8063024c2ddd146100ef57806306fdde031461011f578063095ea7b31461013d575b600080fd5b61010960048036038101906101049190610e33565b6102ff565b6040516101169190610e8c565b60405180910390f35b610127610324565b6040516101349190610f40565b60405180910390f35b61015760048036038101906101529190610f8e565b6103b6565b6040516101649190610fe9565b60405180910390f35b610175610492565b6040516101829190610e8c565b60405180910390f35b6101a560048036038101906101a09190611004565b61049c565b6040516101b29190610fe9565b60405180910390f35b6101c361060c565b6040516101d09190611073565b60405180910390f35b6101e1610623565b6040516101ee9190611073565b60405180910390f35b6101ff610636565b60405161020c9190610e8c565b60405180910390f35b61022f600480360381019061022a919061108e565b61063c565b60405161023c9190610e8c565b60405180910390f35b61024d610684565b60405161025a9190610f40565b60405180910390f35b61027d60048036038101906102789190610f8e565b610716565b60405161028a9190610fe9565b60405180910390f35b61029b610792565b6040516102a89190610f40565b60405180910390f35b6102b9610820565b6040516102c69190610f40565b60405180910390f35b6102e960048036038101906102e49190610e33565b6108ae565b6040516102f69190610e8c565b60405180910390f35b6001602052816000526040600020602052806000526040600020600091509150505481565b606060038054610333906110ea565b80601f016020809104026020016040519081016040528092919081815260200182805461035f906110ea565b80156103ac5780601f10610381576101008083540402835291602001916103ac565b820191906000526020600020905b81548152906001019060200180831161038f57829003601f168201915b5050505050905090565b600080600160003373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060008573ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1681526020019081526020016000205490508281101561047b576040517f08c379a00000000000000000000000000000000000000000000000000000000081526004016104729061118e565b60405180910390fd5b61048733858386610935565b600191505092915050565b6000600254905090565b60006104a9848484610bc1565b8273ffffffffffffffffffffffffffffffffffffffff168473ffffffffffffffffffffffffffffffffffffffff163373ffffffffffffffffffffffffffffffffffffffff167fd1398bee19313d6bf672ccb116e51f4a1a947e91c757907f51fbb5b5e56c698f8560405161051d9190610e8c565b60405180910390a46000600160008673ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060003373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff168152602001908152602001600020549050828110156105e9576040517f08c379a00000000000000000000000000000000000000000000000000000000081526004016105e090611220565b60405180910390fd5b61060085338386856105fb919061126f565b610935565b60019150509392505050565b6000600560009054906101000a900460ff16905090565b600560009054906101000a900460ff1681565b60025481565b60008060008373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff168152602001908152602001600020549050919050565b606060048054610693906110ea565b80601f01602080910402602001604051908101604052809291908181526020018280546106bf906110ea565b801561070c5780601f106106e15761010080835404028352916020019161070c565b820191906000526020600020905b8154815290600101906020018083116106ef57829003601f168201915b5050505050905090565b6000610723338484610bc1565b8273ffffffffffffffffffffffffffffffffffffffff163373ffffffffffffffffffffffffffffffffffffffff167fddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef846040516107809190610e8c565b60405180910390a36001905092915050565b6004805461079f906110ea565b80601f01602080910402602001604051908101604052809291908181526020018280546107cb906110ea565b80156108185780601f106107ed57610100808354040283529160200191610818565b820191906000526020600020905b8154815290600101906020018083116107fb57829003601f168201915b505050505081565b6003805461082d906110ea565b80601f0160208091040260200160405190810160405280929190818152602001828054610859906110ea565b80156108a65780601f1061087b576101008083540402835291602001916108a6565b820191906000526020600020905b81548152906001019060200180831161088957829003601f168201915b505050505081565b6000600160008473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060008373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002054905092915050565b600073ffffffffffffffffffffffffffffffffffffffff168473ffffffffffffffffffffffffffffffffffffffff1614156109a5576040517f08c379a000000000000000000000000000000000000000000000000000000000815260040161099c90611315565b60405180910390fd5b600073ffffffffffffffffffffffffffffffffffffffff168373ffffffffffffffffffffffffffffffffffffffff161415610a15576040517f08c379a0000000000000000000000000000000000000000000000000000000008152600401610a0c906113a7565b60405180910390fd5b600160008573ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060008473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff168152602001908152602001600020548214610ad3576040517f08c379a0000000000000000000000000000000000000000000000000000000008152600401610aca90611413565b60405180910390fd5b80600160008673ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060008573ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff168152602001908152602001600020819055508273ffffffffffffffffffffffffffffffffffffffff168473ffffffffffffffffffffffffffffffffffffffff167fb3fd5071835887567a0671151121894ddccc2842f1d10bedad13e0d17cace9a78484604051610bb3929190611433565b60405180910390a350505050565b600073ffffffffffffffffffffffffffffffffffffffff168373ffffffffffffffffffffffffffffffffffffffff161415610c31576040517f08c379a0000000000000000000000000000000000000000000000000000000008152600401610c28906114ce565b60405180910390fd5b600073ffffffffffffffffffffffffffffffffffffffff168273ffffffffffffffffffffffffffffffffffffffff161415610ca1576040517f08c379a0000000000000000000000000000000000000000000000000000000008152600401610c9890611560565b60405180910390fd5b60008060008573ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002054905081811015610d27576040517f08c379a0000000000000000000000000000000000000000000000000000000008152600401610d1e906115f2565b60405180910390fd5b8181610d33919061126f565b6000808673ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002081905550816000808573ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1681526020019081526020016000206000828254610dc39190611612565b9250508190555050505050565b600080fd5b600073ffffffffffffffffffffffffffffffffffffffff82169050919050565b6000610e0082610dd5565b9050919050565b610e1081610df5565b8114610e1b57600080fd5b50565b600081359050610e2d81610e07565b92915050565b60008060408385031215610e4a57610e49610dd0565b5b6000610e5885828601610e1e565b9250506020610e6985828601610e1e565b9150509250929050565b6000819050919050565b610e8681610e73565b82525050565b6000602082019050610ea16000830184610e7d565b92915050565b600081519050919050565b600082825260208201905092915050565b60005b83811015610ee1578082015181840152602081019050610ec6565b83811115610ef0576000848401525b50505050565b6000601f19601f8301169050919050565b6000610f1282610ea7565b610f1c8185610eb2565b9350610f2c818560208601610ec3565b610f3581610ef6565b840191505092915050565b60006020820190508181036000830152610f5a8184610f07565b905092915050565b610f6b81610e73565b8114610f7657600080fd5b50565b600081359050610f8881610f62565b92915050565b60008060408385031215610fa557610fa4610dd0565b5b6000610fb385828601610e1e565b9250506020610fc485828601610f79565b9150509250929050565b60008115159050919050565b610fe381610fce565b82525050565b6000602082019050610ffe6000830184610fda565b92915050565b60008060006060848603121561101d5761101c610dd0565b5b600061102b86828701610e1e565b935050602061103c86828701610e1e565b925050604061104d86828701610f79565b9150509250925092565b600060ff82169050919050565b61106d81611057565b82525050565b60006020820190506110886000830184611064565b92915050565b6000602082840312156110a4576110a3610dd0565b5b60006110b284828501610e1e565b91505092915050565b7f4e487b7100000000000000000000000000000000000000000000000000000000600052602260045260246000fd5b6000600282049050600182168061110257607f821691505b60208210811415611116576111156110bb565b5b50919050565b7f45524332303a205472616e7366657220616d6f756e742065786365656473206160008201527f6c6c6f77616e6365000000000000000000000000000000000000000000000000602082015250565b6000611178602883610eb2565b91506111838261111c565b604082019050919050565b600060208201905081810360008301526111a78161116b565b9050919050565b7f45524332303a207472616e7366657220616d6f756e742065786365656473206160008201527f6c6c6f77616e6365000000000000000000000000000000000000000000000000602082015250565b600061120a602883610eb2565b9150611215826111ae565b604082019050919050565b60006020820190508181036000830152611239816111fd565b9050919050565b7f4e487b7100000000000000000000000000000000000000000000000000000000600052601160045260246000fd5b600061127a82610e73565b915061128583610e73565b92508282101561129857611297611240565b5b828203905092915050565b7f45524332303a20617070726f76652066726f6d20746865207a65726f2061646460008201527f7265737300000000000000000000000000000000000000000000000000000000602082015250565b60006112ff602483610eb2565b915061130a826112a3565b604082019050919050565b6000602082019050818103600083015261132e816112f2565b9050919050565b7f45524332303a20617070726f766520746f20746865207a65726f20616464726560008201527f7373000000000000000000000000000000000000000000000000000000000000602082015250565b6000611391602283610eb2565b915061139c82611335565b604082019050919050565b600060208201905081810360008301526113c081611384565b9050919050565b7f45524332303a20696e76616c69642063757272656e74416d6f756e7400000000600082015250565b60006113fd601c83610eb2565b9150611408826113c7565b602082019050919050565b6000602082019050818103600083015261142c816113f0565b9050919050565b60006040820190506114486000830185610e7d565b6114556020830184610e7d565b9392505050565b7f45524332303a207472616e736665722066726f6d20746865207a65726f20616460008201527f6472657373000000000000000000000000000000000000000000000000000000602082015250565b60006114b8602583610eb2565b91506114c38261145c565b604082019050919050565b600060208201905081810360008301526114e7816114ab565b9050919050565b7f45524332303a207472616e7366657220746f20746865207a65726f206164647260008201527f6573730000000000000000000000000000000000000000000000000000000000602082015250565b600061154a602383610eb2565b9150611555826114ee565b604082019050919050565b600060208201905081810360008301526115798161153d565b9050919050565b7f45524332303a207472616e7366657220616d6f756e742065786365656473206260008201527f616c616e63650000000000000000000000000000000000000000000000000000602082015250565b60006115dc602683610eb2565b91506115e782611580565b604082019050919050565b6000602082019050818103600083015261160b816115cf565b9050919050565b600061161d82610e73565b915061162883610e73565b9250827fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff0382111561165d5761165c611240565b5b82820190509291505056fea26469706673582212207c00ea7c88a02fca691db07f6b20e69710816d12fba950587cea4bdea712072264736f6c634300080a0033"
    Contract.setProvider('http://127.0.0.1:8545');
    const contract = new Contract(abi);
    const receipt = await contract.deploy({data:"0x"+ byteCode, arguments:["ErcSimpleToken", "EST"]}).send({from: "0x653D43e92b3EcB421B5F6633e45319A51046de19", gas: 2000000, gasPrice: '1000000000000'});
    console.log(receipt);
    return receipt;
  }
  catch(e){
    console.log(e);
    return e;
  }
}

async function transfer(){
  try{
    const abi = [
      {
        "inputs": [
          {
            "internalType": "string",
            "name": "getName",
            "type": "string"
          },
          {
            "internalType": "string",
            "name": "getSymbol",
            "type": "string"
          }
        ],
        "stateMutability": "nonpayable",
        "type": "constructor"
      },
      {
        "anonymous": false,
        "inputs": [
          {
            "indexed": true,
            "internalType": "address",
            "name": "owner",
            "type": "address"
          },
          {
            "indexed": true,
            "internalType": "address",
            "name": "spender",
            "type": "address"
          },
          {
            "indexed": false,
            "internalType": "uint256",
            "name": "oldAmount",
            "type": "uint256"
          },
          {
            "indexed": false,
            "internalType": "uint256",
            "name": "amount",
            "type": "uint256"
          }
        ],
        "name": "Approval",
        "type": "event"
      },
      {
        "anonymous": false,
        "inputs": [
          {
            "indexed": true,
            "internalType": "address",
            "name": "from",
            "type": "address"
          },
          {
            "indexed": true,
            "internalType": "address",
            "name": "to",
            "type": "address"
          },
          {
            "indexed": false,
            "internalType": "uint256",
            "name": "amount",
            "type": "uint256"
          }
        ],
        "name": "Transfer",
        "type": "event"
      },
      {
        "anonymous": false,
        "inputs": [
          {
            "indexed": true,
            "internalType": "address",
            "name": "spender",
            "type": "address"
          },
          {
            "indexed": true,
            "internalType": "address",
            "name": "from",
            "type": "address"
          },
          {
            "indexed": true,
            "internalType": "address",
            "name": "to",
            "type": "address"
          },
          {
            "indexed": false,
            "internalType": "uint256",
            "name": "amount",
            "type": "uint256"
          }
        ],
        "name": "Transfer",
        "type": "event"
      },
      {
        "inputs": [
          {
            "internalType": "address",
            "name": "",
            "type": "address"
          },
          {
            "internalType": "address",
            "name": "",
            "type": "address"
          }
        ],
        "name": "_allowances",
        "outputs": [
          {
            "internalType": "uint256",
            "name": "",
            "type": "uint256"
          }
        ],
        "stateMutability": "view",
        "type": "function"
      },
      {
        "inputs": [],
        "name": "_decimals",
        "outputs": [
          {
            "internalType": "uint8",
            "name": "",
            "type": "uint8"
          }
        ],
        "stateMutability": "view",
        "type": "function"
      },
      {
        "inputs": [],
        "name": "_name",
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
        "name": "_symbol",
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
        "name": "_totalSupply",
        "outputs": [
          {
            "internalType": "uint256",
            "name": "",
            "type": "uint256"
          }
        ],
        "stateMutability": "view",
        "type": "function"
      },
      {
        "inputs": [
          {
            "internalType": "address",
            "name": "owner",
            "type": "address"
          },
          {
            "internalType": "address",
            "name": "spender",
            "type": "address"
          }
        ],
        "name": "allowance",
        "outputs": [
          {
            "internalType": "uint256",
            "name": "",
            "type": "uint256"
          }
        ],
        "stateMutability": "view",
        "type": "function"
      },
      {
        "inputs": [
          {
            "internalType": "address",
            "name": "spender",
            "type": "address"
          },
          {
            "internalType": "uint256",
            "name": "amount",
            "type": "uint256"
          }
        ],
        "name": "approve",
        "outputs": [
          {
            "internalType": "bool",
            "name": "",
            "type": "bool"
          }
        ],
        "stateMutability": "nonpayable",
        "type": "function"
      },
      {
        "inputs": [
          {
            "internalType": "address",
            "name": "account",
            "type": "address"
          }
        ],
        "name": "balanceOf",
        "outputs": [
          {
            "internalType": "uint256",
            "name": "",
            "type": "uint256"
          }
        ],
        "stateMutability": "view",
        "type": "function"
      },
      {
        "inputs": [],
        "name": "decimals",
        "outputs": [
          {
            "internalType": "uint8",
            "name": "",
            "type": "uint8"
          }
        ],
        "stateMutability": "view",
        "type": "function"
      },
      {
        "inputs": [],
        "name": "name",
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
        "name": "symbol",
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
        "name": "totalSupply",
        "outputs": [
          {
            "internalType": "uint256",
            "name": "",
            "type": "uint256"
          }
        ],
        "stateMutability": "view",
        "type": "function"
      },
      {
        "inputs": [
          {
            "internalType": "address",
            "name": "recipient",
            "type": "address"
          },
          {
            "internalType": "uint256",
            "name": "amount",
            "type": "uint256"
          }
        ],
        "name": "transfer",
        "outputs": [
          {
            "internalType": "bool",
            "name": "",
            "type": "bool"
          }
        ],
        "stateMutability": "nonpayable",
        "type": "function"
      },
      {
        "inputs": [
          {
            "internalType": "address",
            "name": "sender",
            "type": "address"
          },
          {
            "internalType": "address",
            "name": "recipient",
            "type": "address"
          },
          {
            "internalType": "uint256",
            "name": "amount",
            "type": "uint256"
          }
        ],
        "name": "transferFrom",
        "outputs": [
          {
            "internalType": "bool",
            "name": "",
            "type": "bool"
          }
        ],
        "stateMutability": "nonpayable",
        "type": "function"
      }
    ];
    const address = '0x6325cd5f0f59235DC871beeFD5f2d3CbC3d5D44d'
    Contract.setProvider('http://127.0.0.1:8545');
    const contract = new Contract(abi, address);
    const result = await contract.methods.transfer('0x5494E4565dEe1344566652B7797E684bB977498B', 2).send({from:'0x653D43e92b3EcB421B5F6633e45319A51046de19'});
    console.log(result);
  }
  catch(e){
    console.log(e);
    return e;
  }
}

app.get('/transfer',(req, res) => {
  transfer()
    .then((result) => {
      res.send(result);
    })
})

app.get('/deploy', (req, res) => {
  deploy().then((result) => {
    res.send(result);
  })
})

app.get('/hellowolrd',(req, res) => {
  helloWorld()
    .then((result) => {
      res.send(result);
    })
})

app.get('/getblock', (req, res) => {
  getBlock()
    .then((block) => {
      res.send(block);
    })
})

app.get('/gasprice', (req, res) => {
  getGasPrice().then((gasPrice) => {
    res.send(gasPrice);
  })
})

app.get('/', (req, res) => {
  getAccounts().then((accounts) => {
    res.send(accounts);
  })
})

app.listen(port, () => {
  console.log('Listening...');
})
