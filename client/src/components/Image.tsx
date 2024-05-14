import React from "react";

import { cn } from "@/lib/utils";

interface ImageProps {
  src: string;
  alt?: string;
  width?: number;
  height?: number;
  layout?: "fill" | "fixed" | "intrinsic" | "responsive";
  sizes?: string;
  className?: string;
}

export const Image: React.FC<ImageProps> = ({
  src,
  alt,
  width,
  height,
  layout = "responsive",
  sizes,
  className,
}) => {
  const aspectRatio =
    width && height && width !== 0 ? (height / width) * 100 : 0;

  return (
    <div
      style={{
        position: "relative",
        width: layout === "fill" ? "100%" : width,
        height: layout === "fill" ? "100%" : height,
        paddingBottom: layout === "responsive" ? `${aspectRatio}%` : undefined,
      }}
    >
      <img
        src={src}
        alt={alt}
        style={{
          position: layout === "fill" ? "absolute" : "static",
          width: layout === "fill" ? "100%" : "auto",
          height: layout === "fill" ? "100%" : "auto",
        }}
        sizes={sizes}
        className={cn("", className)}
      />
    </div>
  );
};
