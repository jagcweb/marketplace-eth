import Link from "next/link";
import { useWeb3 } from "@components/providers";
import { useAccount } from "@components/hooks/web3/useAccount";

export default function Navbar() {
  const { connect, isLoading, web3 } = useWeb3();
  const { account } = useAccount();
  return (
    <section>
      <div className="relative pt-6 px-4 sm:px-6 lg:px-8">
        <nav className="relative" aria-label="Global">
          <div className="flex justify-between">
            <div>
              <Link
                href="/"
                className="font-medium mr-8 text-gray-500 hover:text-gray-900"
              >
                Home
              </Link>
              <Link
                href="/marketplace"
                className="font-medium mr-8 text-gray-500 hover:text-gray-900"
              >
                Marketplace
              </Link>
              <Link
                href="#"
                className="font-medium mr-8 text-gray-500 hover:text-gray-900"
              >
                Blogs
              </Link>
            </div>
            <div className="flex">
              <Link
                href="#"
                className="font-medium mr-8 text-gray-500 hover:text-gray-900"
              >
                Whitelist
              </Link>
              {account.isAdmin ? <span className="mr-8">ADMIN</span> : ""}
              <div>
                {isLoading ? (
                  <span
                    onClick={connect}
                    disabled={true}
                    className="opacity-50 cursor-not-allowed px-8 py-3 rounded-md bg-indigo-600 text-base font-medium text-white"
                  >
                    Loading...
                  </span>
                ) : web3 ? (
                  account.data ? (
                    <>
                      <span className="cursor-pointer px-8 py-3 rounded-md bg-white border text-base font-medium text-black hover:bg-red-700 hover:text-white">
                        <span>ETH</span>
                        <span className="mr-2 ml-2">l</span>
                        {account.data.substring(0, 4)}...
                        {account.data.substring(account.data.length - 4)}
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
              </div>
            </div>
          </div>
        </nav>
      </div>
    </section>
  );
}
