import { useState, useEffect } from 'react'
import { unstable_batchedUpdates as batchUpdate } from 'react-dom'

import Web3 from 'web3'

const useWeb3Setup = () => {
  const [web3, setWeb3] = useState()
  const [error, setError] = useState()

  useEffect(() => {
    if (!window || !window.web3) return

    async function load() {
      try {
        await new Promise((accept, reject) => {
          if (!window) reject('No window')
          window.addEventListener('load', function answer(e) {
            window.removeEventListener('load', answer)
            accept(e)
          })
        })
        const web3 = new Web3(window.web3)
        if (typeof web3.currentProvider !== 'string') {
          await web3.currentProvider?.enable()
        }

        setWeb3(web3)
      } catch (error) {
        console.error(error)

        batchUpdate(() => {
          setWeb3(undefined)
          setError(new Error(error))
        })
      }
    }

    load()
  }, [])

  return { web3, error }
}

export default useWeb3Setup