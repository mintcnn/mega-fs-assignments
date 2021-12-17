// lib
import React, { useReducer, useEffect } from "react"
import { BatchRequest, provider, Providers, Extension,  } from 'web3-core';
import { useWeb3React, Web3ReactProvider } from '@web3-react/core'
import { AbstractConnector } from '@web3-react/abstract-connector';

import Web3 from 'web3'
import { Route, Router, useHistory, Redirect, Switch } from 'react-router-dom';
// component
import { Header, StatGroup, TabBar, Web3Manager } from "./components";
import { Supply, Withdraw } from "./pages";
import './styles/app.scss'
// helper
import { DecimalContext, ContractContext } from "./helpers/context";
import { ContractReducer, DecimalReducer } from "./helpers/reducer";
import { abiJson, contractAddress } from "./constants";




const App: React.FC = () => {
    const web3 = new Web3(Web3.givenProvider)
    const history = useHistory()

    const [decimal, dispatchDecimal] = useReducer(DecimalReducer, null)
    const [contract, dispatchContract] = useReducer(ContractReducer, null)

    function getLibrary(provider: any, connector: any) {
        const web3 = new Web3(provider)
        console.log('getlibrary', web3.eth.getAccounts())
        return web3
    }

    return (
        <Web3ReactProvider getLibrary={getLibrary}>
            <ContractContext.Provider value={{ state: contract, dispatch: dispatchContract }}>
                <DecimalContext.Provider value={{ state: decimal, dispatch: dispatchDecimal }}>
                    <div className="app-container">
                        <Header />
                            <Web3Manager>
                                <>
                                    <TabBar />
                                    <div className="container">
                                        <StatGroup />
                                    </div>
                                    
                                    <Router history={history}>
                                    {/* <Suspense fallback={<Loader />}> */}
                                        <Switch>
                                            <Route exact path="/" render={() => <Redirect to="/supply" />} />
                                            <Route key="supply" path="/supply" component={Supply} />
                                            <Route key="withdraw" path="/withdraw" component={Withdraw} />
                                        </Switch>
                                    {/* </Suspense> */}
                                    </Router>
                                </>
                            </Web3Manager>
                        </div>
                </DecimalContext.Provider>
            </ContractContext.Provider>
        </Web3ReactProvider>
    )
}

export default App