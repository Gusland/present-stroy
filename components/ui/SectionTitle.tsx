import { cn } from "@/lib/utils";

type SectionTitleProps = {
  title: string;
  subtitle?: string;
  align?: "left" | "center";
  light?: boolean;
  className?: string;
};

export default function SectionTitle({
  title,
  subtitle,
  align = "center",
  light = false,
  className,
}: SectionTitleProps) {
  return (
    <div
      className={cn(
        "mb-12",
        align === "center" ? "text-center" : "text-left",
        className
      )}
    >
      <h2
        className={cn(
          "text-3xl md:text-4xl font-bold leading-tight",
          light ? "text-white" : "text-primary"
        )}
      >
        {title}
      </h2>
      {subtitle && (
        <p
          className={cn(
            "mt-4 text-lg max-w-2xl",
            align === "center" && "mx-auto",
            light ? "text-white/70" : "text-muted"
          )}
        >
          {subtitle}
        </p>
      )}
      <div
        className={cn(
          "mt-4 h-1 w-16 bg-accent",
          align === "center" && "mx-auto"
        )}
      />
    </div>
  );
}
