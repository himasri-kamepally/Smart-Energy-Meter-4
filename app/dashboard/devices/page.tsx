"use client"

import { Header } from "@/components/dashboard/header"
import { useEnergy } from "@/lib/energy-context"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import {
  Fan,
  Lightbulb,
  Snowflake,
  Lamp,
  Refrigerator,
  Microwave,
  WashingMachine,
  Droplet,
} from "lucide-react"
import { cn } from "@/lib/utils"

const iconMap: Record<string, React.ComponentType<{ className?: string }>> = {
  fan: Fan,
  lightbulb: Lightbulb,
  snowflake: Snowflake,
  lamp: Lamp,
  refrigerator: Refrigerator,
  microwave: Microwave,
  washing: WashingMachine,
  droplet: Droplet,
}

export default function DevicesPage() {
  const { data } = useEnergy()

  // Group appliances by room
  const groupedAppliances = data.appliances.reduce(
    (acc, appliance) => {
      if (!acc[appliance.room]) {
        acc[appliance.room] = []
      }
      acc[appliance.room].push(appliance)
      return acc
    },
    {} as Record<string, typeof data.appliances>
  )

  const rooms = Object.entries(groupedAppliances)

  const totalOnDevices = data.appliances.filter(a => a.status === "on").length
  const totalPower = data.appliances
    .filter(a => a.status === "on")
    .reduce((sum, a) => sum + a.power, 0)

  return (
    <div className="space-y-6">
      <Header
        title="Devices"
        subtitle="Monitor your connected appliances"
      />

      {/* Summary Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Total Devices</p>
                <p className="text-3xl font-bold text-foreground">{data.appliances.length}</p>
              </div>
              <div className="p-3 rounded-lg bg-primary/10">
                <Lightbulb className="w-6 h-6 text-primary" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Active Now</p>
                <p className="text-3xl font-bold text-success">{totalOnDevices}</p>
              </div>
              <div className="p-3 rounded-lg bg-success/10">
                <Fan className="w-6 h-6 text-success" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Current Load</p>
                <p className="text-3xl font-bold text-warning">{totalPower}W</p>
              </div>
              <div className="p-3 rounded-lg bg-warning/10">
                <Snowflake className="w-6 h-6 text-warning" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Devices by Room */}
      <div className="space-y-6">
        {rooms.map(([room, appliances]) => (
          <Card key={room}>
            <CardHeader className="pb-4">
              <CardTitle className="text-lg">{room}</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                {appliances.map(appliance => {
                  const Icon = iconMap[appliance.icon] || Lightbulb
                  const isOn = appliance.status === "on"

                  return (
                    <div
                      key={appliance.id}
                      className={cn(
                        "relative p-4 rounded-xl border transition-all duration-300",
                        isOn
                          ? "bg-gradient-to-br from-primary/10 to-secondary/10 border-primary/30"
                          : "bg-muted/30 border-border"
                      )}
                    >
                      {/* Background image overlay effect */}
                      <div
                        className={cn(
                          "absolute inset-0 rounded-xl opacity-5 bg-cover bg-center",
                          isOn ? "opacity-10" : "opacity-5"
                        )}
                        style={{
                          backgroundImage: `url(https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=200&h=200&fit=crop)`,
                        }}
                      />

                      <div className="relative flex items-start justify-between">
                        <div className="flex items-center gap-3">
                          <div
                            className={cn(
                              "p-3 rounded-lg",
                              isOn ? "bg-primary/20" : "bg-muted"
                            )}
                          >
                            <Icon
                              className={cn(
                                "w-6 h-6 transition-colors",
                                isOn ? "text-primary" : "text-muted-foreground"
                              )}
                            />
                          </div>
                          <div>
                            <p className="font-medium text-foreground">{appliance.name}</p>
                            <p className="text-sm text-muted-foreground">{appliance.power}W</p>
                          </div>
                        </div>

                        {/* Status Badge */}
                        <span
                          className={cn(
                            "px-2 py-1 rounded-full text-xs font-medium",
                            isOn
                              ? "bg-success/20 text-success"
                              : "bg-muted text-muted-foreground"
                          )}
                        >
                          {isOn ? "ON" : "OFF"}
                        </span>
                      </div>

                      {/* Live indicator for active devices */}
                      {isOn && (
                        <div className="absolute top-2 right-2">
                          <span className="relative flex h-2 w-2">
                            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-success opacity-75" />
                            <span className="relative inline-flex rounded-full h-2 w-2 bg-success" />
                          </span>
                        </div>
                      )}
                    </div>
                  )
                })}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Note about monitoring */}
      <div className="p-4 rounded-lg bg-muted/50 border border-border">
        <p className="text-sm text-muted-foreground text-center">
          This page displays real-time device status. Device control features coming soon.
        </p>
      </div>
    </div>
  )
}
