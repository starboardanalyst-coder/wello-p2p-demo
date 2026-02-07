"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import Link from "next/link"
import dynamic from "next/dynamic"
import {
  Wallet, TrendingUp, ArrowUpRight, ArrowDownRight,
  DollarSign, Plus, Store, Eye, Star, Sparkles,
  ExternalLink, Globe, BadgeCheck, Landmark, Heart,
  Bot, MessageSquare, AlertTriangle, Target,
} from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Progress } from "@/components/ui/progress"
import { lenderUser, lenderLoans, agentRecommendations } from "@/data/mock"

const YieldChart = dynamic(() => import("@/components/charts/YieldChart"), { ssr: false })

const fadeUp = { initial: { opacity: 0, y: 20 }, animate: { opacity: 1, y: 0 } }

const statusMap: Record<string, { label: string; variant: "default" | "secondary" | "destructive" | "outline" }> = {
  active: { label: "Active", variant: "default" },
  completed: { label: "Completed", variant: "secondary" },
  overdue: { label: "Overdue", variant: "destructive" },
  pending: { label: "Pending Match", variant: "outline" },
  cancelled: { label: "Cancelled", variant: "outline" },
  matched: { label: "Matched", variant: "default" },
}


// Mock data for v3 features
const vaultData = {
  tvl: 2450000,
  apy: 10.5,
  userDeposit: 15000,
  earnings: 892,
}

const premiumMerchants = [
  { id: 1, name: "Lagos Fresh Produce", industry: "Agriculture", rating: 92, repayRate: 98.5, amount: 25000, apy: 14, term: 30 },
  { id: 2, name: "Nairobi Tech Solutions", industry: "Technology", rating: 88, repayRate: 97.2, amount: 50000, apy: 12, term: 60 },
]

const impactProjects = [
  { id: 1, name: "Amina K.", region: "Kenya", category: "Women Entrepreneur", story: "Starting a tailoring business...", goal: 2000, raised: 1450, rate: 5 },
  { id: 2, name: "Emmanuel O.", region: "Nigeria", category: "Student Startup", story: "Building a delivery app...", goal: 5000, raised: 3200, rate: 3 },
]

