import { cn } from "@/lib/utils";
import Link from "next/link";

type ButtonProps = {
  variant?: "primary" | "outline" | "accent";
  size?: "sm" | "md" | "lg";
  href?: string;
  children: React.ReactNode;
  className?: string;
  type?: "button" | "submit" | "reset";
  disabled?: boolean;
  onClick?: () => void;
};

export default function Button({
  variant = "primary",
  size = "md",
  href,
  children,
  className,
  type = "button",
  disabled,
  onClick,
}: ButtonProps) {
  const base =
    "inline-flex items-center justify-center font-semibold transition-all duration-200 cursor-pointer";

  const variants = {
    primary: "bg-primary text-white hover:bg-primary-dark",
    outline: "border-2 border-primary text-primary hover:bg-primary hover:text-white",
    accent: "bg-accent text-white hover:bg-accent-dark",
  };

  const sizes = {
    sm: "px-4 py-2 text-sm",
    md: "px-6 py-3 text-base",
    lg: "px-8 py-4 text-lg",
  };

  const classes = cn(base, variants[variant], sizes[size], className);

  if (href) {
    return (
      <Link href={href} className={classes}>
        {children}
      </Link>
    );
  }

  return (
    <button type={type} className={classes} disabled={disabled} onClick={onClick}>
      {children}
    </button>
  );
}
