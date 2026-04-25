"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Lightbulb, TrendingDown, Clock, Zap } from "lucide-react"

const suggestions = [
  {
    icon: TrendingDown,
    tip: "Reduce AC usage during peak hours (2PM - 6PM) to save up to 15% on your bill",
  },
  {
    icon: Clock,
    tip: "Consider using heavy appliances during off-peak hours for better rates",
  },
  {
    icon: Zap,
    tip: "Your refrigerator is consuming more than usual. Consider checking the door seal",
  },
]

export function AISuggestions() {
  return (
    <Card className="bg-gradient-to-br from-primary/5 to-secondary/5 border-primary/20">
      <CardHeader className="pb-3">
        <CardTitle className="text-lg font-semibold flex items-center gap-2">
          <Lightbulb className="w-5 h-5 text-warning" />
          AI Energy Tips
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {suggestions.map((suggestion, index) => {
            const Icon = suggestion.icon
            return (
              <div
                key={index}
                className="flex items-start gap-3 p-3 rounded-lg bg-card/50 border border-border/50"
              >
                <div className="flex items-center justify-center w-8 h-8 rounded-full bg-primary/10 flex-shrink-0">
                  <Icon className="w-4 h-4 text-primary" />
                </div>
                <p className="text-sm text-foreground leading-relaxed">{suggestion.tip}</p>
              </div>
            )
          })}
        </div>
      </CardContent>
    </Card>
  )
}
