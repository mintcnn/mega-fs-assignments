// lib
import { Button, Card, Col, Input, InputNumber, Row, Select, Space } from "antd"
import React from "react"
import './panel.scss'

interface IPanel {
    mode: "supply" | "withdraw"
    value: number | undefined
    receiving: number | undefined
    setValue: (value: number) => void
    maximumToken: number | undefined
    onClickButton: () => Promise<void>
}
const Panel: React.FC<IPanel> = ({ mode, value, receiving, setValue, maximumToken, onClickButton }) => {

    const selectToken = (
            <Select defaultValue="etherium">
                <Select.Option value="etherium">ETH</Select.Option>
            </Select>
        )
    return (
        <Card
            title={mode} 
            className="panel-container"
        >
            <Space size='middle'>
                <InputNumber
                    addonBefore={selectToken}
                    value={value}
                    onChange={(value) => setValue(value)} 
                />
                <Button
                    type="primary"
                    onClick={() => {
                        setValue(maximumToken || 0);
                    }}
                >
                    Max
                </Button>
            </Space>
            <Row justify="space-between" className="receiving-section">
                <Col>Receiving</Col>
                <Col>{receiving || "0"} cETH</Col>
            </Row>
            <Button onClick={onClickButton}>{mode}</Button>
        </Card>
    )
}

export default Panel