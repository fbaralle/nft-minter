import BlockchainStats from "./BlockchainStats";
import ConnectWalletButton from "./ConnectWalletButton";

const HeaderMenu = () => {
  return (
    <div className="w-full justify-between flex flex-row mb-16">
      {/* <BlockchainStats /> */}
      <w3m-network-button />
      {/* <ConnectWalletButton /> */}
      <w3m-button />
    </div>
  );
};

export default HeaderMenu;
