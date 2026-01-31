export interface CurrencyInterface {
    vendors_uuid: string;
    vendors_is_swap: boolean;
    vendors_cointype: "TOKEN" | "COIN";
    vendors_id: string;
    vendors_transferfee: string;
    vendors_vendorshortcode: string;
    vendors_chainid: string;
    vendors_depositfee: string;
    vendors_network: string;
    vendors_mindeposit: string;
    vendors_vendorname: string;
    vendors_usdrate: number;
    vendors_required_memo: boolean;
    vendors_status: "ACTIVE" | "INACTIVE";
    vendors_logopath: string;
    vendors_currencytype: "Crypto" | "Fiat";
    vendors_withdrawlvendorticker: string;
}
export interface SwapProps {
    assets: CurrencyInterface[];
    fromCoin: CurrencyInterface | null;
    setFromCoin: (coin: CurrencyInterface) => void;
    toCoin: CurrencyInterface | null;
    setToCoin: (coin: CurrencyInterface) => void;
    open: boolean;
    setOpen: (open: boolean) => void;
}
export interface CoinDropdownProps {
    assets: CurrencyInterface[];
    value: CurrencyInterface | null;
    onChange: (coin: CurrencyInterface) => void;
    open: boolean;
    setOpen: (open: boolean) => void;
}