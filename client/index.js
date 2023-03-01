const Web3 = require("web3")

const web3 = new Web3(new Web3.providers.HttpProvider("https://goerli.infura.io/v3/8f9d3efdb7aa428d9956062a37a97aaa"))

web3.eth.getBalance("0xfb823B20ef37F11b1b005A01B0e0412700060A8c", function(err, result) {
  if (err) {
    console.log(err)
  } else {
    console.log(web3.utils.fromWei(result, "ether") + " GOERLI")
  }
})