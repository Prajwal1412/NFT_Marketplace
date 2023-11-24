import "../styles/global.css";
//INTRNAL IMPORT
import { Footer, Navbar } from "../components/componentindex";
import { NFTMarketplaceprovider } from "@/connection/Contractconnection";
// WALLET CONNECT
import {
  EthereumClient,
  w3mConnectors,
  w3mProvider,
} from "@web3modal/ethereum";
import { Web3Modal } from "@web3modal/react";
import { configureChains, createConfig, WagmiConfig } from "wagmi";
import { arbitrum, hardhat, localhost, mainnet, polygon } from "wagmi/chains";

const chains = [arbitrum, mainnet, polygon, localhost, hardhat];
const projectId = "4483d080b107d7e34164a6ec0b775c33";

const { publicClient } = configureChains(chains, [w3mProvider({ projectId })]);
const wagmiConfig = createConfig({
  autoConnect: false,
  connectors: w3mConnectors({ projectId, chains }),
  publicClient,
});
const ethereumClient = new EthereumClient(wagmiConfig, chains);

const MyApp = ({ Component, pageProps }) => (
  <div>
    <NFTMarketplaceprovider>
      <WagmiConfig config={wagmiConfig}>
        <Navbar />
      </WagmiConfig>
      <Component {...pageProps} />

      <Web3Modal projectId={projectId} ethereumClient={ethereumClient} />

      <Footer />
    </NFTMarketplaceprovider>
  </div>
);

export default MyApp;
