import React, { useContext, useEffect, useState } from 'react'
import { Row, Col } from 'antd'
import { Stat } from '..'
import { useWeb3React } from '@web3-react/core'
import { ContractContext, DecimalContext } from '../../helpers/context';
import { Web3Utils } from '../../helpers/web3Service';


const StatGroup: React.FC = () => {
    const { account, library } = useWeb3React()
    const contract = useContext(ContractContext)
    const decimal = useContext(DecimalContext)

    // stat
    const [suppliedStat, setSuppliedStat] = useState<number | undefined>(undefined)
    const [totalSupplied, setTotalSuppliedStat] = useState<number | undefined>(undefined)
    const [apyStat, setApyStat] = useState<number | undefined>(undefined)

    const fetchState = async () => {
        const currentContract = contract?.state
        const currentDecimal = decimal?.state || 8

        if (currentContract && account && library) {
            const totalSupply = await Web3Utils.getTotalSupply(currentContract, currentDecimal)
            setTotalSuppliedStat(totalSupply)

            const balanceOf = await Web3Utils.getBalanceOfAccount(currentContract, account, currentDecimal)
            setSuppliedStat(balanceOf)

            const apy = await Web3Utils.getApy(library, currentContract, currentDecimal)
            setApyStat(apy)
        }
    }

    /* eslint-disable */
    useEffect(() => {
        fetchState()
    }, [contract?.state, account])
    /* eslint-enable */

    const renderStat = () => {
        const statList = [
            { title: "Your Supplied", suffix: '', value: suppliedStat },
            { title: "Total Supplied", suffix: '', value: totalSupplied },
            { title: "APY", suffix: '%', value: apyStat?.toFixed(2) },
        ]
        const statColumn = statList.map((statItem, index) => (
            <Col span={8} key={`${index}-${statItem.title}`}>
                <Stat 
                    title={statItem.title} 
                    value={statItem.value} 
                    loading={typeof statItem.value != 'undefined' ? false: true}
                    suffix={statItem.suffix}
                />
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