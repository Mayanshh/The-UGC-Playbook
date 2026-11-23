"use client";

import React, { forwardRef } from "react";
import Link from "next/link";
import { cn } from "@/lib/cn";

export type ButtonVariant =
  | "outline-ink"   //  transparent + ink border -> black fill + coco text
  | "outline-coco"  // Light version for dark backgrounds: transparent + coco border -> coco fill + ink text
  | "solid-ink"     // Filled ink pill -> oxblood accent hover
  | "solid-coco"    // Filled coco pill -> pure paper hover
  | "oxblood"       // Editorial deep crimson accent pill
  | "ghost";        // Borderless minimal link with circular arrow

export type ButtonSize = "sm" | "md" | "lg";

interface BaseButtonProps {
  children: React.ReactNode;
  variant?: ButtonVariant;
  size?: ButtonSize;
  showArrow?: boolean;
  arrowDirection?: "up-right" | "right";
  className?: string;
}

type ButtonAsButton = BaseButtonProps &
  Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, keyof BaseButtonProps> & {
    href?: undefined;
  };

type ButtonAsLink = BaseButtonProps &
  Omit<React.AnchorHTMLAttributes<HTMLAnchorElement>, keyof BaseButtonProps> & {
    href: string;
  };

export type ButtonProps = ButtonAsButton | ButtonAsLink;

const VARIANT_STYLES: Record<
  ButtonVariant,
  {
    root: string;
    circle: string;
  }
> = {
  "outline-ink": {
    root: "bg-transparent border border-ink text-ink hover:bg-black hover:border-black hover:text-coco",
    circle:
      "border border-ink/25 bg-transparent text-ink group-hover:border-coco/30 group-hover:bg-coco group-hover:text-black",
  },
  "outline-coco": {
    root: "bg-transparent border border-coco/40 text-coco hover:bg-coco hover:border-coco hover:text-ink",
    circle:
      "border border-coco/30 bg-transparent text-coco group-hover:border-ink/20 group-hover:bg-ink group-hover:text-coco",
  },
  "solid-ink": {
    root: "bg-ink border border-ink text-coco hover:bg-black/85 hover:border-black/85",
    circle:
      "bg-coco/15 text-coco group-hover:bg-coco group-hover:text-black",
  },
  "solid-coco": {
    root: "bg-coco border border-coco text-ink hover:bg-paper hover:border-paper",
    circle:
      "bg-ink/10 text-ink group-hover:bg-ink group-hover:text-coco",
  },
  oxblood: {
    root: "bg-oxblood border border-oxblood text-coco hover:bg-ink hover:border-ink",
    circle:
      "bg-coco/15 text-coco group-hover:bg-coco group-hover:text-ink",
  },
  ghost: {
    root: "bg-transparent border border-transparent text-ink px-2 hover:opacity-80",
    circle:
      "border border-ink/20 bg-transparent text-ink group-hover:bg-ink group-hover:border-ink group-hover:text-coco",
  },
};

const SIZE_STYLES: Record<
  ButtonSize,
  {
    root: string;
    circle: string;
    icon: string;
  }
> = {
  sm: {
    root: "text-sm py-2 pl-5 pr-2 gap-3",
    circle: "h-7 w-7",
    icon: "h-3.5 w-3.5",
  },
  md: {
    root: "text-base py-2.5 pl-7 pr-2.5 gap-4",
    circle: "h-8 w-8",
    icon: "h-4 w-4",
  },
  lg: {
    root: "text-lg py-3 pl-8 pr-3 gap-5",
    circle: "h-9 w-9",
    icon: "h-4 w-4",
  },
};

function ArrowIcon({
  direction,
  className,
}: {
  direction: "up-right" | "right";
  className?: string;
}) {
  return (
    <svg
      viewBox="0 0 16 16"
      fill="none"
      aria-hidden="true"
      className={cn(
        className,
        direction === "right" && "rotate-45"
      )}
    >
      <path
        d="M4.5 11.5L11.5 4.5M11.5 4.5H5.5M11.5 4.5V10.5"
        stroke="currentColor"
        strokeWidth="1.4"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export const Button = forwardRef<
  HTMLButtonElement | HTMLAnchorElement,
  ButtonProps
>(function Button(
  {
    children,
    variant = "outline-ink",
    size = "lg",
    showArrow = true,
    arrowDirection = "up-right",
    className,
    ...props
  },
  ref
) {
  const variantClasses = VARIANT_STYLES[variant];
  const sizeClasses = SIZE_STYLES[size];

  const composedClasses = cn(
    "group inline-flex items-center justify-between font-serif rounded-full tracking-tight",
    "transition-all duration-300 ease-[cubic-bezier(0.22,1,0.36,1)]",
    "active:scale-[0.98] disabled:pointer-events-none disabled:opacity-45 cursor-pointer select-none",
    variantClasses.root,
    sizeClasses.root,
    !showArrow && (size === "sm" ? "px-5" : size === "md" ? "px-7" : "px-8"),
    className
  );

  const innerContent = (
    <>
      <span>{children}</span>

      {showArrow && (
        <span
          aria-hidden="true"
          className={cn(
            "relative inline-flex shrink-0 items-center justify-center overflow-hidden rounded-full",
            "transition-all duration-300 ease-[cubic-bezier(0.22,1,0.36,1)]",
            variantClasses.circle,
            sizeClasses.circle
          )}
        >
          {/* Primary Arrow (exits diagonally on hover) */}
          <ArrowIcon
            direction={arrowDirection}
            className={cn(
              "transition-transform duration-300 ease-[cubic-bezier(0.22,1,0.36,1)]",
              sizeClasses.icon,
              arrowDirection === "up-right"
                ? "group-hover:translate-x-5 group-hover:-translate-y-5"
                : "group-hover:translate-x-5"
            )}
          />

          {/* Incoming Clone Arrow (enters smoothly from opposite edge) */}
          <ArrowIcon
            direction={arrowDirection}
            className={cn(
              "absolute transition-transform duration-300 ease-[cubic-bezier(0.22,1,0.36,1)]",
              sizeClasses.icon,
              arrowDirection === "up-right"
                ? "-translate-x-5 translate-y-5 group-hover:translate-x-0 group-hover:translate-y-0"
                : "-translate-x-5 group-hover:translate-x-0"
            )}
          />
        </span>
      )}
    </>
  );

  if ("href" in props && props.href !== undefined) {
    const { href, ...linkProps } = props;
    return (
      <Link
        ref={ref as React.Ref<HTMLAnchorElement>}
        href={href}
        className={composedClasses}
        {...linkProps}
      >
        {innerContent}
      </Link>
    );
  }

  return (
    <button
      ref={ref as React.Ref<HTMLButtonElement>}
      type={(props as ButtonAsButton).type ?? "button"}
      className={composedClasses}
      {...(props as ButtonAsButton)}
    >
      {innerContent}
    </button>
  );
});