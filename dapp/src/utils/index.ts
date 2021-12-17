import Web3 from 'web3';
import { Contract } from 'web3-eth-contract';

export const Web3Utils = {

    getTotalSupply: async (contract: Contract) => {
        return await contract.methods.totalSupply().call()
    },

    getBalanceOfAccount: async (contract: Contract, account: string, decimal: number) => {
        var balanceOf = await contract.methods.balanceOf(account).call()
        balanceOf = balanceOf / Math.pow(10, decimal);
        return balanceOf
    },

    getSupplyRatePerBlock: async (contract: Contract, decimal: number) => {
        var supplyRatePerBlock = await contract.methods.supplyRatePerBlock().call()
        // supplyRatePerBlock = supplyRatePerBlock / Math.pow(10, decimal);
        return supplyRatePerBlock
    },

    getBlockPerSec: async (web3: Web3) => {
        const currentBlock = await web3.eth.getBlock("latest")
        const prevBlock = await web3.eth.getBlock(currentBlock.parentHash)
        if (currentBlock && prevBlock) {
            const currentBlockTime: number = parseFloat(currentBlock.timestamp.toString())
            const prevBlockTime: number = parseFloat(prevBlock.timestamp.toString())
            
            // 1 block take time x sec -> x [sec/block] -> 1/x [block/sec]
            var timeTaken = currentBlockTime - prevBlockTime
            console.log(timeTaken)
            return 1 / timeTaken
        }
        return 0
    },

    getApy: async (web3: Web3, contract: Contract, decimal: number) => {
        const supplyRatePerBlock = await Web3Utils.getSupplyRatePerBlock(contract, decimal)
        const totalSupplyAmount = await Web3Utils.getTotalSupply(contract)

        const blockPerSec = await Web3Utils.getBlockPerSec(web3)
        console.log('blockPerSec', blockPerSec)
        const SecPerYear = 60*60*24*365
        const blockPerYear = blockPerSec * SecPerYear

        const supplyApy = (supplyRatePerBlock * blockPerYear) / totalSupplyAmount
        return supplyApy
    }

}