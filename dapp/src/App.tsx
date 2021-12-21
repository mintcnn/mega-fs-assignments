// lib
import React, { useReducer } from "react"
import { Web3ReactProvider } from '@web3-react/core'

import Web3 from 'web3'
import { Route, Router, useHistory, Redirect, Switch } from 'react-router-dom';
// component
import { Header, TabBar, Web3Manager } from "./components";
import { Supply, Withdraw } from "./pages";
import './styles/app.scss'
// helper
import { DecimalContext, ContractContext } from "./helpers/context";
import { ContractReducer, DecimalReducer } from "./helpers/reducer";

const App: React.FC = () => {
    const history = useHistory()

    const [decimal, dispatchDecimal] = useReducer(DecimalReducer, null)
    const [contract, dispatchContract] = useReducer(ContractReducer, null)

    function getLibrary(provider: any, connector: any) {
        const web3 = new Web3(provider)
        return web3
    }

    return (
        <Web3ReactProvider getLibrary={getLibrary}>
            <div className="app-container">
                <Header />
                    <ContractContext.Provider value={{ state: contract, dispatch: dispatchContract }}>
                        <DecimalContext.Provider value={{ state: decimal, dispatch: dispatchDecimal }}>
                            <Web3Manager>
                                <>
                                <TabBar />
                                {/* <div className="container">
                                    <StatGroup />
                                </div> */}
                                
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
                        </DecimalContext.Provider>
                    </ContractContext.Provider>
                </div>
        </Web3ReactProvider>
    )
}

export default App