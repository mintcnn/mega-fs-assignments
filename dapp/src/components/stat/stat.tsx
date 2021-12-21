import React from 'react'
import { Statistic, Card } from 'antd'
import './style.scss'

interface IStat {
    loading: boolean
    title: string
    value: number | string | undefined
    suffix: string
}

const Stat: React.FC<IStat> = ({ loading, title, value, suffix }) => {
    
    return (
        <Card className='card-stat-container'>
            <Statistic 
                title={title} 
                value={typeof value !== 'undefined' ? value: '-'} 
                loading={loading} 
                suffix={suffix}
            />
        </Card>
    )
}

export default Stat