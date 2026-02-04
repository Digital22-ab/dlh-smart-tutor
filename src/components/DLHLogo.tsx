import { Laptop, BookOpen, Wifi } from "lucide-react";
import { cn } from "@/lib/utils";

interface DLHLogoProps {
  size?: "sm" | "md" | "lg" | "xl";
  showText?: boolean;
  className?: string;
}

const sizeClasses = {
  sm: "w-8 h-8",
  md: "w-12 h-12",
  lg: "w-16 h-16",
  xl: "w-24 h-24",
};

const iconSizes = {
  sm: 12,
  md: 16,
  lg: 24,
  xl: 32,
};

const textSizes = {
  sm: "text-lg",
  md: "text-xl",
  lg: "text-2xl",
  xl: "text-4xl",
};

export function DLHLogo({ size = "md", showText = true, className }: DLHLogoProps) {
  return (
    <div className={cn("flex items-center gap-3", className)}>
      <div
        className={cn(
          "relative bg-gradient-primary rounded-xl flex items-center justify-center shadow-lg",
          sizeClasses[size]
        )}
      >
        <Laptop
          size={iconSizes[size]}
          className="text-primary-foreground absolute"
          strokeWidth={2.5}
        />
        <BookOpen
          size={iconSizes[size] * 0.6}
          className="text-primary-foreground/90 absolute -bottom-0.5 -right-0.5"
          strokeWidth={2.5}
        />
        <Wifi
          size={iconSizes[size] * 0.5}
          className="text-primary-foreground/80 absolute -top-1 -right-1"
          strokeWidth={2.5}
        />
      </div>
      {showText && (
        <div className="flex flex-col">
          <span className={cn("font-bold text-foreground tracking-tight", textSizes[size])}>
            DLH
          </span>
          <span className="text-xs text-muted-foreground -mt-1">
            Digital Learning Hub
          </span>
        </div>
      )}
    </div>
  );
}
