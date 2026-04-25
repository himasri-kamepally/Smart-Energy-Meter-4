"use client"

import { Header } from "@/components/dashboard/header"
import { useEnergy } from "@/lib/energy-context"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import {
  AlertTriangle,
  AlertCircle,
  Info,
  Bell,
  Shield,
  Zap,
  CheckCircle,
} from "lucide-react"
import { cn } from "@/lib/utils"

export default function AlertsPage() {
  const { data, isLimitExceeded } = useEnergy()

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
        return {
          container: "bg-destructive/10 border-destructive",
          icon: "bg-destructive/20 text-destructive",
          text: "text-destructive",
        }
      case "warning":
        return {
          container: "bg-warning/10 border-warning",
          icon: "bg-warning/20 text-warning-foreground",
          text: "text-warning-foreground",
        }
      default:
        return {
          container: "bg-primary/10 border-primary",
          icon: "bg-primary/20 text-primary",
          text: "text-primary",
        }
    }
  }

  const formatTime = (date: Date) => {
    return date.toLocaleString()
  }

  // Dummy security alerts
  const securityAlerts = [
    {
      id: "sec-1",
      type: "warning",
      title: "Unusual Power Pattern Detected",
      message: "Power consumption pattern differs from your typical usage. This could indicate an appliance malfunction.",
      timestamp: new Date(Date.now() - 14400000),
    },
    {
      id: "sec-2",
      type: "danger",
      title: "Possible Power Theft Alert",
      message: "Significant discrepancy detected between meter reading and expected consumption. Please verify your connections.",
      timestamp: new Date(Date.now() - 86400000),
    },
  ]

  const allAlerts = [...data.alerts, ...securityAlerts].sort(
    (a, b) => b.timestamp.getTime() - a.timestamp.getTime()
  )

  const dangerCount = allAlerts.filter(a => a.type === "danger").length
  const warningCount = allAlerts.filter(a => a.type === "warning").length
  const infoCount = allAlerts.filter(a => a.type === "info").length

  return (
    <div className="space-y-6">
      <Header
        title="Alerts & Notifications"
        subtitle="Monitor system alerts and security warnings"
      />

      {/* Summary Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <Card className="border-destructive/30">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Critical Alerts</p>
                <p className="text-3xl font-bold text-destructive mt-1">{dangerCount}</p>
              </div>
              <div className="p-3 rounded-lg bg-destructive/10">
                <AlertTriangle className="w-6 h-6 text-destructive" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="border-warning/30">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Warnings</p>
                <p className="text-3xl font-bold text-warning mt-1">{warningCount}</p>
              </div>
              <div className="p-3 rounded-lg bg-warning/10">
                <AlertCircle className="w-6 h-6 text-warning" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="border-primary/30">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Information</p>
                <p className="text-3xl font-bold text-primary mt-1">{infoCount}</p>
              </div>
              <div className="p-3 rounded-lg bg-primary/10">
                <Info className="w-6 h-6 text-primary" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Limit Status Banner */}
      <Card
        className={cn(
          "border-2",
          isLimitExceeded ? "border-destructive bg-destructive/5" : "border-success bg-success/5"
        )}
      >
        <CardContent className="p-6">
          <div className="flex items-center gap-4">
            <div
              className={cn(
                "p-4 rounded-full",
                isLimitExceeded ? "bg-destructive/20" : "bg-success/20"
              )}
            >
              {isLimitExceeded ? (
                <AlertTriangle className="w-8 h-8 text-destructive" />
              ) : (
                <CheckCircle className="w-8 h-8 text-success" />
              )}
            </div>
            <div>
              <h3 className={cn("text-xl font-bold", isLimitExceeded ? "text-destructive" : "text-success")}>
                {isLimitExceeded ? "Daily Limit Exceeded!" : "Usage Within Limits"}
              </h3>
              <p className="text-muted-foreground">
                {isLimitExceeded
                  ? `Current: ${data.todayUsage.toFixed(2)} kWh | Limit: ${data.dailyLimit} kWh`
                  : `You're using ${data.todayUsage.toFixed(2)} kWh out of your ${data.dailyLimit} kWh daily limit`}
              </p>
            </div>
            {isLimitExceeded && (
              <div className="ml-auto">
                <span className="relative flex h-4 w-4">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-destructive opacity-75" />
                  <span className="relative inline-flex rounded-full h-4 w-4 bg-destructive" />
                </span>
              </div>
            )}
          </div>
        </CardContent>
      </Card>

      {/* All Alerts */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Bell className="w-5 h-5 text-primary" />
            All Alerts
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {allAlerts.length === 0 ? (
              <div className="text-center py-8">
                <CheckCircle className="w-12 h-12 text-success mx-auto mb-4" />
                <p className="text-lg font-medium text-foreground">All Clear!</p>
                <p className="text-muted-foreground">No alerts at this time</p>
              </div>
            ) : (
              allAlerts.map(alert => {
                const styles = getAlertStyles(alert.type)
                return (
                  <div
                    key={alert.id}
                    className={cn(
                      "flex items-start gap-4 p-4 rounded-lg border transition-all hover:shadow-md",
                      styles.container
                    )}
                  >
                    <div className={cn("p-2 rounded-lg flex-shrink-0", styles.icon)}>
                      {getAlertIcon(alert.type)}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-start justify-between gap-4">
                        <div>
                          <h4 className={cn("font-semibold", styles.text)}>{alert.title}</h4>
                          <p className="text-sm text-muted-foreground mt-1">{alert.message}</p>
                        </div>
                        <span className="text-xs text-muted-foreground whitespace-nowrap">
                          {formatTime(alert.timestamp)}
                        </span>
                      </div>
                    </div>
                  </div>
                )
              })
            )}
          </div>
        </CardContent>
      </Card>

      {/* Security Section */}
      <Card className="bg-gradient-to-br from-primary/5 to-secondary/5 border-primary/20">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Shield className="w-5 h-5 text-primary" />
            Security Monitoring
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="p-4 rounded-lg bg-card/50 border border-border/50">
              <div className="flex items-center gap-3">
                <Zap className="w-5 h-5 text-success" />
                <div>
                  <p className="font-medium">Meter Connection</p>
                  <p className="text-sm text-muted-foreground">Secure and verified</p>
                </div>
              </div>
            </div>
            <div className="p-4 rounded-lg bg-card/50 border border-border/50">
              <div className="flex items-center gap-3">
                <Shield className="w-5 h-5 text-success" />
                <div>
                  <p className="font-medium">Data Encryption</p>
                  <p className="text-sm text-muted-foreground">AES-256 enabled</p>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
