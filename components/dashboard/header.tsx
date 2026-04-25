"use client"

import { useEnergy } from "@/lib/energy-context"
import { Bell, Wifi, WifiOff, RefreshCw } from "lucide-react"
import { cn } from "@/lib/utils"

interface HeaderProps {
  title: string
  subtitle?: string
}

export function Header({ title, subtitle }: HeaderProps) {
  const { data, isLimitExceeded } = useEnergy()

  const getStatusIcon = () => {
    switch (data.connectionStatus) {
      case "connected":
        return <Wifi className="w-4 h-4 text-success" />
      case "updating":
        return <RefreshCw className="w-4 h-4 text-warning animate-spin" />
      case "offline":
        return <WifiOff className="w-4 h-4 text-destructive" />
    }
  }

  const getStatusText = () => {
    switch (data.connectionStatus) {
      case "connected":
        return "Connected"
      case "updating":
        return "Updating..."
      case "offline":
        return "Offline"
    }
  }

  return (
    <header className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between mb-8">
      <div>
        <h1 className="text-2xl sm:text-3xl font-bold text-foreground">{title}</h1>
        {subtitle && <p className="text-muted-foreground mt-1">{subtitle}</p>}
      </div>

      <div className="flex items-center gap-4">
        {/* Connection Status */}
        <div className="flex items-center gap-2 px-3 py-2 rounded-lg bg-card border border-border">
          {getStatusIcon()}
          <span className="text-sm font-medium">{getStatusText()}</span>
          <span className="text-xs text-muted-foreground hidden sm:inline">
            {data.lastUpdated.toLocaleTimeString()}
          </span>
        </div>

        {/* Alert indicator */}
        <button
          className={cn(
            "relative p-2 rounded-lg bg-card border border-border transition-colors hover:bg-muted",
            isLimitExceeded && "border-destructive"
          )}
        >
          <Bell className={cn("w-5 h-5", isLimitExceeded ? "text-destructive" : "text-foreground")} />
          {isLimitExceeded && (
            <span className="absolute -top-1 -right-1 flex h-4 w-4">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-destructive opacity-75" />
              <span className="relative inline-flex rounded-full h-4 w-4 bg-destructive items-center justify-center text-[8px] font-bold text-destructive-foreground">
                !
              </span>
            </span>
          )}
        </button>
      </div>
    </header>
  )
}
