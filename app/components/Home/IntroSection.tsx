import { IoSwapHorizontalOutline } from "react-icons/io5"
import { useEffect, useRef, useState } from "react";
import { useAssetsStore } from "@/app/lib/store/useAssetsStore";
import { CoinDropdownProps, CurrencyInterface, SwapProps } from "@/app/lib/Interfaces";
import AppImage from "@/app/lib/Image";
import { BsArrowDown, BsArrowDownShort } from "react-icons/bs";
import { IoIosArrowDown } from "react-icons/io";
export const IntroSection = () => {
    const { assets, fetchAssets } = useAssetsStore();
    const [fromCoin, setFromCoin] = useState<CurrencyInterface | null>(null);
    const [toCoin, setToCoin] = useState<CurrencyInterface | null>(null);
    const [open, setOpen] = useState<boolean>(false);
    const ref = useRef<HTMLDivElement | null>(null);

    useEffect(() => {
        fetchAssets();
    }, [fetchAssets]);
    return (
        <section className="py-54 relative">
            <div className="site-width-md relative z-10">
                <div className=" relative z-10">
                    <div className="text-center">
                        <h1 className="dark:text-white h2-tag font-light!">Everything You Need in</h1>
                        <h1 className="dark:text-white h2-tag"> One <span className="text-thm">Web3</span> Platform</h1>
                    </div>
                    <p className="dark:text-white p-tag max-w-2xl mx-auto text-center font-light!">Trade, earn, bridge, and explore Web3 with powerful tools built for beginners and pros.</p>
                    <SwapSection assets={assets} fromCoin={fromCoin} setFromCoin={setFromCoin} toCoin={toCoin} setToCoin={setToCoin} open={open} setOpen={setOpen} />
                    <StatsBar />
                </div>
                <AppImage
                    src="/images/btc-coin.png"
                    alt="Btc Coin"
                    wrapperClassName="w-[172px] h-[172px] absolute top-10 left-10  animate-bounce-slow"
                    sizes="172px"
                />
                <AppImage
                    src="/images/bnb.png"
                    alt="Bnb Coin"
                    wrapperClassName="w-[72px] h-[72px] absolute top-15 right-70 animate-bounce-slow"
                    sizes="72px"
                />
                <AppImage
                    src="/images/doge.png"
                    alt="Doge Coin"
                    wrapperClassName="w-[100px] h-[100px] absolute -top-10 right-0 animate-bounce-slow"
                    sizes="100px"
                />
            </div>
            <div className="h-px w-full bg-linear-to-l from-[#1d1d1d7a] via-[#27A043] to-[#1d1d1d7a]" />
            {/* <WaveBackground /> */}
            <AppImage
                src="/images/waves.png"
                alt="Doge Coin"
                wrapperClassName="w-full h-full absolute -top-0 left-0 animate-bounce-slow"
                sizes="1800px"
            />
        </section>
    )
}



