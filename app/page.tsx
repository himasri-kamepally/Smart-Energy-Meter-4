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
    <div className={`min-h-screen transition-colors ${theme === 'dark' ? 'bg-slate-950 text-white' : 'bg-white text-slate-900'}`}>
      {/* Navigation */}
      <nav
        className={`fixed top-0 w-full z-50 transition-colors ${theme === 'dark' ? 'bg-slate-950/80 border-slate-800' : 'bg-white/80 border-slate-200'} border-b backdrop-blur-sm`}
      >
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="inline-flex items-center justify-center w-10 h-10 rounded-lg bg-gradient-to-br from-blue-500 to-cyan-500">
              <Zap className="w-6 h-6 text-white" />
            </div>
            <span className="font-bold text-xl">Energy Meter</span>
          </div>

          <div className="flex items-center gap-4">
            <button
              onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
              className={`p-2 rounded-lg transition ${theme === 'dark' ? 'bg-slate-800 hover:bg-slate-700' : 'bg-slate-100 hover:bg-slate-200'}`}
            >
              {theme === 'dark' ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
            </button>

            {isAuthenticated ? (
              <Button asChild className="bg-gradient-to-r from-blue-500 to-cyan-500 hover:opacity-90">
                <Link href="/dashboard">Dashboard</Link>
              </Button>
            ) : (
              <>
                <Button variant="ghost" asChild>
                  <Link href="/login">Sign In</Link>
                </Button>
                <Button asChild className="bg-gradient-to-r from-blue-500 to-cyan-500 hover:opacity-90">
                  <Link href="/login">Get Started</Link>
                </Button>
              </>
            )}
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="pt-32 pb-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-5xl mx-auto text-center space-y-8">
          <div className="space-y-4">
            <h1 className="text-5xl sm:text-6xl font-bold leading-tight">
              Monitor Your Energy,{' '}
              <span className="bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent">
                Reduce Your Bills
              </span>
            </h1>
            <p
              className={`text-xl ${theme === 'dark' ? 'text-slate-400' : 'text-slate-600'}`}
            >
              Real-time smart energy monitoring with AI-powered insights to help you save money and reduce your carbon footprint.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            {isAuthenticated ? (
              <Button asChild size="lg" className="bg-gradient-to-r from-blue-500 to-cyan-500 hover:opacity-90 h-12 px-8">
                <Link href="/dashboard">
                  Open Dashboard
                  <ArrowRight className="w-5 h-5 ml-2" />
                </Link>
              </Button>
            ) : (
              <>
                <Button asChild size="lg" className="bg-gradient-to-r from-blue-500 to-cyan-500 hover:opacity-90 h-12 px-8">
                  <Link href="/login">
                    Get Started Free
                    <ArrowRight className="w-5 h-5 ml-2" />
                  </Link>
                </Button>
                <Button
                  asChild
                  size="lg"
                  variant="outline"
                  className={`h-12 px-8 ${theme === 'dark' ? 'border-slate-700 hover:bg-slate-900' : 'border-slate-300 hover:bg-slate-50'}`}
                >
                  <Link href="#how-it-works">Learn More</Link>
                </Button>
              </>
            )}
          </div>

          {/* Stats */}
          <div className="grid grid-cols-3 gap-8 mt-16 pt-16 border-t border-slate-700">
            <div>
              <p className="text-3xl font-bold text-blue-400">50K+</p>
              <p className={theme === 'dark' ? 'text-slate-400' : 'text-slate-600'}>Active Users</p>
            </div>
            <div>
              <p className="text-3xl font-bold text-cyan-400">$2M+</p>
              <p className={theme === 'dark' ? 'text-slate-400' : 'text-slate-600'}>Savings Generated</p>
            </div>
            <div>
              <p className="text-3xl font-bold text-blue-400">99.9%</p>
              <p className={theme === 'dark' ? 'text-slate-400' : 'text-slate-600'}>Uptime</p>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className={`py-20 px-4 sm:px-6 lg:px-8 ${theme === 'dark' ? 'bg-slate-900' : 'bg-slate-50'}`}>
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4">Powerful Features</h2>
            <p className={`text-lg ${theme === 'dark' ? 'text-slate-400' : 'text-slate-600'}`}>
              Everything you need to monitor and optimize your energy usage
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {features.map((feature, idx) => {
              const Icon = feature.icon
              return (
                <Card
                  key={idx}
                  className={`border-0 transition-transform hover:scale-105 ${theme === 'dark' ? 'bg-slate-800 hover:bg-slate-750' : 'bg-white hover:shadow-lg'}`}
                >
                  <CardHeader className="pb-4">
                    <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-blue-500 to-cyan-500 flex items-center justify-center mb-4">
                      <Icon className="w-6 h-6 text-white" />
                    </div>
                    <CardTitle className="text-xl">{feature.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className={theme === 'dark' ? 'text-slate-400' : 'text-slate-600'}>
                      {feature.description}
                    </p>
                  </CardContent>
                </Card>
              )
            })}
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section id="how-it-works" className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4">How It Works</h2>
            <p className={`text-lg ${theme === 'dark' ? 'text-slate-400' : 'text-slate-600'}`}>
              Get started in 4 simple steps
            </p>
          </div>

          <div className="grid md:grid-cols-4 gap-8">
            {steps.map((step, idx) => (
              <div key={idx} className="relative">
                <div className={`text-5xl font-bold mb-4 ${theme === 'dark' ? 'text-slate-700' : 'text-slate-200'}`}>
                  {step.number}
                </div>
                <h3 className="text-xl font-semibold mb-2">{step.title}</h3>
                <p className={theme === 'dark' ? 'text-slate-400' : 'text-slate-600'}>{step.description}</p>

                {idx < steps.length - 1 && (
                  <div
                    className={`hidden md:block absolute top-8 -right-4 w-8 h-0.5 ${theme === 'dark' ? 'bg-slate-700' : 'bg-slate-300'}`}
                  />
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className={`py-20 px-4 sm:px-6 lg:px-8 ${theme === 'dark' ? 'bg-slate-900' : 'bg-slate-50'}`}>
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4">Loved by Users</h2>
            <p className={`text-lg ${theme === 'dark' ? 'text-slate-400' : 'text-slate-600'}`}>
              See what our customers have to say
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, idx) => (
              <Card
                key={idx}
                className={`border-0 ${theme === 'dark' ? 'bg-slate-800' : 'bg-white'}`}
              >
                <CardContent className="pt-6">
                  <div className="flex items-center gap-4 mb-4">
                    <span className="text-4xl">{testimonial.avatar}</span>
                    <div>
                      <p className="font-semibold">{testimonial.name}</p>
                      <p className={`text-sm ${theme === 'dark' ? 'text-slate-400' : 'text-slate-600'}`}>
                        {testimonial.role}
                      </p>
                    </div>
                  </div>
                  <p className={theme === 'dark' ? 'text-slate-300' : 'text-slate-700'}>
                    "{testimonial.content}"
                  </p>
                  <div className="flex gap-1 mt-4">
                    {[...Array(5)].map((_, i) => (
                      <span key={i} className="text-yellow-400">
                        ⭐
                      </span>
                    ))}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4">Simple Pricing</h2>
            <p className={`text-lg ${theme === 'dark' ? 'text-slate-400' : 'text-slate-600'}`}>
              Choose the plan that&apos;s right for you
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {pricing.map((plan, idx) => (
              <Card
                key={idx}
                className={`border-0 flex flex-col ${
                  plan.highlighted
                    ? `ring-2 ring-blue-500 ${theme === 'dark' ? 'bg-slate-800' : 'bg-white'}`
                    : `${theme === 'dark' ? 'bg-slate-800' : 'bg-slate-50'}`
                }`}
              >
                <CardHeader>
                  <CardTitle>{plan.name}</CardTitle>
                  <p className={`text-sm ${theme === 'dark' ? 'text-slate-400' : 'text-slate-600'}`}>
                    {plan.description}
                  </p>
                </CardHeader>
                <CardContent className="flex-1 flex flex-col">
                  <div className="mb-6">
                    <span className="text-3xl font-bold">{plan.price}</span>
                    {plan.period && (
                      <span className={theme === 'dark' ? 'text-slate-400' : 'text-slate-600'}>
                        {plan.period}
                      </span>
                    )}
                  </div>

                  <ul className="space-y-3 mb-8 flex-1">
                    {plan.features.map((feature, fidx) => (
                      <li key={fidx} className="flex items-center gap-2">
                        <CheckCircle2 className="w-5 h-5 text-cyan-400 flex-shrink-0" />
                        <span className={theme === 'dark' ? 'text-slate-300' : 'text-slate-700'}>
                          {feature}
                        </span>
                      </li>
                    ))}
                  </ul>

                  <Button
                    asChild
                    className={`w-full ${
                      plan.highlighted
                        ? 'bg-gradient-to-r from-blue-500 to-cyan-500 hover:opacity-90'
                        : `${theme === 'dark' ? 'bg-slate-700 hover:bg-slate-600' : 'bg-slate-200 hover:bg-slate-300 text-slate-900'}`
                    }`}
                  >
                    <Link href="/login">{plan.cta}</Link>
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className={`py-20 px-4 sm:px-6 lg:px-8 ${theme === 'dark' ? 'bg-slate-900' : 'bg-slate-50'}`}>
        <div className="max-w-3xl mx-auto text-center space-y-8">
          <h2 className="text-4xl font-bold">Ready to Save on Energy?</h2>
          <p className={`text-lg ${theme === 'dark' ? 'text-slate-400' : 'text-slate-600'}`}>
            Join thousands of users already monitoring their energy and reducing their bills.
          </p>
          <Button asChild size="lg" className="bg-gradient-to-r from-blue-500 to-cyan-500 hover:opacity-90 h-12 px-8">
            <Link href="/login">
              Get Started for Free
              <ArrowRight className="w-5 h-5 ml-2" />
            </Link>
          </Button>
        </div>
      </section>

      {/* Footer */}
      <footer
        className={`border-t ${theme === 'dark' ? 'border-slate-800 bg-slate-950' : 'border-slate-200 bg-white'} py-12 px-4 sm:px-6 lg:px-8`}
      >
        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-4 gap-8 mb-8">
            <div>
              <div className="flex items-center gap-2 mb-4">
                <div className="inline-flex items-center justify-center w-8 h-8 rounded-lg bg-gradient-to-br from-blue-500 to-cyan-500">
                  <Zap className="w-5 h-5 text-white" />
                </div>
                <span className="font-bold">Energy Meter</span>
              </div>
              <p className={`text-sm ${theme === 'dark' ? 'text-slate-400' : 'text-slate-600'}`}>
                Smart energy monitoring for a sustainable future.
              </p>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Product</h4>
              <ul className={`space-y-2 text-sm ${theme === 'dark' ? 'text-slate-400' : 'text-slate-600'}`}>
                <li><a href="#" className="hover:text-blue-400 transition">Features</a></li>
                <li><a href="#" className="hover:text-blue-400 transition">Pricing</a></li>
                <li><a href="#" className="hover:text-blue-400 transition">Dashboard</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Company</h4>
              <ul className={`space-y-2 text-sm ${theme === 'dark' ? 'text-slate-400' : 'text-slate-600'}`}>
                <li><a href="#" className="hover:text-blue-400 transition">About</a></li>
                <li><a href="#" className="hover:text-blue-400 transition">Blog</a></li>
                <li><a href="#" className="hover:text-blue-400 transition">Contact</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Legal</h4>
              <ul className={`space-y-2 text-sm ${theme === 'dark' ? 'text-slate-400' : 'text-slate-600'}`}>
                <li><a href="#" className="hover:text-blue-400 transition">Privacy</a></li>
                <li><a href="#" className="hover:text-blue-400 transition">Terms</a></li>
              </ul>
            </div>
          </div>
          <div className={`border-t ${theme === 'dark' ? 'border-slate-800' : 'border-slate-200'} pt-8 flex items-center justify-between`}>
            <p className={`text-sm ${theme === 'dark' ? 'text-slate-500' : 'text-slate-600'}`}>
              © 2024 Energy Meter. All rights reserved.
            </p>
            <div className="flex gap-4">
              <a href="#" className={`${theme === 'dark' ? 'text-slate-400 hover:text-slate-200' : 'text-slate-600 hover:text-slate-900'}`}>
                Twitter
              </a>
              <a href="#" className={`${theme === 'dark' ? 'text-slate-400 hover:text-slate-200' : 'text-slate-600 hover:text-slate-900'}`}>
                LinkedIn
              </a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}
