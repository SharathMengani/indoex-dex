"use client";

import { useEffect, useState, useMemo } from "react";
import { LogOutIcon, Menu, X } from "lucide-react";
import { FaDiscord, FaTelegram, FaTwitter } from "react-icons/fa";
import { useAuthAddress } from "../lib/hooks/useAuthAddress";
import { DepositBtn } from "../components/Dexpages/DepositBtn";
import { formatWalletAddress } from "../utils";
import AppImage from "../lib/Image";
import { usePathname } from "next/navigation";
import Link from "next/link";
import ThemeSwitcher from "../lib/ThemeSwitcher";

const Navbar = () => {
  const [mode, setMode] = useState('exchange');
  const { address, isAuthenticated, ready, login, handleLogout, isWalletLoading } =
    useAuthAddress();

  const [isOpen, setOpen] = useState(false);
  const pathname = usePathname();

  const navLinks = useMemo(
    () => [
      { name: "Swap (Beta)", path: "/swap", status: "live" },
      { name: "Trade", path: "/trade/BTC", status: "live" },
      { name: "Airdrop", path: "/airdrop", status: "live" },
      { name: "Portfolio", path: "/portfolio", status: "live" },
      { name: "Staking", path: "/staking", status: "beta" },
    ],
    []
  );

  const isUserAuthenticated = ready && isAuthenticated;

  const isActive = (path: string) =>
    pathname === path || pathname.startsWith(`${path}/`);

  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  // 🔹 Common Auth UI (DRY)
  const AuthSection = () =>
    isUserAuthenticated && address ? (
      <div className="flex items-center gap-3">
        <DepositBtn />
        <button
          onClick={handleLogout}
          className="flex items-center gap-2 rounded-full  px-5 py-2 font-semibold hover:opacity-80 transition"
        >
          {formatWalletAddress(address)}
          <LogOutIcon size={18} />
        </button>
      </div>
    ) : (
      <button
        onClick={login}
        className="rounded-full  px-5 py-2 font-semibold  hover:opacity-80 transition"
      >
        {isWalletLoading ? "Loading..." : "Connect Wallet"}
      </button>
    );

  return (
    <section className="w-full px-5 dark:text-white">
      <nav className="mx-auto flex w-full items-center justify-between py-4 px-6 relative z-50">
        {/* Logo */}
        <div className="flex items-center gap-2">
          <Link href="/">
            <AppImage
              src="/images/logo.png"
              alt="logo"
              wrapperClassName="hidden h-10 w-[200px] dark:block"
              className="object-contain"
            />
            <AppImage
              src="/images/logo-dark.png"
              alt="logo"
              wrapperClassName="block h-10 w-[200px] dark:hidden"
              className="object-contain"
            />
          </Link>
          <div className="relative bg-[#1e2441ab] rounded-full w-52 p-1 flex">
            {/* Sliding background */}
            <div
              className={`absolute top-1 bottom-1 w-[calc(50%-4px)] rounded-full bg-[#27A043]
    transition-all duration-300 ease-in-out
    ${mode === "exchange" ? "left-1" : "left-1/2"}`}
            />

            {/* Buttons */}
            <button
              className="relative z-10 text-white font-inter w-1/2 py-2 rounded-full"
              onClick={() => setMode("exchange")}
            >
              Exchange
            </button>

            <button
              className="relative z-10 text-white font-inter w-1/2 py-2 rounded-full"
              onClick={() => setMode("web3")}
            >
              Web3
            </button>
          </div>



        </div>
        {/* Desktop Nav */}
        <ul className="hidden md:flex gap-2 font-medium">
          {navLinks.map((link) => {
            const disabled = link.status === "beta";

            return (
              <li key={link.name} className="relative group">
                <Link
                  href={disabled ? "" : link.path}
                  onClick={(e) => disabled && e.preventDefault()}
                  className={`rounded-full px-4 py-2 transition
                    ${disabled ? "cursor-not-allowed opacity-50" : "hover:text-[#2BB94D]"}
                    ${isActive(link.path) ? "text-[#2BB94D]" : ""}
                  `}
                >
                  {link.name}
                </Link>

                {disabled && (
                  <span className="absolute left-1/2 -top-2.5 -translate-x-1/2 rounded-md bg-[#2BB94D] px-2 py-0.5 text-[10px]  opacity-0 group-hover:opacity-100 transition">
                    Coming Soon
                  </span>
                )}
              </li>
            );
          })}
        </ul>
        {/* Right section */}
        <div className="hidden lg:flex items-center gap-4">
          <ThemeSwitcher />
          <AuthSection />
        </div>

        {/* Mobile Toggle */}
        <button
          className="lg:hidden text-3xl"
          onClick={() => setOpen((p) => !p)}
        >
          {isOpen ? <X /> : <Menu />}
        </button>
      </nav>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="mt-2 rounded-xl   p-6 shadow-lg lg:hidden">
          <ul className="flex flex-col gap-4 font-medium">
            {navLinks
              .filter((l) => l.status !== "beta")
              .map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.path}
                    onClick={() => setOpen(false)}
                    className={isActive(link.path) ? "text-[#2BB94D]" : ""}
                  >
                    {link.name}
                  </Link>
                </li>
              ))}

            <li className="pt-4">
              <ThemeSwitcher />
              <div className="mt-4">
                <AuthSection />
              </div>
            </li>

            <li className="flex justify-center gap-6 pt-6">
              <FaTwitter className="hover:text-[#2BB94D]" />
              <FaTelegram className="hover:text-[#2BB94D]" />
              <FaDiscord className="hover:text-[#2BB94D]" />
            </li>
          </ul>
        </div>
      )}
    </section>
  );
};

export default Navbar;
