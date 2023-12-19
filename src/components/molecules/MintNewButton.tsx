import { Button } from "@/components/atoms/Button";
import useStore from "@/store/useStore";
import { useAccount, useConnect } from "wagmi";
import classNames from "classnames";
import { useWeb3Modal } from "@web3modal/wagmi/react";

const MintNewButton = () => {
  // const { userAddress } = useUserWallet();
  const { isConnected } = useAccount();
  const { setModalOpen } = useStore((state) => state.modal);
  const { open } = useWeb3Modal();

  const onClick = () => (isConnected ? setModalOpen(true) : open());
  return (
    <Button
      onClick={onClick}
      // disabled={!}
      className={classNames({
        ["bg-sky-500"]: !isConnected,
        ["bg-blue-500"]: isConnected,
      })}
    >
      {isConnected ? "Mint a new NFT" : "Connect Wallet to start minting!"}
    </Button>
  );
};

export default MintNewButton;
