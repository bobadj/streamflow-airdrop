import { useCallback, type FC } from "react";
import { useWallet } from "@solana/wallet-adapter-react";
import { useWalletModal } from "@solana/wallet-adapter-react-ui";
import { Button } from "./ui/Button";
import { shortenPublicKey } from "../utils";

export const ConnectWallet: FC = () => {
  const { setVisible } = useWalletModal();
  const { connected, publicKey, disconnect } = useWallet();

  const onButtonClick = useCallback(() => {
    if (connected) {
      disconnect();
    } else {
      setVisible(true);
    }
  }, [connected, disconnect, setVisible]);

  return (
    <div className="relative cursor-pointer">
      <Button onClick={onButtonClick}>
        {connected
          ? shortenPublicKey(publicKey?.toString() || "")
          : "Connect Wallet"}
      </Button>
    </div>
  );
};
