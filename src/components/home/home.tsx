import { ethers } from "ethers";
import { Button } from "react-bootstrap";
import { useWeb3Context } from "../../hooks/useWeb3Context";
import { getAuthText, getStoredToken, singInWithSig } from "../../shared/api";
import { SiweMessage } from 'siwe';
import React, { useState } from "react";
import Manifest from "../manifest/manifest";

const Home = () => {
    const [ token, setToken] = useState<string | null>(getStoredToken())
    const [ showToken, setShowToken] = useState(false)

    const { connected, address, provider } = useWeb3Context()

    const signin = async () => {
        const domain = window.location.host;
        const origin = window.location.origin;
        const data = await getAuthText(address)

        const message = new SiweMessage(data.text);
        const m = message.prepareMessage();

        const signer = provider?.getSigner(address)
        const signature = await signer?.signMessage(m)
        
        if (!signature) {

        }

        data.data.signature = signature ? signature : null
        data.data.text = data.text


        const result = await singInWithSig(data.data)

        setToken(result.token)
        setShowToken(true)

    }

    const copy = async () => {
        await navigator.clipboard.writeText(token!);
    }

    return (<>
    { connected ? 
        <div>
            <div className="text-center">
                { !token && <Button onClick={signin}>Sign In</Button>}
                { showToken && token && <>
                    <div><strong>{token.slice(0, token.length/6)+"..."+token.slice(5*token.length/6)}</strong><Button onClick={copy}>Copy</Button></div>
                    </>}
            </div>
        { token && <Manifest />}
        </div>
        :
        <></>
    }
    </>)
}

export default Home;