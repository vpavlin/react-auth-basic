import jwtDecode from 'jwt-decode';
import { useEffect } from 'react';
import { Button } from 'react-bootstrap';
import { useWeb3Context } from '../../hooks/useWeb3Context';
import { getStoredToken } from '../../shared/api';
import { Networks } from '../../shared/constants';
import { shortAddress } from '../../shared/utils';


const Wallet = () => {
    const { address, provider, web3Modal, connected, connect, disconnect, chainId} = useWeb3Context()

    useEffect(() => {
        if (web3Modal && web3Modal.cachedProvider) {
            connect();
        }
    }, [web3Modal])

    useEffect(() => {
        if (!address) return
        const token = getStoredToken()
        if (!token) return
        const decoded:any = jwtDecode(token)

        if (address != decoded!.sub) {
            localStorage.removeItem('token')
            document.location.reload()
        }

    }, [address])


    return (
        <div className="wallet">
        { connected ? <span><Button onClick={disconnect}>{shortAddress(address)}</Button> {Networks[chainId!]}</span> : <Button onClick={connect}>Connect Wallet</Button>}
        </div>
    )
}

export default Wallet;