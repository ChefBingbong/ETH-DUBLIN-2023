import PolygonChainLogo from "../../public/svgs/polygon.svg"

export declare enum Chain {
    BinanceSmartChain = 'BinanceSmartChain',
    Polygon = 'Polygon',
}


export interface ChainType {
    chainName: string;
    logo: React.FunctionComponent<React.SVGProps<SVGSVGElement>>;
    isTestnet: boolean;
    id: number;
    rpcUrls: string[];
    symbol: string;
    currency: string;
    explorerLink: string
}

export enum SupportedChainId {
  MAINNET = 1,
  POLYGON = 137,
  POLYGON_MUMBAI = 80001,
}

export const CHAINS: { [key: number]: ChainType } = {
  [SupportedChainId.POLYGON]: {
    chainName: "Polygon",
    logo: PolygonChainLogo as ChainType["logo"],
    isTestnet: false,
    id: 137,
    rpcUrls: ["https://polygon-rpc.com/"],
    symbol: "MATIC",
    currency: "MATIC",
    explorerLink: "https://polygonscan.com/",
  },
  [SupportedChainId.POLYGON_MUMBAI]: {
    chainName: "Polygon Testnet",
    logo: PolygonChainLogo as ChainType["logo"],
    isTestnet: true,
    id: 80001,
    rpcUrls: ["https://matic-mumbai.maticvigil.com/"],
    symbol: "tMATIC",
    currency: "tMATIC",
    explorerLink: "https://polygonscan.com/",
  },

};