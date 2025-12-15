"use client";
import React, { useState, useEffect, FC } from "react";
import { useTheme } from "next-themes";
import { BiMoon, BiSun } from "react-icons/bi";

type Props = {
    size?: number;
};

const ThemeSwitcher: FC<Props> = ({ size }) => {
    const [mounted, setMounted] = useState(false);
    const { theme, setTheme } = useTheme();

    // const savedTheme = localStorage.getItem("theme");
    // console.log("Saved theme is:- ", savedTheme);

    useEffect(() => {
        setMounted(true);
    }, []);

    if (!mounted) {
        return null;
    }

    const chnageThemeHandler = (data: "dark" | "light") => {
        setTheme(data);
    };
    return (
        <div className="flex items-center justify-center">
            {theme === "light" ? (
                <BiMoon
                    className="cursor-pointer text-black "
                    size={size}
                    onClick={() => chnageThemeHandler("dark")}
                />
            ) : (
                <BiSun
                    className="cursor-pointer text-white"
                    size={size}
                    onClick={() => setTheme("light")}
                />
            )}
        </div>
    );
};

export default ThemeSwitcher;
