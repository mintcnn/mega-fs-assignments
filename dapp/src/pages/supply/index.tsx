import { useWeb3React } from "@web3-react/core"
import React, { useState, useEffect, useContext } from "react"
import { Select } from "antd";
// component
import { StatGroup, Panel, SuccessModal } from "../../components"
import ErrorModal from "../../components/modal/errorModal";
// helper
import { ContractContext, DecimalContext } from "../../helpers/context";
import { Web3Utils } from '../../helpers/web3Service';

const Supply: React.FC = () => {
    const { account, library } = useWeb3React()
    const decimal = useContext(DecimalContext)
    const contract = useContext(ContractContext)

    // data
    const [supply, setSupply] = useState<number>(0)
    const [supplyReceiving, setSupplyReceiving] = useState<number>(0)
    const [maximumToken, setMaximumToken] = useState<number>(0)

    const [successVisible, setSuccessVisible] = useState<boolean>(false)
    const [ErrorVisible, setErrorVisible] = useState<boolean>(false)

    const tokenSupplyOption = (
        <Select defaultValue="etherium">
            <Select.Option value="etherium">ETH</Select.Option>
        </Select>
    )

    const getBalance = async () => {
        if (library && account) {
            const balanceOfWallet = await Web3Utils.getBalanceOfWallet(library, account)
            setMaximumToken(balanceOfWallet)
        }
    }

    const getReceivingToken = async () => {
        const currentContract = contract?.state
        const currentDecimal = decimal?.state || 8

        if (currentContract) {
            const exchangeRateCurrent = await Web3Utils.getExchangeRate(currentContract, currentDecimal)

            // eth / exchange rate = ceth
            const receivingToken = supply / exchangeRateCurrent
            setSupplyReceiving(parseFloat(receivingToken.toFixed(5)))
        }
    }

    const supplyEth = async () => {
        const currentContract = contract?.state
        try {
            if (!currentContract) throw Error("Contract Not Found")
            if (!account) throw Error("Account Not Fount")
            await Web3Utils.mintToken(library, currentContract, account, supply)
            SuccessModal({ 
                title: 'Supply token success', 
                visible: successVisible, 
                setVisible: setSuccessVisible,
                onOk: () => {
                    setSuccessVisible(false)
                    window.location.reload()
                } 
            })
        } catch (error) {
            ErrorModal({
                title: 'Supply token error',
                visible: ErrorVisible,
                setVisible: setErrorVisible,
                onOk: () => {
                    setSuccessVisible(false)
                } 
            })
        } 
    }

    /* eslint-disable */
    useEffect(() => {
        getReceivingToken()
        getBalance()
    }, [contract?.state, account])

    useEffect(() => {
        getReceivingToken()
    }, [supply])
    /* eslint-enable */

    return (
        <div className="container">
            <StatGroup />
            <div className="panel-section">
                <Panel 
                    mode="supply" 
                    tokenOption={tokenSupplyOption}
                    value={supply} 
                    setValue={setSupply} 
                    receiving={supplyReceiving} 
                    maximumToken={maximumToken}
                    onClickButton={supplyEth}
                />
            </div>
        </div>
    )
}

export default Supply