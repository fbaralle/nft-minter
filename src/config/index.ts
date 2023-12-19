enum NetworkNames {
  "Mainnet" = "mainnet",
  "Goerli" = "goerli",
}

const MINTING_CONTRACT_ADDRESS_LIST: { [key in NetworkNames]: `0x${string}` } =
  {
    [NetworkNames.Goerli]: "0x3D216932E996c025E1d417c0396b1105a68963c6",
    [NetworkNames.Mainnet]: "0x",
  };

export const networkName =
  process.env.NEXT_PUBLIC_NETWORK || NetworkNames.Goerli;

export const JWT_AUTH_KEY = `Bearer ${process.env.PINATA_API_KEY}`;
export const MINTING_CONTRACT_ADDRESS =
  MINTING_CONTRACT_ADDRESS_LIST[networkName as NetworkNames];
export const INFURA_API_KEY = process.env.INFURA_API_KEY as string;
export const WALLET_CONNECT_PROJ_ID = process.env
  .NEXT_PUBLIC_WALLET_CONNECT_PROJ_ID as string;
export const IFPS_EXPLORER_URL = "https://ipfs.io/ipfs/";
export const PINATA_GATEWAY_BASE_URL = process.env.NEXT_PUBLIC_PINATA_GATEWAY;
