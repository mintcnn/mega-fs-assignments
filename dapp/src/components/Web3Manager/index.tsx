import { useWeb3React } from "@web3-react/core";
import { useContext, useEffect } from "react";
import { abiJson, contractAddress } from "../../constants";

// helper
import { injected } from "../../helpers/wallet/connectors"
import { ContractContext, DecimalContext } from "../../helpers/context";

interface IWeb3Manager {
    children: JSX.Element
}

const Web3Manager: React.FC<IWeb3Manager> = ({ children }) => {
    const { account, library, active, activate, error } = useWeb3React()
    const contract = useContext(ContractContext)
    const decimal = useContext(DecimalContext)

    const getInitState = async () => {
        // set contract
        const web3Contract = new library.eth.Contract(abiJson, contractAddress);
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

    async function connect() {
        try {
            console.log('connect to metamask...')
            await activate(injected)
            await injected.activate();
        } catch (error) {
          console.log(error)
        }
    }

    /* eslint-disable */
    useEffect(() => {
        if (!active && !error) {
            connect()
        }
      }, [active, error, activate])

    useEffect(() => {
        if (library && !contract?.state) {
            getInitState()
        }
    }, [library])
    /* eslint-enable */

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