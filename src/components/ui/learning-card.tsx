import { cn } from "@/lib/utils";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./card";
import { ReactNode } from "react";

interface LearningCardProps {
  title: string;
  description: string;
  icon: ReactNode;
  className?: string;
  onClick?: () => void;
}

export function LearningCard({ title, description, icon, className, onClick }: LearningCardProps) {
  return (
    <Card 
      className={cn(
        "learning-card cursor-pointer border-border/50 bg-card/80 backdrop-blur-sm hover:border-primary/30",
        className
      )}
      onClick={onClick}
    >
      <CardHeader className="pb-4">
        <div className="mb-2 w-fit rounded-lg bg-gradient-growth p-3 text-white">
          {icon}
        </div>
        <CardTitle className="text-feature text-card-foreground">{title}</CardTitle>
      </CardHeader>
      <CardContent>
        <CardDescription className="text-body-large text-muted-foreground leading-relaxed">
          {description}
        </CardDescription>
      </CardContent>
    </Card>
  );
}