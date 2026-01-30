
const markets = [
    {
        name: "Bitcoin",
        symbol: "BTC",
        price: "$56,290.30",
        change: "+1.68%",
        up: true,
        data: [10, 40, 15, 50, 4, 60, 10],
    },
    {
        name: "Ethereum",
        symbol: "ETH",
        price: "$4,284.81",
        change: "+4.36%",
        up: true,
        data: [20, 25, 23, 30, 28, 35, 40],
    },
    {
        name: "Cardano",
        symbol: "ADA",
        price: "$1.88",
        change: "+3.43%",
        up: true,
        data: [10, 15, 14, 18, 17, 20, 22],
    },
    {
        name: "Bnb",
        symbol: "BNB",
        price: "$0.97",
        change: "-2.62%",
        up: false,
        data: [30, 28, 26, 25, 23, 22, 20],
    },
];

export default function Markets() {
    return (
        <section className="py-56">
            <div className="site-width-md text-white">
                <h2 className="h2-tag font-bold font-saira text-thm text-center mb-16">
                    Markets
                </h2>

                <div className="">
                    {markets.map((coin) => (
                        <div
                            key={coin.symbol}
                            className="flex items-center justify-between border-b border-[#2D315E] py-7 last:border-0"
                        >
                            {/* Coin */}
                            <div className="flex items-center gap-3 w-48">
                                <div className="">
                                    <AppImage src={`https://paycio.nyc3.cdn.digitaloceanspaces.com/logo/${coin.symbol.toLowerCase()}.png`} alt={coin.name} wrapperClassName="h-10 w-10" />
                                </div>
                                <div>
                                    <p className="text-lg">{coin.name}</p>
                                    <p className="text-xs">{coin.symbol}</p>
                                </div>
                            </div>

                            {/* Price */}
                            <div className="w-32 text-lg">{coin.price}</div>

                            {/* Change */}
                            <div
                                className={`w-20 text-lg ${coin.up ? "text-green-400" : "text-red-400"
                                    }`}
                            >
                                {coin.change}
                            </div>

                            {/* Sparkline */}
                            <MarketSparkline
                                data={coin.data}
                                color={coin.up ? "#22c55e" : "#ef4444"}
                            />

                            {/* Buy button */}
                            <button className="rounded-full bg-[#27A043]/10 px-9 py-3 text-md font-semibold text-thm ">
                                Buy
                            </button>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}



import AppImage from "@/app/lib/Image";
import dynamic from "next/dynamic";

const Chart = dynamic(() => import("react-apexcharts"), { ssr: false });

interface SparklineProps {
    data: number[];
    color: string;
}

function MarketSparkline({ data, color }: SparklineProps) {
    const options: ApexCharts.ApexOptions = {
        chart: {
            type: "area",
            sparkline: { enabled: true },
            animations: { enabled: true },

            toolbar: { show: false },
        },

        stroke: {
            curve: "smooth",
            width: 2,
        },

        colors: [color],

        fill: {
            type: "gradient",
            gradient: {
                shadeIntensity: 1,
                opacityFrom: 0.6, // 👈 visible fill
                opacityTo: 0.1,     // 👈 fades down
                stops: [0, 90, 100],

            },

        },

        tooltip: {
            enabled: false,
        },
        grid: { show: false },
        markers: { size: 0 },
    };

    const series = [
        {
            data,
        },
    ];

    return (
        <Chart
            options={options}
            series={series}
            type="area"
            height={40}
            width={120}
        />
    );
}
