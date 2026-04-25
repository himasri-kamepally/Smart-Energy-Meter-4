"use client"

import { useEnergy } from "@/lib/energy-context"
import { AlertTriangle, CheckCircle, X } from "lucide-react"
import { cn } from "@/lib/utils"
import { useState, useEffect } from "react"

export function AlertBanner() {
  const { data, isLimitExceeded } = useEnergy()
  const [isVisible, setIsVisible] = useState(true)
  const [showPopup, setShowPopup] = useState(false)

  // Show popup when limit is exceeded
  useEffect(() => {
    if (isLimitExceeded) {
      setShowPopup(true)
      const timer = setTimeout(() => setShowPopup(false), 5000)
      return () => clearTimeout(timer)
    }
  }, [isLimitExceeded])

  if (!isVisible) return null

  return (
    <>
      {/* Main banner */}
      <div
        className={cn(
          "relative flex items-center gap-4 p-4 rounded-lg border transition-all duration-300",
          isLimitExceeded
            ? "bg-destructive/10 border-destructive text-destructive"
            : "bg-success/10 border-success text-success"
        )}
      >
        <div
          className={cn(
            "flex items-center justify-center w-10 h-10 rounded-full",
            isLimitExceeded ? "bg-destructive/20" : "bg-success/20"
          )}
        >
          {isLimitExceeded ? (
            <AlertTriangle className="w-5 h-5" />
          ) : (
            <CheckCircle className="w-5 h-5" />
          )}
        </div>

        <div className="flex-1">
          <h3 className="font-semibold">
            {isLimitExceeded ? "Daily Limit Exceeded" : "Normal Usage"}
          </h3>
          <p className="text-sm opacity-80">
            {isLimitExceeded
              ? `Current usage: ${data.todayUsage.toFixed(2)} kWh (Limit: ${data.dailyLimit} kWh)`
              : `Today's usage is within your daily limit of ${data.dailyLimit} kWh`}
          </p>
        </div>

        <button
          onClick={() => setIsVisible(false)}
          className="p-1 rounded hover:bg-foreground/10 transition-colors"
        >
          <X className="w-4 h-4" />
        </button>
      </div>

      {/* Popup notification */}
      {showPopup && isLimitExceeded && (
        <div className="fixed bottom-4 right-4 z-50 animate-in slide-in-from-bottom-4 fade-in duration-300">
          <div className="flex items-center gap-3 p-4 bg-destructive text-destructive-foreground rounded-lg shadow-lg max-w-sm">
            <AlertTriangle className="w-6 h-6 flex-shrink-0" />
            <div>
              <p className="font-semibold">Daily Limit Exceeded!</p>
              <p className="text-sm opacity-90">
                Your usage has exceeded the {data.dailyLimit} kWh daily limit
              </p>
            </div>
            <button
              onClick={() => setShowPopup(false)}
              className="p-1 rounded hover:bg-destructive-foreground/20 transition-colors"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}
    </>
  )
}
