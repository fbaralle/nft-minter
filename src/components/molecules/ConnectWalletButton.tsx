import { useUserWallet } from "@/context/wallet-data.context";
import { Button } from "../atoms/Button";
import Text from "../atoms/Text";
import { truncateString } from "@/utils";
import { ethers } from "ethers";

const ConnectWalletButton = () => {
  const {
    client,
    userAddress: address,
    connectWallet,
    balance,
  } = useUserWallet();

  const walletBalance = ethers.utils.formatEther(
    BigInt(balance || 0).toString()
  );
  return (
    <div className="border-solid border-[1px] border-border-primary rounded-[24px] overflow-hidden">
      {!address && (
        <Button
          disabled={false}
          className="border-0 bg-sky-800 hover:bg-sky-700 focus:bg-sky-600"
          onClick={(e) => {
            // connect();
          }}
        >
          Connect Wallet
        </Button>
      )}
      {address && (
        <div className="flex items-center justify-between p-1">
          <Text className=" px-4 text-sm text-gray-300">{`${walletBalance} ${client.chain.nativeCurrency.symbol}`}</Text>
          <Text className="bg-bg-popout p-2 rounded-full px-4 text-sm text-gray-300">
            {truncateString(address, 12, "middle")}
          </Text>
        </div>
      )}
    </div>
  );
};

export default ConnectWalletButton;
