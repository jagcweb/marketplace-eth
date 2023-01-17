import Link from "next/link";
import Image from "next/image";
import { useWeb3 } from "@components/providers";
import { useAccount } from "@components/hooks/web3/useAccount";

export default function ConnectButton() {
  const { connect, isLoading, web3 } = useWeb3();
  const { account } = useAccount();
  return (
    <>
      {isLoading ? (
        <span
          onClick={connect}
          disabled={true}
          className="opacity-50 cursor-not-allowed px-8 py-3 rounded-md bg-indigo-600 text-base font-medium text-white"
        >
          Loading...
        </span>
      ) : web3 ? (
        account ? (
          <>
            <span className="cursor-pointer px-8 py-3 rounded-md bg-white border text-base font-medium text-black hover:bg-red-700 hover:text-white">
              <span className="mr-2">
                ETH
              </span>
              {account.substring(0, 4)}...
              {account.substring(account.length - 4)}
            </span>
          </>
        ) : (
          <span
            onClick={connect}
            className="cursor-pointer px-8 py-3 rounded-md bg-indigo-600 text-base font-medium text-white"
          >
            Connect
          </span>
        )
      ) : (
        <Link
          href="https://metamask.io/download/"
          target="_blank"
          className="cursor-pointer px-8 py-3 rounded-md bg-indigo-600 text-base font-medium text-white"
        >
          Install Metamask
        </Link>
      )}
    </>
  );
}
