"use client"

import Link from "next/link"
import { usePathname, useRouter } from "next/navigation"
import { cn } from "@/lib/utils"
import { useEnergy } from "@/lib/energy-context"
import { useAuth } from "@/lib/auth-context"
import { useTheme } from "@/lib/theme-context"
import {
  LayoutDashboard,
  BarChart3,
  Cpu,
  Bell,
  User,
  Zap,
  Moon,
  Sun,
  Menu,
  X,
  LogOut,
  Play,
  Pause,
} from "lucide-react"
import { useState } from "react"

const navItems = [
  { href: "/dashboard", label: "Dashboard", icon: LayoutDashboard },
  { href: "/dashboard/analytics", label: "Analytics", icon: BarChart3 },
  { href: "/dashboard/devices", label: "Devices", icon: Cpu },
  { href: "/dashboard/alerts", label: "Alerts", icon: Bell },
  { href: "/dashboard/profile", label: "Profile", icon: User },
]

export function Sidebar() {
  const pathname = usePathname()
  const router = useRouter()
  const { isLimitExceeded, simulationMode, setSimulationMode } = useEnergy()
  const { user, logout } = useAuth()
  const { theme, toggleTheme } = useTheme()
  const [isMobileOpen, setIsMobileOpen] = useState(false)

  const handleLogout = () => {
    logout()
    router.push("/login")
  }

  // Get user display name
  const displayName = user?.name || "Guest User"
  const emailDisplay = user?.email || "Demo Mode"

  return (
    <>
      {/* Mobile menu button */}
      <button
        onClick={() => setIsMobileOpen(!isMobileOpen)}
        className="fixed top-4 left-4 z-50 p-2 rounded-lg bg-sidebar text-sidebar-foreground lg:hidden"
      >
        {isMobileOpen ? <X size={24} /> : <Menu size={24} />}
      </button>

      {/* Mobile overlay */}
      {isMobileOpen && (
        <div
          className="fixed inset-0 bg-background/80 backdrop-blur-sm z-40 lg:hidden"
          onClick={() => setIsMobileOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside
        className={cn(
          "fixed top-0 left-0 z-40 h-screen w-64 bg-sidebar text-sidebar-foreground border-r border-sidebar-border transition-transform duration-300 lg:translate-x-0",
          isMobileOpen ? "translate-x-0" : "-translate-x-full"
        )}
      >
        <div className="flex flex-col h-full">
          {/* Logo */}
          <div className="flex items-center gap-3 px-6 py-6 border-b border-sidebar-border">
            <div className="flex items-center justify-center w-10 h-10 rounded-lg bg-primary">
              <Zap className="w-6 h-6 text-primary-foreground" />
            </div>
            <div>
              <h1 className="text-lg font-semibold">Smart Energy</h1>
              <p className="text-xs text-sidebar-foreground/60">Meter System</p>
            </div>
          </div>

          {/* Navigation */}
          <nav className="flex-1 px-4 py-6 space-y-2">
            {navItems.map(item => {
              const isActive = pathname === item.href
              const Icon = item.icon
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setIsMobileOpen(false)}
                  className={cn(
                    "flex items-center gap-3 px-4 py-3 rounded-lg transition-all duration-200",
                    isActive
                      ? "bg-sidebar-primary text-sidebar-primary-foreground"
                      : "text-sidebar-foreground/70 hover:bg-sidebar-accent hover:text-sidebar-accent-foreground"
                  )}
                >
                  <Icon size={20} />
                  <span className="font-medium">{item.label}</span>
                  {item.label === "Alerts" && isLimitExceeded && (
                    <span className="ml-auto flex h-5 w-5 items-center justify-center rounded-full bg-destructive text-[10px] font-bold text-destructive-foreground">
                      !
                    </span>
                  )}
                </Link>
              )
            })}
          </nav>

          {/* Simulation toggle */}
          <div className="px-4 py-2 border-t border-sidebar-border">
            <button
              onClick={() => setSimulationMode(!simulationMode)}
              className={cn(
                "flex items-center gap-3 w-full px-4 py-3 rounded-lg transition-all duration-200",
                simulationMode 
                  ? "bg-primary/20 text-primary" 
                  : "text-sidebar-foreground/70 hover:bg-sidebar-accent hover:text-sidebar-accent-foreground"
              )}
            >
              {simulationMode ? <Pause size={20} /> : <Play size={20} />}
              <span className="font-medium">
                {simulationMode ? "Simulation ON" : "Simulation OFF"}
              </span>
            </button>
          </div>

          {/* Theme toggle */}
          <div className="px-4 py-2 border-t border-sidebar-border">
            <button
              onClick={toggleTheme}
              className="flex items-center gap-3 w-full px-4 py-3 rounded-lg text-sidebar-foreground/70 hover:bg-sidebar-accent hover:text-sidebar-accent-foreground transition-colors"
            >
              {theme === "dark" ? <Sun size={20} /> : <Moon size={20} />}
              <span className="font-medium">{theme === "dark" ? "Light Mode" : "Dark Mode"}</span>
            </button>
          </div>

          {/* User info and logout */}
          <div className="px-4 py-4 border-t border-sidebar-border space-y-3">
            <div className="flex items-center gap-3 px-4">
              <div className="w-10 h-10 rounded-full bg-gradient-to-br from-primary/20 to-secondary/20 flex items-center justify-center">
                {user?.name ? (
                  <span className="text-sm font-bold text-primary">
                    {user.name.charAt(0).toUpperCase()}
                  </span>
                ) : (
                  <User size={20} className="text-sidebar-foreground/70" />
                )}
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium truncate">{displayName}</p>
                <p className="text-xs text-sidebar-foreground/60 truncate">{emailDisplay}</p>
              </div>
            </div>

            {/* Logout button */}
            <button
              onClick={handleLogout}
              className="flex items-center gap-3 w-full px-4 py-2.5 rounded-lg text-destructive/80 hover:bg-destructive/10 hover:text-destructive transition-colors"
            >
              <LogOut size={18} />
              <span className="text-sm font-medium">Logout</span>
            </button>
          </div>
        </div>
      </aside>
    </>
  )
}
