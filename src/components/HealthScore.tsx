import { Card } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Heart } from "lucide-react";

interface HealthScoreProps {
  score: number;
  maxScore: number;
}

export const HealthScore = ({ score, maxScore }: HealthScoreProps) => {
  const percentage = (score / maxScore) * 100;
  
  // Determine color based on percentage
  const getHealthColor = () => {
    if (percentage >= 70) return "bg-[hsl(var(--success))]";
    if (percentage >= 40) return "bg-[hsl(var(--warning))]";
    return "bg-[hsl(var(--academic))]";
  };

  return (
    <Card className="border-l-4 border-l-[hsl(var(--info))] p-6">
      <div className="flex items-center gap-3 mb-4">
        <div className="p-2 rounded-lg bg-[hsl(var(--info))]/10 text-[hsl(var(--info))]">
          <Heart className="h-5 w-5" />
        </div>
        <h3 className="font-semibold text-lg text-foreground">Health Score</h3>
      </div>

      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <span className="text-sm text-muted-foreground">Overall Health:</span>
          <span className="font-semibold text-sm text-foreground">
            {score} / {maxScore}
          </span>
        </div>
        
        <div className="space-y-2">
          <Progress value={percentage} className="h-2" indicatorClassName={getHealthColor()} />
          <p className="text-xs text-muted-foreground text-right">
            {percentage.toFixed(0)}% Complete
          </p>
        </div>
      </div>
    </Card>
  );
};
