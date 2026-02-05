"use client"

import { useEffect, useRef, useState } from "react"
import Link from "next/link"
import { motion, useInView } from "framer-motion"
import {
  Brain,
  DollarSign,
  ShieldCheck,
  UserPlus,
  Wallet,
  FileText,
  Zap,
  ArrowRight,
  TrendingUp,
  Globe,
  Clock,
  Users,
  BarChart3,
  CheckCircle2,
  ChevronDown,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { platformStats, faqItems } from "@/data/mock"

// ─── Animated Counter ───
function AnimatedCounter({ end, suffix = "", prefix = "", decimals = 0 }: { end: number; suffix?: string; prefix?: string; decimals?: number }) {
  const [count, setCount] = useState(0)
  const ref = useRef<HTMLSpanElement>(null)
  const inView = useInView(ref, { once: true })

  useEffect(() => {
    if (!inView) return
    const duration = 2000
    const steps = 60
    const increment = end / steps
    let current = 0
    const timer = setInterval(() => {
      current += increment
      if (current >= end) {
        setCount(end)
        clearInterval(timer)
      } else {
        setCount(current)
      }
    }, duration / steps)
    return () => clearInterval(timer)
  }, [inView, end])

  return (
    <span ref={ref}>
      {prefix}{decimals > 0 ? count.toFixed(decimals) : Math.floor(count).toLocaleString()}{suffix}
    </span>
  )
}

// ─── Fade-in wrapper ───
function FadeIn({ children, delay = 0, className = "" }: { children: React.ReactNode; delay?: number; className?: string }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.6, delay, ease: "easeOut" }}
      className={className}
    >
      {children}
    </motion.div>
  )
}

