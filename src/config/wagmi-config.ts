import { createWeb3Modal, defaultWagmiConfig } from "@web3modal/wagmi/react";
import { configureChains, createConfig } from "wagmi";
import { mainnet, sepolia, goerli } from "wagmi/chains";
import { infuraProvider } from "wagmi/providers/infura";
import { INFURA_API_KEY, WALLET_CONNECT_PROJ_ID } from ".";

const projectId = WALLET_CONNECT_PROJ_ID;

const metadata = {
  name: "NFT Minter",
  description: "Mint your own nfts",
  url: "https://wagmi.sh",
  icons: ["https://wagmi.sh/icon.png"],
};

const { chains } = configureChains(
  [mainnet, sepolia, goerli],
  [infuraProvider({ apiKey: INFURA_API_KEY })]
);

export const config = defaultWagmiConfig({ chains, projectId, metadata });
export const createWagmiWeb3Modal = () =>
  createWeb3Modal({ wagmiConfig: config, projectId, chains });
