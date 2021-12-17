import React, { useContext, useEffect, useState } from 'react'
import { Row, Col, Card } from 'antd'
import { Stat } from '..'
import { useWeb3React } from '@web3-react/core'
import { ContractContext, DecimalContext } from '../../helpers/context';
import Web3 from 'web3';
import { Web3ReactContextInterface } from '@web3-react/core/dist/types';
import { Web3Utils } from '../../utils';

interface IStatGroup {
    // supplied: number | undefined
    // totalSupplied: number | undefined
    // apy: string | undefined
    // loading: boolean
}

const StatGroup: React.FC<IStatGroup> = ({ 
    // supplied, totalSupplied, apy, loading 
}) => {
    const web3 = new Web3(Web3.givenProvider)

    const { account, library, connector } = useWeb3React<Web3ReactContextInterface>()
    const contract = useContext(ContractContext)
    const decimal = useContext(DecimalContext)

    // stat
    const [suppliedStat, setSuppliedStat] = useState<number | undefined>(undefined)
    const [totalSupplied, setTotalSuppliedStat] = useState<number | undefined>(undefined)
    const [apyStat, setApyStat] = useState<number | undefined>(undefined)

    const [loading, setLoading] = useState<boolean>(false)

    const fetchState = async () => {
        const currentContract = contract?.state
        const currentDecimal = decimal?.state || 8
        const currentAccount = await web3.eth.getAccounts()

        console.log('fetch state', currentContract, account, connector, library)
        if (currentContract && account) {
            const totalSupply = await Web3Utils.getTotalSupply(currentContract)
            setTotalSuppliedStat(totalSupply)

            const balanceOf = await Web3Utils.getBalanceOfAccount(currentContract, account, currentDecimal)
            setSuppliedStat(balanceOf)

            const apy = await Web3Utils.getApy(web3, currentContract, currentDecimal)
            setApyStat(apy)
            console.log('apy', apy)
        }

        // fetch total supplied
        // const totalSupply = await contract?.state?.methods.totalSupply().call()
        // console.log('total',totalSupply)
        // setTotalSuppliedStat(totalSupply)
        // console.log('library', library)
        // const totalSupply = await library?.totalSupply().call()
        // console.log('total',totalSupply)
        // setTotalSuppliedStat(totalSupply)


        // fetch balance of owner supplied
        // if (currentAccount) {
        //     const balanceOf = await contract?.state?.methods.balanceOf(currentAccount[0]).call()
        //     const accountSupply = balanceOf / Math.pow(10, currentDecimal);
        //     console.log('balanceOf', balanceOf)
        //     setSuppliedStat(accountSupply)
        // }
            // fetch APY
    }

    useEffect(() => {
        fetchState()
    }, [contract, account])

    

    const renderStat = () => {
        const statList = [
            { title: "Your Supplied", value: suppliedStat },
            { title: "Total Supplied", value: totalSupplied },
            { title: "APY", value: apyStat },
        ]
        console.log(statList)
        const statColumn = statList.map((statItem) => (
            <Col span={8}>
                <Stat key={statItem.title} title={statItem.title} value={statItem.value} loading={loading} />
            </Col>
        ))
        return statColumn
    }
    return (
        <Row gutter={40}>
            {renderStat()}
        </Row>
    )
}

export default StatGroup