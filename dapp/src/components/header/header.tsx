// lib
import React from "react"
import { Row, Col, Button } from 'antd'
import { useWeb3React } from "@web3-react/core"
// helper
import { injected } from "../../helpers/wallet/connectors"

import './header.scss'

declare global {
    interface Window {
        ethereum: any
    }
}

const Landing: React.FC = () => {
    const { activate: activateNetwork } = useWeb3React()

    const connectWalletButton = () => {
        return (
        <Button onClick={() => connect()}>
            Connect Wallet
        </Button>
        )
    }

    async function connect() {
        try {
            const { ethereum } = window

            if (!ethereum) {
                alert('Please install Metamask')
            }
            console.log('header connect')
            await activateNetwork(injected)
        } catch (ex) {
          console.log(ex)
        }
    }

    return (
        <Row 
            className='main-app' 
            justify="space-between"
            align="middle">
            <Col className="title-header">
                Simple Compound
            </Col>
            <Col>
                <div>
                    {connectWalletButton()}
                </div>
            </Col>
        </Row>
    )
}

export default Landing