import React from "react"
import { IDecimal, IContract } from "./interface"


export const DecimalContext = React.createContext<IDecimal | null>(null)

export const ContractContext = React.createContext<IContract | null>(null)