export default function LandingPage() {
  const [openFaq, setOpenFaq] = useState<number | null>(null)

  return (
    <div className="relative overflow-hidden">
      {/* ─── Hero Section ─── */}
      <section className="relative min-h-[90vh] flex items-center justify-center overflow-hidden">
        {/* Background effects */}
        <div className="absolute inset-0 grid-pattern" />
        <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 h-[600px] w-[600px] rounded-full bg-emerald-500/5 blur-[120px]" />
        <div className="absolute right-1/4 top-1/4 h-[400px] w-[400px] rounded-full bg-cyan-500/5 blur-[100px]" />

        <div className="relative z-10 mx-auto max-w-5xl px-4 text-center">
          <FadeIn>
            <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-emerald-500/20 bg-emerald-500/10 px-4 py-1.5 text-sm text-emerald-400">
              <Zap className="h-3.5 w-3.5" />
              AI-Powered Smart Lending Platform
            </div>
          </FadeIn>

          <FadeIn delay={0.1}>
            <h1 className="mb-6 text-4xl font-bold leading-tight tracking-tight sm:text-5xl md:text-6xl lg:text-7xl">
              P2P Lending,{" "}
              <span className="gradient-text">Powered by AI</span>
            </h1>
          </FadeIn>

          <FadeIn delay={0.2}>
            <p className="mx-auto mb-10 max-w-2xl text-lg text-muted-foreground sm:text-xl">
              AI-powered matching, global liquidity, African market opportunities.
              <br className="hidden sm:block" />
              Making lending simpler, more transparent, and more secure.
            </p>
          </FadeIn>

          <FadeIn delay={0.3}>
            <div className="flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
              <Link href="/post/lend">
                <Button size="lg" className="gap-2 bg-emerald-600 px-8 text-base hover:bg-emerald-700">
                  Start Lending <ArrowRight className="h-4 w-4" />
                </Button>
              </Link>
              <Link href="/post/borrow">
                <Button size="lg" variant="outline" className="gap-2 px-8 text-base border-emerald-500/30 hover:bg-emerald-500/10">
                  I Want to Borrow <ArrowRight className="h-4 w-4" />
                </Button>
              </Link>
            </div>
          </FadeIn>

          <FadeIn delay={0.5}>
            <motion.div
              animate={{ y: [0, 8, 0] }}
              transition={{ duration: 2, repeat: Infinity }}
              className="mt-16"
            >
              <ChevronDown className="mx-auto h-6 w-6 text-muted-foreground/50" />
            </motion.div>
          </FadeIn>
        </div>
      </section>

      {/* ─── Feature Cards ─── */}
      <section className="relative py-24">
        <div className="mx-auto max-w-6xl px-4 sm:px-6">
          <FadeIn>
            <div className="mb-16 text-center">
              <h2 className="mb-4 text-3xl font-bold sm:text-4xl">Key Features</h2>
              <p className="text-muted-foreground">Three core capabilities redefining the P2P lending experience</p>
            </div>
          </FadeIn>

          <div className="grid gap-6 md:grid-cols-3">
            {[
              {
                icon: Brain,
                title: "AI Matching Engine",
                desc: "Smart matching engine powered by multi-dimensional data analysis. Real-time credit risk assessment to find the optimal counterparty for both lenders and borrowers. Match accuracy exceeds 94%.",
                gradient: "from-emerald-500/20 to-emerald-500/5",
                iconColor: "text-emerald-400",
                glow: "glow-green",
              },
              {
                icon: DollarSign,
                title: "$U Yield Deposits",
                desc: "Idle funds automatically convert to $U yield-bearing assets, earning a base 4.5% APY. $U can be used directly for platform lending operations—your money never sits idle.",
                gradient: "from-cyan-500/20 to-cyan-500/5",
                iconColor: "text-cyan-400",
                glow: "glow-blue",
              },
              {
                icon: ShieldCheck,
                title: "Robust Risk Control",
                desc: "8-layer risk protection system: KYC/KYB verification, AI credit assessment, progressive limits, collateral management, real-time monitoring, multi-tier collection.",
                gradient: "from-violet-500/20 to-violet-500/5",
                iconColor: "text-violet-400",
                glow: "",
              },
            ].map((feat, i) => (
              <FadeIn key={i} delay={i * 0.15}>
                <Card className={`group relative overflow-hidden border-border/50 bg-gradient-to-b ${feat.gradient} transition-all hover:border-border hover:shadow-lg ${feat.glow}`}>
                  <CardContent className="p-8">
                    <div className={`mb-4 inline-flex rounded-xl bg-background/50 p-3 ${feat.iconColor}`}>
                      <feat.icon className="h-6 w-6" />
                    </div>
                    <h3 className="mb-3 text-xl font-semibold">{feat.title}</h3>
                    <p className="text-sm leading-relaxed text-muted-foreground">{feat.desc}</p>
                  </CardContent>
                </Card>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* ─── How It Works ─── */}
      <section className="py-24 bg-secondary/30">
        <div className="mx-auto max-w-6xl px-4 sm:px-6">
          <FadeIn>
            <div className="mb-16 text-center">
              <h2 className="mb-4 text-3xl font-bold sm:text-4xl">How It Works</h2>
              <p className="text-muted-foreground">Four steps to start your lending journey</p>
            </div>
          </FadeIn>

          <div className="grid gap-8 md:grid-cols-4">
            {[
              { icon: UserPlus, title: "Register & Verify", desc: "Complete KYC/KYB identity verification to gain platform access" },
              { icon: Wallet, title: "Deposit Funds", desc: "Support NGN, USDT, USDC multi-currency deposits, auto-convert to $U for yield" },
              { icon: FileText, title: "Post Requirements", desc: "Flexibly set amount, rate, term and other lending conditions" },
              { icon: Zap, title: "AI Match & Execute", desc: "AI Agent matches optimal counterparties in seconds, auto-executes trades" },
            ].map((step, i) => (
              <FadeIn key={i} delay={i * 0.12}>
                <div className="relative text-center">
                  <div className="mx-auto mb-5 flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br from-emerald-500/20 to-cyan-500/20 text-emerald-400">
                    <step.icon className="h-7 w-7" />
                  </div>
                  <div className="mb-2 text-xs font-bold uppercase tracking-wider text-emerald-500">
                    Step {i + 1}
                  </div>
                  <h3 className="mb-2 text-lg font-semibold">{step.title}</h3>
                  <p className="text-sm text-muted-foreground">{step.desc}</p>
                  {i < 3 && (
                    <div className="absolute right-0 top-8 hidden translate-x-1/2 text-muted-foreground/30 md:block">
                      <ArrowRight className="h-5 w-5" />
                    </div>
                  )}
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* ─── Lender Value Prop ─── */}
      <section className="py-24">
        <div className="mx-auto max-w-6xl px-4 sm:px-6">
          <div className="grid items-center gap-12 lg:grid-cols-2">
            <FadeIn>
              <div>
                <div className="mb-2 text-sm font-semibold uppercase tracking-wider text-emerald-500">For Lenders</div>
                <h2 className="mb-6 text-3xl font-bold">Why Lend Here?</h2>
                <div className="space-y-4">
                  {[
                    { icon: TrendingUp, text: "15%-30% annual returns, far exceeding traditional bank deposits" },
                    { icon: Globe, text: "Access high-growth African markets, diversify your portfolio" },
                    { icon: ShieldCheck, text: "8-layer risk control system protecting your capital" },
                    { icon: Brain, text: "AI Agent auto-matches quality borrowers" },
                    { icon: DollarSign, text: "$U yield feature—earn even while waiting for matches" },
                  ].map((item, i) => (
                    <div key={i} className="flex items-start gap-3">
                      <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-emerald-500/10 text-emerald-400">
                        <item.icon className="h-4 w-4" />
                      </div>
                      <span className="text-muted-foreground">{item.text}</span>
                    </div>
                  ))}
                </div>
              </div>
            </FadeIn>
            <FadeIn delay={0.2}>
              <Card className="border-emerald-500/10 bg-gradient-to-br from-emerald-500/5 to-transparent">
                <CardContent className="p-6">
                  <h3 className="mb-4 text-sm font-medium text-muted-foreground">Yield Comparison (Annual)</h3>
                  <div className="space-y-4">
                    {[
                      { label: "Bank Deposit", rate: "2-4%", width: "15%", color: "bg-muted-foreground/30" },
                      { label: "$U Yield", rate: "4.5%", width: "22%", color: "bg-cyan-500" },
                      { label: "$U + Lending", rate: "15-30%", width: "90%", color: "bg-emerald-500" },
                    ].map((item, i) => (
                      <div key={i}>
                        <div className="mb-1 flex justify-between text-sm">
                          <span>{item.label}</span>
                          <span className="font-semibold">{item.rate}</span>
                        </div>
                        <div className="h-2.5 overflow-hidden rounded-full bg-secondary">
                          <motion.div
                            className={`h-full rounded-full ${item.color}`}
                            initial={{ width: 0 }}
                            whileInView={{ width: item.width }}
                            viewport={{ once: true }}
                            transition={{ duration: 1.2, delay: i * 0.2, ease: "easeOut" }}
                          />
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </FadeIn>
          </div>
        </div>
      </section>

      {/* ─── Borrower Value Prop ─── */}
      <section className="py-24 bg-secondary/30">
        <div className="mx-auto max-w-6xl px-4 sm:px-6">
          <div className="grid items-center gap-12 lg:grid-cols-2">
            <FadeIn delay={0.2} className="order-2 lg:order-1">
              <Card className="border-cyan-500/10 bg-gradient-to-br from-cyan-500/5 to-transparent">
                <CardContent className="p-6">
                  <h3 className="mb-4 text-sm font-medium text-muted-foreground">Rate Comparison</h3>
                  <div className="space-y-4">
                    {[
                      { label: "Traditional Bank Loans", rate: "25-45%", width: "85%", color: "bg-muted-foreground/30" },
                      { label: "Microfinance", rate: "30-60%", width: "95%", color: "bg-orange-500/50" },
                      { label: "Wello P2P", rate: "12-25%", width: "45%", color: "bg-cyan-500" },
                    ].map((item, i) => (
                      <div key={i}>
                        <div className="mb-1 flex justify-between text-sm">
                          <span>{item.label}</span>
                          <span className="font-semibold">{item.rate}</span>
                        </div>
                        <div className="h-2.5 overflow-hidden rounded-full bg-secondary">
                          <motion.div
                            className={`h-full rounded-full ${item.color}`}
                            initial={{ width: 0 }}
                            whileInView={{ width: item.width }}
                            viewport={{ once: true }}
                            transition={{ duration: 1.2, delay: i * 0.2, ease: "easeOut" }}
                          />
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </FadeIn>
            <FadeIn className="order-1 lg:order-2">
              <div>
                <div className="mb-2 text-sm font-semibold uppercase tracking-wider text-cyan-500">For Borrowers</div>
                <h2 className="mb-6 text-3xl font-bold">Why Borrow Here?</h2>
                <div className="space-y-4">
                  {[
                    { icon: TrendingUp, text: "Rates as low as 12%, far below traditional channels" },
                    { icon: Clock, text: "AI instant approval, funding as fast as 24 hours" },
                    { icon: CheckCircle2, text: "Flexible repayment options matching your cash flow" },
                    { icon: Users, text: "Build credit history, progressively increase limits to $500,000" },
                    { icon: Globe, text: "Connect with global lenders, diversified funding sources" },
                  ].map((item, i) => (
                    <div key={i} className="flex items-start gap-3">
                      <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-cyan-500/10 text-cyan-400">
                        <item.icon className="h-4 w-4" />
                      </div>
                      <span className="text-muted-foreground">{item.text}</span>
                    </div>
                  ))}
                </div>
              </div>
            </FadeIn>
          </div>
        </div>
      </section>

      {/* ─── Market Stats ─── */}
      <section className="py-24">
        <div className="mx-auto max-w-6xl px-4 sm:px-6">
          <FadeIn>
            <div className="mb-16 text-center">
              <h2 className="mb-4 text-3xl font-bold sm:text-4xl">Platform Statistics</h2>
              <p className="text-muted-foreground">A continuously growing global P2P lending network</p>
            </div>
          </FadeIn>

          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {[
              { label: "Total Volume", value: platformStats.totalVolume, prefix: "$", suffix: "", icon: BarChart3, color: "text-emerald-400" },
              { label: "Active Users", value: platformStats.activeUsers, prefix: "", suffix: "+", icon: Users, color: "text-cyan-400" },
              { label: "Average APY", value: platformStats.avgAPY, prefix: "", suffix: "%", icon: TrendingUp, color: "text-violet-400", decimals: 1 },
              { label: "Match Rate", value: platformStats.matchRate, prefix: "", suffix: "%", icon: Zap, color: "text-amber-400", decimals: 1 },
            ].map((stat, i) => (
              <FadeIn key={i} delay={i * 0.1}>
                <Card className="border-border/50 bg-gradient-to-b from-secondary/50 to-transparent text-center">
                  <CardContent className="p-8">
                    <div className={`mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-background ${stat.color}`}>
                      <stat.icon className="h-5 w-5" />
                    </div>
                    <div className="mb-1 text-3xl font-bold">
                      <AnimatedCounter end={stat.value} prefix={stat.prefix} suffix={stat.suffix} decimals={stat.decimals ?? 0} />
                    </div>
                    <p className="text-sm text-muted-foreground">{stat.label}</p>
                  </CardContent>
                </Card>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* ─── FAQ ─── */}
      <section className="py-24 bg-secondary/30">
        <div className="mx-auto max-w-3xl px-4 sm:px-6">
          <FadeIn>
            <div className="mb-12 text-center">
              <h2 className="mb-4 text-3xl font-bold">Frequently Asked Questions</h2>
            </div>
          </FadeIn>

          <div className="space-y-3">
            {faqItems.map((faq, i) => (
              <FadeIn key={i} delay={i * 0.08}>
                <div
                  className="cursor-pointer rounded-xl border border-border/50 bg-card/50 transition-all hover:border-border"
                  onClick={() => setOpenFaq(openFaq === i ? null : i)}
                >
                  <div className="flex items-center justify-between p-5">
                    <span className="font-medium">{faq.q}</span>
                    <ChevronDown className={`h-4 w-4 shrink-0 text-muted-foreground transition-transform ${openFaq === i ? "rotate-180" : ""}`} />
                  </div>
                  {openFaq === i && (
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      className="px-5 pb-5 text-sm text-muted-foreground"
                    >
                      {faq.a}
                    </motion.div>
                  )}
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* ─── CTA ─── */}
      <section className="py-24">
        <div className="mx-auto max-w-4xl px-4 text-center sm:px-6">
          <FadeIn>
            <h2 className="mb-6 text-3xl font-bold sm:text-4xl">
              Start Your <span className="gradient-text">Smart Lending</span> Journey
            </h2>
            <p className="mx-auto mb-10 max-w-xl text-muted-foreground">
              Join Wello and experience AI-powered P2P lending. Higher returns, lower rates, safer transactions.
            </p>
            <div className="flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
              <Link href="/register">
                <Button size="lg" className="gap-2 bg-emerald-600 px-8 text-base hover:bg-emerald-700">
                  Register Now <ArrowRight className="h-4 w-4" />
                </Button>
              </Link>
              <Link href="/risk-control">
                <Button size="lg" variant="outline" className="gap-2 px-8 text-base border-border/50">
                  Learn About Risk Control
                </Button>
              </Link>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* ─── Footer ─── */}
      <footer className="border-t border-border/50 py-12 bg-card/30">
        <div className="mx-auto max-w-6xl px-4 sm:px-6">
          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
            <div>
              <div className="mb-4 flex items-center gap-2">
                <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-gradient-to-br from-emerald-500 to-cyan-500">
                  <span className="text-xs font-bold text-white">W</span>
                </div>
                <span className="font-bold">Wello</span>
              </div>
              <p className="text-sm text-muted-foreground">AI-powered P2P lending platform connecting global lenders with quality African borrowing enterprises.</p>
            </div>
            <div>
              <h4 className="mb-3 text-sm font-semibold">Products</h4>
              <div className="space-y-2 text-sm text-muted-foreground">
                <Link href="/post/lend" className="block hover:text-foreground">Lend</Link>
                <Link href="/post/borrow" className="block hover:text-foreground">Borrow</Link>
                <Link href="/market" className="block hover:text-foreground">Market</Link>
              </div>
            </div>
            <div>
              <h4 className="mb-3 text-sm font-semibold">About</h4>
              <div className="space-y-2 text-sm text-muted-foreground">
                <Link href="/risk-control" className="block hover:text-foreground">Risk Control</Link>
                <span className="block">Help Center</span>
                <span className="block">API Docs</span>
              </div>
            </div>
            <div>
              <h4 className="mb-3 text-sm font-semibold">Contact Us</h4>
              <div className="space-y-2 text-sm text-muted-foreground">
                <span className="block">support@wello.finance</span>
                <span className="block">Twitter @WelloFinance</span>
                <span className="block">Telegram @WelloOfficial</span>
              </div>
            </div>
          </div>
          <Separator className="my-8" />
          <div className="flex flex-col items-center justify-between gap-4 text-xs text-muted-foreground sm:flex-row">
            <span>© 2024 Wello Finance. All rights reserved.</span>
            <span>This platform is a technical demo and does not constitute investment advice.</span>
          </div>
        </div>
      </footer>
    </div>
  )
}
