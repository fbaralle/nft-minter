import Text from "@/components/atoms/Text";
import HeaderMenu from "@/components/molecules/HeaderMenu";
import NewNFTModal from "../molecules/NewNFTModal";
import MintNewButton from "../molecules/MintNewButton";

import { useAccount, useBalance, useContractRead } from "wagmi";
import { MINTING_CONTRACT_ADDRESS } from "@/config";
import mintContractAbi from "@/config/mint-contract.abi.json";

const HomeView = () => {
  const { data, isError, isLoading } = useContractRead({
    address: MINTING_CONTRACT_ADDRESS,
    abi: mintContractAbi.abi,
    functionName: "mint",
  });

  console.log("balance", data);

  return (
    <main className="flex min-h-screen flex-col items-center pb-20 px-[10%] home-gradient py-12">
      <HeaderMenu />
      <div className="mb-16 bg-bg-popout p-12 rounded-xl border-solid border-2 flex flex-col text-center bg-opacity-5">
        <Text variant="h1" className="!text-3xl mb-4">
          Mint your own NFTs
        </Text>
        <Text variant="bodyLgSemibold" className="text-text-subdued">
          Create a collection and mint NFTs directly to your wallet
        </Text>
      </div>
      <div className=" w-full flex flex-row justify-center mb-8">
        <MintNewButton />
        <NewNFTModal />
      </div>
    </main>
  );
};

export default HomeView;
