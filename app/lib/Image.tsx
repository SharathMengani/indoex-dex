"use client"



import React, { useEffect, useState } from "react";
import NextImage from "next/image"
import { cn } from "./cn";

/**
 * Image component that handles the loading state and displays a placeholder until the image has loaded.
 * 
 * @param {string | undefined} src - The source URL of the image. If undefined, the image will not be displayed.
 * @param {string} [alt] - The alt text for the image. Optional, but recommended for accessibility.
 * @param {string} [wrapperClassName] - Additional classes to apply to the wrapper div element.
 * @param {string} [className] - Additional classes to apply to the image element.
 * @param {React.ImgHTMLAttributes<HTMLImageElement>} ImageProps - Any other standard attributes for an <img> element.
 * 
 */
type ImageProps = {
    src: string | undefined;
    alt: string;
    wrapperClassName?: string;
    className?: string;
    loading?:string
} & React.ImgHTMLAttributes<HTMLImageElement>;

const AppImage = ({
    src,
    alt,
    wrapperClassName,
    className,
    loading,
    ...ImageProps
}: ImageProps) => {
    const [showImage, setShowImage] = useState(false);



    useEffect(()=>{
        if(!src) setShowImage(false);
    }, [src])
    return (
        <div
            className={cn(
                "relative overflow-hidden flex items-center justify-center",
                wrapperClassName
            )}
        >
            {src && alt && <NextImage
                fill
                src={src}
                alt={alt ?? ""}
                className={cn("w-full h-full object-cover absolute", className, {
                    "": !showImage
                })}
                onError={() => setShowImage(false)}
                onLoad={() => setShowImage(true)}
                loading={loading}
            />}
            {!showImage && (
                <div className="absolute w-full h-full">
                    <div className="bg-gray-200 w-full h-full animate-pulse"></div>
                </div>
            )}
        </div>
    );
};

export default AppImage;
