import { cn } from "@/lib/cn";

type ButtonVariant = "primary" | "secondary" | "ghost";
type ButtonSize = "sm" | "md";

interface ButtonProps {
  readonly children: React.ReactNode;
  readonly variant?: ButtonVariant;
  readonly size?: ButtonSize;
  readonly fullWidth?: boolean;
  readonly disabled?: boolean;
  readonly type?: "button" | "submit" | "reset";
  readonly onClick?: () => void;
  readonly className?: string;
  readonly "aria-label"?: string;
}

const variantClasses: Record<ButtonVariant, string> = {
  primary:
    "bg-base text-white hover:bg-base-dark transition font-semibold shadow",
  secondary:
    "bg-white text-base border border-base hover:bg-base-light transition font-semibold shadow",
  ghost:
    "bg-transparent text-base hover:bg-base-light transition font-semibold",
};

const sizeClasses: Record<ButtonSize, string> = {
  sm: "px-3 py-1 text-xs rounded-full",
  md: "px-6 py-3 text-sm rounded-xl",
};

export function Button({
  children,
  variant = "primary",
  size = "md",
  fullWidth = false,
  disabled = false,
  type = "button",
  onClick,
  className,
  "aria-label": ariaLabel,
}: ButtonProps) {
  return (
    <button
      type={type}
      disabled={disabled}
      onClick={onClick}
      aria-label={ariaLabel}
      className={cn(
        variantClasses[variant],
        sizeClasses[size],
        fullWidth ? "w-full" : "",
        disabled ? "opacity-50 cursor-not-allowed" : "",
        className,
      )}
    >
      {children}
    </button>
  );
}
