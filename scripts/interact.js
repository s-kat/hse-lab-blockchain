const { ethers } = require("hardhat");

async function main() {
    console.log('Getting the erc token contract...');
    const contractAddress = '0x5FbDB2315678afecb367f032d93F642f64180aa3';
    const ERCToken = await ethers.getContractAt('ERCToken', contractAddress);

    console.log('Querying token name...');
    const name = await ERCToken.name();
    console.log(`Token Name: ${name}\n`);

    console.log('Querying token symbol...');
    const symbol = await ERCToken.symbol();
    console.log(`Token Symbol: ${symbol}\n`);

    // decimals()
    console.log('Querying decimals...');
    const decimals = await ERCToken.decimals();
    console.log(`Token Decimals: ${decimals}\n`);

    // totalSupply()
    console.log('Querying token supply...');
    const totalSupply = await ERCToken.totalSupply();
    console.log(`Total Supply including all decimals: ${totalSupply}`);
    console.log(`Total supply including all decimals comma separated: ${ethers.utils.commify(totalSupply)}`);
    console.log(`Total Supply in FUN: ${ethers.utils.formatUnits(totalSupply, decimals)}\n`);

    // balanceOf(address account)
    console.log('Getting the balance of contract owner...');
    const signers = await ethers.getSigners();
    const ownerAddress = signers[0].address;
    let ownerBalance = await ERCToken.balanceOf(ownerAddress);
    console.log(`Contract owner at ${ownerAddress} has a ${symbol} balance of ${ethers.utils.formatUnits(ownerBalance, decimals)}\n`);


    // transfer(to, amount)
    console.log('Initiating a transfer...');
    const recipientAddress = signers[1].address;
    const transferAmount = 100000;
    console.log(`Transferring ${transferAmount} ${symbol} tokens to ${recipientAddress} from ${ownerAddress}`);
    await ERCToken.transfer(recipientAddress, ethers.utils.parseUnits(transferAmount.toString(), decimals));
    console.log('Transfer completed');
    ownerBalance = await ERCToken.balanceOf(ownerAddress);
    console.log(`Balance of owner (${ownerAddress}): ${ethers.utils.formatUnits(ownerBalance, decimals)} ${symbol}`);
    let recipientBalance = await ERCToken.balanceOf(recipientAddress);
    console.log(`Balance of recipient (${recipientAddress}): ${ethers.utils.formatUnits(recipientBalance, decimals)} ${symbol}\n`);

   
}

main()
    .then(() => process.exit(0))
    .catch((error) => {
        console.error(error);
        process.exitCode = 1;
    });