import { useWeb3React } from "@web3-react/core"
import { Select } from "antd"
import React, { useContext, useEffect, useState } from "react"

// component
import { Panel, StatGroup, SuccessModal } from "../../components"
import ErrorModal from "../../components/modal/errorModal"
import { ContractContext, DecimalContext } from "../../helpers/context"
import { Web3Utils } from '../../helpers/web3Service';

const Withdraw: React.FC = () => {
    // data
    const { account } = useWeb3React()
    const contract = useContext(ContractContext)
    const decimal = useContext(DecimalContext)

    const [withdraw, setWithDraw] = useState<number>(0)
    const [withdrawReceiving, setWithdrawReceiving] = useState<number>(0)
    const [maximumToken, setMaximumToken] = useState<number>(0)

    const [successVisible, setSuccessVisible] = useState<boolean>(false)
    const [ErrorVisible, setErrorVisible] = useState<boolean>(false)

    const tokenWithdrawOption = (
        <Select defaultValue="etherium">
            <Select.Option value="etherium">cETH</Select.Option>
        </Select>
    )

    const getBalanceOfAccount = async () => {
        const currentContract = contract?.state
        const currentDecimal = decimal?.state || 8

        if (currentContract && account) {
            const balanceOfAccount = await Web3Utils.getBalanceOfAccount(currentContract, account, currentDecimal)
            setMaximumToken(balanceOfAccount)
        }
    }

    const getReceivingToken = async () => {
        const currentContract = contract?.state
        const currentDecimal = decimal?.state || 8

        if (currentContract) {
            const exchangeRateCurrent = await Web3Utils.getExchangeRate(currentContract, currentDecimal)

            const receivingToken = withdraw * exchangeRateCurrent
            setWithdrawReceiving(parseFloat(receivingToken.toFixed(5)))
        }
    }

    const onWithDraw = async () => {
        const currentContract = contract?.state
        const currentDecimal = decimal?.state || 8

        try {
            if (!currentContract) throw Error("Contract Not Found")
            if (!account) throw Error("Account Not Fount")
            await Web3Utils.redeemToken(currentContract, currentDecimal, account, withdraw)
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
            console.log('error', error)
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
        getBalanceOfAccount()
        getReceivingToken()
    }, [contract?.state, account])
    
    useEffect(() => {
        getReceivingToken()
    }, [withdraw])
    /* eslint-enable */

    return (
        <div className="container">
            <StatGroup />
            <div className="panel-section">
                <Panel 
                    mode="withdraw" 
                    tokenOption={tokenWithdrawOption}
                    value={withdraw} 
                    setValue={setWithDraw} 
                    receiving={withdrawReceiving} 
                    maximumToken={maximumToken}
                    onClickButton={onWithDraw}
                />
            </div>
        </div>
    )
}

export default Withdraw