"use client"

import { useEnergy } from "@/lib/energy-context"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts"

export function UsageChart() {
  const { data } = useEnergy()

  const chartData = data.hourlyData.map((value, index) => ({
    hour: `${index}:00`,
    usage: Number(value.toFixed(2)),
  }))

  return (
    <Card className="col-span-full lg:col-span-2">
      <CardHeader className="pb-2">
        <CardTitle className="text-lg font-semibold">Hourly Energy Usage</CardTitle>
        <p className="text-sm text-muted-foreground">Real-time consumption data (kWh)</p>
      </CardHeader>
      <CardContent className="pt-4">
        <div className="h-[300px] w-full">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={chartData} margin={{ top: 10, right: 10, left: -10, bottom: 0 }}>
              <defs>
                <linearGradient id="usageGradient" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="var(--chart-1)" stopOpacity={0.4} />
                  <stop offset="95%" stopColor="var(--chart-1)" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" className="stroke-border" vertical={false} />
              <XAxis
                dataKey="hour"
                tickLine={false}
                axisLine={false}
                className="text-muted-foreground text-xs"
                tick={{ fill: 'var(--muted-foreground)' }}
                interval={3}
              />
              <YAxis
                tickLine={false}
                axisLine={false}
                className="text-muted-foreground text-xs"
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
                labelStyle={{ color: 'var(--muted-foreground)' }}
                formatter={(value: number) => [`${value} kWh`, 'Usage']}
              />
              <Area
                type="monotone"
                dataKey="usage"
                stroke="var(--chart-1)"
                strokeWidth={2}
                fill="url(#usageGradient)"
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  )
}
