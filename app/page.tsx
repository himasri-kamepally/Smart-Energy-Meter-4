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
    <div className={`min-h-screen transition-all duration-500 ${theme === 'dark' ? 'bg-black text-white' : 'bg-white text-black'}`}>
      {/* Navigation */}
      <nav
        className={`fixed top-0 w-full z-50 transition-all ${theme === 'dark' ? 'bg-black/80 border-zinc-800' : 'bg-white/80 border-slate-200'} border-b backdrop-blur-md`}
      >
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="inline-flex items-center justify-center w-10 h-10 rounded-xl bg-gradient-to-br from-blue-600 to-cyan-500 shadow-lg shadow-blue-500/20">
              <Zap className="w-6 h-6 text-white" />
            </div>
            <span className="font-extrabold text-2xl tracking-tight">Smart Meter</span>
          </div>

          <div className="flex items-center gap-6">
            <button
              onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
              className={`p-2.5 rounded-full transition-all ${theme === 'dark' ? 'bg-zinc-900 hover:bg-zinc-800 text-zinc-400' : 'bg-slate-100 hover:bg-slate-200 text-slate-600'}`}
            >
              {theme === 'dark' ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
            </button>

            <div className="hidden sm:flex items-center gap-3">
              <Button variant="ghost" asChild className="rounded-full px-6">
                <Link href="/login">Login</Link>
              </Button>
              <Button asChild className="bg-blue-600 hover:bg-blue-700 text-white rounded-full px-8 shadow-lg shadow-blue-600/20">
                <Link href="/login">Sign Up</Link>
              </Button>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="pt-48 pb-32 px-6">
        <div className="max-w-6xl mx-auto text-center space-y-12">
          <div className="space-y-6 animate-in fade-in slide-in-from-bottom-8 duration-1000">
            <h1 className="text-6xl sm:text-8xl md:text-9xl font-black leading-[0.9] tracking-tighter">
              Monitor Your Energy<br />
              <span className="bg-gradient-to-r from-blue-500 via-cyan-400 to-blue-500 bg-[length:200%_auto] animate-gradient bg-clip-text text-transparent">
                Reduce Your Bills
              </span>
            </h1>
            <p
              className={`max-w-2xl mx-auto text-xl md:text-2xl font-medium ${theme === 'dark' ? 'text-zinc-500' : 'text-slate-500'}`}
            >
              The most advanced smart energy monitoring platform with AI insights to help you live efficiently.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center animate-in fade-in slide-in-from-bottom-12 duration-1000 delay-200">
            <Button asChild size="lg" className="bg-blue-600 hover:bg-blue-700 text-white rounded-full h-14 px-10 text-lg font-bold shadow-xl shadow-blue-600/25 transition-transform hover:scale-105">
              <Link href="/login">Sign Up Now</Link>
            </Button>
            <Button
              asChild
              size="lg"
              variant="outline"
              className={`rounded-full h-14 px-10 text-lg font-bold border-2 transition-all hover:scale-105 ${theme === 'dark' ? 'border-zinc-800 hover:bg-zinc-900 text-white' : 'border-slate-200 hover:bg-slate-50 text-black'}`}
            >
              <Link href="/login">Login</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className={`py-32 px-6 ${theme === 'dark' ? 'bg-zinc-950' : 'bg-slate-50'}`}>
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-24 space-y-4">
            <h2 className="text-4xl md:text-5xl font-black tracking-tight">Powerful Features</h2>
            <p className={`text-xl font-medium ${theme === 'dark' ? 'text-zinc-500' : 'text-slate-500'}`}>
              Everything you need to master your energy consumption.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, idx) => {
              const Icon = feature.icon
              return (
                <div
                  key={idx}
                  className={`group p-8 rounded-3xl border transition-all duration-300 hover:-translate-y-2 ${theme === 'dark' ? 'bg-zinc-900 border-zinc-800 hover:border-zinc-700' : 'bg-white border-slate-100 hover:shadow-2xl hover:shadow-slate-200'}`}
                >
                  <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-blue-500/10 to-cyan-500/10 flex items-center justify-center mb-8 group-hover:scale-110 transition-transform">
                    <Icon className="w-7 h-7 text-blue-500" />
                  </div>
                  <h3 className="text-2xl font-bold mb-4">{feature.title}</h3>
                  <p className={`text-lg leading-relaxed ${theme === 'dark' ? 'text-zinc-500' : 'text-slate-500'}`}>
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
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-24 space-y-4">
            <h2 className="text-4xl md:text-5xl font-black tracking-tight">How It Works</h2>
            <p className={`text-xl font-medium ${theme === 'dark' ? 'text-zinc-500' : 'text-slate-500'}`}>
              Your journey to efficiency in 4 simple steps.
            </p>
          </div>

          <div className="grid md:grid-cols-4 gap-12">
            {steps.map((step, idx) => (
              <div key={idx} className="relative group">
                <div className={`text-8xl font-black mb-6 opacity-10 transition-opacity group-hover:opacity-20 ${theme === 'dark' ? 'text-white' : 'text-black'}`}>
                  {step.number}
                </div>
                <h3 className="text-2xl font-bold mb-3">{step.title}</h3>
                <p className={`text-lg font-medium ${theme === 'dark' ? 'text-zinc-500' : 'text-slate-500'}`}>{step.description}</p>
                
                {idx < steps.length - 1 && (
                  <div className={`hidden lg:block absolute top-12 -right-6 w-12 h-px ${theme === 'dark' ? 'bg-zinc-800' : 'bg-slate-200'}`} />
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer
        className={`py-20 px-6 border-t ${theme === 'dark' ? 'border-zinc-900 bg-black' : 'border-slate-100 bg-white'}`}
      >
        <div className="max-w-7xl mx-auto text-center space-y-8">
          <div className="flex flex-col items-center gap-4">
            <div className="flex items-center gap-2">
              <Zap className="w-6 h-6 text-blue-500" />
              <span className="font-black text-xl tracking-tight uppercase">Smart Energy Meter</span>
            </div>
            <p className={`text-lg font-bold tracking-widest uppercase ${theme === 'dark' ? 'text-zinc-400' : 'text-slate-500'}`}>
              Efficient • Smart • Reliable
            </p>
          </div>
          
          <div className={`max-w-md mx-auto h-px ${theme === 'dark' ? 'bg-zinc-900' : 'bg-slate-100'}`} />
          
          <p className={`text-sm font-medium ${theme === 'dark' ? 'text-zinc-600' : 'text-slate-400'}`}>
            Smart Energy Meter © 2026
          </p>
        </div>
      </footer>
    </div>
  )
}