export default function SwapSection({ assets, fromCoin, setFromCoin, toCoin, setToCoin, open, setOpen }: SwapProps) {
    useEffect(() => {
        if (assets.length >= 2) {
            setFromCoin(assets[0]);
            setToCoin(assets[1]);
        }
    }, [assets]);

    return (
        <section className="max-w-5xl mx-auto mt-20 mb-32">

            <div className="grid grid-cols-[1fr_200px] gap-8 items-center border-2 border-[#565b6a] backdrop-blur-3xl p-6 rounded-lg bg-[#101e415c]">

                {/* Inputs */}
                <div className="flex items-center gap-4 w-full">

                    {/* From */}
                    <div className="flex items-center bg-[#192444] rounded-lg  w-full">
                        <input
                            type="text"
                            placeholder="0.00"
                            className="bg-transparent px-4 py-4 text-white focus:outline-none w-full"
                        />
                        <CoinDropdown
                            assets={assets}
                            value={fromCoin}
                            onChange={setFromCoin}
                            open={open}
                            setOpen={setOpen}
                        />
                    </div>

                    <div className="w-12 flex justify-center">
                        <IoSwapHorizontalOutline className="text-2xl text-white" />
                    </div>

                    {/* To */}
                    <div className="flex items-center bg-[#192444] rounded-lg w-full">
                        <input
                            type="text"
                            placeholder="0.00"
                            className="bg-transparent px-4 py-4 text-white focus:outline-none w-full"
                        />
                        <CoinDropdown
                            assets={assets}
                            value={toCoin}
                            onChange={setToCoin}
                            open={open}
                            setOpen={setOpen}
                        />
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



function StatsBar() {
    const stats = [
        { value: "$3.40T", label: "Total Trading Volume" },
        { value: "7.17M", label: "Users" },
        { value: "$2.58B", label: "Open Interest" },
        { value: "$1.07B", label: "TVL" },
        { value: "181", label: "Symbols" },
    ];

    return (
        <div className="w-full py-10  mt-10 rounded-lg ">
            <div className=" flex items-center justify-between px-6 pb-8">
                {stats.map((stat, i) => (
                    <div key={stat.label} className="flex items-center w-full">
                        {/* Stat */}
                        <div className="flex flex-col items-center w-full">
                            <span className="text-white h3-tag font-semibold tracking-wide font-saira">
                                {stat.value}
                            </span>
                            <span className="text-gray-400 text-sm mt-1 font-saira">
                                {stat.label}
                            </span>
                        </div>

                        {/* Divider */}
                        {i !== stats.length - 1 && (
                            <div className="h-12 w-px bg-linear-to-b from-[#003D0E] via-[#27A043] to-[#003D0E]" />
                        )}
                    </div>
                ))}
            </div>

        </div>
    );
}



function CoinDropdown({ assets, value, onChange }: CoinDropdownProps) {
    const [open, setOpen] = useState(false);
    const ref = useRef<HTMLDivElement | null>(null);

    useEffect(() => {
        const handler = (e: MouseEvent) => {
            if (ref.current && !ref.current.contains(e.target as Node)) {
                setOpen(false);
            }
        };
        document.addEventListener("mousedown", handler);
        return () => document.removeEventListener("mousedown", handler);
    }, []);

    return (
        <div ref={ref} className="relative w-44">
            <button
                onClick={() => setOpen((v) => !v)}
                className="w-full px-4 py-4 bg-[#192444] backdrop-blur-3xl flex items-center gap-2 text-white rounded-lg cursor-pointer"
            >
                <AppImage
                    src={value?.vendors_logopath}
                    alt={value?.vendors_vendorname || "Select"}
                    wrapperClassName="w-8 h-8"
                    sizes="32px"
                />
                <span>{value?.vendors_vendorshortcode || "Select"}</span>
                <IoIosArrowDown className={`transition-all duration-250 ${open ? "rotate-180" : ""}`} />
            </button>

            {open && (
                <div className="absolute right-0 mt-2 max-h-54 overflow-auto w-42 bg-[#101e41] border rounded-md ">
                    {assets.map((coin) => (
                        <button
                            key={coin.vendors_uuid}
                            onClick={() => {
                                onChange(coin);
                                setOpen(false);
                            }}
                            className="flex items-center gap-3 px-4 py-3 text-white hover:bg-[#1f2d55] w-full cursor-pointer"
                        >
                            <AppImage
                                src={coin.vendors_logopath}
                                alt={coin.vendors_vendorname}
                                wrapperClassName="w-8 h-8"
                                sizes="32px"
                            />
                            {coin.vendors_vendorshortcode}
                        </button>
                    ))}
                </div>
            )}
        </div>
    );
}
export function WaveBackground() {
    return (
        <div className="absolute top-[40%] left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full overflow-hidden rotate-178 opacity-50 scale-100">
            <svg
                viewBox="0 0 2880 320"
                preserveAspectRatio="none"
                className="absolute bottom-0 h-full w-full"
            >
                {/* Gradient definitions */}
                <defs>
                    <linearGradient id="grad1" x1="0%" y1="0%" x2="100%" y2="0%">
                        <stop offset="0%" stopColor="#2563eb" />
                        <stop offset="100%" stopColor="#22d3ee" />
                    </linearGradient>
                    <linearGradient id="grad2" x1="0%" y1="0%" x2="100%" y2="0%">
                        <stop offset="0%" stopColor="#22d3ee" />
                        <stop offset="100%" stopColor="#14b8a6" />
                    </linearGradient>
                    <linearGradient id="grad3" x1="0%" y1="0%" x2="100%" y2="0%">
                        <stop offset="0%" stopColor="#14b8a6" />
                        <stop offset="100%" stopColor="#10b981" />
                    </linearGradient>
                </defs>

                {/* Wave 1 */}
                <g transform-origin="50% 50%">
                    <path
                        d="M0,160 C240,120 480,200 720,180 C960,160 1200,120 1440,140
               C1680,160 1920,220 2160,200 C2400,180 2640,140 2880,120"
                        fill="none"
                        stroke="url(#grad1)"
                        strokeWidth="3"
                    >
                        {/* Horizontal momentum */}
                        <animateTransform
                            attributeName="transform"
                            type="translate"
                            values="0 0; -360 0; -720 0; -1080 0; -1440 0"
                            keyTimes="0;0.25;0.5;0.75;1"
                            dur="30s"
                            repeatCount="indefinite"
                        />
                        {/* Oscillating rotation for momentum */}
                        <animateTransform
                            attributeName="transform"
                            type="rotate"
                            values="0 160; 15 160; -15 160; 0 160"
                            keyTimes="0;0.33;0.66;1"
                            dur="60s"
                            repeatCount="indefinite"
                        />
                    </path>
                </g>

                {/* Wave 2 */}
                <g transform-origin="50% 50%" opacity="0.8">
                    <path
                        d="M0,190 C260,220 520,140 780,160 C1040,180 1300,210 1560,190
               C1820,170 2080,120 2340,160 C2600,190 2760,180 2880,170"
                        fill="none"
                        stroke="url(#grad2)"
                        strokeWidth="2.5"
                    >
                        <animateTransform
                            attributeName="transform"
                            type="translate"
                            values="0 0; 360 0; 720 0; 1080 0; 1440 0"
                            keyTimes="0;0.25;0.5;0.75;1"
                            dur="24s"
                            repeatCount="indefinite"
                        />
                        <animateTransform
                            attributeName="transform"
                            type="rotate"
                            values="0 160; -10 160; 10 160; 0 160"
                            keyTimes="0;0.33;0.66;1"
                            dur="50s"
                            repeatCount="indefinite"
                        />
                    </path>
                </g>

                {/* Wave 3 */}
                <g transform-origin="50% 50%" opacity="0.6">
                    <path
                        d="M0,210 C300,170 600,230 900,190 C1200,150 1500,210 1800,190
               C2100,170 2400,200 2700,180 C2820,170 2880,180 2880,180"
                        fill="none"
                        stroke="url(#grad3)"
                        strokeWidth="2"
                    >
                        <animateTransform
                            attributeName="transform"
                            type="translate"
                            values="0 0; -360 0; -720 0; -1080 0; -1440 0"
                            keyTimes="0;0.25;0.5;0.75;1"
                            dur="18s"
                            repeatCount="indefinite"
                        />
                        <animateTransform
                            attributeName="transform"
                            type="rotate"
                            values="0 160; 10 160; -10 160; 0 160"
                            keyTimes="0;0.33;0.66;1"
                            dur="40s"
                            repeatCount="indefinite"
                        />
                    </path>
                </g>
            </svg>
        </div>
    );
}


