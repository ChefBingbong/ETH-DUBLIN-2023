import { InjectedConnector } from "@web3-react/injected-connector";
import { WalletConnectConnector } from "@web3-react/walletconnect-connector";

const RPC_URL = "https://goerli.infura.io/v3/62302e9d9b074d8baa2344a5550b6cc9"


export enum SupportedChainId {
  MAINNET = 1,
  GOERLI = 5,
}

export const CHAIN_IDS_TO_NAMES = {
  [SupportedChainId.MAINNET]: "mainnet",
  [SupportedChainId.GOERLI]: "goerli",
};

export const ALL_SUPPORTED_CHAIN_IDS: SupportedChainId[] = Object.values(
  SupportedChainId
).filter((id) => typeof id === "number") as SupportedChainId[];

export const injected = new InjectedConnector({
  supportedChainIds: Array.from(Array(100000).keys()),
});

export const walletconnect = new WalletConnectConnector({
  rpc: RPC_URL,
  chainId: 5,
  bridge: "https://bridge.walletconnect.org",
  qrcode: true,
});
