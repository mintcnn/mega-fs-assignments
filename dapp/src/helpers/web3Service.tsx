import Web3 from 'web3';
import { Contract } from 'web3-eth-contract';
import { ethDecimal } from '../constants';

export const Web3Utils = (function () {

    const getTotalSupply = async (contract: Contract, decimal: number) => {
        var totalSupply = await contract.methods.totalSupply().call()
        totalSupply = totalSupply / Math.pow(10, decimal);
        return parseFloat(totalSupply.toFixed(5))
    }

    const getBalanceOfAccount = async (contract: Contract, account: string, decimal: number) => {
        var balanceOf = await contract.methods.balanceOf(account).call()
        balanceOf = balanceOf / Math.pow(10, decimal);
        return parseFloat(balanceOf.toFixed(5))
    }

    const getBalanceOfWallet = async (web3: Web3, account: string) => {
        const ethBalance = await web3.eth.getBalance(account) 
        const balanceOfWallet = parseFloat(ethBalance) / Math.pow(10, ethDecimal)
        return parseFloat(balanceOfWallet.toFixed(5))
    }

    const getBalanceOfUnderlying = async (web3: Web3, contract: Contract, account: string) => {
        const balanceOfUnderlying = await contract.methods.balanceOfUnderlying(account).call() / Math.pow(10, 18); 
        return parseFloat(balanceOfUnderlying.toFixed(5))
    }

    const getSupplyRatePerBlock = async (contract: Contract, decimal: number) => {
        var supplyRatePerBlock = await contract.methods.supplyRatePerBlock().call()
        return supplyRatePerBlock
    }

    const getBlockPerSec = async (web3: Web3) => {
        const currentBlock = await web3.eth.getBlock("latest")
        const prevBlock = await web3.eth.getBlock(currentBlock.parentHash)
        if (currentBlock && prevBlock) {
            const currentBlockTime: number = parseFloat(currentBlock.timestamp.toString())
            const prevBlockTime: number = parseFloat(prevBlock.timestamp.toString())
            
            // 1 block take time x sec -> x [sec/block] -> 1/x [block/sec]
            var timeTaken = currentBlockTime - prevBlockTime
            return 1 / timeTaken
        }
        return 0
    }

    const getApy = async (web3: Web3, contract: Contract, decimal: number) => {
        const supplyRatePerBlock = await Web3Utils.getSupplyRatePerBlock(contract, decimal)
        const totalSupplyAmount = await Web3Utils.getTotalSupply(contract, decimal)

        const blockPerSec = await Web3Utils.getBlockPerSec(web3)
        const SecPerYear = 60*60*24*365
        const blockPerYear = blockPerSec * SecPerYear

        const supplyApy = (supplyRatePerBlock * blockPerYear) / (totalSupplyAmount * Math.pow(10, decimal))
        return supplyApy
    }

    const getExchangeRate = async (contract: Contract, decimal: number) => {
        const ethDecimals = 18
        let exchangeRateCurrent = await contract.methods.exchangeRateCurrent().call();
        exchangeRateCurrent = exchangeRateCurrent / Math.pow(10, 18 + ethDecimals - decimal);

        return exchangeRateCurrent
    }

    // write contract

    const mintToken = async (web3: Web3, contract: Contract, account: string, supplyValue: number) => {
        const value = web3.utils.toHex(web3.utils.toWei(supplyValue.toString(), 'ether'))
        const mintEth = await contract.methods.mint().send({
            from: account,
            value: value
        })
        return mintEth
    }

    const redeemToken = async (contract: Contract, decimal: number, account: string, value: number) => {
        const redeemValue = value * Math.pow(10, decimal)
        const redeem = await contract.methods.redeem(redeemValue).send({
            from: account,
        })
        return redeem
    }

    return {
        getTotalSupply,
        getBalanceOfAccount,
        getBalanceOfWallet,
        getBalanceOfUnderlying,
        getSupplyRatePerBlock,
        getBlockPerSec,
        getApy,
        getExchangeRate,

        mintToken,
        redeemToken,
    }
})()