import "@styles/theme.scss";
import "tippy.js/dist/tippy.css";
import "tippy.js/themes/light.css";
import "public/styles.scss";
import type { AppProps } from "next/app";
import { ThemeProvider } from "next-themes";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "react-hot-toast";
import { WagmiConfig } from "wagmi";
import WalletProvider from "@/context/wallet-data.provider";
import { createWagmiWeb3Modal, config } from "@/config/wagmi-config";

const queryClient = new QueryClient();

createWagmiWeb3Modal();

export default function App({ Component, pageProps }: AppProps) {
  return (
    <ThemeProvider
      defaultTheme="system"
      enableSystem={true}
      attribute="class"
      storageKey="theme"
    >
      <QueryClientProvider client={queryClient}>
        <WagmiConfig config={config}>
          <Toaster
            toastOptions={{
              style: {
                fontFamily: "var(--font-lexend)",
                backgroundColor: "var(--textDefaultColor)",
                color: "var(--backgroundMainColor)",
              },
            }}
            containerStyle={{
              top: "10%",
              bottom: "0",
            }}
          />
          <Component {...pageProps} />
        </WagmiConfig>
      </QueryClientProvider>
    </ThemeProvider>
  );
}
