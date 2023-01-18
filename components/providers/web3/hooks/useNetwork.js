import { useEffect } from "react";
import useSWR from "swr";

const NETWORKS = {
  1: "Ethereum Mainnet",
  3: "Ropsten Testnet",
  4: "Rinkeby Testnet",
  5: "Goerli Testnet",
  42: "Kovan Testnet",
  56: "Binance Smart Chain",
  137: "Polygon Mainnet",
  1337: "Ganache",
};

const targetNetwork = NETWORKS[process.env.NEXT_PUBLIC_TARGET_CHAIN_ID]

export const handler = (web3, provider) => () => {
  const { data,error, mutate, ...rest } = useSWR(
    () => (web3 ? "web3/network" : null),
    async () => {
      const chainId = await web3.eth.getChainId();
      return NETWORKS[chainId];
    }
  );

  useEffect(() => {
    provider && provider.on("chainChanged", (chainId) => mutate(parseInt(chainId, 16)));
  }, [mutate]);

  return {
    network: {
      data,
      target: targetNetwork,
      isSupported: data === targetNetwork,
      hasFinishedFirstFetch: data || error,
      mutate,
      ...rest,
    },
  };
};
