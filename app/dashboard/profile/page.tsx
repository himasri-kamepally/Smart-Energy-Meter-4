"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Header } from "@/components/dashboard/header"
import { useEnergy } from "@/lib/energy-context"
import { useAuth } from "@/lib/auth-context"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import {
  User,
  Phone,
  Mail,
  MapPin,
  Zap,
  LogOut,
  Settings,
  Bell,
  Shield,
  Pencil,
  Check,
  X,
  Loader2,
} from "lucide-react"

export default function ProfilePage() {
  const router = useRouter()
  const { data } = useEnergy()
  const { user, logout, updateProfile } = useAuth()
  
  const [isEditingName, setIsEditingName] = useState(false)
  const [editedName, setEditedName] = useState(user?.name || "")
  const [isSaving, setIsSaving] = useState(false)

  const handleLogout = () => {
    logout()
    router.push("/login")
  }

  const handleSaveName = async () => {
    if (!editedName.trim()) return
    
    setIsSaving(true)
    await new Promise(resolve => setTimeout(resolve, 500))
    updateProfile(editedName.trim())
    setIsSaving(false)
    setIsEditingName(false)
  }

  const handleCancelEdit = () => {
    setEditedName(user?.name || "")
    setIsEditingName(false)
  }

  const userInfo = {
    name: user?.name || "Guest User",
    email: user?.email || "Not set",
    address: "123 Smart Street, Tech City, TC 12345",
    meterId: "SM-2024-0847",
    connectionType: "Residential",
    tariffPlan: "Home Essential",
    memberSince: user?.createdAt 
      ? new Date(user.createdAt).toLocaleDateString("en-US", { month: "long", year: "numeric" })
      : "Just now",
  }

  return (
    <div className="space-y-6">
      <Header
        title="Profile"
        subtitle="Manage your account settings"
      />

      {/* User Card */}
      <Card>
        <CardContent className="p-6">
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-6">
            <div className="w-24 h-24 rounded-full bg-gradient-to-br from-primary to-secondary flex items-center justify-center">
              {user?.name ? (
                <span className="text-4xl font-bold text-primary-foreground">
                  {user.name.charAt(0).toUpperCase()}
                </span>
              ) : (
                <User className="w-12 h-12 text-primary-foreground" />
              )}
            </div>
            <div className="flex-1">
              {isEditingName ? (
                <div className="flex items-center gap-2 mb-2">
                  <Input
                    value={editedName}
                    onChange={e => setEditedName(e.target.value)}
                    placeholder="Enter your name"
                    className="max-w-[200px] h-10 text-lg font-bold"
                    autoFocus
                  />
                  <Button 
                    size="icon" 
                    variant="ghost" 
                    onClick={handleSaveName}
                    disabled={!editedName.trim() || isSaving}
                    className="h-10 w-10 text-success hover:text-success"
                  >
                    {isSaving ? (
                      <Loader2 className="w-4 h-4 animate-spin" />
                    ) : (
                      <Check className="w-4 h-4" />
                    )}
                  </Button>
                  <Button 
                    size="icon" 
                    variant="ghost" 
                    onClick={handleCancelEdit}
                    disabled={isSaving}
                    className="h-10 w-10 text-destructive hover:text-destructive"
                  >
                    <X className="w-4 h-4" />
                  </Button>
                </div>
              ) : (
                <div className="flex items-center gap-2 mb-1">
                  <h2 className="text-2xl font-bold text-foreground">{userInfo.name}</h2>
                  <Button 
                    size="icon" 
                    variant="ghost" 
                    onClick={() => {
                      setEditedName(user?.name || "")
                      setIsEditingName(true)
                    }}
                    className="h-8 w-8 text-muted-foreground hover:text-foreground"
                  >
                    <Pencil className="w-3.5 h-3.5" />
                  </Button>
                </div>
              )}
              <p className="text-muted-foreground">Member since {userInfo.memberSince}</p>
              <div className="flex flex-wrap gap-4 mt-4">
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <Mail className="w-4 h-4" />
                  {userInfo.email}
                </div>
              </div>
            </div>
            <Button variant="destructive" className="gap-2" onClick={handleLogout}>
              <LogOut className="w-4 h-4" />
              Logout
            </Button>
          </div>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Account Details */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <User className="w-5 h-5 text-primary" />
              Account Details
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between py-3 border-b border-border">
              <span className="text-muted-foreground">Full Name</span>
              <span className="font-medium">{userInfo.name}</span>
            </div>
            <div className="flex items-center justify-between py-3 border-b border-border">
              <span className="text-muted-foreground">Email Address</span>
              <span className="font-medium">{userInfo.email}</span>
            </div>
            <div className="flex items-start justify-between py-3">
              <span className="text-muted-foreground">Address</span>
              <span className="font-medium text-right max-w-[200px]">{userInfo.address}</span>
            </div>
          </CardContent>
        </Card>

        {/* Meter Details */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Zap className="w-5 h-5 text-primary" />
              Meter Information
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between py-3 border-b border-border">
              <span className="text-muted-foreground">Meter ID</span>
              <span className="font-mono font-medium text-primary">{userInfo.meterId}</span>
            </div>
            <div className="flex items-center justify-between py-3 border-b border-border">
              <span className="text-muted-foreground">Connection Type</span>
              <span className="font-medium">{userInfo.connectionType}</span>
            </div>
            <div className="flex items-center justify-between py-3 border-b border-border">
              <span className="text-muted-foreground">Tariff Plan</span>
              <span className="font-medium">{userInfo.tariffPlan}</span>
            </div>
            <div className="flex items-center justify-between py-3">
              <span className="text-muted-foreground">Daily Limit</span>
              <span className="font-medium">{data.dailyLimit} kWh</span>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Quick Settings */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Settings className="w-5 h-5 text-primary" />
            Quick Settings
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <button className="flex items-center gap-4 p-4 rounded-lg border border-border hover:bg-muted transition-colors text-left">
              <div className="p-3 rounded-lg bg-primary/10">
                <Bell className="w-5 h-5 text-primary" />
              </div>
              <div>
                <p className="font-medium">Notifications</p>
                <p className="text-sm text-muted-foreground">Manage alerts</p>
              </div>
            </button>

            <button className="flex items-center gap-4 p-4 rounded-lg border border-border hover:bg-muted transition-colors text-left">
              <div className="p-3 rounded-lg bg-secondary/10">
                <Zap className="w-5 h-5 text-secondary" />
              </div>
              <div>
                <p className="font-medium">Usage Limits</p>
                <p className="text-sm text-muted-foreground">Set daily limits</p>
              </div>
            </button>

            <button className="flex items-center gap-4 p-4 rounded-lg border border-border hover:bg-muted transition-colors text-left">
              <div className="p-3 rounded-lg bg-success/10">
                <Shield className="w-5 h-5 text-success" />
              </div>
              <div>
                <p className="font-medium">Security</p>
                <p className="text-sm text-muted-foreground">Privacy settings</p>
              </div>
            </button>
          </div>
        </CardContent>
      </Card>

      {/* Usage Summary */}
      <Card className="bg-gradient-to-br from-primary/5 to-secondary/5 border-primary/20">
        <CardContent className="p-6">
          <h3 className="text-lg font-semibold mb-4">This Month Summary</h3>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            <div className="text-center p-4 rounded-lg bg-card/50">
              <p className="text-3xl font-bold text-primary">{data.monthlyUsage.toFixed(1)}</p>
              <p className="text-sm text-muted-foreground">kWh Used</p>
            </div>
            <div className="text-center p-4 rounded-lg bg-card/50">
              <p className="text-3xl font-bold text-secondary">Rs.{data.billEstimate.toLocaleString()}</p>
              <p className="text-sm text-muted-foreground">Estimated Bill</p>
            </div>
            <div className="text-center p-4 rounded-lg bg-card/50">
              <p className="text-3xl font-bold text-success">{data.appliances.filter(a => a.status === "on").length}</p>
              <p className="text-sm text-muted-foreground">Active Devices</p>
            </div>
            <div className="text-center p-4 rounded-lg bg-card/50">
              <p className="text-3xl font-bold text-warning">{data.alerts.length}</p>
              <p className="text-sm text-muted-foreground">Alerts</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
