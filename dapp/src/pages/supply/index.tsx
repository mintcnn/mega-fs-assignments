import { useWeb3React } from "@web3-react/core"
import React, { useState, useEffect, useContext } from "react"
import { Contract, ContractOptions } from 'web3-eth-contract';

import Web3 from "web3"

// component
import { StatGroup, Panel } from "../../components"
// constant
import { abiJson, contractAddress } from "../../constants"
import { ContractContext, DecimalContext } from "../../helpers/context";
// helper
import { etherToWei } from "../../utils/convertor";

const Supply: React.FC = () => {
    const ethDecimals = 18;

    const web3 = new Web3(Web3.givenProvider)
    const { account, library } = useWeb3React()
    const [contacts, setContacts] = useState<Contract>();
    const decimal = useContext(DecimalContext)
    const contract = useContext(ContractContext)

    // data
    const [supply, setSupply] = useState<number>(0)
    const [supplyReceiving, setSupplyReceiving] = useState<number>(0)
    const [currentToken, setCurrentToken] = useState<number>(0)

    const [loading, setLoading] = useState<boolean>(false)

    const getBalance = async () => {
        // const currentAccount = await web3.eth.getAccounts()
        // if (currentAccount) {
        //     let ethBalance = await web3.eth.getBalance(currentAccount[0]) 
        //     setCurrentToken(parseInt(ethBalance) / Math.pow(10, ethDecimals))
        //     console.log(ethBalance)
        // }
        if (account) {
            let ethBalance = await web3.eth.getBalance(account) 
            setCurrentToken(parseInt(ethBalance) / Math.pow(10, ethDecimals))
            console.log(ethBalance)
        }
    }

    const getReceivingToken = async () => {
        if (contract) {
            var currentDecimal = decimal?.state || 8
            let exchangeRateCurrent = await contract.state?.methods.exchangeRateCurrent().call();
            exchangeRateCurrent = exchangeRateCurrent / Math.pow(10, 18 + ethDecimals - currentDecimal);
    
            const receivingToken = (etherToWei(web3, supply) / exchangeRateCurrent)/1e18
            setSupplyReceiving(parseFloat(receivingToken.toFixed(5)))
        }
    }

    const supplyEth = async () => {
        const currentAccount = await web3.eth.getAccounts()

        const value = web3.utils.toHex(web3.utils.toWei(supply.toString(), 'ether'))
        console.log('value', value)
        const mintEth = await contract?.state?.methods.mint().send({
            from: currentAccount[0],
            value: value
        })
        console.log(mintEth)
    }

    useEffect(() => {
        getReceivingToken()
        getBalance()
    }, [])

    useEffect(() => {
        getReceivingToken()
    }, [supply])

    return (
        <div className="container">
            <div className="panel-section">
                <Panel 
                    mode="supply" 
                    value={supply} 
                    setValue={setSupply} 
                    receiving={supplyReceiving} 
                    maximumToken={currentToken}
                    onClickButton={supplyEth}
                />
            </div>
        </div>
    )
}

export default Supply