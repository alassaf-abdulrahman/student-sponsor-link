import { Card } from "@/components/ui/card";
import { LucideIcon } from "lucide-react";
import { cn } from "@/lib/utils";

interface KPIItem {
  label: string;
  value: string | number;
  status?: "success" | "warning" | "danger" | "neutral";
}

interface KPICardProps {
  title: string;
  icon: LucideIcon;
  items: KPIItem[];
  color: "academic" | "financial" | "development" | "documents";
}

const colorClasses = {
  academic: "border-l-[hsl(var(--academic))]",
  financial: "border-l-[hsl(var(--financial))]",
  development: "border-l-[hsl(var(--development))]",
  documents: "border-l-[hsl(var(--documents))]",
};

const iconBgClasses = {
  academic: "bg-[hsl(var(--academic))]/10 text-[hsl(var(--academic))]",
  financial: "bg-[hsl(var(--financial))]/10 text-[hsl(var(--financial))]",
  development: "bg-[hsl(var(--development))]/10 text-[hsl(var(--development))]",
  documents: "bg-[hsl(var(--documents))]/10 text-[hsl(var(--documents))]",
};

const statusClasses = {
  success: "text-[hsl(var(--success))]",
  warning: "text-[hsl(var(--warning))]",
  danger: "text-[hsl(var(--academic))]",
  neutral: "text-muted-foreground",
};

export const KPICard = ({ title, icon: Icon, items, color }: KPICardProps) => {
  return (
    <Card
      className={cn(
        "border-l-4 p-6 transition-all hover:shadow-lg",
        colorClasses[color]
      )}
    >
      <div className="flex items-center gap-3 mb-4">
        <div className={cn("p-2 rounded-lg", iconBgClasses[color])}>
          <Icon className="h-5 w-5" />
        </div>
        <h3 className="font-semibold text-lg text-foreground">{title}</h3>
      </div>

      <div className="space-y-3">
        {items.map((item, index) => (
          <div key={index} className="flex items-center justify-between">
            <span className="text-sm text-muted-foreground">{item.label}:</span>
            <span
              className={cn(
                "font-semibold text-sm",
                item.status ? statusClasses[item.status] : "text-foreground"
              )}
            >
              {item.value}
            </span>
          </div>
        ))}
      </div>
    </Card>
  );
};
