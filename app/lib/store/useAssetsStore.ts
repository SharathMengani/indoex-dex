import { create } from "zustand";

export interface Asset {
    id: string;
    name: string;
    symbol: string;
    // add more fields based on API response
}

interface AssetsState {
    assets: Asset[];
    loading: boolean;
    error: string | null;
    fetchAssets: () => Promise<void>;
}

export const useAssetsStore = create<AssetsState>((set: any) => ({
    assets: [],
    loading: false,
    error: null,

    fetchAssets: async () => { 
        set({ loading: true, error: null });

        try {
            const res = await fetch("https://core.paycio.ae/assets/getassets");

            if (!res.ok) {
                throw new Error("Failed to fetch assets");
            }

            const data = await res.json();

            set({
                assets: data?.data ?? data, // adjust if API wraps response
                loading: false,
            });
        } catch (err: any) {
            set({
                error: err.message || "Something went wrong",
                loading: false,
            });
        }
    },
}));
