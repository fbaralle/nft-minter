import { JWT_AUTH_KEY } from "@/config";
import axios from "axios";
import { NextRequest } from "next/server";

const pinFileToIPFS = async (parsedFormData: FormData) => {
  const name = parsedFormData.get("name");
  const file = parsedFormData.get("file");

  const formData = new FormData();
  const pinataMetadata = JSON.stringify({
    name: `${name}-file`,
  });
  formData.append("pinataMetadata", pinataMetadata);
  const pinataOptions = JSON.stringify({
    cidVersion: 0,
  });
  formData.append("pinataOptions", pinataOptions);
  formData.append("file", file as File);

  const { data } = await axios.post(
    "https://api.pinata.cloud/pinning/pinFileToIPFS",
    formData,
    {
      maxBodyLength: Infinity,
      headers: {
        Authorization: JWT_AUTH_KEY,
      },
    }
  );

  if (!data || !data?.IpfsHash) {
    throw new Error("Invalid IPFS Hash");
  }

  return data;
};

const pinMetadataToIpfs = async (
  parsedFormData: FormData,
  ipfsFileData: { IpfsHash: string }
) => {
  const name = parsedFormData.get("name");
  const description = parsedFormData.get("description");
  const attributes = parsedFormData.get("attributes");
  const image = ipfsFileData?.IpfsHash;

  const assetMetadata = {
    pinataContent: {
      name,
      description,
      attributes,
      image: `ipfs://${image}`,
    },
    pinataMetadata: {
      name: `${image}-${Date.now()}-metadata.json`,
    },
  };

  const { data } = await axios.post(
    "https://api.pinata.cloud/pinning/pinJSONToIPFS",
    assetMetadata,
    {
      headers: {
        Authorization: JWT_AUTH_KEY,
      },
    }
  );

  return { data, assetMetadata };
};

export async function POST(req: NextRequest) {
  const parsedFormData = await req.formData();

  try {
    const pinFileData = await pinFileToIPFS(parsedFormData);
    const pinMetadataResponse = await pinMetadataToIpfs(
      parsedFormData,
      pinFileData
    );

    return Response.json({ data: pinMetadataResponse });
  } catch (e) {
    return Response.json({ error: e });
  }
}
