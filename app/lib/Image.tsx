"use client";

import React, { useEffect, useState } from "react";
import NextImage from "next/image";
import { cn } from "./cn";

type ImageProps = {
    src?: string;
    alt: string;
    wrapperClassName?: string;
    className?: string;
    sizes?: string; // ✅ ADD THIS
    loading?: "lazy" | "eager";
};

const AppImage = ({
    src,
    alt,
    wrapperClassName,
    className,
    sizes, // ✅ sensible default for icons/logos
    loading = "lazy",
}: ImageProps) => {
    const [loaded, setLoaded] = useState(false);

    useEffect(() => {
        if (!src) setLoaded(false);
    }, [src]);

    return (
        <div
            className={cn(
                "relative overflow-hidden flex items-center justify-center",
                wrapperClassName
            )}
        >
            {src && (
                <NextImage
                    fill
                    src={src}
                    alt={alt}
                    sizes={sizes} // ✅ FIXED
                    className={cn(
                        "absolute inset-0 object-contain transition-opacity",
                        loaded ? "opacity-100" : "opacity-0",
                        className
                    )}
                    onLoad={() => setLoaded(true)}
                    onError={() => setLoaded(false)}
                    loading={loading}
                />
            )}

            {!loaded && (
                <div className="absolute inset-0 bg-gray-200 animate-pulse" />
            )}
        </div>
    );
};

export default AppImage;
