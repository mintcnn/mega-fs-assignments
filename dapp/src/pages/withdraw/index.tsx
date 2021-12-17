import React, { useState } from "react"

// component
import { Panel, StatGroup } from "../../components"

const Withdraw: React.FC = () => {
    // stat
    // const [suppliedStat, setSuppliedStat] = useState<number | undefined>(undefined)
    // const [totalSuppliedStat, setTotalSuppliedStat] = useState<number | undefined>(undefined)
    // const [apyStat, setApyStat] = useState<string | undefined>(undefined)
    // data
    const [withdraw, setWithDraw] = useState<number>()
    const [withdrawReceiving, setWithdrawReceiving] = useState<number>()
    const [currentToken, setCurrentToken] = useState<number>()


    const [loading, setLoading] = useState<boolean>(false)

    const onWithDraw = async () => {

    }

    return (
        <div className="container">
            <div className="panel-section">
                <Panel 
                    mode="withdraw" 
                    value={withdraw} 
                    setValue={setWithDraw} 
                    receiving={withdrawReceiving} 
                    maximumToken={currentToken}
                    onClickButton={onWithDraw}
                />
            </div>
        </div>
    )
}

export default Withdraw