import { useEffect } from "react";
import useSWR from "swr";

const adminAddress = "0xc0caf63b810b0e496562b5bbe1b8078f68409bd8a0fab4324ac02640e7f524aa";

export const handler = (web3, provider) => () => {
  const { data, mutate, ...res } = useSWR(
    () => (web3 ? "web3/accounts" : null),
    async () => {
      const accounts = await web3.eth.getAccounts();
      return accounts[0];
    }
  );

  useEffect(() => {
    provider &&
      provider.on("accountsChanged", (accounts) => mutate(accounts[0] ?? null));
  }, [mutate]);

  return {
    account: {
      data,
      isAdmin: (data && adminAddress === web3.utils.keccak256(data)) ?? false,
      mutate,
      ...res,
    },
  };
};
