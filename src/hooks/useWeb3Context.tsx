import React, { useCallback, useContext, useMemo } from "react";  
import { Web3Provider } from "@ethersproject/providers";
import Web3Modal from 'web3modal';
import { providers } from 'ethers';
import { useState } from 'react';
import WalletConnectProvider from '@walletconnect/web3-provider';
import { ChainID, DEFAULT_CHAIN, RpcUrls } from "../shared/constants";

export type Web3Info = {
    address: string;
    chainId: number | null;
    provider: Web3Provider | null;
    connected: boolean;
    web3Modal: Web3Modal;
    connect: () => void;
    disconnect: () => void;
}

export type Web3ContextData = {
    providerInfo: Web3Info
} | null;

export const Web3Context = React.createContext<Web3ContextData>(null)

export const useWeb3Context = () => {
    const web3Context = useContext(Web3Context);

    if(!web3Context) {
        throw new Error("Web3ContextProvider at wrong level")
    }

    const { providerInfo } = web3Context;

    return useMemo<Web3Info>(() => {
        return {...providerInfo};
    }, [web3Context])
}

export const useAddress = () => {
    const { address } = useWeb3Context();
    return address;
}

const defaultModal = new Web3Modal({
    // network: "mainnet", // optional
    cacheProvider: true, // optional
    providerOptions: {
      walletconnect: {
        package: WalletConnectProvider,
        options: {
          rpc: {
            80001: RpcUrls[ChainID.POLY_TESTNET],
          },
        },
      },
    },
  });

interface Props {
    children: React.ReactNode
    forceSwitchNetwork?: boolean
}


export const Web3ContextProvider = ({ children, forceSwitchNetwork }: Props) => {
    const [address, setAddress] = useState("");
    const [web3Modal, setWeb3Modal] = useState<Web3Modal>(defaultModal);
    const [provider, setProvider] = useState<Web3Provider | null>(null);
    const [chainId, setChainId] = useState<number | null>(null);
    const [connected, setConnected] = useState(false);

    const _setListeners = useCallback(
        (locProvider:any) => {
            // Subscribe to accounts change
            locProvider.on("accountsChanged", async (accounts: string[]) => {
                connect()
                window.location.reload();
            });

            // Subscribe to chainId change
            locProvider.on("chainChanged", (chainId: number) => {
                //connect()
                window.location.reload();
            });

            // Subscribe to provider connection
            locProvider.on("connect", (info: { chainId: number }) => {
                console.log(info);
            });

            // Subscribe to provider disconnection
            locProvider.on("disconnect", (error: { code: number; message: string }) => {

            });
        },
        [provider]
    )

    const connect = useCallback(
        async () => {
            try {
                const locProvider = await web3Modal.connect();
                _setListeners(locProvider)
                const ethersProvider = new providers.Web3Provider(locProvider)
                const userAddress = await ethersProvider.getSigner().getAddress()
                setAddress(userAddress)
                setProvider(ethersProvider)
                setConnected(true);
                ethersProvider.getNetwork().then(network => { 
                    if (forceSwitchNetwork && DEFAULT_CHAIN != network.chainId) {
                        console.log("Incorrect chain")
                        ethersProvider.send("wallet_switchEthereumChain", [{"chainId": "0x"+DEFAULT_CHAIN.toString(16)}])
                            .then((r) => {
                                window.location.reload()}
                            )
                            .catch((e) => {})
                    }
                   // console.log(network.chainId)
                    setChainId(network.chainId)
                })
            } catch (e) {
                disconnect()
            }
            

            
        },
        [provider, web3Modal, connected]
    ) 

    const disconnect = useCallback(
        () => {
            web3Modal.clearCachedProvider();
            setAddress("");
            setConnected(false);
            localStorage['walletconnect'] = null;
            window.location.reload()
        },
        [provider, web3Modal, connected]
    )
    const web3Info = useMemo(
        () => ({
            address,
            chainId,
            provider,
            connected,
            web3Modal,
            connect,
            disconnect
        }), [
            address,
            chainId,
            provider,
            connected,
            web3Modal,
            connect,
            disconnect
        ],
    );

    return ( <Web3Context.Provider value={{ providerInfo: web3Info }}>
        { children }
    </Web3Context.Provider>)
    ;
}