import { cn } from "@/lib/utils";
import dlhLogoImg from "@/assets/dlh-logo.jpg";

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

const textSizes = {
  sm: "text-lg",
  md: "text-xl",
  lg: "text-2xl",
  xl: "text-4xl",
};

export function DLHLogo({ size = "md", showText = true, className }: DLHLogoProps) {
  return (
    <div className={cn("flex items-center gap-3", className)}>
      <img
        src={dlhLogoImg}
        alt="Digital Learning Hub Logo"
        className={cn("rounded-xl object-contain", sizeClasses[size])}
      />
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
