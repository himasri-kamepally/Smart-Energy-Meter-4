"use client"

import { Header } from "@/components/dashboard/header"
import { useEnergy } from "@/lib/energy-context"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { useState } from "react"
import { cn } from "@/lib/utils"
import {
  AreaChart,
  Area,
  BarChart,
  Bar,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from "recharts"

type TimeRange = "daily" | "weekly" | "monthly"

export default function AnalyticsPage() {
  const { data } = useEnergy()
  const [timeRange, setTimeRange] = useState<TimeRange>("daily")

  const getChartData = () => {
    switch (timeRange) {
      case "daily":
        return data.dailyData
      case "weekly":
        return data.weeklyData
      case "monthly":
        return data.monthlyData
    }
  }

  const getXAxisKey = () => {
    switch (timeRange) {
      case "daily":
        return "day"
      case "weekly":
        return "week"
      case "monthly":
        return "month"
    }
  }

  const chartData = getChartData()
  const xAxisKey = getXAxisKey()

  // Calculate statistics
  const usageValues = chartData.map(d => d.usage)
  const avgUsage = usageValues.reduce((a, b) => a + b, 0) / usageValues.length
  const maxUsage = Math.max(...usageValues)
  const minUsage = Math.min(...usageValues)

  return (
    <div className="space-y-6">
      <Header
        title="Analytics"
        subtitle="Detailed energy consumption insights"
      />

      {/* Time Range Selector */}
      <div className="flex gap-2">
        {(["daily", "weekly", "monthly"] as TimeRange[]).map(range => (
          <button
            key={range}
            onClick={() => setTimeRange(range)}
            className={cn(
              "px-4 py-2 rounded-lg text-sm font-medium transition-colors capitalize",
              timeRange === range
                ? "bg-primary text-primary-foreground"
                : "bg-card border border-border text-foreground hover:bg-muted"
            )}
          >
            {range}
          </button>
        ))}
      </div>

      {/* Statistics Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-6">
            <p className="text-sm text-muted-foreground">Average Usage</p>
            <p className="text-3xl font-bold text-primary mt-1">{avgUsage.toFixed(1)} kWh</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <p className="text-sm text-muted-foreground">Peak Usage</p>
            <p className="text-3xl font-bold text-destructive mt-1">{maxUsage.toFixed(1)} kWh</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <p className="text-sm text-muted-foreground">Daily Minimum</p>
            <p className="text-3xl font-bold text-success mt-1">{minUsage.toFixed(1)} kWh</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <p className="text-sm text-muted-foreground">Power Factor</p>
            <p className="text-3xl font-bold text-amber-500 mt-1">0.96</p>
          </CardContent>
        </Card>
      </div>

      {/* Main Area Chart */}
      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle className="capitalize">{timeRange} Energy Consumption</CardTitle>
          <div className="text-xs font-medium text-muted-foreground bg-muted px-2 py-1 rounded">
            Live Updates Syncing
          </div>
        </CardHeader>
        <CardContent>
          <div className="h-[350px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={chartData} margin={{ top: 10, right: 10, left: -10, bottom: 0 }}>
                <defs>
                  <linearGradient id="analyticsGradient" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="var(--chart-1)" stopOpacity={0.4} />
                    <stop offset="95%" stopColor="var(--chart-1)" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" className="stroke-border" vertical={false} />
                <XAxis
                  dataKey={xAxisKey}
                  tickLine={false}
                  axisLine={false}
                  tick={{ fill: 'var(--muted-foreground)' }}
                />
                <YAxis
                  tickLine={false}
                  axisLine={false}
                  tick={{ fill: 'var(--muted-foreground)' }}
                  tickFormatter={value => `${value}`}
                />
                <Tooltip
                  contentStyle={{
                    backgroundColor: 'var(--card)',
                    border: '1px solid var(--border)',
                    borderRadius: '8px',
                    color: 'var(--card-foreground)',
                  }}
                  formatter={(value: number) => [`${value.toFixed(1)} kWh`, 'Usage']}
                />
                <Area
                  type="monotone"
                  dataKey="usage"
                  stroke="var(--chart-1)"
                  strokeWidth={2}
                  fill="url(#analyticsGradient)"
                  animationDuration={1000}
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>

      {/* Bar and Line Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Usage Distribution</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-[280px] w-full">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={chartData} margin={{ top: 10, right: 10, left: -10, bottom: 0 }}>
                  <CartesianGrid strokeDasharray="3 3" className="stroke-border" vertical={false} />
                  <XAxis
                    dataKey={xAxisKey}
                    tickLine={false}
                    axisLine={false}
                    tick={{ fill: 'var(--muted-foreground)' }}
                  />
                  <YAxis
                    tickLine={false}
                    axisLine={false}
                    tick={{ fill: 'var(--muted-foreground)' }}
                  />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: 'var(--card)',
                      border: '1px solid var(--border)',
                      borderRadius: '8px',
                      color: 'var(--card-foreground)',
                    }}
                    formatter={(value: number) => [`${value.toFixed(1)} kWh`, 'Usage']}
                  />
                  <Bar dataKey="usage" fill="var(--chart-2)" radius={[4, 4, 0, 0]} animationDuration={1500} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Peak Usage Analysis</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center justify-between p-4 rounded-lg bg-muted/50 border border-border">
                <div>
                  <p className="text-sm text-muted-foreground">Highest Peak Hour</p>
                  <p className="text-xl font-bold">{data.hourlyData.indexOf(Math.max(...data.hourlyData))}:00</p>
                </div>
                <div className="text-right">
                  <p className="text-sm text-muted-foreground">Peak Load</p>
                  <p className="text-xl font-bold text-destructive">{Math.max(...data.hourlyData).toFixed(2)} kWh</p>
                </div>
              </div>

              <div className="flex items-center justify-between p-4 rounded-lg bg-muted/50 border border-border">
                <div>
                  <p className="text-sm text-muted-foreground">Top Consuming Device</p>
                  <p className="text-xl font-bold">
                    {data.appliances.sort((a, b) => b.power - a.power)[0]?.name || "N/A"}
                  </p>
                </div>
                <div className="text-right">
                  <p className="text-sm text-muted-foreground">Current Draw</p>
                  <p className="text-xl font-bold text-amber-500">
                    {data.appliances.sort((a, b) => b.power - a.power)[0]?.power || 0}W
                  </p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Insights */}
      <Card className="bg-gradient-to-r from-primary/5 to-secondary/5 border-primary/20">
        <CardContent className="p-6">
          <h3 className="text-lg font-semibold mb-4">Savings & Efficiency Insights</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="p-4 rounded-lg bg-card/50 border border-border/50">
              <p className="text-sm text-muted-foreground">Comparison (Last Month)</p>
              <p className="text-xl font-bold text-success mt-1">-12.5% decrease</p>
              <p className="text-xs text-muted-foreground mt-1">Great job on reducing consumption!</p>
            </div>
            <div className="p-4 rounded-lg bg-card/50 border border-border/50">
              <p className="text-sm text-muted-foreground">Projected Bill (Current Rate)</p>
              <p className="text-xl font-bold text-warning mt-1">₹{data.billEstimate.toLocaleString()}</p>
              <p className="text-xs text-muted-foreground mt-1">Based on current usage patterns</p>
            </div>
            <div className="p-4 rounded-lg bg-card/50 border border-border/50">
              <p className="text-sm text-muted-foreground">Potential Savings</p>
              <p className="text-xl font-bold text-primary mt-1">₹{Math.round(data.billEstimate * 0.15).toLocaleString()}</p>
              <p className="text-xs text-muted-foreground mt-1">By optimizing peak hour usage</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
