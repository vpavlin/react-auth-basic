export const TOTAL_RAISE = 30000;

export enum ChainID {
    BSC = 56,
    BSC_TESTNET = 97,

    AVAX = 0,
    AVAX_TESTNET = 43113,

    POLY = 137,
    POLY_TESTNET = 80001,

    FTM = 0,
    FTM_TESTNET = 4002,
}

export const CHAINS = [ChainID.BSC_TESTNET, ChainID.AVAX_TESTNET, ChainID.FTM_TESTNET, ChainID.POLY_TESTNET];

interface IContracts {
    [key: number]: { [key: string]: string };
  }

export const Contracts:IContracts = {
    [ChainID.POLY_TESTNET]: {
        NFT: "0x70722fF1a0B7BC91102931f2f995e4bf18bEce4D",
        UTILITY: "0x79Af1b7d8FC489e11c01350CAcA166e0D931DA3A", 
    },
}


interface IRpcUrls {
    [key: number]: string;
}

export const RpcUrls:IRpcUrls = {
    [ChainID.BSC_TESTNET]: 'https://data-seed-prebsc-1-s1.binance.org:8545/',
    [ChainID.BSC]: 'https://bsc-dataseed.binance.org/',
    [ChainID.AVAX_TESTNET]: 'https://api.avax-test.network/ext/bc/C/rpc',
    //[ChainID.AVAX]: '',
    [ChainID.POLY_TESTNET]: 'https://matic-mumbai.chainstacklabs.com',
    //[ChainID.POLY]: '',
    [ChainID.FTM_TESTNET]: 'https://rpc.testnet.fantom.network/',
    //[ChainID.FTM]: '',

}

export const Networks:IRpcUrls = {
    [ChainID.BSC_TESTNET] : "BSC Testnet",
    [ChainID.POLY_TESTNET] : "Mumbai Testnet",
    [ChainID.POLY]: "Polygon",
    [ChainID.AVAX_TESTNET] : "AVAX Testnet",
    [ChainID.FTM_TESTNET] : "FTM Testnet",
}

export const Explorers:IRpcUrls = {
    [ChainID.BSC_TESTNET] : "http://testnet.bscscan.com/",
    [ChainID.POLY_TESTNET] : "https://mumbai.polygonscan.com/",
    [ChainID.AVAX_TESTNET] : "https://testnet.snowtrace.io/",
    [ChainID.FTM_TESTNET] : "https://testnet.ftmscan.com/",
}

export const DEFAULT_CHAIN = ChainID.POLY_TESTNET;

export const DEFAULT_CURRENCTY = "matic";


export const ARWEAVE_BASE = "https://arweave.net/";

export const ADMIN:string = "";

//export const MCX_API_URL = "https://api.metaconflux.defidoc.org/"
//export const MCX_API_URL = "http://localhost:8081/"
export const MCX_API_URL = "http://something.app.localhost:8081/"

export interface ITransformer {
    element: JSX.Element;
    name: string;
}

export interface ITransformerProps {
    setSpec:(key:any, spec:any) => void
    _ref:any
}