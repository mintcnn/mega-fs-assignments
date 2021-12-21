import { Contract } from 'web3-eth-contract';

export type DecimalAction = { type: 'SET', payload: number }
export const DecimalReducer = (
    state: number | null,
    action: DecimalAction
): number | null => {
    switch (action.type) {
        case 'SET':
            return action.payload
        default:
            return state
    }
}

export type ContractAction = { type: 'SET', payload: Contract }
export const ContractReducer = (
    state: Contract | null,
    action: ContractAction
): Contract | null => {
    switch(action.type) {
        case 'SET':
            return action.payload
        default:
            return state
    }
}