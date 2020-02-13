import { useEffect, useState } from "react"
import { unstable_batchedUpdates as batchedUpdates } from "react-dom"

const useUserWallet = (web3) => {
    const [userAddress, setUserAddress] = useState()
    const [networkId, setNetworkId] = useState()

    useEffect(() => {
        if (!web3) return

        async function getUserAndNetworkInfo() {
            const [[user], netId] = await Promise.all([
                web3.eth.getAccounts(),
                web3.eth.getChainId(),
            ])

            batchedUpdates(() => {
                setUserAddress(user)
                setNetworkId(netId)
            })
        }
        // listen to accounts change
        web3.currentProvider.on('accountsChanged', getUserAndNetworkInfo)
        // populate data
        getUserAndNetworkInfo()
        // remove listener
        return () => {
            web3.currentProvider._events['accountsChanged'] = undefined
        }
    }, [web3])

    return {
        userAddress,
        networkId,
    }
}

export default useUserWallet