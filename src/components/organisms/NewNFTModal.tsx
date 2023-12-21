import React, { useEffect, useState } from "react";
import { Modal } from "@/components/atoms/Modal";
import useStore from "@/store/useStore";
import { ModalButtons } from "@/components/organisms/ModalButtons";
import Text from "@/components/atoms/Text";
import FormGroup from "../atoms/Input/FormGroup";
import Label from "../atoms/Input/Label";
import FormInput from "../atoms/Input/FormInput";
import { ProposalModalSteps } from "@/store/createModalSlice";
import SuccessTxModal from "./SuccessModal";
import FileDropzone from "../molecules/FileDropzone";
import { useAccount } from "wagmi";
import InProgressModal from "./InProgressModal";
import useActions from "@/hooks/useActions";

export interface Proposal {
  title: string;
  description: string;
  newValue: number;
}

export interface BuildProposalTxResponse {
  unsigned_tx: string;
  is_serialized: boolean;
}

export interface FileUploaded {
  name: string;
  description: string;
  imageIpfsUrl: string;
  imageIpfsPublicUrl: string;
  metadataIpfsUrl: string;
  metadataFileHash: `0x${string}`;
}

const MAX_TITLE_LENGTH = 120;
const MIN_TITLE_LENGTH = 5;
const MAX_DESCRIPTION_LENGTH = 400;
const MIN_DESCRIPTION_LENGTH = 10;
const MAX_FILE_SIZE_MB = 3;

const NewNFTModal = () => {
  const { isConnected } = useAccount();
  const { modalOpen, modalStep, setModalOpen, closeModal } = useStore(
    (state) => state.modal
  );

  const onClose = () => {
    setModalOpen(false);
  };

  // Form data
  const [title, setTitle] = useState<string>("");
  const [tokenFile, setTokenFile] = useState<File | undefined>(undefined);
  const [description, setDescription] = useState<string>("");

  const titleCharsLimitDistance = MAX_TITLE_LENGTH - (title?.length || 0);
  const isTitleMinLength = (title?.length || 0) >= MIN_TITLE_LENGTH;
  const isValidTitle = !!title && title.length > 3;
  const descriptionCharsLimitDistance =
    MAX_DESCRIPTION_LENGTH - (description?.length || 0);
  const isDescriptionMinLength =
    (description?.length || 0) >= MIN_DESCRIPTION_LENGTH;
  const isValidDescription =
    description && description.length > MIN_DESCRIPTION_LENGTH;
  const isValidFile = tokenFile && tokenFile.size / 1000000 <= MAX_FILE_SIZE_MB;

  const isSubmitDisabled =
    !isConnected || !isValidTitle || !isValidDescription || !isValidFile;

  const {
    isUploadingFile,
    uploadFileError,
    fileMetadata,
    isFileUploadSuccess,
    txData,
    isSendingTx,
    txError,
    txSuccess,
    onSubmitMintNFT,
  } = useActions({
    name: title,
    description,
    tokenFile,
    attributes: [],
    disabled: isSubmitDisabled,
  });

  const handleChangeDescription = (e: any) => {
    const content = e.target.value;
    setDescription(content);
  };

  const handleChangeFile = (f: File) => {
    setTokenFile(f);
  };

  const handleChangeTitle = (e: any) => {
    const content = e.target.value;
    const length = (content && content?.length) || 0;
    if (length >= 0 && length <= MAX_TITLE_LENGTH) {
      setTitle(content);
    }
  };

  const handleSubmit = (e: any) => {
    e.preventDefault();
    onSubmitMintNFT();
  };

  useEffect(() => {
    if (modalOpen) {
      setDescription("");
      setTitle("");
      setTokenFile(undefined);
    }
  }, [modalOpen]);

  return (
    <Modal
      onDismiss={onClose}
      open={modalOpen}
      closeButton
      allowInteractionOutside
      contentClassName="flex flex-col items-center pt-7 md:pt-7 rouded-lg justify-between min-w-[450px] md:w-fit md:w-fit md:max-w-[750px]"
    >
      {modalStep === ProposalModalSteps.CREATE && (
        <>
          <div className="flex flex-col w-full px-6">
            <Text variant="h3" className="mb-2">
              Create a new NFT
            </Text>
            <form onSubmit={onSubmitMintNFT}>
              <FormGroup className="flex flex-col mb-4">
                <Label htmlFor="title" isRequired>
                  NFT Display Name
                </Label>
                <FormInput
                  value={title}
                  disabled={false}
                  placeholder="Name your NFT"
                  id="title"
                  name="title"
                  onChange={handleChangeTitle}
                  maxLength={MAX_TITLE_LENGTH}
                />
                <span className="text-xs text-gray-400 mt-2">
                  {!isTitleMinLength
                    ? `Minimum ${MIN_TITLE_LENGTH} characters`
                    : `${titleCharsLimitDistance} characters remaining`}
                </span>
              </FormGroup>

              <FormGroup className="flex flex-col mb-4">
                <Label htmlFor="proposalDetails" isRequired>
                  Description
                </Label>
                <FormInput
                  value={description}
                  as="textarea"
                  disabled={false}
                  placeholder="Add a description for the artwork"
                  id="title"
                  name="title"
                  onChange={handleChangeDescription}
                  maxLength={MAX_DESCRIPTION_LENGTH}
                />
                <span className="text-xs text-gray-400 mt-2">
                  {!isDescriptionMinLength
                    ? `Minimum ${MIN_DESCRIPTION_LENGTH} characters`
                    : `${descriptionCharsLimitDistance} characters remaining`}
                </span>
              </FormGroup>

              <FileDropzone
                handleChange={(file) => {
                  handleChangeFile(file);
                }}
                types={["JPG", "JPEG", "PNG", "GIF", "WEBP"]}
                maxFileSize={MAX_FILE_SIZE_MB}
              />
              <Text variant="bodySmMedium" className="text-text-subdued">
                {`Max file size: ${MAX_FILE_SIZE_MB} mb.`}
              </Text>
            </form>
          </div>

          <ModalButtons
            title={"Mint your NFT"}
            secondaryButton
            loading={isSendingTx || isUploadingFile}
            secondaryTitle="Close"
            variant="primary"
            disabled={isSubmitDisabled}
            onClick={handleSubmit}
            secondaryClick={closeModal}
            containerClassName="border-0 md:border-0 jusitfy-self-end self-end"
            buttonClassName="justify-center w-full"
          />
        </>
      )}
      {modalStep === ProposalModalSteps.IN_PROGRESS && (
        <>
          <InProgressModal
            fileMetadata={fileMetadata}
            isFileUploadSuccess={isFileUploadSuccess}
            isSendingTx={isSendingTx}
            isUploadingFile={isUploadingFile}
            uploadFileError={uploadFileError}
          />
        </>
      )}
      {modalStep === ProposalModalSteps.SUCCESS && txSuccess && (
        <SuccessTxModal txHash={txData?.hash} />
      )}
    </Modal>
  );
};

export default NewNFTModal;
