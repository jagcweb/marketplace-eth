import { useEffect } from "react";
import useSWR from "swr";

const NETWORK = {
  1: "Ethereum Mainnet",
  3: "Ropsten Testnet",
  4: "Rinkeby Testnet",
  5: "Goerli Testnet",
  42: "Kovan Testnet",
  56: "Binance Smart Chain",
  137: "Polygon Mainnet",
  1337: "Ganache",
};


export const handler = (web3, provider) => () => {
  const { data, mutate, ...rest } = useSWR(
    () => (web3 ? "web3/network" : null),
    async () => {
      const chainId = await web3.eth.getChainId();
      return NETWORK[chainId] || "Error network";
    }
  );

  useEffect(() => {
    provider && provider.on("chainChanged", (chainId) => mutate(parseInt(chainId, 16)));
  }, [mutate]);

  return {
    network: {
      data,
      mutate,
      ...rest,
    },
  };
};
