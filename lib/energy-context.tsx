"use client"

import { createContext, useContext, useState, useEffect, useCallback, type ReactNode } from "react"
import { supabase } from "./supabase"
import { useAuth } from "./auth-context"

export interface Appliance {
  id: string
  name: string
  room: string
  status: "on" | "off"
  power: number
  icon: string
}

export interface Alert {
  id: string
  type: "warning" | "danger" | "info"
  title: string
  message: string
  timestamp: Date
}

export interface EnergyData {
  totalUsage: number
  todayUsage: number
  monthlyUsage: number
  dailyLimit: number
  billEstimate: number
  connectionStatus: "connected" | "updating" | "offline"
  lastUpdated: Date
  hourlyData: number[]
  dailyData: { day: string; usage: number }[]
  weeklyData: { week: string; usage: number }[]
  monthlyData: { month: string; usage: number }[]
  appliances: Appliance[]
  alerts: Alert[]
  activityLog: { id: string; action: string; timestamp: Date }[]
  voltage: number
  current: number
  power: number
}

interface EnergyContextType {
  data: EnergyData
  isDarkMode: boolean
  toggleDarkMode: () => void
  isLimitExceeded: boolean
  refreshData: () => Promise<void>
  simulationMode: boolean
  setSimulationMode: (value: boolean) => void
}

const EnergyContext = createContext<EnergyContextType | undefined>(undefined)

const defaultSimulationAppliances: Appliance[] = [
  { id: "sim-1", name: "Ceiling Fan", room: "Living Room", status: "on", power: 75, icon: "fan" },
  { id: "sim-2", name: "LED Light", room: "Living Room", status: "on", power: 12, icon: "lightbulb" },
  { id: "sim-3", name: "Air Conditioner", room: "Bedroom", status: "on", power: 1500, icon: "snowflake" },
  { id: "sim-4", name: "Smart TV", room: "Living Room", status: "off", power: 150, icon: "tv" },
  { id: "sim-5", name: "Refrigerator", room: "Kitchen", status: "on", power: 150, icon: "refrigerator" },
  { id: "sim-6", name: "Smartphone Charger", room: "Bedroom", status: "off", power: 15, icon: "zap" },
]

