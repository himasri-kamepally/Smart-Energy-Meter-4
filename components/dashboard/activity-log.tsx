"use client"

import { useEnergy } from "@/lib/energy-context"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Activity, Clock } from "lucide-react"

export function ActivityLog() {
  const { data } = useEnergy()

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
          <Activity className="w-5 h-5 text-primary" />
          Activity Log
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-3">
          {data.activityLog.map(log => (
            <div
              key={log.id}
              className="flex items-center justify-between py-2 border-b border-border last:border-0"
            >
              <p className="text-sm text-foreground">{log.action}</p>
              <div className="flex items-center gap-1 text-xs text-muted-foreground">
                <Clock className="w-3 h-3" />
                {formatTime(log.timestamp)}
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}
