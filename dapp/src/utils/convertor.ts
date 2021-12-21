import Web3 from "web3";

export function etherToWei(web3: Web3, eth: number) {
    if (eth === 0 || !eth || !String(eth)) return 0
    return parseFloat(web3.utils.toWei(eth.toString(), 'ether'))
}