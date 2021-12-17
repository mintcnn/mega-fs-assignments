import React from 'react'
import { Statistic, Card } from 'antd'
import './style.scss'

interface IStat {
    loading: boolean
    title: string
    value: number | string | undefined
}

const Stat: React.FC<IStat> = ({ loading, title, value }) => {
    return (
        <Card className='card-stat-container'>
            <Statistic title={title} value={value ? value: '-'} loading={loading} />
        </Card>
    )
}

export default Stat