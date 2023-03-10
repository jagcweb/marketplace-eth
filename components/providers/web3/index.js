/* eslint-disable react-hooks/rules-of-hooks */
import { createContext, useContext, useEffect, useState, useMemo, useCallback } from 'react';
import detectEthereumProvider from '@metamask/detect-provider';
import Web3 from 'web3';
import { setupHooks } from './hooks/setupHooks';

const Web3Context = createContext(null);

export default function web3Provider({children}) {

    const [web3Api, setWeb3Api] = useState ({
        provider: null,
        web3: null,
        contract: null,
        isLoading: true,
    });
    
    useEffect(() => {
        const loadProvider = async () => {
            const provider = await detectEthereumProvider();

            if(provider){
                const web3 = new Web3(provider);
                setWeb3Api({...web3Api, provider, web3, isLoading: false});
            } else {
                setWeb3Api({...web3Api, isLoading: false});
                console.error("Please, install Metamask.");
            }
        }
        loadProvider();
    }, [])

    const connectMetamask = useCallback(async(provider) => {
        try {
            await provider.request({method: "eth_requestAccounts"})
        } catch {
            console.error("Cannont retreive account");
            location.reload();
        }
    }, []);

    const _web3Api = useMemo(() => {
        const { web3, provider } = web3Api;
        return {
            ...web3Api,
            getHooks: () => setupHooks(web3, provider),
            connect: provider ?
            () => connectMetamask(provider) :
            () => console.error("Cannont connect to Metamask, try to refresh")
        };
    }, [web3Api, connectMetamask]);

    return (
        <Web3Context.Provider value={_web3Api}>
            {children}
        </Web3Context.Provider>
    );
}

export function useWeb3() {
    return useContext(Web3Context);
}

export function useHooks(cb) {
    const { getHooks } = useWeb3();
    return cb(getHooks());
}