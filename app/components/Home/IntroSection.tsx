import { IoSwapHorizontalOutline } from "react-icons/io5"
import { useEffect, useState } from "react";
import { useAssetsStore } from "@/app/lib/store/useAssetsStore";
export const IntroSection = () => {
    return (
        <section className="py-36">
            <div className="site-width-md">
                <div className="text-center">
                    <h1 className="dark:text-white h2-tag font-light!">Everything You Need in</h1>
                    <h1 className="dark:text-white h2-tag"> One <span className="text-thm">Web3</span> Platform</h1>
                </div>
                <p className="dark:text-white p-tag max-w-2xl mx-auto text-center">Trade, earn, bridge, and explore Web3 with powerful tools built for beginners and pros.</p>
                <SwapSection />
            </div>
        </section>
    )
}


const coins = ["BTC", "ETH", "USDT", "USDC"];

export default function SwapSection() {
    const [fromCoin, setFromCoin] = useState("BTC");
    const [toCoin, setToCoin] = useState("USDT");
    const { assets, loading, error, fetchAssets } = useAssetsStore();

    useEffect(() => {
        fetchAssets();
    }, [fetchAssets]);
    return (
        <section className="max-w-5xl mx-auto mt-12">
            <div className="grid grid-cols-[1fr_200px] gap-8 items-center justify-between border-2 border-[#565b6a] backdrop-blur-3xl p-6 rounded-lg bg-[#101e41]">

                {/* Inputs */}
                <div className="flex items-center gap-4 w-full">

                    {/* From */}
                    <div className="flex items-center bg-[#192444] rounded-lg overflow-hidden w-full">
                        <input
                            type="text"
                            placeholder="0.00"
                            className="bg-transparent px-4 py-4 text-white focus:outline-none w-full"
                        />
                        <select
                            value={fromCoin}
                            onChange={(e) => setFromCoin(e.target.value)}
                            className="px-3 py-4 text-white focus:outline-none w-32 bg-[#192444] cursor-pointer"
                        >
                            {coins.map((coin) => (
                                <option key={coin} value={coin}>
                                    {coin}
                                </option>
                            ))}
                        </select>
                    </div>

                    <div className="w-12">
                        <IoSwapHorizontalOutline className="text-2xl text-white" />
                    </div>

                    {/* To */}
                    <div className="flex items-center bg-[#192444] rounded-lg overflow-hidden  w-full">
                        <input
                            type="text"
                            placeholder="0.00"
                            className="bg-transparent px-4 py-4 text-white focus:outline-none w-full"
                        />
                        <select
                            value={toCoin}
                            onChange={(e) => setToCoin(e.target.value)}
                            className="px-3 py-4 text-white focus:outline-none w-32 bg-[#192444] cursor-pointer"
                        >
                            {coins.map((coin) => (
                                <option key={coin} value={coin}>
                                    {coin}
                                </option>
                            ))}
                        </select>
                    </div>
                </div>

                {/* CTA */}
                <button className="bg-thm px-10 text-xl py-4 font-semibold rounded-full text-white w-full">
                    Buy Crypto
                </button>
            </div>
        </section>
    );
}
