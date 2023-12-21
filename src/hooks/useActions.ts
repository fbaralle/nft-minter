import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import axios from "axios";
import { IFPS_EXPLORER_URL, PINATA_GATEWAY_BASE_URL } from "@/config";
import useMint from "@/hooks/useMint";
import { FileUploaded } from "@/components/organisms/NewNFTModal";
import useStore from "@/store/useStore";
import { ProposalModalSteps } from "@/store/createModalSlice";

const useActions = ({
  name,
  description,
  attributes,
  tokenFile,
  disabled,
}: {
  name: string;
  description: string;
  tokenFile?: File;
  attributes: unknown[];
  disabled: boolean;
}) => {
  const { modalOpen, setModalStep } = useStore((state) => state.modal);
  const [isUploadingFile, setIsUploadingFile] = useState<boolean>(false);
  const [uploadFileError, setUploadFileError] = useState<any>(false);
  const [fileMetadata, setFileMetadata] = useState<FileUploaded | undefined>(
    undefined
  );

  const isFileUploadSuccess =
    !isUploadingFile && !uploadFileError && !!fileMetadata;

  const {
    mintNFT,
    data: txData,
    isLoading: isSendingTx,
    isSuccess: txSuccess,
    error: txError,
  } = useMint();

  const onUploadFileToIpfs = async () => {
    setIsUploadingFile(true);
    setUploadFileError(false);
    setFileMetadata(undefined);

    try {
      const formData = new FormData();
      formData.append("name", name);
      formData.append("description", description);
      formData.append("file", tokenFile as File);
      formData.append("attributes", JSON.stringify(attributes));

      const { data: resData } = await axios.post(
        "/api/pin-file-ipfs",
        formData
      );

      const metadataFileHash = resData?.data?.data?.IpfsHash;

      if (metadataFileHash) {
        const { name, description, image } =
          resData.data.assetMetadata.pinataContent;
        const imageUri = image.split("//")[1];
        const metadataInfo = {
          name,
          description,
          imageIpfsUrl: `${PINATA_GATEWAY_BASE_URL}${imageUri}`,
          imageIpfsPublicUrl: `${IFPS_EXPLORER_URL}${imageUri}`,
          metadataIpfsUrl: `${PINATA_GATEWAY_BASE_URL}${metadataFileHash}`,
          metadataFileHash,
        };

        setFileMetadata(metadataInfo);
        return metadataFileHash;
      }
    } catch (e) {
      toast.error("File upload error");
      setUploadFileError(e);
    } finally {
      setIsUploadingFile(false);
    }
  };

  const onSubmitMintNFT = async () => {
    setModalStep(ProposalModalSteps.IN_PROGRESS);
    const metadataHash = await onUploadFileToIpfs();

    if (metadataHash) {
      await mintNFT(metadataHash);
    } else {
      toast.error("Minting request error");
      setModalStep(ProposalModalSteps.CREATE);
    }
  };

  useEffect(() => {
    if (txSuccess && txData) {
      setModalStep(ProposalModalSteps.SUCCESS);
    }
  }, [txSuccess, txData, setModalStep]);

  useEffect(() => {
    if (modalOpen) {
      setIsUploadingFile(false);
      setFileMetadata(undefined);
      setUploadFileError(false);
    }
  }, [modalOpen]);

  return {
    isUploadingFile,
    isFileUploadSuccess,
    uploadFileError,
    fileMetadata,
    txData,
    isSendingTx,
    txSuccess,
    txError,
    onSubmitMintNFT,
  };
};

export default useActions;
