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
              AI 驱动的智能借贷平台
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
              智能匹配，全球流动性，非洲市场机遇。
              <br className="hidden sm:block" />
              让借贷更简单、更透明、更安全。
            </p>
          </FadeIn>

          <FadeIn delay={0.3}>
            <div className="flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
              <Link href="/post/lend">
                <Button size="lg" className="gap-2 bg-emerald-600 px-8 text-base hover:bg-emerald-700">
                  开始出借 <ArrowRight className="h-4 w-4" />
                </Button>
              </Link>
              <Link href="/post/borrow">
                <Button size="lg" variant="outline" className="gap-2 px-8 text-base border-emerald-500/30 hover:bg-emerald-500/10">
                  我要借款 <ArrowRight className="h-4 w-4" />
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
              <h2 className="mb-4 text-3xl font-bold sm:text-4xl">产品亮点</h2>
              <p className="text-muted-foreground">三大核心能力，重新定义 P2P 借贷体验</p>
            </div>
          </FadeIn>

          <div className="grid gap-6 md:grid-cols-3">
            {[
              {
                icon: Brain,
                title: "AI 智能匹配",
                desc: "基于多维度数据分析的智能匹配引擎，实时评估信用风险，为借贷双方找到最优对手方。匹配准确率超过94%。",
                gradient: "from-emerald-500/20 to-emerald-500/5",
                iconColor: "text-emerald-400",
                glow: "glow-green",
              },
              {
                icon: DollarSign,
                title: "$U 收益型存款",
                desc: "闲置资金自动转化为$U生息资产，享受基础4.5% APY收益。$U可直接用于平台借贷操作，资金永不闲置。",
                gradient: "from-cyan-500/20 to-cyan-500/5",
                iconColor: "text-cyan-400",
                glow: "glow-blue",
              },
              {
                icon: ShieldCheck,
                title: "严格风控体系",
                desc: "八重风控防护体系：KYC/KYB验证、AI信用评估、渐进式额度、质押管理、实时监控、多级催收。",
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
              <h2 className="mb-4 text-3xl font-bold sm:text-4xl">如何运作</h2>
              <p className="text-muted-foreground">四步开启您的借贷之旅</p>
            </div>
          </FadeIn>

          <div className="grid gap-8 md:grid-cols-4">
            {[
              { icon: UserPlus, title: "注册验证", desc: "完成KYC/KYB身份验证，快速获得平台准入资格" },
              { icon: Wallet, title: "充值资金", desc: "支持NGN、USDT、USDC多币种充值，自动转换$U生息" },
              { icon: FileText, title: "发布需求", desc: "灵活设置金额、利率、期限等借贷条件" },
              { icon: Zap, title: "AI 匹配成交", desc: "AI Agent秒级匹配最优对手方，自动撮合交易" },
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
                <div className="mb-2 text-sm font-semibold uppercase tracking-wider text-emerald-500">出借方</div>
                <h2 className="mb-6 text-3xl font-bold">为什么在这里出借？</h2>
                <div className="space-y-4">
                  {[
                    { icon: TrendingUp, text: "年化收益 15%-30%，远超传统银行存款" },
                    { icon: Globe, text: "进入高增长非洲市场，多元化投资组合" },
                    { icon: ShieldCheck, text: "八重风控体系保障资金安全" },
                    { icon: Brain, text: "AI Agent 自动匹配优质借款方" },
                    { icon: DollarSign, text: "$U 生息功能，资金等待期也有收益" },
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
                  <h3 className="mb-4 text-sm font-medium text-muted-foreground">收益对比（年化）</h3>
                  <div className="space-y-4">
                    {[
                      { label: "银行存款", rate: "2-4%", width: "15%", color: "bg-muted-foreground/30" },
                      { label: "$U 生息", rate: "4.5%", width: "22%", color: "bg-cyan-500" },
                      { label: "$U + 借贷", rate: "15-30%", width: "90%", color: "bg-emerald-500" },
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
                  <h3 className="mb-4 text-sm font-medium text-muted-foreground">利率对比</h3>
                  <div className="space-y-4">
                    {[
                      { label: "传统银行贷款", rate: "25-45%", width: "85%", color: "bg-muted-foreground/30" },
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
                <div className="mb-2 text-sm font-semibold uppercase tracking-wider text-cyan-500">借款方</div>
                <h2 className="mb-6 text-3xl font-bold">为什么在这里借款？</h2>
                <div className="space-y-4">
                  {[
                    { icon: TrendingUp, text: "利率低至 12%，远低于传统渠道" },
                    { icon: Clock, text: "AI 秒级审批，最快24小时放款" },
                    { icon: CheckCircle2, text: "灵活还款方式，匹配业务现金流" },
                    { icon: Users, text: "建立信用记录，额度逐步提升至 $500,000" },
                    { icon: Globe, text: "连接全球出借方，资金来源多元化" },
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
              <h2 className="mb-4 text-3xl font-bold sm:text-4xl">平台数据</h2>
              <p className="text-muted-foreground">持续增长的全球 P2P 借贷网络</p>
            </div>
          </FadeIn>

          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {[
              { label: "总成交额", value: platformStats.totalVolume, prefix: "$", suffix: "", icon: BarChart3, color: "text-emerald-400" },
              { label: "活跃用户", value: platformStats.activeUsers, prefix: "", suffix: "+", icon: Users, color: "text-cyan-400" },
              { label: "平均 APY", value: platformStats.avgAPY, prefix: "", suffix: "%", icon: TrendingUp, color: "text-violet-400", decimals: 1 },
              { label: "匹配成功率", value: platformStats.matchRate, prefix: "", suffix: "%", icon: Zap, color: "text-amber-400", decimals: 1 },
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
              <h2 className="mb-4 text-3xl font-bold">常见问题</h2>
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
              开始您的 <span className="gradient-text">智能借贷</span> 之旅
            </h2>
            <p className="mx-auto mb-10 max-w-xl text-muted-foreground">
              加入 Wello，体验 AI 驱动的 P2P 借贷平台。更高收益，更低利率，更安全的交易。
            </p>
            <div className="flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
              <Link href="/register">
                <Button size="lg" className="gap-2 bg-emerald-600 px-8 text-base hover:bg-emerald-700">
                  立即注册 <ArrowRight className="h-4 w-4" />
                </Button>
              </Link>
              <Link href="/risk-control">
                <Button size="lg" variant="outline" className="gap-2 px-8 text-base border-border/50">
                  了解风控体系
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
              <p className="text-sm text-muted-foreground">AI 驱动的 P2P 借贷平台，连接全球出借方与非洲优质借款企业。</p>
            </div>
            <div>
              <h4 className="mb-3 text-sm font-semibold">产品</h4>
              <div className="space-y-2 text-sm text-muted-foreground">
                <Link href="/post/lend" className="block hover:text-foreground">出借</Link>
                <Link href="/post/borrow" className="block hover:text-foreground">借款</Link>
                <Link href="/market" className="block hover:text-foreground">市场</Link>
              </div>
            </div>
            <div>
              <h4 className="mb-3 text-sm font-semibold">关于</h4>
              <div className="space-y-2 text-sm text-muted-foreground">
                <Link href="/risk-control" className="block hover:text-foreground">风控体系</Link>
                <span className="block">帮助中心</span>
                <span className="block">API 文档</span>
              </div>
            </div>
            <div>
              <h4 className="mb-3 text-sm font-semibold">联系我们</h4>
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
            <span>本平台为技术演示，不构成投资建议。</span>
          </div>
        </div>
      </footer>
    </div>
  )
}
