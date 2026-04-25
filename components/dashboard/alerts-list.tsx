"use client"

import { useEnergy } from "@/lib/energy-context"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { AlertTriangle, AlertCircle, Info, Bell } from "lucide-react"
import { cn } from "@/lib/utils"

export function AlertsList() {
  const { data } = useEnergy()

  const getAlertIcon = (type: string) => {
    switch (type) {
      case "danger":
        return <AlertTriangle className="w-5 h-5" />
      case "warning":
        return <AlertCircle className="w-5 h-5" />
      default:
        return <Info className="w-5 h-5" />
    }
  }

  const getAlertStyles = (type: string) => {
    switch (type) {
      case "danger":
        return "bg-destructive/10 border-destructive text-destructive"
      case "warning":
        return "bg-warning/10 border-warning text-warning-foreground"
      default:
        return "bg-primary/10 border-primary text-primary"
    }
  }

  const formatTime = (date: Date) => {
    const now = new Date()
    const diff = now.getTime() - date.getTime()
    const minutes = Math.floor(diff / 60000)
    
    if (minutes < 1) return "Just now"
    if (minutes < 60) return `${minutes}m ago`
    const hours = Math.floor(minutes / 60)
    if (hours < 24) return `${hours}h ago`
    return date.toLocaleDateString()
  }

  return (
    <Card>
      <CardHeader className="pb-3">
        <CardTitle className="text-lg font-semibold flex items-center gap-2">
          <Bell className="w-5 h-5 text-primary" />
          Recent Alerts
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-3">
          {data.alerts.length === 0 ? (
            <p className="text-sm text-muted-foreground text-center py-4">
              No alerts at this time
            </p>
          ) : (
            data.alerts.slice(0, 5).map(alert => (
              <div
                key={alert.id}
                className={cn(
                  "flex items-start gap-3 p-3 rounded-lg border",
                  getAlertStyles(alert.type)
                )}
              >
                <div className="flex-shrink-0 mt-0.5">
                  {getAlertIcon(alert.type)}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="font-medium text-sm">{alert.title}</p>
                  <p className="text-xs opacity-80 mt-0.5 line-clamp-2">{alert.message}</p>
                  <p className="text-xs opacity-60 mt-1">{formatTime(alert.timestamp)}</p>
                </div>
              </div>
            ))
          )}
        </div>
      </CardContent>
    </Card>
  )
}
