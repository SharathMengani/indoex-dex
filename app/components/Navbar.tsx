
"use client";
import { useEffect, useState } from "react";
import { LogOutIcon, Menu, X } from "lucide-react";
import { FaDiscord, FaTelegram, FaTwitter } from "react-icons/fa";
import { useAuthAddress } from "../lib/hooks/useAuthAddress";
import { DepositBtn } from "../components/Dexpages/DepositBtn";
import { formatWalletAddress } from "../utils";
import AppImage from "../lib/Image";
import { usePathname } from "next/navigation";
import Link from "next/link";

const Navbar = () => {
  const { address, isAuthenticated, ready, login, handleLogout, isWalletLoading } = useAuthAddress();

  const [isOpen, setOpen] = useState(false);
  const pathname = usePathname();

  const navLinks = [
    { name: "Swap(Beta)", path: "/swap", status: "live" },
    // { name: "Perp", path: "/trade/BTC" },
    { name: "Trade", path: "/trade/BTC", status: "live" },
    { name: "Airdrop", path: "/airdrop", status: "live" },
    // { name: "Cross Chain", path: "/crosschain", status: "beta" },
    { name: "Portfolio", path: "/portfolio", status: "live" },
    // { name: "Referrals", path: "/referral", status: "beta" },
    { name: "Staking", path: "/staking", status: "beta" }
  ];

  // Enhanced login handler


  // Enhanced logout handler


  // Check if user is actually authenticated
  const isUserAuthenticated = ready && isAuthenticated;

  const isHome = pathname === "/";
  const isActive = (path: string) => pathname.startsWith(path);


  useEffect(() => {
    setOpen(false);
  }, [pathname]);


  return (
    <section className={`text-sm 2xl:text-[16px] ${isHome ? "max-w-full px-5 mx-auto" : "max-w-full px-5 mx-auto"}`}>
      <nav className={`w-full bg-[#FFFFFF]/8 shadow-md py-4 px-6 relative z-50 ${isOpen ? 'rounded-lg' : 'rounded-full'} mx-auto`}>
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link href="/">
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
          </Link>

          {/* Desktop Menu */}
          {/* <ul className="hidden md:flex font-medium 2xl:gap-2 gap-1">
                        {navLinks.map((link, index) => (
                            <li key={index}>
                                <Link
                                    href={link.path}
                                    className={`2xl:px-5 lg:px-3 2xl:py-2 py-1 rounded-full hover:text-[#2BC287] 
                                        ${isActive(link.path) ? "text-[#2BC287]" : ""}`}
                                >
                                    {link.name}
                                </Link>
                            </li>
                        ))}
                    </ul> */}

          {/* Desktop Menu */}
          <ul className="hidden md:flex font-medium 2xl:gap-2 gap-1">
            {navLinks.map((link) => (
              <li key={link.name} className={`relative group`}>
                <Link
                  href={link.status === 'beta' ? '#' : link.path}
                  onClick={(e) => link.status === 'beta' && e.preventDefault()}
                  className={`2xl:px-5 dark:text-white lg:px-3 2xl:py-2 py-1 rounded-full hover:text-[#2BC287] ${link.status === 'beta' ? 'cursor-not-allowed opacity-100' : 'cursor-pointer'}
                                        ${isActive(link.path) ? "text-[#2BC287]" : ""}`}
                > {link.name}

                  {link.status === 'beta' && (
                    <span className="text-[10px] absolute bg-[#2BC287] whitespace-nowrap -translate-x-1/2 -translate-y-1/2 -top-2 left-full text-white px-2 py-0.5 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity">
                      Coming Soon
                    </span>
                  )}
                </Link>
              </li>
            ))}
          </ul>

          {/* Desktop Right - Socials OR Wallet */}
          {isHome ? (
            <div className="hidden lg:flex items-center gap-5 text-xl">
              <FaTwitter className="cursor-pointer hover:text-[#2BC287]" />
              <FaTelegram className="cursor-pointer hover:text-[#2BC287]" />
              <FaDiscord className="cursor-pointer hover:text-[#2BC287]" />
            </div>
          ) : (
            <div className="hidden lg:block">
              {isUserAuthenticated && address ? (
                <div className="flex items-center gap-3">
                  <DepositBtn />
                  <button
                    onClick={handleLogout}
                    className="cursor-pointer bg-white px-5 py-2 text-black font-bold rounded-full flex items-center gap-2 hover:bg-gray-100 transition-colors"
                  >
                    <div className="text-sm">
                      {formatWalletAddress(address)}
                    </div> <LogOutIcon size={18} />
                  </button>
                </div>
              ) : (
                <button
                  onClick={login}
                  className="cursor-pointer bg-white px-5 py-2 text-black font-bold rounded-full hover:bg-gray-100 transition-colors"
                >
                  {isWalletLoading && !address && !isAuthenticated ? "Loading..." : "Connect Wallet"}
                </button>
              )}
            </div>
          )}

          {/* Mobile Toggle */}
          <button
            className="lg:hidden text-3xl"
            onClick={() => setOpen(!isOpen)}
          >
            {isOpen ? <X /> : <Menu />}
          </button>
        </div>

        {/* Mobile Menu */}
        {isOpen && (
          <div className="mt-2 text-white py-5 shadow-lg rounded-xl">
            <ul className="flex flex-col font-medium gap-0">
              {navLinks.map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.path}
                    className={`py-1 ${isActive(link.path) ? "text-[#2BC287] font-semibold" : ""} ${link.status === 'beta' ? 'hidden' : 'block'}`}
                    onClick={() => setOpen(false)}
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
              {/* Auth Section */}
              <li className="pt-4 ">
                {isUserAuthenticated && address ? (
                  <div className="flex flex-col w-fit gap-3">
                    <DepositBtn />
                    <button
                      onClick={handleLogout}
                      className="cursor-pointer bg-white px-5 py-2 text-black font-bold rounded-full flex items-center gap-2 hover:bg-gray-100 transition-colors"
                    >
                      <div className="text-sm">
                        {formatWalletAddress(address)}
                      </div> <LogOutIcon size={18} />
                    </button>
                  </div>
                ) : (
                  <button
                    onClick={login}
                    className="cursor-pointer bg-white px-5 py-2 text-black font-bold rounded-full hover:bg-gray-100 transition-colors"
                  >
                    {isWalletLoading && !address && !isAuthenticated ? "Loading..." : "Connect Wallet"}
                  </button>
                )}
              </li>

              {/* Social Icons (Mobile) */}
              {isHome && (
                <li className="flex items-center justify-center gap-6 pt-4">
                  <FaTwitter className="cursor-pointer hover:text-[#2BC287]" />
                  <FaTelegram className="cursor-pointer hover:text-[#2BC287]" />
                  <FaDiscord className="cursor-pointer hover:text-[#2BC287]" />
                </li>
              )}
            </ul>
          </div>
        )}
      </nav>
    </section>
  );
};

export default Navbar;

