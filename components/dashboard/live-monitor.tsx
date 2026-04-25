"use client"

import { useEnergy } from "@/lib/energy-context"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Activity, Zap, Info } from "lucide-react"

export function LiveMonitor() {
  const { data, simulationMode } = useEnergy()

  const metrics = [
    {
      label: "Voltage",
      value: `${data.voltage.toFixed(1)}V`,
      sublabel: "220V - 240V Range",
      icon: Zap,
      color: "text-blue-500",
      bgColor: "bg-blue-500/10",
    },
    {
      label: "Current",
      value: `${data.current.toFixed(2)}A`,
      sublabel: "Active Load",
      icon: Activity,
      color: "text-purple-500",
      bgColor: "bg-purple-500/10",
    },
    {
      label: "Active Power",
      value: `${data.power.toFixed(1)}W`,
      sublabel: "Real-time Demand",
      icon: Zap,
      color: "text-amber-500",
      bgColor: "bg-amber-500/10",
    },
  ]

  return (
    <Card className="col-span-full">
      <CardHeader className="pb-2 flex flex-row items-center justify-between">
        <div>
          <CardTitle className="text-lg font-semibold flex items-center gap-2">
            Live Meter Readings
            {simulationMode && (
              <span className="px-2 py-0.5 text-[10px] bg-primary/20 text-primary rounded-full animate-pulse">
                Simulated
              </span>
            )}
          </CardTitle>
          <p className="text-sm text-muted-foreground">Real-time parameters from hardware/simulation</p>
        </div>
        <div className="flex items-center gap-1 text-xs text-muted-foreground bg-muted px-2 py-1 rounded-md">
          <Info size={14} />
          Updates every 3s
        </div>
      </CardHeader>
      <CardContent className="pt-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {metrics.map((metric) => {
            const Icon = metric.icon
            return (
              <div key={metric.label} className="flex items-center gap-4 p-4 rounded-xl border border-border bg-card/50">
                <div className={`p-3 rounded-lg ${metric.bgColor}`}>
                  <Icon className={`w-6 h-6 ${metric.color}`} />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">{metric.label}</p>
                  <p className="text-2xl font-bold font-mono">{metric.value}</p>
                  <p className="text-[10px] text-muted-foreground mt-0.5">{metric.sublabel}</p>
                </div>
              </div>
            )
          })}
        </div>
      </CardContent>
    </Card>
  )
}
