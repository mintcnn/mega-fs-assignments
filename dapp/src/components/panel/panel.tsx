// lib
import { Button, Card, Col, InputNumber, Row } from "antd"
import React from "react"
import './panel.scss'

interface IPanel {
    mode: "supply" | "withdraw"
    tokenOption: JSX.Element
    value: number | undefined
    receiving: number | undefined
    setValue: (value: number) => void
    maximumToken: number | undefined
    onClickButton: () => Promise<void>
}
const Panel: React.FC<IPanel> = ({ mode, tokenOption, value, receiving, setValue, maximumToken, onClickButton }) => {

    const renderReceving = () => {
        if (mode === 'supply') {
            return (
                <Row justify="space-between" className="receiving-section">
                    <Col>Receiving</Col>
                    <Col>{receiving || "0"} cETH</Col>
                </Row>
            )
        } else if (mode === 'withdraw') {
            return (
                <Row justify="space-between" className="receiving-section">
                    <Col>Receiving</Col>
                    <Col>{receiving || "0"} ETH</Col>
                </Row>
            )
        }
        return null
    }

    const renderBalance = () => {
        if (mode === 'supply') {
            return (
                <Row className="balance-section" justify="end">
                    Balance: {maximumToken} ETH
                </Row>
            )
        } else if (mode === 'withdraw') {
            return (
                <Row className="balance-section" justify="end">
                    Balance: {maximumToken} cETH
                </Row>
            )
        }
        return null
    }

    return (
        <Card
            title={mode} 
            className="panel-container"
        >
            {renderBalance()}
            <Row gutter={16} justify="center" align="middle">
                <Col flex="auto">
                    <InputNumber
                        addonBefore={tokenOption}
                        value={value}
                        onChange={(value) => setValue(value)} 
                    />
                </Col>
                <Col>
                    <Button
                        type="primary"
                        onClick={() => {
                            setValue(maximumToken || 0);
                        }}
                    >
                        Max
                    </Button>
                </Col>
            </Row>
            {renderReceving()}
            <Button onClick={onClickButton}>{mode}</Button>
        </Card>
    )
}

export default Panel