export function EnergyProvider({ children }: { children: ReactNode }) {
  const { user } = useAuth()
  const [mounted, setMounted] = useState(false)
  const [isDarkMode, setIsDarkMode] = useState(true)
  const [data, setData] = useState<EnergyData>({
    totalUsage: 1245.8,
    todayUsage: 3.42,
    monthlyUsage: 142.5,
    dailyLimit: 5,
    billEstimate: 1850,
    connectionStatus: "connected",
    lastUpdated: new Date(),
    hourlyData: Array.from({ length: 24 }, () => Math.random() * 0.5 + 0.1),
    dailyData: [
      { day: "Mon", usage: 4.2 },
      { day: "Tue", usage: 3.8 },
      { day: "Wed", usage: 5.1 },
      { day: "Thu", usage: 4.5 },
      { day: "Fri", usage: 3.9 },
      { day: "Sat", usage: 4.8 },
      { day: "Sun", usage: 3.4 },
    ],
    weeklyData: [
      { week: "Week 1", usage: 28.5 },
      { week: "Week 2", usage: 32.1 },
      { week: "Week 3", usage: 29.8 },
      { week: "Week 4", usage: 31.2 },
    ],
    monthlyData: [
      { month: "Jan", usage: 145.2 },
      { month: "Feb", usage: 132.8 },
      { month: "Mar", usage: 148.5 },
      { month: "Apr", usage: 142.5 },
    ],
    appliances: defaultSimulationAppliances,
    alerts: [],
    activityLog: [
      { id: "1", action: "System initialized", timestamp: new Date(Date.now() - 3600000) },
    ],
    voltage: 230.5,
    current: 1.25,
    power: 288.1,
  })
  const [simulationMode, setSimulationMode] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  const refreshData = useCallback(async () => {
    if (!user) return

    try {
      // 1. Fetch appliances
      const { data: appliances, error: appError } = await supabase
        .from('appliances')
        .select('*')
        .eq('user_id', user.id)
      
      // 2. Fetch alerts
      const { data: alerts, error: alertError } = await supabase
        .from('alerts')
        .select('*')
        .eq('user_id', user.id)
        .order('timestamp', { ascending: false })
        .limit(10)

      // 3. Fetch energy logs for today/month
      const startOfMonth = new Date()
      startOfMonth.setDate(1)
      startOfMonth.setHours(0, 0, 0, 0)

      const startOfToday = new Date()
      startOfToday.setHours(0, 0, 0, 0)

      const { data: logs, error: logsError } = await supabase
        .from('energy_logs')
        .select('*')
        .eq('user_id', user.id)
        .gte('timestamp', startOfMonth.toISOString())

      if (appError || alertError || logsError) throw new Error("Fetch error")

      // Process logs for various aggregates
      const todayLogs = logs?.filter(log => new Date(log.timestamp) >= startOfToday) || []
      const todayUsage = todayLogs.reduce((acc, log) => acc + (log.usage || 0), 0)
      const monthlyUsage = logs?.reduce((acc, log) => acc + (log.usage || 0), 0) || 0

      // Map appliances
      const mappedAppliances: Appliance[] = (appliances || []).map(app => ({
        id: app.id,
        name: app.name,
        room: app.room,
        status: app.status,
        power: app.power,
        icon: app.icon || 'zap'
      }))

      // Map alerts
      const mappedAlerts: Alert[] = (alerts || []).map(alert => ({
        id: alert.id,
        type: alert.type as any,
        title: alert.title,
        message: alert.message,
        timestamp: new Date(alert.timestamp)
      }))

      // Generate chart data from logs (simplified for now)
      const hourlyData = Array(24).fill(0)
      todayLogs.forEach(log => {
        const hour = new Date(log.timestamp).getHours()
        hourlyData[hour] += log.usage || 0
      })

      setData(prev => ({
        ...prev,
        todayUsage,
        monthlyUsage,
        totalUsage: monthlyUsage + 1103.3, // Offset for demo
        billEstimate: Math.round(monthlyUsage * (user.billEstimateRate || 13)),
        dailyLimit: user.dailyLimit || 5,
        appliances: mappedAppliances.length > 0 ? mappedAppliances : prev.appliances,
        alerts: mappedAlerts,
        hourlyData,
        lastUpdated: new Date(),
        connectionStatus: "connected"
      }))

    } catch (err) {
      console.error("Error refreshing energy data:", err)
      setData(prev => ({ ...prev, connectionStatus: "offline" }))
    }
  }, [user])

  // Initial load and polling
  useEffect(() => {
    if (user && !simulationMode) {
      refreshData()
      const interval = setInterval(refreshData, 30000) // Poll every 30s
      return () => clearInterval(interval)
    }
  }, [user, refreshData, simulationMode])

  // Simulation Loop
  useEffect(() => {
    if (!simulationMode) return

    const interval = setInterval(() => {
      setData(prev => {
        // 1. Update appliances status randomly
        const updatedAppliances = prev.appliances.map(app => {
          // 5% chance to toggle status
          const shouldToggle = Math.random() < 0.05
          const newStatus = shouldToggle ? (app.status === "on" ? "off" : "on") : app.status
          
          // Randomize power slightly if ON
          let newPower = app.power
          if (newStatus === "on") {
            const basePower = app.id.startsWith('sim-') 
              ? defaultSimulationAppliances.find(d => d.id === app.id)?.power || 50 
              : app.power
            newPower = basePower + (Math.random() - 0.5) * (basePower * 0.1)
          } else {
            newPower = 0
          }

          return { ...app, status: newStatus as any, power: Math.round(newPower) }
        })

        // Add activity log if status changed
        const newLogs = [...prev.activityLog]
        updatedAppliances.forEach((app, i) => {
          if (app.status !== prev.appliances[i].status) {
            newLogs.unshift({
              id: Date.now().toString() + i,
              action: `${app.name} turned ${app.status.toUpperCase()}`,
              timestamp: new Date()
            })
          }
        })
        if (newLogs.length > 15) newLogs.pop()

        // 2. Calculate Total Real-time Power
        const totalPower = updatedAppliances.reduce((sum, app) => sum + app.power, 0)
        
        // 3. Realistic Voltage & Current
        const voltage = 220 + Math.random() * 15
        const current = totalPower / voltage
        
        // 4. Update Energy Consumption (3s interval)
        const energyIncrement = (totalPower / 1000) * (3 / 3600)
        
        const newTodayUsage = prev.todayUsage + energyIncrement
        const newMonthlyUsage = prev.monthlyUsage + energyIncrement
        const newTotalUsage = prev.totalUsage + energyIncrement

        // 5. Update Charts
        const currentHour = new Date().getHours()
        const newHourlyData = [...prev.hourlyData]
        newHourlyData[currentHour] += energyIncrement

        // Update daily data (increment current day - assuming last entry is today)
        const newDailyData = [...prev.dailyData]
        if (newDailyData.length > 0) {
          newDailyData[newDailyData.length - 1].usage += energyIncrement
        }

        return {
          ...prev,
          voltage: Number(voltage.toFixed(1)),
          current: Number(current.toFixed(2)),
          power: Number(totalPower.toFixed(1)),
          todayUsage: newTodayUsage,
          totalUsage: newTotalUsage,
          monthlyUsage: newMonthlyUsage,
          billEstimate: Math.round(newMonthlyUsage * (user?.billEstimateRate || 13)),
          hourlyData: newHourlyData,
          dailyData: newDailyData,
          appliances: updatedAppliances,
          activityLog: newLogs,
          lastUpdated: new Date(),
          connectionStatus: "connected"
        }
      })
    }, 3000)

    return () => clearInterval(interval)
  }, [simulationMode, user?.billEstimateRate])

  const toggleDarkMode = useCallback(() => {
    setIsDarkMode(prev => !prev)
  }, [])

  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add("dark")
    } else {
      document.documentElement.classList.remove("dark")
    }
  }, [isDarkMode])

  const isLimitExceeded = data.todayUsage > data.dailyLimit

  if (!mounted) return null

  return (
    <EnergyContext.Provider value={{ 
      data, 
      isDarkMode, 
      toggleDarkMode, 
      isLimitExceeded, 
      refreshData,
      simulationMode,
      setSimulationMode
    }}>
      {children}
    </EnergyContext.Provider>
  )
}

export function useEnergy() {
  const context = useContext(EnergyContext)
  if (context === undefined) {
    throw new Error("useEnergy must be used within an EnergyProvider")
  }
  return context
}

