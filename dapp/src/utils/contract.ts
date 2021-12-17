import Web3 from "web3";
import { abiJson, contractAddress } from "../constants";

export const getContract = (web3: Web3) => {
    return new web3.eth.Contract(abiJson, contractAddress);
}