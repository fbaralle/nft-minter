import { useContractWrite, useAccount } from "wagmi";
import mintContractAbi from "@/config/mint-contract.abi.json";
import { MINTING_CONTRACT_ADDRESS } from "@/config";

const IPFS_PREFIX = "ipfs://";

const useMint = () => {
  const { address } = useAccount();
  const { write, ...rest } = useContractWrite({
    address: MINTING_CONTRACT_ADDRESS,
    abi: mintContractAbi.abi,
    functionName: "mint",
  });

  // ipfs source should point to metadata object (stored in ipfs), which contains ipfs pointer to file (under 'image' key)
  const mintNFT = async (ipfsSource: string) => {
    if (write) {
      const tokenUri = `${IPFS_PREFIX}${ipfsSource}`;
      write({
        args: [address, tokenUri],
      });
    }
  };

  return {
    ...rest,
    mintNFT,
  };
};

export default useMint;
