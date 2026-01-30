const path = "/images/coins/"

export interface Currencies {
    vendors_id: string;       // could be string or number depending on API
    vendors_vendorshortcode: string;
    vendors_network: string;
    vendors_vendorname: string;
    vendors_usdrate: number;  // USD conversion rate
    vendors_status: string;   // e.g., "MAINTANANCE"
    vendors_logopath: string; // URL of logo
    vendors_decimals: Number;
}

export const currencies: Currencies[] = [
    {
        "vendors_id": "2",
        "vendors_vendorshortcode": "BTC",
        "vendors_network": "Bitcoin Mainnet",
        "vendors_vendorname": "Bitcoin",
        "vendors_usdrate": 117599.155,
        "vendors_status": "ACTIVE",
        "vendors_logopath": `${path}btc.png`,
        "vendors_decimals": 0,
    },
    {
        "vendors_id": "1083",
        "vendors_vendorshortcode": "ETH",
        "vendors_network": "Arbitrum Network",
        "vendors_vendorname": "Ethereum",
        "vendors_usdrate": 2976.115,
        "vendors_status": "ACTIVE",
        "vendors_logopath": `${path}eth.png`,
        "vendors_decimals": 1,
    },
    {
        "vendors_id": "91",
        "vendors_vendorshortcode": "BNB",
        "vendors_network": "Binance Smart Chain",
        "vendors_vendorname": "Binance Coin",
        "vendors_usdrate": 684.845,
        "vendors_status": "ACTIVE",
        "vendors_logopath": `${path}bnb.png`,
        "vendors_decimals": 2,
    },
    {
        "vendors_id": "286",
        "vendors_vendorshortcode": "DOGE",
        "vendors_network": "Doge Coin",
        "vendors_vendorname": "Doge",
        "vendors_usdrate": 0.19661499999999998,
        "vendors_status": "ACTIVE",
        "vendors_logopath": `${path}doge.png`,
        "vendors_decimals": 5,
    },
    {
        "vendors_id": "378",
        "vendors_vendorshortcode": "POL",
        "vendors_network": "Polygon Chain",
        "vendors_vendorname": "Polygon",
        "vendors_usdrate": 0.22405,
        "vendors_status": "ACTIVE",
        "vendors_logopath": `${path}matic.png`,
        "vendors_decimals": 5,
    },
    {
        "vendors_id": "519",
        "vendors_vendorshortcode": "SOL",
        "vendors_network": "Solana Mainnet",
        "vendors_vendorname": "Solana",
        "vendors_usdrate": 163.415,
        "vendors_status": "ACTIVE",
        "vendors_logopath": `${path}sol.png`,
        "vendors_decimals": 2,
    },
    {
        "vendors_id": "1051",
        "vendors_vendorshortcode": "ARB",
        "vendors_network": "Ethereum Network",
        "vendors_vendorname": "Arbitrum",
        "vendors_usdrate": 0.41145,
        "vendors_status": "ACTIVE",
        "vendors_logopath": `${path}arb.png`,
        "vendors_decimals": 5,
    },
]

export interface SpotCurrencies {
    vendors_id: string;       // could be string or number depending on API
    vendors_vendorshortcode: string;
    vendors_network: string;
    vendors_vendorname: string;
    vendors_usdrate: number;  // USD conversion rate
    vendors_status: string;   // e.g., "MAINTANANCE"
    vendors_logopath: string; // URL of logo
    vendors_decimals: Number;
    vendors_pairmapid: string;
}

