"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { BiMenu, BiSearch, BiX } from "react-icons/bi";
import AppImage from "../lib/Image";
import ThemeSwitcher from "../lib/ThemeSwitcher";


export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [mode, setMode] = useState('exchange');

  return (
    <header className="w-full py-2 dark:border-b dark:border-white/10 dark:border realtive z-51">
      <div className="site-width">
        <div className="flex h-16 items-center justify-between font-inter!">

          {/* Logo */}
          <div className="flex items-center gap-2">
            <AppImage sizes="w-[200px]"
              src="/images/logo.png"
              alt="User avatar"
              wrapperClassName="w-[200px] h-10  hidden dark:block" className="object-contain"
            />
            <AppImage sizes="w-[200px]"
              src="/images/logo-dark.png"
              alt="User avatar"
              wrapperClassName="w-[200px] h-10 block dark:hidden" className="object-contain"
            />
            {/* Desktop Nav */}
            <nav className="hidden md:flex items-center gap-6 ">
              <div className="bg-[#24243D] rounded-full flex">
                <button
                  className={`text-white font-inter hover:text-white px-3 py-2 rounded-full 
      transition-all duration-300 ease-in-out
      ${mode === "exchange" ? "bg-[#27A043]" : "bg-[#24243D]"}`}
                  onClick={() => setMode("exchange")}
                >
                  Exchange
                </button>

                <button
                  className={`text-white font-inter hover:text-white px-3 py-2 rounded-full 
      transition-all duration-300 ease-in-out
      ${mode === "web3" ? "bg-[#27A043]" : "bg-[#24243D]"}`}
                  onClick={() => setMode("web3")}
                >
                  Web3
                </button>
              </div>

              <Link href="#" className="dark:text-white font-inter hover:text-white">
                Trade
              </Link>
              <Link href="#" className="dark:text-white font-inter hover:text-white">
                Markets
              </Link>
              <Link href="#" className="dark:text-white font-inter hover:text-white">
                Events
              </Link>
            </nav>
          </div>



          {/* Right Actions */}
          <div className="hidden md:flex items-center gap-4">
            <button className="dark:text-white font-inter hover:text-white">
              <BiSearch size={22} />
            </button>
            <button className="rounded-full bg-[#27A043] px-4 py-1.5  font-medium text-white hover:bg-emerald-400">
              Connect Wallet
            </button>
            <ThemeSwitcher />
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setOpen(!open)}
            className="md:hidden text-white"
          >
            {open ? <BiX /> : <BiMenu />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {open && (
        <div className="md:hidden border-t border-white/10 bg-[#0B1020]">
          <nav className="flex flex-col gap-4 px-4 py-6 ">
            <Link href="#" className="text-gray-300">Exchange</Link>
            <Link
              href="#"
              className="text-emerald-400 font-medium"
            >
              Web3
            </Link>
            <Link href="#" className="text-gray-300">Trade</Link>
            <Link href="#" className="text-gray-300">Markets</Link>
            <Link href="#" className="text-gray-300">Events</Link>

            <button className="mt-4 rounded-full bg-emerald-500 px-4 py-2 font-medium text-black">
              Connect Wallet
            </button>
          </nav>
        </div>
      )}
    </header>
  );
}
