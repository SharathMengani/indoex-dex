"use client";

import { useEffect, useState } from "react";
import AppImage from "@/app/lib/Image";

const slides = [
    {
        id: 1,
        title: "Staking – Earn Passive Income Effortlessly",
        description:
            "With Indoex Web3 Staking, you earn daily rewards by locking your favorite assets in secure, audited smart contracts.",
        points: [
            "Daily rewards paid automatically",
            "Flexible lock & unlock staking plans",
            "Secure, audited smart contracts",
        ],
        image: "/images/feature.png",
    },
    {
        id: 2,
        title: "Zero Deposits Needed",
        description:
            "Connect your wallet and start trading instantly without depositing funds.",
        points: [
            "No custody of funds",
            "Instant wallet connection",
            "Full user control",
        ],
        image: "/images/feature.png",
    },
    {
        id: 3,
        title: "All in One Place",
        description:
            "Trade, stake, and interact with DeFi protocols from a single dashboard.",
        points: [
            "Unified Web3 experience",
            "Cross-chain support",
            "Simple & fast UI",
        ],
        image: "/images/feature.png",
    },
];

export function Features() {
    const [active, setActive] = useState(0);

    useEffect(() => {
        const timer = setInterval(() => {
            setActive((prev) => (prev + 1) % slides.length);
        }, 4000);

        return () => clearInterval(timer);
    }, []);

    return (
        <section className="relative py-42">
            <h2 className="text-center h2-tag text-thm mb-12">
                Features
            </h2>

            <div className="relative site-width-md h-180 mx-auto">
                {slides.map((slide, index) => {
                    const isActive = index === active;
                    const isNext = index === (active + 1) % slides.length;

                    return (
                        <div
                            key={slide.id}
                            className={`
                absolute inset-0 transition-all duration-700 ease-out
                ${isActive && "z-20 opacity-100 scale-100"}
                ${isNext && "z-10 opacity-70 scale-100 translate-y-15"}
                ${!isActive && !isNext && "opacity-0 scale-90"}
              `}
                        >
                            <div className="relative h-full w-full rounded-2xl border border-[#2BBA4D] overflow-hidden shadow-[0_0_60px_rgba(43,186,77,0.15)]">
                                {/* Background image */}
                                <div
                                    className="absolute inset-0 bg-[url('/images/bg.jpg')] bg-no-repeat bg-center bg-cover"
                                />

                                {/* Gradient overlay */}
                                <div className="absolute inset-0 bg-linear-to-br from-[#04102f]/70 to-[#020817]/70" />

                                {/* CONTENT */}
                                <div className="relative z-10 p-12 flex items-center gap-12 h-full">
                                    {/* LEFT CONTENT */}
                                    <div className="flex-1">
                                        <h2 className="h2-tag font-semibold text-thm mb-4 leading-tight">
                                            {slide.title}
                                        </h2>

                                        <p className="p-tag dark:text-white mb-6 max-w-lg">
                                            {slide.description}
                                        </p>

                                        <ul className="space-y-3 p-tag dark:text-white">
                                            {slide.points.map((point, i) => (
                                                <li key={i} className="flex items-center gap-2">
                                                    <span className="text-thm">•</span>
                                                    {point}
                                                </li>
                                            ))}
                                        </ul>
                                        <button className="bg-thm dark:text-white p-tag px-8 py-3 rounded-full mt-12">Start Spot Trading</button>
                                    </div>

                                    {/* RIGHT IMAGE */}
                                    <div className="flex-1 flex justify-end">
                                       
                                    </div>
                                </div>
                            </div>

                        </div>
                    );
                })}
            </div>
        </section>
    );
}
