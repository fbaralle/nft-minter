import React from "react";
import Text from "@/components/atoms/Text";
import { useUserWallet } from "@/context/wallet-data.context";
import { Button } from "../atoms/Button";
import Link from "next/link";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleCheck } from "@fortawesome/free-solid-svg-icons";
import { IFPS_EXPLORER_URL } from "@/config";
import { useNetwork } from "wagmi";

interface SuccessModalProps {
  txHash?: string;
  ipfsSource?: string;
}

const SuccessTxModal: React.FC<SuccessModalProps> = ({
  txHash = "0xbd252939258eecb008636752502f19f9e55ad6025822e4d56f0013f33828be97",
  ipfsSource,
}) => {
  const { chain } = useNetwork();

  return (
    <>
      <div className="flex flex-col w-full p-8 pb-0 items-center gap-2">
        <Text variant="h2" className="mb-2 text-center">
          NFT Minted Successfully!
        </Text>
        <FontAwesomeIcon
          icon={faCircleCheck}
          size="2xl"
          className={`text-green-500`}
        />
      </div>
      {ipfsSource && (
        <div className="flex flex-col items-center w-full p-8">
          <Link
            href={`${IFPS_EXPLORER_URL}${ipfsSource}`}
            target="_blank"
            className=""
          >
            <Button className="text-center">View File Uploaded To IPFS</Button>
          </Link>
        </div>
      )}
      {txHash && (
        <div className="flex flex-col items-center w-full p-8">
          <Link
            href={`${chain?.blockExplorers?.etherscan?.url}/tx/${txHash}`}
            target="_blank"
            className=""
          >
            <Button className="text-center">
              View blockchain confirmation
            </Button>
          </Link>
        </div>
      )}
    </>
  );
};

export default SuccessTxModal;