export const spotcurrencies: SpotCurrencies[] = [
    {
        "vendors_id": "2",
        "vendors_vendorshortcode": "BTC",
        "vendors_network": "Bitcoin Mainnet",
        "vendors_vendorname": "Bitcoin",
        "vendors_usdrate": 117599.155,
        "vendors_status": "ACTIVE",
        "vendors_logopath": `${path}btc.png`,
        "vendors_decimals": 0,
        "vendors_pairmapid": "@142"
    },
    {
        "vendors_id": "1083",
        "vendors_vendorshortcode": "ETH",
        "vendors_network": "Arbitrum Network",
        "vendors_vendorname": "Ethereum",
        "vendors_usdrate": 2976.115,
        "vendors_status": "ACTIVE",
        "vendors_logopath": `${path}eth.png`,
        "vendors_decimals": 1,
        "vendors_pairmapid": "@151"
    }, {
        "vendors_id": "519",
        "vendors_vendorshortcode": "SOL",
        "vendors_network": "Solana Mainnet",
        "vendors_vendorname": "Solana",
        "vendors_usdrate": 163.415,
        "vendors_status": "ACTIVE",
        "vendors_logopath": `${path}sol.png`,
        "vendors_decimals": 2,
        "vendors_pairmapid": "@156"
    }, {
        "vendors_id": "520",
        "vendors_vendorshortcode": "BTC",
        "vendors_network": "Bitcoin Mainnet",
        "vendors_vendorname": "Bitcoin",
        "vendors_usdrate": 163.415,
        "vendors_status": "ACTIVE",
        "vendors_logopath": `${path}btc.png`,
        "vendors_decimals": 2,
        "vendors_pairmapid": "@234"
    }, {
        "vendors_id": "520",
        "vendors_vendorshortcode": "HYPE",
        "vendors_network": "Bitcoin Mainnet",
        "vendors_vendorname": "Bitcoin",
        "vendors_usdrate": 163.415,
        "vendors_status": "ACTIVE",
        "vendors_logopath": `${path}btc.png`,
        "vendors_decimals": 3,
        "vendors_pairmapid": "@107"
    }, {
        "vendors_id": "520",
        "vendors_vendorshortcode": "MON",
        "vendors_network": "Bitcoin Mainnet",
        "vendors_vendorname": "Monad",
        "vendors_usdrate": 163.415,
        "vendors_status": "ACTIVE",
        "vendors_logopath": `${path}btc.png`,
        "vendors_decimals": 6,
        "vendors_pairmapid": "@243"
    }, {
        "vendors_id": "520",
        "vendors_vendorshortcode": "FARTCOIN",
        "vendors_network": "Bitcoin Mainnet",
        "vendors_vendorname": "Monad",
        "vendors_usdrate": 163.415,
        "vendors_status": "ACTIVE",
        "vendors_logopath": `${path}fart.png`,
        "vendors_decimals": 6,
        "vendors_pairmapid": "@162"
    }, {
        "vendors_id": "520",
        "vendors_vendorshortcode": "PUMP",
        "vendors_network": "Bitcoin Mainnet",
        "vendors_vendorname": "Monad",
        "vendors_usdrate": 163.415,
        "vendors_status": "ACTIVE",
        "vendors_logopath": `${path}btc.png`,
        "vendors_decimals": 7,
        "vendors_pairmapid": "@188"
    }, {
        "vendors_id": "520",
        "vendors_vendorshortcode": "BONK",
        "vendors_network": "Bitcoin Mainnet",
        "vendors_vendorname": "Monad",
        "vendors_usdrate": 163.415,
        "vendors_status": "ACTIVE",
        "vendors_logopath": `${path}btc.png`,
        "vendors_decimals": 8,
        "vendors_pairmapid": "@194"
    }, {
        "vendors_id": "520",
        "vendors_vendorshortcode": "PENGU",
        "vendors_network": "Bitcoin Mainnet",
        "vendors_vendorname": "Monad",
        "vendors_usdrate": 163.415,
        "vendors_status": "ACTIVE",
        "vendors_logopath": `${path}pengu.png`,
        "vendors_decimals": 6,
        "vendors_pairmapid": "@184"
    }, {
        "vendors_id": "520",
        "vendors_vendorshortcode": "USDT",
        "vendors_network": "Bitcoin Mainnet",
        "vendors_vendorname": "Monad",
        "vendors_usdrate": 163.415,
        "vendors_status": "ACTIVE",
        "vendors_logopath": `${path}btc.png`,
        "vendors_decimals": 5,
        "vendors_pairmapid": "@166"
    }
]