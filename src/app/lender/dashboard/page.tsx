"use client"

import { motion } from "framer-motion"
import Link from "next/link"
import dynamic from "next/dynamic"
import {
  Wallet, TrendingUp, ArrowUpRight, ArrowDownRight,
  DollarSign, Plus, Store, Eye, Star, Sparkles,
  ExternalLink,
} from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { lenderUser, lenderLoans, agentRecommendations } from "@/data/mock"

const YieldChart = dynamic(() => import("@/components/charts/YieldChart"), { ssr: false })

const fadeUp = { initial: { opacity: 0, y: 20 }, animate: { opacity: 1, y: 0 } }

const statusMap: Record<string, { label: string; variant: "default" | "secondary" | "destructive" | "outline" }> = {
  active: { label: "进行中", variant: "default" },
  completed: { label: "已完成", variant: "secondary" },
  overdue: { label: "逾期", variant: "destructive" },
  pending: { label: "待匹配", variant: "outline" },
  cancelled: { label: "已取消", variant: "outline" },
  matched: { label: "已匹配", variant: "default" },
}

const repayMethodMap: Record<string, string> = {
  bullet: "到期还本付息",
  equal_installment: "等额本息",
  interest_first: "先息后本",
  equal_principal: "等额本金",
}

export default function LenderDashboard() {
  const walletTotal =
    lenderUser.walletBalances.USDT +
    lenderUser.walletBalances.USDC +
    lenderUser.walletBalances.U +
    lenderUser.walletBalances.NGN / 1600

  return (
    <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6">
      {/* Header */}
      <motion.div {...fadeUp} className="mb-8">
        <h1 className="text-2xl font-bold sm:text-3xl">
          欢迎回来，<span className="gradient-text">{lenderUser.name}</span>
        </h1>
        <p className="mt-1 text-muted-foreground">出借方控制中心 · {lenderUser.company}</p>
      </motion.div>

      {/* Top Cards Row */}
      <div className="mb-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {/* Total Assets */}
        <motion.div {...fadeUp} transition={{ delay: 0.05 }}>
          <Card className="border-border/50 bg-gradient-to-br from-emerald-500/10 to-transparent glow-green">
            <CardContent className="p-5">
              <div className="flex items-center justify-between">
                <span className="text-sm text-muted-foreground">总资产 (USD)</span>
                <Wallet className="h-4 w-4 text-emerald-400" />
              </div>
              <div className="mt-2 text-2xl font-bold">${walletTotal.toLocaleString(undefined, { maximumFractionDigits: 0 })}</div>
              <div className="mt-1 flex items-center gap-1 text-xs text-emerald-400">
                <ArrowUpRight className="h-3 w-3" /> +12.5% 本月
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* USDT */}
        <motion.div {...fadeUp} transition={{ delay: 0.1 }}>
          <Card className="border-border/50">
            <CardContent className="p-5">
              <div className="flex items-center justify-between">
                <span className="text-sm text-muted-foreground">USDT 余额</span>
                <DollarSign className="h-4 w-4 text-green-400" />
              </div>
              <div className="mt-2 text-2xl font-bold">{lenderUser.walletBalances.USDT.toLocaleString()}</div>
              <div className="mt-1 text-xs text-muted-foreground">≈ ${lenderUser.walletBalances.USDT.toLocaleString()}</div>
            </CardContent>
          </Card>
        </motion.div>

        {/* USDC */}
        <motion.div {...fadeUp} transition={{ delay: 0.15 }}>
          <Card className="border-border/50">
            <CardContent className="p-5">
              <div className="flex items-center justify-between">
                <span className="text-sm text-muted-foreground">USDC 余额</span>
                <DollarSign className="h-4 w-4 text-blue-400" />
              </div>
              <div className="mt-2 text-2xl font-bold">{lenderUser.walletBalances.USDC.toLocaleString()}</div>
              <div className="mt-1 text-xs text-muted-foreground">≈ ${lenderUser.walletBalances.USDC.toLocaleString()}</div>
            </CardContent>
          </Card>
        </motion.div>

        {/* $U */}
        <motion.div {...fadeUp} transition={{ delay: 0.2 }}>
          <Card className="border-border/50 bg-gradient-to-br from-cyan-500/10 to-transparent glow-blue">
            <CardContent className="p-5">
              <div className="flex items-center justify-between">
                <span className="text-sm text-muted-foreground">$U 余额</span>
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

      {/* Action Buttons */}
      <motion.div {...fadeUp} transition={{ delay: 0.25 }} className="mb-8 flex flex-wrap gap-3">
        <Button className="gap-2 bg-emerald-600 hover:bg-emerald-700">
          <ArrowUpRight className="h-4 w-4" /> 充值
        </Button>
        <Button variant="outline" className="gap-2 border-border/50">
          <ArrowDownRight className="h-4 w-4" /> 提现
        </Button>
        <Link href="/post/lend">
          <Button variant="outline" className="gap-2 border-emerald-500/30 text-emerald-400 hover:bg-emerald-500/10">
            <Plus className="h-4 w-4" /> 发布出借需求
          </Button>
        </Link>
        <Link href="/market">
          <Button variant="outline" className="gap-2 border-border/50">
            <Store className="h-4 w-4" /> 浏览市场
          </Button>
        </Link>
      </motion.div>

      <div className="grid gap-6 lg:grid-cols-3">
        {/* Left: Yield + Loans */}
        <div className="space-y-6 lg:col-span-2">
          {/* Yield Card */}
          <motion.div {...fadeUp} transition={{ delay: 0.3 }}>
            <Card className="border-border/50">
              <CardHeader className="pb-2">
                <div className="flex items-center justify-between">
                  <CardTitle className="text-base">$U 收益趋势 (30天 APY %)</CardTitle>
                  <Badge variant="secondary" className="text-xs">
                    累计收益: $1,650
                  </Badge>
                </div>
              </CardHeader>
              <CardContent>
                <YieldChart />
              </CardContent>
            </Card>
          </motion.div>

          {/* Loan Table */}
          <motion.div {...fadeUp} transition={{ delay: 0.35 }}>
            <Card className="border-border/50">
              <CardHeader className="pb-3">
                <CardTitle className="text-base">借出记录</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="overflow-x-auto">
                  <table className="w-full text-sm">
                    <thead>
                      <tr className="border-b border-border/50 text-xs text-muted-foreground">
                        <th className="pb-3 text-left font-medium">交易ID</th>
                        <th className="pb-3 text-left font-medium">借款方</th>
                        <th className="pb-3 text-right font-medium">金额</th>
                        <th className="pb-3 text-right font-medium">利率</th>
                        <th className="pb-3 text-right font-medium">期限</th>
                        <th className="pb-3 text-right font-medium">还款方式</th>
                        <th className="pb-3 text-center font-medium">状态</th>
                        <th className="pb-3 text-center font-medium">操作</th>
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
                            <td className="py-3 text-right">{loan.term}天</td>
                            <td className="py-3 text-right text-xs text-muted-foreground">{repayMethodMap[loan.repaymentMethod]}</td>
                            <td className="py-3 text-center">
                              <Badge variant={st.variant} className="text-xs">{st.label}</Badge>
                            </td>
                            <td className="py-3 text-center">
                              <Link href={`/transaction/${loan.id}`}>
                                <Button variant="ghost" size="sm" className="h-7 gap-1 text-xs">
                                  <Eye className="h-3 w-3" /> 详情
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
          </motion.div>
        </div>

        {/* Right: Agent Recommendations */}
        <div className="space-y-6">
          <motion.div {...fadeUp} transition={{ delay: 0.3 }}>
            <Card className="border-border/50">
              <CardHeader className="pb-3">
                <div className="flex items-center gap-2">
                  <Sparkles className="h-4 w-4 text-amber-400" />
                  <CardTitle className="text-base">AI Agent 推荐</CardTitle>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                {agentRecommendations.map((rec) => (
                  <div key={rec.id} className="rounded-xl border border-border/50 bg-secondary/30 p-4 transition-all hover:border-border hover:bg-secondary/50">
                    <div className="mb-2 flex items-center justify-between">
                      <span className="font-medium">{rec.borrowerName}</span>
                      <Badge className="bg-emerald-500/20 text-emerald-400 text-xs">
                        匹配 {rec.matchScore}%
                      </Badge>
                    </div>
                    <div className="mb-3 grid grid-cols-2 gap-2 text-xs text-muted-foreground">
                      <span>金额: {rec.amount.toLocaleString()} {rec.currency}</span>
                      <span>利率: {rec.interestRate}%</span>
                      <span>期限: {rec.term}天</span>
                      <span>信用: {rec.borrowerCredit}分</span>
                    </div>
                    <p className="mb-3 text-xs text-muted-foreground">💡 {rec.reason}</p>
                    <div className="flex gap-2">
                      <Link href="/match/results" className="flex-1">
                        <Button size="sm" className="w-full gap-1 bg-emerald-600 text-xs hover:bg-emerald-700">
                          接受 <ExternalLink className="h-3 w-3" />
                        </Button>
                      </Link>
                      <Button size="sm" variant="outline" className="text-xs border-border/50">
                        忽略
                      </Button>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>
          </motion.div>

          {/* NGN Balance mini card */}
          <motion.div {...fadeUp} transition={{ delay: 0.4 }}>
            <Card className="border-border/50">
              <CardContent className="p-5">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-muted-foreground">NGN 余额</span>
                  <span className="text-xs text-muted-foreground">₦</span>
                </div>
                <div className="mt-1 text-xl font-bold">₦{lenderUser.walletBalances.NGN.toLocaleString()}</div>
                <div className="mt-1 text-xs text-muted-foreground">≈ ${(lenderUser.walletBalances.NGN / 1600).toLocaleString(undefined, { maximumFractionDigits: 0 })}</div>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </div>
    </div>
  )
}
