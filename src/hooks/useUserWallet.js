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

        getUserAndNetworkInfo()
    }, [web3])

    return {
        userAddress,
        networkId,
    }
}

export default useUserWallet