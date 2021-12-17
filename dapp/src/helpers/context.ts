import React from "react"
import { Contract } from 'web3-eth-contract';

import { IDecimal, IContract } from "./interface"


export const DecimalContext = React.createContext<IDecimal | null>(null)

export const ContractContext = React.createContext<IContract | null>(null)