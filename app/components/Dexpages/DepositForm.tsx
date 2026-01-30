// @ts-nocheck
"use client";
import React, { useEffect, useMemo, useState } from "react";
import { ethers } from "ethers";
import Modal from "../../lib/Modal";
import { copyToClipboard, getNumberTransformed, toastinfo } from "../../utils";
import { BiCopy } from "react-icons/bi";
import { usePrivy, useWallets } from "@privy-io/react-auth";
import { useAuthAddress } from "../../lib/hooks/useAuthAddress";

interface DepositPopupFormProps {
    depositPopup: boolean;
    setDepositPopup: (depositPopup: boolean) => void;
}

interface CurrencyInfo {
    name: string;
    shortcode: string;
    network: string;
    contractAddress: string;
    decimals: number;
    chainid: number;
    rpc: string;
}

export type MetaMaskProvider = {
    isMetaMask?: boolean;
    request: (args: { method: string; params?: unknown[] | undefined }) => Promise<unknown>;
    on?: (event: string, callback: (...args: unknown[]) => void) => void;
    removeListener?: (event: string, callback: (...args: unknown[]) => void) => void;
};


export default function DepositPopupForm({ depositPopup, setDepositPopup }: DepositPopupFormProps) {
    const { address } = useAuthAddress();
    // UI / form state
    const { wallets } = useWallets();
    const [selectedCurrency, setSelectedCurrency] = useState<string>("");
    const [selectedNetwork, setSelectedNetwork] = useState<string>("");
    const [depositAddress, setAddress] = useState<string>("");
    const [amount, setAmount] = useState<string>("");
    const [avlBalace, setAvlBalance] = useState<string>("0");

    // touched + errors for simple validation
    const [touched, setTouched] = useState<{ [k: string]: boolean }>({});
    const [errors, setErrors] = useState<{ [k: string]: string }>({});
    const [loading, setLoading] = useState<boolean>(false);
    const [isBalanceloading, setIsBalanceLoading] = useState<boolean>(false);
    // console.log('isBalanceloading', isBalanceloading)
    useEffect(() => {
        if (!depositPopup) {
            setSelectedCurrency("");
            setSelectedNetwork("");
            setAmount("");
            setAddress('');
            setErrors({})
            setTouched({})
            setLoading(false);
        }
    }, [depositPopup])
    // Static currency data
    const CURRENCIES_DATA: CurrencyInfo[] = [
        { name: "Bitcoin", shortcode: "BTC", network: "Bitcoin mainnet", contractAddress: "", decimals: 8, chainid: 0, rpc: 'https://blockstream.info/testnet', mode: "api", mindeposit: "0.0004", time: "24" },
        { name: "Solana", shortcode: "SOL", network: "Solana mainnet", contractAddress: "", decimals: 6, chainid: 0, rpc: 'https://blockstream.info/testnet', mode: "api", mindeposit: "0.15", time: "3" },
        { name: "Ethereum", shortcode: "ETH", network: "Ethereum mainnet", contractAddress: "0x", decimals: 18, chainid: 1, rpc: 'https://goerli.infura.io/v3/9aa3d95b3bc440fa88ea12eaa4456161', mode: "api", mindeposit: "0.008", time: "5" },
        // { name: "Ethereum", shortcode: "ETH", network: "Arbitrum mainnet", contractAddress: "0x82aF49447D8a07e3bd95BD0d56f35241523fBab1", decimals: 18, chainid: 42161, rpc:'https://arb1.arbitrum.io/rpc' },
        // { name: "Tether", shortcode: "USDT", network: "Ethereum mainnet", contractAddress: "0xdac17f958d2ee523a2206206994597c13d831ec7", decimals: 18, chainid: 1 ,rpc:'https://goerli.infura.io/v3/9aa3d95b3bc440fa88ea12eaa4456161'},
        //{ name: "Tether", shortcode: "USDT", network: "Arbitrum mainnet", contractAddress: "0xfd086bc7cd5c481dcc9c85ebe478a1c0b69fcbb9", decimals: 18, chainid: 42161, rpc:'https://arb1.arbitrum.io/rpc' },
        // { name: "USDC", shortcode: "USDC", network: "Ethereum mainnet", contractAddress: "0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48", decimals: 6, chainid: 1 ,rpc:'https://goerli.infura.io/v3/9aa3d95b3bc440fa88ea12eaa4456161'},
        { name: "USDC", shortcode: "USDC", network: "Arbitrum mainnet", contractAddress: "0xaf88d065e77c8cC2239327C5EDb3A432268e5831", decimals: 6, chainid: 42161, rpc: 'https://arb1.arbitrum.io/rpc', mode: "onchain", mindeposit: "5", time: "1" },
    ];

    // Replace with your real bridge address
    const BRIDGE_ADDRESS_MAINNET = "0x2Df1c51E09aECF9cacB7bc98cB1742757f163dF7";
    // Minimal ABIs
    const ERC20_ABI = [
        "function approve(address spender, uint256 amount) public returns (bool)",
        "function allowance(address owner, address spender) public view returns (uint256)",
        "function balanceOf(address account) public view returns (uint256)",
        "function permit(address owner, address spender, uint256 value, uint256 deadline, uint8 v, bytes32 r, bytes32 s) external",
        "function nonces(address owner) external view returns (uint256)",
        "function transfer(address owner,  uint256 amount) public returns (bool)"
    ];
    const BRIDGE_ABI = [
        "function deposit(uint64 amount) external",
        "function batchedDepositWithPermit(tuple(address user, uint64 amount, uint256 deadline, uint8 v, bytes32 r, bytes32 s)[] deposits) external"
    ];
    // Derived lists
    const uniqueCurrencies = useMemo(() => {
        const seen = new Set<string>();
        return CURRENCIES_DATA.filter(c => {
            if (!seen.has(c.shortcode)) {
                seen.add(c.shortcode);
                return true;
            }
            return false;
        });
    }, []);
    const availableNetworks = useMemo(() => {
        if (!selectedCurrency) return [];
        return CURRENCIES_DATA.filter(c => c.shortcode === selectedCurrency).map(c => c.network);
    }, [selectedCurrency]);
    // Auto-select first network when currency changes
    useEffect(() => {
        if (!selectedCurrency) {
            setSelectedNetwork("");
            return;
        }
        const networks = CURRENCIES_DATA.filter(c => c.shortcode === selectedCurrency).map(c => c.network);
        setSelectedNetwork(networks[0] ?? "");
        // reset touched/errors for network/amount when currency changes
        setTouched(prev => ({ ...prev, network: false, amount: false }));
        setErrors(prev => {
            const copy = { ...prev };
            delete copy.network;
            delete copy.amount;
            return copy;
        });
    }, [selectedCurrency]);
    /* -------------------------
       Validation (simple real-time)
       - errors are set when fields change
       - shown only if corresponding touched[field] === true
       ------------------------- */


    const validate = () => {
        const newErrors: { [k: string]: string } = {};
        if (!selectedCurrency) newErrors.currency = "Select currency";
        if (!selectedNetwork) newErrors.network = "Select network";
        // Amount must be a positive number
        if (!amount) newErrors.amount = "Enter amount";
        else if (isNaN(Number(amount))) newErrors.amount = "Invalid number";
        else if (Number(amount) <= 0) newErrors.amount = "Amount must be > 0";
        else if (Number(amount) < 5) newErrors.amount = "Minimum deposit is 5 USDC";
        setErrors(newErrors);
        return newErrors;
    };
    // Run validation whenever relevant fields change (real-time)
    useEffect(() => {
        const newErrors = validate(
            selectedCurrency,
            selectedNetwork,
            amount
        );
        setErrors(newErrors);
    }, [selectedCurrency, selectedNetwork, amount]);
    useEffect(() => {
        const currencyinfo = CURRENCIES_DATA.find(c => c.shortcode === selectedCurrency && c.network === selectedNetwork);
        if (currencyinfo && currencyinfo.mode === "onchain") {
            calculatebalance(selectedCurrency, selectedNetwork);
            setAddress('');
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [selectedCurrency, selectedNetwork]);
    const calculatebalance = async (selectedCurrencyArg?: string, selectedNetworkArg?: string) => {
        const sCurrency = selectedCurrencyArg;
        const sNetwork = selectedNetworkArg;
        if (!sCurrency || !sNetwork) {
            setAvlBalance('0');
        } else {
            const currencyinfo = CURRENCIES_DATA.find(c => c.shortcode === sCurrency && c.network === sNetwork);
            if (!currencyinfo) {
                setAvlBalance('0');
            } else {
                try {
                    const provider = new ethers.JsonRpcProvider(currencyinfo.rpc);
                    const contract = new ethers.Contract(
                        currencyinfo.contractAddress,
                        ERC20_ABI,
                        provider
                    );
                    const provider2 = new ethers.BrowserProvider(window.ethereum as MetaMaskProvider);
                    const signer = await provider2.getSigner();
                    const balance = await contract.balanceOf(address);
                    // console.log("balance", ethers.formatUnits(balance.toString(), currencyinfo.decimals).toString(), address);
                    setAvlBalance(ethers.formatUnits(balance.toString(), currencyinfo.decimals).toString());
                    return balance;
                } catch (err) {
                    console.error("balance fetch failed:", err);
                    // ... error handling
                }
            }
        }
    };
    const generateaddress = async (selectedCurrencyArg?: string, selectedNetworkArg?: string) => {
        setIsBalanceLoading(true)
        const sCurrency = selectedCurrencyArg;
        const sNetwork = selectedNetworkArg;
        if (!sCurrency || !sNetwork) {
            setAvlBalance('0');
        } else {
            const currencyinfo = CURRENCIES_DATA.find(c => c.shortcode === sCurrency && c.network === sNetwork);
            if (!currencyinfo) {
                setAddress('');
            } else {
                try {

                    const connectedWallet = wallets.filter(account => account.walletClientType != "privy").sort((a, b) => b.connectedAt - a.connectedAt)[0];
                    if (!connectedWallet) {
                        toastinfo("Please connect your wallet");
                        throw new Error("No connected wallet");
                    }
                    // ALWAYS works (Privy / MetaMask / WC / Phantom)
                    const eip1193Provider = await connectedWallet.getEthereumProvider();
                    const provider = new ethers.BrowserProvider(eip1193Provider);
                    const signer = await provider.getSigner();
                    const responseState = await fetch('https://api.hyperunit.xyz/gen/' + currencyinfo.name + '/hyperliquid/' + currencyinfo.shortcode + '/' + address, {
                        method: 'GET',
                        headers: { 'Content-Type': 'application/json' }
                    });
                    const dataState = await responseState.json();
                    setAddress(dataState.address);
                    setIsBalanceLoading(false)
                    return dataState;
                } catch (err) {
                    if (err instanceof Error)
                        console.error('Error fetching getAllSpotMetas:', err.message);
                    throw err;
                } finally {
                    setIsBalanceLoading(false);
                }
            }
        }
        setIsBalanceLoading(false)
    };
    useEffect(() => {
        if (selectedCurrency && selectedNetwork)
            generateaddress(selectedCurrency, selectedNetwork);
    }, [selectedCurrency, selectedNetwork])
    /* -------------------------
       depositToDex — main flow
       ------------------------- */
    const depositToDex = async (selectedCurrencyArg?: string, selectedNetworkArg?: string, amountArg?: string) => {
        const sCurrency = selectedCurrencyArg ?? selectedCurrency;
        const sNetwork = selectedNetworkArg ?? selectedNetwork;
        const amt = amountArg ?? amount;
        // Basic validation (guard)
        if (!sCurrency) {
            alert("Please select a currency.");
            return;
        }
        if (!sNetwork) {
            alert("Please select a network.");
            return;
        }
        if (!amt || isNaN(Number(amt)) || Number(amt) <= 0) {
            alert("Please enter a valid amount.");
            return;
        }
        if (Number(amt) < 5) {
            alert("Minimum deposit is 5 USDC. Amounts less than 5 USDC will be lost.");
            return;
        }
        if (!window.ethereum) {
            alert('Please install MetaMask!');
            return;
        }
        // Find currency metadata
        const currencyinfo = CURRENCIES_DATA.find(c => c.shortcode === sCurrency && c.network === sNetwork);
        if (!currencyinfo) {
            alert("Selected currency/network combination is not supported.");
            return;
        }
        // If no contract address (e.g. Bitcoin) — not supported in this on-chain flow
        if (!currencyinfo.contractAddress || currencyinfo.contractAddress === ethers.ZeroAddress) {
            alert(`${currencyinfo.name} on ${currencyinfo.network} is not supported for direct ERC20 deposit via this bridge.`);
            return;
        }
        setLoading(true);
        try {
            const provider = new ethers.BrowserProvider(window.ethereum as MetaMaskProvider);
            const network = await provider.getNetwork();
            const currentChainId = Number(network.chainId);
            // If wrong chain, attempt to switch
            if (currentChainId !== Number(currencyinfo.chainid)) {
                try {
                    await (window.ethereum as MetaMaskProvider).request({
                        method: "wallet_switchEthereumChain",
                        params: [{ chainId: "0x" + Number(currencyinfo.chainid).toString(16) }],
                    });
                    // After switching, re-init provider to ensure correct network
                    // Note: provider may not auto-refresh; rebuilding browser provider is safe
                } catch (switchError) {
                    console.error("Failed to switch network", switchError);
                    alert("Please switch your wallet to the required network and try again.");
                    setLoading(false);
                    return;
                }
            }
            const signer = await provider.getSigner();
            // Minimum deposit is 5 USDC
            if (parseFloat(amt) < 5) {
                alert('Minimum deposit is 5 USDC. Amounts less than 5 USDC will be lost forever!');
                return;
            }
            // Convert amount to proper format (USDC has 6 decimals)
            const amount = ethers.parseUnits(amt.toString(), 6);
            const usdcContract = new ethers.Contract(currencyinfo.contractAddress, ERC20_ABI, signer);
            const balance = await usdcContract.balanceOf(address);
            if (balance < amount) {
                alert(`Insufficient ${currencyinfo.shortcode} balance. You have ${ethers.formatUnits(balance, currencyinfo.decimals)} ${currencyinfo.shortcode}`);
                return;
            }
            // console.log(`Depositing ${amt} ${currencyinfo.shortcode} to ABC Dex...`);
            // Check current allowance
            const currentAllowance = await usdcContract.allowance(address, BRIDGE_ADDRESS_MAINNET);
            // Step 1: Approve bridge if needed
            if (currentAllowance < amount) {
                // console.log('Approving USDC spend...');
                const approveTx = await usdcContract.approve(BRIDGE_ADDRESS_MAINNET, amount);
                await approveTx.wait();
                // console.log('Approval confirmed');
            }
            const amount64 = amount.toString();
            // console.log('Depositing to bridge...');
            const depositTx = await usdcContract.transfer(BRIDGE_ADDRESS_MAINNET, amount64);
            // console.log('Transaction sent:', depositTx.hash);
            alert('Deposit transaction sent! Your USDC will appear in ~2 minute.');
            setDepositPopup(false);
            // Wait for confirmation
            const receipt = await depositTx.wait();
            // console.log('Deposit confirmed:', receipt);

            return receipt;
        } catch (error) {
            console.error('Deposit failed:', error);
            // More specific error handling
            if (error.code === 'ACTION_REJECTED' || error.code === 4001) {
                alert('Transaction was rejected by user');
            } else if (error.message.includes('INVALID_SIGNATURE')) {
                alert('Invalid signature. Please try again.');
            } else if (error.message.includes('EXPIRED')) {
                alert('Permit expired. Please try again.');
            } else if (error.message.includes('INSUFFICIENT_FUNDS')) {
                alert('Insufficient funds for gas fees');
            } else if (error.message.includes('insufficient funds')) {
                alert('Insufficient ETH for gas fees');
            } else if (error.message.includes('execution reverted')) {
                alert('Transaction failed. Please check your inputs and try again.');
            } else {
                alert(`Deposit failed: ${error.message}`);
            }
            throw error;
        }
    };
    // Handle form submit (we keep this simple)
    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        // mark touched so errors will show
        setTouched({ currency: true, network: true, amount: true });
        const errs = validate();
        if (Object.keys(errs).length > 0) return;
        try {
            await depositToDex();
        } catch {
            // errors are alerted inside depositToDex
        } finally {
            setLoading(false);
        }
    };
    /* -------------------------
       Render
       ------------------------- */
    return (
        <>
            {depositPopup && (
                <Modal open={depositPopup} onClose={() => setDepositPopup(false)} width="max-w-[600px]">
                    <h3 className="text-xl font-semibold mb-4">Deposit</h3>

                    <form onSubmit={handleSubmit} className="space-y-4">
                        <div>
                            <label className="block text-sm text-gray-300 mb-1">Currency</label>
                            <select
                                value={selectedCurrency}
                                onChange={(e) => {
                                    setSelectedCurrency(e.target.value);
                                    setTouched((t) => ({ ...t, currency: true }));
                                }}
                                className="w-full bg-[#27272A] px-3 py-2 rounded-lg text-sm focus:outline-0 ring-0"
                            >
                                <option value="">Select Currency</option>
                                {uniqueCurrencies.map((c) => (
                                    <option key={c.shortcode} value={c.shortcode}>
                                        {c.name} ({c.shortcode})
                                    </option>
                                ))}
                            </select>
                            {touched.currency && errors.currency && <p className="text-red-500 text-xs mt-1">{errors.currency}</p>}
                        </div>
                        <div>
                            <label className="block text-sm text-gray-300 mb-1">Network</label>
                            <select
                                value={selectedNetwork}
                                onChange={(e) => {
                                    setSelectedNetwork(e.target.value);
                                    setTouched((t) => ({ ...t, network: true }));
                                }}
                                disabled={!selectedCurrency}
                                className="w-full bg-[#27272A] px-3 py-2 rounded-lg text-sm focus:outline-0 ring-0 disabled:opacity-50"
                            >
                                {availableNetworks.length === 0 ? <option value="">Select currency first</option> : null}
                                {availableNetworks.map((net) => (
                                    <option key={net} value={net}>
                                        {net}
                                    </option>
                                ))}
                            </select>
                            {touched.network && errors.network && <p className="text-red-500 text-xs mt-1">{errors.network}</p>}
                        </div>
                        {CURRENCIES_DATA.find(c => c.shortcode === selectedCurrency && c.network === selectedNetwork)?.mode == 'onchain' && (
                            <div>
                                <label className="block text-sm text-gray-300 mb-1">Amount</label>
                                <div className="relative">
                                    <input
                                        value={amount}
                                        onChange={(e) => {
                                            setAmount(e.target.value);
                                            // live touch mark only if user typed
                                            setTouched((t) => ({ ...t, amount: true }));
                                        }}
                                        onBlur={() => setTouched((t) => ({ ...t, amount: true }))}
                                        placeholder="Enter amount (e.g. 10)"
                                        className="w-full bg-[#27272A] px-3 py-2 rounded-lg text-sm focus:outline-0 ring-0"
                                        inputMode="decimal"
                                    />
                                    <button type="button" className="text-white absolute right-4 -translate-y-1/2  top-1/2" onClick={() => setAmount(avlBalace)}>MAX: {getNumberTransformed(avlBalace)}</button>
                                </div>
                                {touched.amount && errors.amount && <p className="text-red-500 text-xs mt-1">{errors.amount}</p>}
                            </div>)}
                        {
                            <>
                                {CURRENCIES_DATA.find(
                                    c => c.shortcode === selectedCurrency && c.network === selectedNetwork
                                )?.mode !== "onchain" && (
                                        <div>
                                            <label className="block text-sm text-gray-300 mb-1">
                                                Address
                                            </label>

                                            <div className="relative flex gap-2 items-center">
                                                {/* Fixed-height container prevents layout jump */}
                                                <div className="w-full min-h-8 bg-[#27272A] px-3 py-2 rounded-lg text-sm flex items-center">
                                                    {isBalanceloading ? (
                                                        <span className="animate-pulse text-white/75">
                                                            Generating address…
                                                        </span>
                                                    ) : depositAddress ? (
                                                        <span className="truncate">{depositAddress}</span>
                                                    ) : (
                                                        <span className="text-white/75">No address</span>
                                                    )}
                                                </div>

                                                {/* Copy button slot is always reserved */}
                                                <button
                                                    className="bg-white text-black px-2 py-2 rounded-lg disabled:opacity-50"
                                                    disabled={!depositAddress || isBalanceloading}
                                                    onClick={() => copyToClipboard(depositAddress)}
                                                >
                                                    <BiCopy className="text-sm" />
                                                </button>
                                            </div>
                                        </div>
                                    )}

                            </>
                        }
                        {CURRENCIES_DATA.find(c => c.shortcode === selectedCurrency && c.network === selectedNetwork)?.mode == 'onchain' && (<div>
                            <button
                                type="submit"
                                disabled={loading}
                                className={`w-full py-2 rounded bg-linear-to-r from-white to-white text-black font-semibold hover:opacity-90 disabled:opacity-60`}
                            >
                                {loading ? "Processing..." : "Submit"}
                            </button>
                        </div>)}
                    </form>

                    <div className="text-xs text-gray-400 mt-3">
                        <p className="m-0">Minimum deposit: {CURRENCIES_DATA.find(c => c.shortcode === selectedCurrency && c.network === selectedNetwork)?.mindeposit} {selectedCurrency}</p>
                        <p className="m-0 mt-1">Note: Deposits may take ~{CURRENCIES_DATA.find(c => c.shortcode === selectedCurrency && c.network === selectedNetwork)?.time} minute to reflect.</p>
                    </div>
                </Modal>
            )}
        </>
    );
}
