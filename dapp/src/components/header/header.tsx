// lib
import React, { useEffect, useState } from "react"
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
    const { account, active: networkActive, error: networkError, activate: activateNetwork, library } = useWeb3React()

    // web3modal
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

    const connectWalletButton = () => {
        return (
        <Button onClick={() => connect()}>
            Connect Wallet
        </Button>
        )
    }

    async function connect() {
        try {
            console.log('connect')
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