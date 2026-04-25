"use client"

import { useState, useEffect } from "react"
import { Header } from "@/components/dashboard/header"
import { StatCards } from "@/components/dashboard/stat-cards"
import { UsageChart } from "@/components/dashboard/usage-chart"
import { AlertBanner } from "@/components/dashboard/alert-banner"
import { ActivityLog } from "@/components/dashboard/activity-log"
import { LiveMonitor } from "@/components/dashboard/live-monitor"
import { AISuggestions } from "@/components/dashboard/ai-suggestions"
import { AlertsList } from "@/components/dashboard/alerts-list"
import { useEnergy } from "@/lib/energy-context"

export default function DashboardPage() {
  const { data } = useEnergy()
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  // Only show timestamp on client to avoid hydration mismatch
  const subtitle = mounted 
    ? `Last updated: ${data.lastUpdated.toLocaleTimeString()}` 
    : "Last updated: --:--:-- --"

  return (
    <div className="space-y-6">
      <Header
        title="Dashboard"
        subtitle={subtitle}
      />

      {/* Alert Banner */}
      <AlertBanner />

      {/* Live Monitor */}
      <LiveMonitor />

      {/* Stat Cards */}
      <StatCards />

      {/* Charts and Sidebar */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main Chart */}
        <UsageChart />

        {/* Sidebar Content */}
        <div className="space-y-6">
          <AlertsList />
        </div>
      </div>

      {/* Bottom Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <ActivityLog />
        <AISuggestions />
      </div>

      {/* Live indicator */}
      <div className="fixed bottom-4 left-4 lg:left-68 flex items-center gap-2 px-3 py-2 bg-card rounded-full border border-border shadow-lg">
        <span className="relative flex h-3 w-3">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-success opacity-75" />
          <span className="relative inline-flex rounded-full h-3 w-3 bg-success" />
        </span>
        <span className="text-xs font-medium text-foreground">Live Updating</span>
      </div>
    </div>
  )
}
