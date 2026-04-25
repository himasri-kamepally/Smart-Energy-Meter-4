'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import {
  Zap,
  TrendingDown,
  AlertCircle,
  Smartphone,
  Cloud,
  BarChart3,
  Users,
  CheckCircle2,
  ArrowRight,
  Moon,
  Sun,
} from 'lucide-react'
import Link from 'next/link'
import { useAuth } from '@/lib/auth-context'

export default function LandingPage() {
  const { isAuthenticated } = useAuth()
  const [theme, setTheme] = useState<'light' | 'dark'>('dark')

  const features = [
    {
      icon: TrendingDown,
      title: 'Real-time Monitoring',
      description: 'Track your energy consumption instantly with live updates every few seconds.',
    },
    {
      icon: AlertCircle,
      title: 'Smart Alerts',
      description: 'Get notified when usage exceeds your limits or unusual patterns detected.',
    },
    {
      icon: BarChart3,
      title: 'Detailed Analytics',
      description: 'Analyze daily, weekly, and monthly trends with interactive charts.',
    },
    {
      icon: Cloud,
      title: 'Cloud Sync',
      description: 'Your data is securely stored and synced across all your devices.',
    },
    {
      icon: Smartphone,
      title: 'Mobile Friendly',
      description: 'Monitor your energy on the go with our responsive mobile interface.',
    },
    {
      icon: Users,
      title: 'Family Control',
      description: 'Manage multiple meters and set limits for different family members.',
    },
  ]

  const steps = [
    {
      number: '01',
      title: 'Create Account',
      description: 'Sign up with your email and create a secure password.',
    },
    {
      number: '02',
      title: 'Connect Meter',
      description: 'Link your smart energy meter to your account.',
    },
    {
      number: '03',
      title: 'Monitor Usage',
      description: 'Start tracking your energy consumption in real-time.',
    },
    {
      number: '04',
      title: 'Optimize',
      description: 'Get AI-powered suggestions to reduce your energy bills.',
    },
  ]

  const testimonials = [
    {
      name: 'Sarah Johnson',
      role: 'Homeowner',
      content: 'Energy Meter helped me reduce my electricity bill by 30%!',
      avatar: '👩‍💼',
    },
    {
      name: 'Michael Chen',
      role: 'Small Business Owner',
      content: 'Real-time monitoring gave me complete visibility into our energy costs.',
      avatar: '👨‍💼',
    },
    {
      name: 'Emma Davis',
      role: 'Environmental Advocate',
      content: 'Finally a tool that makes it easy to live sustainably!',
      avatar: '👩‍🌾',
    },
  ]

  const pricing = [
    {
      name: 'Starter',
      price: 'Free',
      description: 'Perfect for getting started',
      features: ['Real-time monitoring', 'Basic alerts', 'Monthly reports'],
      cta: 'Get Started',
    },
    {
      name: 'Pro',
      price: '$9.99',
      period: '/month',
      description: 'For serious energy savers',
      features: [
        'Everything in Starter',
        'Advanced analytics',
        'AI suggestions',
        'Priority support',
        'Custom alerts',
      ],
      cta: 'Start Free Trial',
      highlighted: true,
    },
    {
      name: 'Enterprise',
      price: 'Custom',
      description: 'For businesses',
      features: [
        'Everything in Pro',
        'Multiple locations',
        'Advanced API',
        'Dedicated support',
        'Custom integrations',
      ],
      cta: 'Contact Sales',
    },
  ]

  return (
    <div className={`min-h-screen transition-all duration-700 ${theme === 'dark' ? 'bg-black text-white' : 'bg-white text-black'}`}>
      {/* Background Decor */}
      {theme === 'dark' && (
        <div className="fixed inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-[-10%] left-1/2 -translate-x-1/2 w-[1000px] h-[600px] bg-zinc-900/20 blur-[120px] rounded-full" />
        </div>
      )}

      {/* Navigation */}
      <nav
        className={`fixed top-0 w-full z-50 transition-all ${theme === 'dark' ? 'bg-black/70 border-zinc-900' : 'bg-white/70 border-slate-100'} border-b backdrop-blur-xl`}
      >
        <div className="max-w-6xl mx-auto px-6 py-5 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <Zap className="w-5 h-5 text-blue-500 fill-blue-500/10" />
            <span className="font-bold text-base tracking-tight">Smart Meter</span>
          </div>

          <div className="flex items-center gap-6">
            <button
              onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
              className={`transition-colors ${theme === 'dark' ? 'text-zinc-500 hover:text-white' : 'text-slate-400 hover:text-black'}`}
            >
              {theme === 'dark' ? <Sun size={18} /> : <Moon size={18} />}
            </button>

            <div className="flex items-center gap-5">
              <Link href="/login" className="text-sm font-medium hover:opacity-70 transition-opacity">Login</Link>
              <Link 
                href="/login" 
                className={`text-sm font-semibold px-5 py-2 rounded-xl transition-all ${
                  theme === 'dark' 
                    ? 'bg-white text-black hover:bg-zinc-200' 
                    : 'bg-black text-white hover:bg-zinc-800'
                }`}
              >
                Sign Up
              </Link>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative pt-48 pb-32 px-6">
        <div className="max-w-4xl mx-auto text-center space-y-12">
          <div className="space-y-6 animate-in fade-in duration-1000 slide-in-from-bottom-4">
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight leading-[1.2]">
              Monitor Your Energy<br />
              <span className={theme === 'dark' ? 'bg-gradient-to-r from-zinc-200 to-blue-400 bg-clip-text text-transparent' : 'text-blue-600'}>
                Reduce Your Bills
              </span>
            </h1>
            <p
              className={`max-w-lg mx-auto text-sm md:text-base font-medium leading-relaxed ${theme === 'dark' ? 'text-zinc-400' : 'text-slate-500'}`}
            >
              Smart monitoring and AI insights to help reduce energy waste and monthly bills.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-6 justify-center items-center animate-in fade-in duration-1000 slide-in-from-bottom-6 delay-200">
            <Link 
              href="/login" 
              className={`h-11 px-8 rounded-xl font-semibold flex items-center transition-all hover:scale-[1.02] active:scale-[0.98] ${
                theme === 'dark' ? 'bg-white text-black' : 'bg-black text-white'
              }`}
            >
              Sign Up
            </Link>
            <Link
              href="/login"
              className={`h-11 px-8 rounded-xl font-semibold flex items-center border transition-all hover:bg-zinc-500/5 ${
                theme === 'dark' ? 'border-zinc-800 text-white' : 'border-slate-200 text-black'
              }`}
            >
              Login
            </Link>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className={`py-32 px-6 ${theme === 'dark' ? 'bg-[#0a0a0a]' : 'bg-[#fbfbfb]'}`}>
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-20 space-y-3">
            <h2 className="text-3xl font-bold tracking-tight">Powerful Features</h2>
            <p className={`text-lg ${theme === 'dark' ? 'text-zinc-500' : 'text-slate-500'}`}>
              Everything you need to master your energy consumption.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {features.map((feature, idx) => {
              const Icon = feature.icon
              return (
                <div
                  key={idx}
                  className={`p-8 rounded-2xl border transition-all duration-300 hover:shadow-sm ${
                    theme === 'dark' 
                      ? 'bg-[#111111] border-zinc-900 text-white' 
                      : 'bg-white border-slate-100 text-black'
                  }`}
                >
                  <Icon className="w-6 h-6 text-blue-500 mb-6" />
                  <h3 className="text-xl font-bold mb-3">{feature.title}</h3>
                  <p className={`text-base leading-relaxed ${theme === 'dark' ? 'text-zinc-500' : 'text-slate-500'}`}>
                    {feature.description}
                  </p>
                </div>
              )
            })}
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section id="how-it-works" className="py-32 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-20 space-y-3">
            <h2 className="text-3xl font-bold tracking-tight">How It Works</h2>
            <p className={`text-lg ${theme === 'dark' ? 'text-zinc-500' : 'text-slate-500'}`}>
              Simple integration, immediate results.
            </p>
          </div>

          <div className="grid md:grid-cols-4 gap-8">
            {steps.map((step, idx) => (
              <div key={idx} className="space-y-4">
                <div className={`text-sm font-bold tracking-widest uppercase ${theme === 'dark' ? 'text-blue-500' : 'text-blue-600'}`}>
                  Step {step.number}
                </div>
                <h3 className="text-xl font-bold">{step.title}</h3>
                <p className={`text-base ${theme === 'dark' ? 'text-zinc-500' : 'text-slate-500'}`}>{step.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer
        className={`py-20 px-6 border-t ${theme === 'dark' ? 'border-zinc-900 bg-[#000000]' : 'border-slate-100 bg-white'}`}
      >
        <div className="max-w-6xl mx-auto text-center space-y-6">
          <p className={`text-sm font-medium tracking-wide ${theme === 'dark' ? 'text-zinc-400' : 'text-slate-500'}`}>
            Smart Energy Meter © 2026
          </p>
          <p className={`text-xs font-medium tracking-[0.2em] uppercase opacity-40 ${theme === 'dark' ? 'text-white' : 'text-black'}`}>
            Efficient • Smart • Reliable
          </p>
        </div>
      </footer>
    </div>
  )
}
