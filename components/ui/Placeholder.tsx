import { cn } from "@/lib/utils";

export default function Placeholder({
  className,
  label,
}: {
  className?: string;
  label?: string;
}) {
  return (
    <div
      className={cn(
        "bg-border flex items-center justify-center text-muted text-sm",
        className
      )}
    >
      {label ?? "Фото скоро будет"}
    </div>
  );
}
