import { Dispatch } from "react";
import { DecimalAction, ContractAction } from "./reducer";
import { Contract } from 'web3-eth-contract';


export interface IDecimal {
    state: number | null
    dispatch: Dispatch<DecimalAction>
}

export interface IContract {
    state: Contract | null
    dispatch: Dispatch<ContractAction>
}