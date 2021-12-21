// lib
import React from 'react'
import { Menu } from 'antd'
import { Link, useLocation } from 'react-router-dom'

import './tabBar.scss'

const TabBar: React.FC = () => {
    const location = useLocation()

    function getMenuKeySelected() {
        var pathName = location.pathname
        return pathName.split('/')[1]
    }

    return (
        <div className='tab-menu'>
            <Menu 
                selectedKeys={[getMenuKeySelected()]} 
                mode="horizontal" 
                className="tab-bar-container"
            >
                    <Menu.Item key="supply">
                        <Link to="/supply">Supply</Link>
                    </Menu.Item>
                    <Menu.Item key="withdraw">
                        <Link to="/withdraw">Withdraw</Link>
                    </Menu.Item>
            </Menu>
        </div>
    )
}

export default TabBar