"use client";
import { ChevronDown } from "lucide-react";
import { useEffect, useRef, useState } from "react";

interface TradeInterface {
    inputCurrency: string;
    setInputCurrency: (inputCurrency: string) => void;
    options: string[];
    type?: string
}

export const TradeCurrencies = ({
    inputCurrency,
    setInputCurrency,
    options,
    type
}: TradeInterface) => {
    const [open, setOpen] = useState(false);
    const dropdownRef = useRef<HTMLDivElement>(null);


    // Close dropdown on outside click
    useEffect(() => {
        const handleClickOutside = (e: MouseEvent) => {
            if (
                dropdownRef.current &&
                !dropdownRef.current.contains(e.target as Node)
            ) {
                setOpen(false);
            }
        };

        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    return (
        <div ref={dropdownRef} className={`relative w-fit`}>
            {/* Selected value */}
            <button
                type="button"
                onClick={() => setOpen((prev) => !prev)}
                className={`${type == 'orderbook' ? 'text-[11px] px-0 py-0 gap-0' : 'text-sm px-3 py-2 dark:bg-[#1e2441ab] gap-2'}  rounded-r-xl dark:text-white
                   flex items-center `}
            >
                {inputCurrency}
                <ChevronDown
                    size={type == 'orderbook' ? 12 : 18}
                    className={`transition-transform duration-200 ${open ? "rotate-180" : ""}`}
                />
            </button>

            {/* Dropdown */}
            {open && (
                <div className="absolute mt-2 w-full bg-white dark:bg-[#1e2441] rounded-xl shadow-lg z-50 overflow-hidden">
                    {options.map((option) => (
                        <div
                            key={option}
                            onClick={() => {
                                setInputCurrency(option);
                                setOpen(false);
                            }}
                            className={`${type == 'orderbook' ? 'text-[11px] px-2 py-1' : 'text-sm px-3 py-2 '}  cursor-pointer hover:bg-black/12
                ${inputCurrency === option ? "bg-black/12" : ""}`}
                        >
                            {option}
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};
