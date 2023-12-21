import Text from "@/components/atoms/Text";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faArrowUpRightFromSquare,
  faCircleCheck,
  faCircleExclamation,
} from "@fortawesome/free-solid-svg-icons";
import LoadingSpinner from "../atoms/LoadingSpinner";
import Link from "next/link";
import { truncateString } from "@/utils";
import { FileUploaded } from "./NewNFTModal";

const InProgressModal = ({
  isUploadingFile,
  fileMetadata,
  isSendingTx,
  uploadFileError,
  isFileUploadSuccess,
}: {
  isUploadingFile: boolean;
  fileMetadata?: FileUploaded;
  isSendingTx: boolean;
  uploadFileError: boolean;
  isFileUploadSuccess: boolean;
}) => {
  return (
    <div className="flex flex-col w-full p-6 items-center gap-2 min-h-max">
      <Text variant="h2" className="mb-2 text-center">
        Minting NFT in progress
      </Text>
      <div className="flex flex-row p-4 bg-slate-600 rounded-lg items-center justify-between w-full">
        {isUploadingFile && (
          <>
            <Text variant="bodySmMedium" className="text-center">
              Uploading File and metadata to IPFS
            </Text>
            <LoadingSpinner />
          </>
        )}
        {!isUploadingFile && fileMetadata && (
          <div className="flex flex-col gap-2 w-full">
            <div className="flex flex-row  justify-between items-center">
              <Text variant="bodySmMedium" className="text-center">
                File uploaded successfully to IPFS
              </Text>
              <FontAwesomeIcon
                icon={faCircleCheck}
                size="xl"
                className={`text-green-500`}
              />
            </div>
            <div className="flex flex-row bg-slate-800  text-gray-300 p-2 px-4 rounded-lg gap-2 justify-between items-center">
              <div className="flex flex-row gap-2">
                {fileMetadata?.imageIpfsPublicUrl ? (
                  <img
                    src={fileMetadata.imageIpfsPublicUrl}
                    width="70px"
                    height="70px"
                    className="object-cover w-[70px] h-[70px] rounded-lg"
                  />
                ) : (
                  <div className="bg-zinc-700 w-[70px] h-[70px] rounded-lg" />
                )}
                <div className="flex flex-col gap-2">
                  <Text variant="bodyMdSemibold">{fileMetadata.name}</Text>
                  <Text variant="bodySm">
                    {truncateString(fileMetadata.description, 70, "end")}
                  </Text>
                </div>
              </div>
              <div className="flex flex-col w-[30%]">
                <div>
                  <Link
                    href={fileMetadata.imageIpfsUrl}
                    target="_blank"
                    className=""
                  >
                    <Text variant="bodySmMedium">
                      Image File{" "}
                      <FontAwesomeIcon
                        icon={faArrowUpRightFromSquare}
                        size="lg"
                        className="ml-2"
                      />
                    </Text>
                  </Link>
                </div>
                <div>
                  <Link
                    href={fileMetadata.metadataIpfsUrl}
                    target="_blank"
                    className=""
                  >
                    <Text variant="bodySmMedium">
                      Metadata File
                      <FontAwesomeIcon
                        icon={faArrowUpRightFromSquare}
                        size="lg"
                        className="ml-1"
                      />
                    </Text>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        )}
        {!isUploadingFile && uploadFileError && (
          <>
            <Text variant="bodySmMedium" className="text-center">
              Error: file not uploaded
            </Text>
            <FontAwesomeIcon
              icon={faCircleExclamation}
              size="xl"
              className={`text-orange-300`}
            />
          </>
        )}
      </div>
      {isFileUploadSuccess && isSendingTx && (
        <div className="flex flex-row p-4 bg-slate-600 rounded-lg items-center justify-between w-full">
          <Text className="flex flex-col text-left">
            <Text variant="bodySmMedium">Sending mint transaction.</Text>
            <Text variant="bodySmMedium">
              Please check your wallet and sign.
            </Text>
          </Text>
          <LoadingSpinner />
        </div>
      )}
    </div>
  );
};

export default InProgressModal;
