"use client"

import { useEnergy } from "@/lib/energy-context"
import { Card, CardContent } from "@/components/ui/card"
import { Zap, Calendar, TrendingUp, DollarSign } from "lucide-react"
import { cn } from "@/lib/utils"

export function StatCards() {
  const { data, isLimitExceeded } = useEnergy()

  const stats = [
    {
      label: "Total Usage",
      value: `${data.totalUsage.toFixed(1)} kWh`,
      icon: Zap,
      color: "text-primary",
      bgColor: "bg-primary/10",
    },
    {
      label: "Today's Usage",
      value: `${data.todayUsage.toFixed(2)} kWh`,
      sublabel: `Limit: ${data.dailyLimit} kWh`,
      icon: Calendar,
      color: isLimitExceeded ? "text-destructive" : "text-success",
      bgColor: isLimitExceeded ? "bg-destructive/10" : "bg-success/10",
      alert: isLimitExceeded,
    },
    {
      label: "Monthly Usage",
      value: `${data.monthlyUsage.toFixed(1)} kWh`,
      icon: TrendingUp,
      color: "text-secondary",
      bgColor: "bg-secondary/10",
    },
    {
      label: "Bill Estimate",
      value: `₹${data.billEstimate.toLocaleString()}`,
      icon: DollarSign,
      color: "text-warning",
      bgColor: "bg-warning/10",
    },
  ]

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
      {stats.map(stat => {
        const Icon = stat.icon
        return (
          <Card
            key={stat.label}
            className={cn(
              "relative overflow-hidden transition-all duration-300 hover:shadow-lg",
              stat.alert && "border-destructive ring-2 ring-destructive/20"
            )}
          >
            <CardContent className="p-6">
              <div className="flex items-start justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">{stat.label}</p>
                  <p className={cn("text-2xl font-bold mt-1", stat.color)}>
                    {stat.value}
                  </p>
                  {stat.sublabel && (
                    <p className="text-xs text-muted-foreground mt-1">{stat.sublabel}</p>
                  )}
                </div>
                <div className={cn("p-3 rounded-lg", stat.bgColor)}>
                  <Icon className={cn("w-6 h-6", stat.color)} />
                </div>
              </div>

              {stat.alert && (
                <div className="absolute top-0 right-0 p-2">
                  <span className="flex h-3 w-3">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-destructive opacity-75" />
                    <span className="relative inline-flex rounded-full h-3 w-3 bg-destructive" />
                  </span>
                </div>
              )}
            </CardContent>
          </Card>
        )
      })}
    </div>
  )
}