export default function LenderDashboard() {
  const [activeTab, setActiveTab] = useState("market")
  
  const walletTotal =
    lenderUser.walletBalances.USDT +
    lenderUser.walletBalances.USDC +
    lenderUser.walletBalances.U +
    lenderUser.walletBalances.NGN / 1600

  return (
    <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6">
      {/* Header */}
      <motion.div {...fadeUp} className="mb-6">
        <h1 className="text-2xl font-bold sm:text-3xl">
          Welcome back, <span className="gradient-text">{lenderUser.name}</span>
        </h1>
        <p className="mt-1 text-muted-foreground">Lender Control Center · {lenderUser.company}</p>
      </motion.div>

      {/* AI Agent Banner - v3 Feature */}
      <motion.div {...fadeUp} transition={{ delay: 0.05 }} className="mb-6">
        <Card className="border-amber-500/30 bg-gradient-to-r from-amber-500/10 via-transparent to-cyan-500/10">
          <CardContent className="flex items-center gap-4 p-4">
            <div className="flex h-12 w-12 items-center justify-center rounded-full bg-amber-500/20">
              <Bot className="h-6 w-6 text-amber-400" />
            </div>
            <div className="flex-1">
              <div className="flex items-center gap-2">
                <span className="font-semibold">Your AI Agent</span>
                <Badge variant="outline" className="text-xs border-amber-500/30 text-amber-400">Active</Badge>
              </div>
              <p className="text-sm text-muted-foreground">
                I&apos;m working for <span className="text-amber-400">you</span>, not the platform. Found 3 opportunities matching your preferences.
              </p>
            </div>
            <Button variant="outline" size="sm" className="gap-2 border-amber-500/30 text-amber-400 hover:bg-amber-500/10">
              <MessageSquare className="h-4 w-4" /> Chat
            </Button>
          </CardContent>
        </Card>
      </motion.div>

      {/* Top Cards Row */}
      <div className="mb-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {/* Total Assets */}
        <motion.div {...fadeUp} transition={{ delay: 0.1 }}>
          <Card className="border-border/50 bg-gradient-to-br from-emerald-500/10 to-transparent glow-green">
            <CardContent className="p-5">
              <div className="flex items-center justify-between">
                <span className="text-sm text-muted-foreground">Total Assets (USD)</span>
                <Wallet className="h-4 w-4 text-emerald-400" />
              </div>
              <div className="mt-2 text-2xl font-bold">${walletTotal.toLocaleString(undefined, { maximumFractionDigits: 0 })}</div>
              <div className="mt-1 flex items-center gap-1 text-xs text-emerald-400">
                <ArrowUpRight className="h-3 w-3" /> +12.5% this month
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* USDT */}
        <motion.div {...fadeUp} transition={{ delay: 0.15 }}>
          <Card className="border-border/50">
            <CardContent className="p-5">
              <div className="flex items-center justify-between">
                <span className="text-sm text-muted-foreground">USDT Balance</span>
                <DollarSign className="h-4 w-4 text-green-400" />
              </div>
              <div className="mt-2 text-2xl font-bold">{lenderUser.walletBalances.USDT.toLocaleString()}</div>
              <div className="mt-1 text-xs text-muted-foreground">≈ ${lenderUser.walletBalances.USDT.toLocaleString()}</div>
            </CardContent>
          </Card>
        </motion.div>

        {/* USDC */}
        <motion.div {...fadeUp} transition={{ delay: 0.2 }}>
          <Card className="border-border/50">
            <CardContent className="p-5">
              <div className="flex items-center justify-between">
                <span className="text-sm text-muted-foreground">USDC Balance</span>
                <DollarSign className="h-4 w-4 text-blue-400" />
              </div>
              <div className="mt-2 text-2xl font-bold">{lenderUser.walletBalances.USDC.toLocaleString()}</div>
              <div className="mt-1 text-xs text-muted-foreground">≈ ${lenderUser.walletBalances.USDC.toLocaleString()}</div>
            </CardContent>
          </Card>
        </motion.div>

        {/* $U */}
        <motion.div {...fadeUp} transition={{ delay: 0.25 }}>
          <Card className="border-border/50 bg-gradient-to-br from-cyan-500/10 to-transparent glow-blue">
            <CardContent className="p-5">
              <div className="flex items-center justify-between">
                <span className="text-sm text-muted-foreground">$U Balance</span>
                <Star className="h-4 w-4 text-cyan-400" />
              </div>
              <div className="mt-2 text-2xl font-bold">{lenderUser.walletBalances.U.toLocaleString()}</div>
              <div className="mt-1 flex items-center gap-1 text-xs text-cyan-400">
                <TrendingUp className="h-3 w-3" /> APY 4.5%
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>

      {/* v3 Product Layer Tabs */}
      <motion.div {...fadeUp} transition={{ delay: 0.3 }}>
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="mb-6 grid w-full grid-cols-4 bg-secondary/50">
            <TabsTrigger value="market" className="gap-2 data-[state=active]:bg-emerald-500/20 data-[state=active]:text-emerald-400">
              <Globe className="h-4 w-4" />
              <span className="hidden sm:inline">Open Market</span>
              <span className="sm:hidden">Market</span>
            </TabsTrigger>
            <TabsTrigger value="premium" className="gap-2 data-[state=active]:bg-amber-500/20 data-[state=active]:text-amber-400">
              <BadgeCheck className="h-4 w-4" />
              <span className="hidden sm:inline">Premium</span>
              <span className="sm:hidden">Premium</span>
            </TabsTrigger>
            <TabsTrigger value="vault" className="gap-2 data-[state=active]:bg-blue-500/20 data-[state=active]:text-blue-400">
              <Landmark className="h-4 w-4" />
              <span className="hidden sm:inline">Vault</span>
              <span className="sm:hidden">Vault</span>
            </TabsTrigger>
            <TabsTrigger value="impact" className="gap-2 data-[state=active]:bg-pink-500/20 data-[state=active]:text-pink-400">
              <Heart className="h-4 w-4" />
              <span className="hidden sm:inline">Impact</span>
              <span className="sm:hidden">Impact</span>
            </TabsTrigger>
          </TabsList>

          {/* Layer 1: Open P2P Market */}
          <TabsContent value="market" className="space-y-6">
            {/* Action Buttons */}
            <div className="flex flex-wrap gap-3">
              <Button className="gap-2 bg-emerald-600 hover:bg-emerald-700">
                <ArrowUpRight className="h-4 w-4" /> Deposit
              </Button>
              <Button variant="outline" className="gap-2 border-border/50">
                <ArrowDownRight className="h-4 w-4" /> Withdraw
              </Button>
              <Link href="/post/lend">
                <Button variant="outline" className="gap-2 border-emerald-500/30 text-emerald-400 hover:bg-emerald-500/10">
                  <Plus className="h-4 w-4" /> Post Lending Order
                </Button>
              </Link>
              <Link href="/market">
                <Button variant="outline" className="gap-2 border-border/50">
                  <Store className="h-4 w-4" /> Browse Market
                </Button>
              </Link>
            </div>

            <div className="grid gap-6 lg:grid-cols-3">
              {/* Left: Yield + Loans */}
              <div className="space-y-6 lg:col-span-2">
                {/* Yield Card */}
                <Card className="border-border/50">
                  <CardHeader className="pb-2">
                    <div className="flex items-center justify-between">
                      <CardTitle className="text-base">$U Yield Trend (30-Day APY %)</CardTitle>
                      <Badge variant="secondary" className="text-xs">
                        Cumulative Yield: $1,650
                      </Badge>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <YieldChart />
                  </CardContent>
                </Card>

                {/* Loan Table */}
                <Card className="border-border/50">
                  <CardHeader className="pb-3">
                    <CardTitle className="text-base">P2P Lending History</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="overflow-x-auto">
                      <table className="w-full text-sm">
                        <thead>
                          <tr className="border-b border-border/50 text-xs text-muted-foreground">
                            <th className="pb-3 text-left font-medium">Transaction ID</th>
                            <th className="pb-3 text-left font-medium">Borrower</th>
                            <th className="pb-3 text-right font-medium">Amount</th>
                            <th className="pb-3 text-right font-medium">Rate</th>
                            <th className="pb-3 text-right font-medium">Term</th>
                            <th className="pb-3 text-center font-medium">Status</th>
                            <th className="pb-3 text-center font-medium">Action</th>
                          </tr>
                        </thead>
                        <tbody>
                          {lenderLoans.map((loan) => {
                            const st = statusMap[loan.status]
                            return (
                              <tr key={loan.id} className="border-b border-border/30 hover:bg-secondary/30">
                                <td className="py-3 font-mono text-xs">{loan.id}</td>
                                <td className="py-3">{loan.counterpartyName}</td>
                                <td className="py-3 text-right font-medium">{loan.amount.toLocaleString()} {loan.currency}</td>
                                <td className="py-3 text-right text-emerald-400">{loan.interestRate}%</td>
                                <td className="py-3 text-right">{loan.term} days</td>
                                <td className="py-3 text-center">
                                  <Badge variant={st.variant} className="text-xs">{st.label}</Badge>
                                </td>
                                <td className="py-3 text-center">
                                  <Link href={`/transaction/${loan.id}`}>
                                    <Button variant="ghost" size="sm" className="h-7 gap-1 text-xs">
                                      <Eye className="h-3 w-3" /> View
                                    </Button>
                                  </Link>
                                </td>
                              </tr>
                            )
                          })}
                        </tbody>
                      </table>
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* Right: Agent Recommendations */}
              <div className="space-y-6">
                <Card className="border-border/50">
                  <CardHeader className="pb-3">
                    <div className="flex items-center gap-2">
                      <Sparkles className="h-4 w-4 text-amber-400" />
                      <CardTitle className="text-base">AI Agent Picks</CardTitle>
                    </div>
                    <p className="text-xs text-muted-foreground">Matched to your preferences</p>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    {agentRecommendations.map((rec) => (
                      <div key={rec.id} className="rounded-xl border border-border/50 bg-secondary/30 p-4 transition-all hover:border-border hover:bg-secondary/50">
                        <div className="mb-2 flex items-center justify-between">
                          <span className="font-medium">{rec.borrowerName}</span>
                          <Badge className="bg-emerald-500/20 text-emerald-400 text-xs">
                            {rec.matchScore}% Match
                          </Badge>
                        </div>
                        <div className="mb-3 grid grid-cols-2 gap-2 text-xs text-muted-foreground">
                          <span>Amount: {rec.amount.toLocaleString()} {rec.currency}</span>
                          <span>Rate: {rec.interestRate}%</span>
                          <span>Term: {rec.term} days</span>
                          <span>Credit: {rec.borrowerCredit}</span>
                        </div>
                        <p className="mb-3 text-xs text-muted-foreground">💡 {rec.reason}</p>
                        <div className="flex gap-2">
                          <Link href="/match/results" className="flex-1">
                            <Button size="sm" className="w-full gap-1 bg-emerald-600 text-xs hover:bg-emerald-700">
                              Accept <ExternalLink className="h-3 w-3" />
                            </Button>
                          </Link>
                          <Button size="sm" variant="outline" className="text-xs border-border/50">
                            Skip
                          </Button>
                        </div>
                      </div>
                    ))}
                  </CardContent>
                </Card>
              </div>
            </div>
          </TabsContent>

          {/* Layer 2: Premium Merchants */}
          <TabsContent value="premium" className="space-y-6">
            <Card className="border-amber-500/30 bg-amber-500/5">
              <CardContent className="p-4">
                <div className="flex items-center gap-3">
                  <BadgeCheck className="h-5 w-5 text-amber-400" />
                  <div>
                    <p className="font-medium">Platform-Verified Merchants</p>
                    <p className="text-sm text-muted-foreground">Lower risk with platform guarantee on defaults</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <div className="grid gap-4 md:grid-cols-2">
              {premiumMerchants.map((merchant) => (
                <Card key={merchant.id} className="border-border/50">
                  <CardContent className="p-5">
                    <div className="mb-3 flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <BadgeCheck className="h-5 w-5 text-amber-400" />
                        <span className="font-semibold">{merchant.name}</span>
                      </div>
                      <Badge className="bg-amber-500/20 text-amber-400">{merchant.industry}</Badge>
                    </div>
                    <div className="mb-4 grid grid-cols-2 gap-3 text-sm">
                      <div>
                        <span className="text-muted-foreground">Credit Score</span>
                        <div className="font-semibold text-emerald-400">{merchant.rating}/100</div>
                      </div>
                      <div>
                        <span className="text-muted-foreground">Repayment Rate</span>
                        <div className="font-semibold text-emerald-400">{merchant.repayRate}%</div>
                      </div>
                      <div>
                        <span className="text-muted-foreground">Amount Needed</span>
                        <div className="font-semibold">${merchant.amount.toLocaleString()}</div>
                      </div>
                      <div>
                        <span className="text-muted-foreground">APY / Term</span>
                        <div className="font-semibold">{merchant.apy}% / {merchant.term}d</div>
                      </div>
                    </div>
                    <Button className="w-full gap-2 bg-amber-600 hover:bg-amber-700">
                      <Target className="h-4 w-4" /> Invest Now
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          {/* Layer 3: Vault */}
          <TabsContent value="vault" className="space-y-6">
            <Card className="border-blue-500/30 bg-blue-500/5">
              <CardContent className="p-4">
                <div className="flex items-center gap-3">
                  <Landmark className="h-5 w-5 text-blue-400" />
                  <div>
                    <p className="font-medium">Africa SME Vault</p>
                    <p className="text-sm text-muted-foreground">Fully managed, fixed yield. Platform covers all defaults.</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <div className="grid gap-6 md:grid-cols-2">
              <Card className="border-border/50">
                <CardHeader>
                  <CardTitle className="text-base">Vault Overview</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Total Value Locked</span>
                    <span className="font-semibold">${vaultData.tvl.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Current APY</span>
                    <span className="font-semibold text-blue-400">{vaultData.apy}%</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Risk Level</span>
                    <Badge className="bg-emerald-500/20 text-emerald-400">Low</Badge>
                  </div>
                </CardContent>
              </Card>

              <Card className="border-border/50">
                <CardHeader>
                  <CardTitle className="text-base">Your Position</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Deposited</span>
                    <span className="font-semibold">${vaultData.userDeposit.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Earnings</span>
                    <span className="font-semibold text-emerald-400">+${vaultData.earnings.toLocaleString()}</span>
                  </div>
                  <div className="flex gap-3">
                    <Button className="flex-1 bg-blue-600 hover:bg-blue-700">Deposit</Button>
                    <Button variant="outline" className="flex-1 border-border/50">Withdraw</Button>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* Special: Impact */}
          <TabsContent value="impact" className="space-y-6">
            <Card className="border-pink-500/30 bg-pink-500/5">
              <CardContent className="p-4">
                <div className="flex items-center gap-3">
                  <Heart className="h-5 w-5 text-pink-400" />
                  <div>
                    <p className="font-medium">Impact Investing</p>
                    <p className="text-sm text-muted-foreground">Support African entrepreneurs. Lower returns, higher purpose.</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <div className="grid gap-4 md:grid-cols-2">
              {impactProjects.map((project) => (
                <Card key={project.id} className="border-border/50">
                  <CardContent className="p-5">
                    <div className="mb-3 flex items-center justify-between">
                      <div>
                        <span className="font-semibold">{project.name}</span>
                        <div className="text-xs text-muted-foreground">{project.region}</div>
                      </div>
                      <Badge className="bg-pink-500/20 text-pink-400">{project.category}</Badge>
                    </div>
                    <p className="mb-3 text-sm text-muted-foreground">&ldquo;{project.story}&rdquo;</p>
                    <div className="mb-3">
                      <div className="mb-1 flex justify-between text-xs">
                        <span>${project.raised.toLocaleString()} raised</span>
                        <span className="text-muted-foreground">${project.goal.toLocaleString()} goal</span>
                      </div>
                      <Progress value={(project.raised / project.goal) * 100} className="h-2" />
                    </div>
                    <div className="mb-4 flex justify-between text-sm">
                      <span className="text-muted-foreground">Interest Rate</span>
                      <span className="font-semibold text-pink-400">{project.rate}% (subsidized)</span>
                    </div>
                    <Button className="w-full gap-2 bg-pink-600 hover:bg-pink-700">
                      <Heart className="h-4 w-4" /> Support This Project
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>
        </Tabs>
      </motion.div>

      {/* AI Risk Alert Toast (fixed position) */}
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1 }}
        className="fixed bottom-4 right-4 z-50"
      >
        <Card className="w-80 border-amber-500/30 bg-background/95 backdrop-blur shadow-lg">
          <CardContent className="p-4">
            <div className="flex items-start gap-3">
              <AlertTriangle className="h-5 w-5 text-amber-400 mt-0.5" />
              <div className="flex-1">
                <p className="text-sm font-medium">Concentration Alert</p>
                <p className="text-xs text-muted-foreground mt-1">
                  45% of your portfolio is in Agriculture. Consider diversifying.
                </p>
              </div>
              <Button variant="ghost" size="sm" className="h-6 text-xs">
                Dismiss
              </Button>
            </div>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  )
}
