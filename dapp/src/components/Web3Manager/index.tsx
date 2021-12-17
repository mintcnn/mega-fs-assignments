import { useWeb3React } from "@web3-react/core";
import { useContext, useEffect } from "react";
import { abiJson, contractAddress } from "../../constants";
import Web3 from "web3";

// helper
import { injected } from "../../helpers/wallet/connectors"
import { ContractReducer, DecimalReducer } from "../../helpers/reducer";
import { ContractContext, DecimalContext } from "../../helpers/context";

interface IWeb3Manager {
    children: JSX.Element
}

const Web3Manager: React.FC<IWeb3Manager> = ({ children }) => {
    let web3 = new Web3(Web3.givenProvider)

    // const web3 = new Web3(Web3.givenProvider)
    const { account, library, active, activate, error, connector } = useWeb3React()
    const contract = useContext(ContractContext)
    const decimal = useContext(DecimalContext)

    console.log('account', account, library, connector)

    const getInitState = async () => {
        // set contract
        const web3Contract = new web3.eth.Contract(abiJson, contractAddress);
        contract?.dispatch({
            type: 'SET',
            payload: web3Contract
        })
        // set decimal
        let decimalContract = await web3Contract.methods.decimals().call();
        decimal?.dispatch({
            type: 'SET',
            payload: decimalContract
        })
    }
    
    const connectWalletHandler = async () => {
        const { ethereum } = window

        if (!ethereum) {
            alert('Please install Metamask')
        }

        try {
            const accounts = await ethereum.request({ method: "eth_requestAccounts"})
            console.log('found an account, address: ', accounts[0])
        } catch (error) {
            console.log(error);
        }
    }

    async function connect() {
        try {
            // let web3 = new Web3(Web3.givenProvider)

            console.log('connect')
            await activate(injected)
            let { provider } = await injected.activate();
            // signer
            web3 = new Web3(provider); 
        } catch (ex) {
          console.log(ex)
        }
    }

    // useEagerConnect() ?
    useEffect(() => {
        if (!active && !error) {
            console.log('activate')
            // connectWalletHandler()
            connect()
            // activate(injected)
        }
      }, [active, error, activate])

    useEffect(() => {
        getInitState()
    }, [])

    if (!account) {
        return (
            <div className="no-account-container">
                <h2>No account found</h2>
                <div>Please connect your wallet</div>
            </div>
        )
    }

    return children
}

export default Web3Manager