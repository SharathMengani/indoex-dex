import Marquee from "react-fast-marquee";

export default function WhyWeb3() {
    return (
        <div className="w-full pb-28 overflow-hidden">
            <div className="text-center mb-45">
                <h1 className="h2-tag text-thm">Why Indoex Web3?</h1>
                <p className="dark:text-white max-w-4xl mx-auto p-tag">Indoex Web3 combines the simplicity of a centralized exchange with the freedom of non-custodial Web3.
                    Connect your wallet and instantly access trading, staking, bridging, and DeFi tools across multiple blockchains.
                </p>
            </div>
            <div className="h-0.5 w-full bg-linear-to-l from-[#1d1d1d7a] via-[#27A043] to-[#1d1d1d7a]" />
            <div className="relative flex items-center">
                {/* Left to Right Marquee */}
                <Marquee
                    speed={50}
                    gradient={false}
                    direction="right"
                    className="flex-1"
                >
                    <MarqueeContent />
                </Marquee>

                {/* Center Fixed Circle */}
                <div className="absolute left-1/2 -translate-x-1/2 z-10 pointer-events-none">
                    <div className="flex items-center justify-center w-84 h-84 rounded-full bg-[#050629] shadow-lg">
                        <div className="flex items-center justify-center w-80 h-80 rounded-full bg-[#2BBA4D] shadow-lg">
                            <div className="flex items-center justify-center w-45 h-45 rounded-full bg-[#050629] text-white font-semibold h3-tag">
                                Web3
                            </div>
                        </div>
                    </div>
                </div>

                {/* Right to Left Marquee */}
                <Marquee
                    speed={50}
                    gradient={false}
                    direction="left"
                    className="flex-1"
                >
                    <MarqueeContent />
                </Marquee>
            </div>
            <div className="h-0.5 w-full bg-linear-to-l from-[#1d1d1d7a] via-[#27A043] to-[#1d1d1d7a]" />
        </div>
    );
}

function MarqueeContent() {
    const data = [
        "Liquidity + best prices",
        "Zero deposits needed",
        "All in one place"
    ]
    return (
        <div className="flex items-center font-saira text-white font-bold h3-tag p-6">
            {data.map((item, index) => (
                <div key={index} className="mx-12 whitespace-nowrap">
                    {item}
                </div>
            ))}
        </div>
    );
}
