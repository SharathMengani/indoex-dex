"use client";

import { PrivyProvider } from "@privy-io/react-auth";
import { ThemeProvider } from "next-themes";

export function Providers({ children }: { children: React.ReactNode }) {
    return (
        <ThemeProvider attribute="class" defaultTheme="dark">
            <PrivyProvider
                appId="cmkmajzrh04h1l40chno4vpk3"
                clientId="client-WY6V996UJ7LbRoi8VhrHYBmye1j1UVkcrjVV2gq8dyDap"
                config={{
                    // Create embedded wallets for users who don't have a wallet
                    embeddedWallets: {
                        ethereum: {
                            createOnLogin: 'all-users'
                        }
                    }
                }}
            >
                {children}
            </PrivyProvider>
        </ThemeProvider>
    );
}
