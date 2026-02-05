"use client"

import { motion } from "framer-motion"
import Link from "next/link"
import dynamic from "next/dynamic"
import {
  CreditCard, TrendingUp, Calendar, Plus, Store,
  Eye, Sparkles, AlertCircle, CheckCircle2, Clock,
  ArrowUpRight,
} from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { borrowerUser, borrowerLoans, repaymentSchedules, creditScoreBreakdown } from "@/data/mock"

const CreditGauge = dynamic(() => import("@/components/charts/CreditGauge"), { ssr: false })
const CreditBreakdown = dynamic(() => import("@/components/charts/CreditBreakdown"), { ssr: false })

const fadeUp = { initial: { opacity: 0, y: 20 }, animate: { opacity: 1, y: 0 } }

const statusMap: Record<string, { label: string; variant: "default" | "secondary" | "destructive" | "outline" }> = {
  active: { label: "进行中", variant: "default" },
  completed: { label: "已完成", variant: "secondary" },
  overdue: { label: "逾期", variant: "destructive" },
  pending: { label: "待匹配", variant: "outline" },
}

export default function BorrowerDashboard() {
  const usedPct = ((borrowerUser.usedLimit ?? 0) / (borrowerUser.totalLimit ?? 1)) * 100
  const available = (borrowerUser.totalLimit ?? 0) - (borrowerUser.usedLimit ?? 0)

  // All upcoming repayments
  const allInstallments = repaymentSchedules.flatMap((s) =>
    s.installments.map((inst) => ({ ...inst, loanId: s.loanId }))
  )

  return (
    <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6">
      {/* Header */}
      <motion.div {...fadeUp} className="mb-8">
        <h1 className="text-2xl font-bold sm:text-3xl">
          欢迎回来，<span className="gradient-text">{borrowerUser.name}</span>
        </h1>
        <p className="mt-1 text-muted-foreground">借款方控制中心 · {borrowerUser.company}</p>
      </motion.div>

      {/* Top Cards */}
      <div className="mb-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {/* Credit Level */}
        <motion.div {...fadeUp} transition={{ delay: 0.05 }}>
          <Card className="border-border/50 bg-gradient-to-br from-violet-500/10 to-transparent">
            <CardContent className="p-5">
              <div className="flex items-center justify-between">
                <span className="text-sm text-muted-foreground">额度等级</span>
                <CreditCard className="h-4 w-4 text-violet-400" />
              </div>
              <div className="mt-2 flex items-baseline gap-2">
                <span className="text-3xl font-bold text-violet-400">Lv.{borrowerUser.creditLevel}</span>
                <span className="text-sm text-muted-foreground">中级</span>
              </div>
              <div className="mt-1 text-xs text-muted-foreground">升级条件: 完成8笔借款, 还款率&gt;95%</div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Available */}
        <motion.div {...fadeUp} transition={{ delay: 0.1 }}>
          <Card className="border-border/50 bg-gradient-to-br from-emerald-500/10 to-transparent glow-green">
            <CardContent className="p-5">
              <div className="flex items-center justify-between">
                <span className="text-sm text-muted-foreground">可用额度</span>
                <ArrowUpRight className="h-4 w-4 text-emerald-400" />
              </div>
              <div className="mt-2 text-2xl font-bold">${available.toLocaleString()}</div>
              <Progress value={100 - usedPct} className="mt-2 h-1.5" />
              <div className="mt-1 text-xs text-muted-foreground">总额度 ${borrowerUser.totalLimit?.toLocaleString()}</div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Used */}
        <motion.div {...fadeUp} transition={{ delay: 0.15 }}>
          <Card className="border-border/50">
            <CardContent className="p-5">
              <div className="flex items-center justify-between">
                <span className="text-sm text-muted-foreground">已用额度</span>
                <TrendingUp className="h-4 w-4 text-amber-400" />
              </div>
              <div className="mt-2 text-2xl font-bold">${borrowerUser.usedLimit?.toLocaleString()}</div>
              <Progress value={usedPct} className="mt-2 h-1.5" />
              <div className="mt-1 text-xs text-muted-foreground">使用率 {usedPct.toFixed(0)}%</div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Credit Score */}
        <motion.div {...fadeUp} transition={{ delay: 0.2 }}>
          <Card className="border-border/50 bg-gradient-to-br from-cyan-500/10 to-transparent">
            <CardContent className="p-5">
              <div className="flex items-center justify-between">
                <span className="text-sm text-muted-foreground">信用评分</span>
                <Sparkles className="h-4 w-4 text-cyan-400" />
              </div>
              <div className="mt-2 text-2xl font-bold text-emerald-400">{borrowerUser.creditScore}</div>
              <div className="mt-1 flex items-center gap-1 text-xs text-emerald-400">
                <ArrowUpRight className="h-3 w-3" /> +3 本月
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>

      {/* Action Buttons */}
      <motion.div {...fadeUp} transition={{ delay: 0.25 }} className="mb-8 flex flex-wrap gap-3">
        <Link href="/post/borrow">
          <Button className="gap-2 bg-emerald-600 hover:bg-emerald-700">
            <Plus className="h-4 w-4" /> 发布借款需求
          </Button>
        </Link>
        <Link href="/market">
          <Button variant="outline" className="gap-2 border-border/50">
            <Store className="h-4 w-4" /> 浏览市场
          </Button>
        </Link>
      </motion.div>

      <div className="grid gap-6 lg:grid-cols-3">
        {/* Left: Loans + Repayment */}
        <div className="space-y-6 lg:col-span-2">
          {/* Loan Table */}
          <motion.div {...fadeUp} transition={{ delay: 0.3 }}>
            <Card className="border-border/50">
              <CardHeader className="pb-3">
                <CardTitle className="text-base">借款记录</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="overflow-x-auto">
                  <table className="w-full text-sm">
                    <thead>
                      <tr className="border-b border-border/50 text-xs text-muted-foreground">
                        <th className="pb-3 text-left font-medium">交易ID</th>
                        <th className="pb-3 text-left font-medium">出借方</th>
                        <th className="pb-3 text-right font-medium">金额</th>
                        <th className="pb-3 text-right font-medium">利率</th>
                        <th className="pb-3 text-right font-medium">期限</th>
                        <th className="pb-3 text-center font-medium">状态</th>
                        <th className="pb-3 text-center font-medium">操作</th>
                      </tr>
                    </thead>
                    <tbody>
                      {borrowerLoans.map((loan) => {
                        const st = statusMap[loan.status]
                        return (
                          <tr key={loan.id} className="border-b border-border/30 hover:bg-secondary/30">
                            <td className="py-3 font-mono text-xs">{loan.id}</td>
                            <td className="py-3">{loan.counterpartyName}</td>
                            <td className="py-3 text-right font-medium">{loan.amount.toLocaleString()} {loan.currency}</td>
                            <td className="py-3 text-right text-cyan-400">{loan.interestRate}%</td>
                            <td className="py-3 text-right">{loan.term}天</td>
                            <td className="py-3 text-center">
                              <Badge variant={st?.variant ?? "outline"} className="text-xs">{st?.label ?? loan.status}</Badge>
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

          {/* Repayment Schedule */}
          <motion.div {...fadeUp} transition={{ delay: 0.35 }}>
            <Card className="border-border/50">
              <CardHeader className="pb-3">
                <div className="flex items-center gap-2">
                  <Calendar className="h-4 w-4 text-cyan-400" />
                  <CardTitle className="text-base">还款计划</CardTitle>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {allInstallments.map((inst, i) => (
                    <div key={i} className="flex items-center justify-between rounded-lg border border-border/30 bg-secondary/20 p-3">
                      <div className="flex items-center gap-3">
                        {inst.status === "paid" ? (
                          <CheckCircle2 className="h-5 w-5 text-emerald-400" />
                        ) : inst.status === "overdue" ? (
                          <AlertCircle className="h-5 w-5 text-red-400" />
                        ) : (
                          <Clock className="h-5 w-5 text-amber-400" />
                        )}
                        <div>
                          <div className="text-sm font-medium">第{inst.number}期 · {inst.loanId}</div>
                          <div className="text-xs text-muted-foreground">到期日: {inst.dueDate}</div>
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="text-sm font-medium">${inst.total.toLocaleString()}</div>
                        <div className="text-xs text-muted-foreground">
                          本金 ${inst.principal.toLocaleString()} + 利息 ${inst.interest.toLocaleString()}
                        </div>
                      </div>
                      <div>
                        {inst.status === "paid" ? (
                          <Badge variant="secondary" className="text-xs">已还</Badge>
                        ) : inst.status === "overdue" ? (
                          <Badge variant="destructive" className="text-xs">逾期</Badge>
                        ) : (
                          <Button size="sm" className="h-7 bg-emerald-600 text-xs hover:bg-emerald-700">立即还款</Button>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </div>

        {/* Right: Credit Score + AI */}
        <div className="space-y-6">
          {/* Credit Score Card */}
          <motion.div {...fadeUp} transition={{ delay: 0.3 }}>
            <Card className="border-border/50">
              <CardHeader className="pb-2">
                <CardTitle className="text-base">信用评分详情</CardTitle>
              </CardHeader>
              <CardContent>
                <CreditGauge score={borrowerUser.creditScore ?? 0} />
                <div className="mt-4 space-y-3">
                  {creditScoreBreakdown.map((item, i) => (
                    <div key={i}>
                      <div className="mb-1 flex justify-between text-xs">
                        <span className="text-muted-foreground">{item.category} ({item.weight}%)</span>
                        <span className="font-medium">{item.score}</span>
                      </div>
                      <Progress value={item.score} className="h-1.5" />
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </motion.div>

          {/* Credit Breakdown Pie */}
          <motion.div {...fadeUp} transition={{ delay: 0.35 }}>
            <Card className="border-border/50">
              <CardHeader className="pb-2">
                <CardTitle className="text-base">评分构成</CardTitle>
              </CardHeader>
              <CardContent>
                <CreditBreakdown />
                <div className="mt-2 grid grid-cols-2 gap-2">
                  {creditScoreBreakdown.map((item, i) => (
                    <div key={i} className="flex items-center gap-2 text-xs">
                      <div className="h-2 w-2 rounded-full" style={{ backgroundColor: ["#22c55e","#3b82f6","#f59e0b","#8b5cf6"][i] }} />
                      <span className="text-muted-foreground">{item.category}</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </motion.div>

          {/* AI Notifications */}
          <motion.div {...fadeUp} transition={{ delay: 0.4 }}>
            <Card className="border-border/50">
              <CardHeader className="pb-3">
                <div className="flex items-center gap-2">
                  <Sparkles className="h-4 w-4 text-amber-400" />
                  <CardTitle className="text-base">AI 建议</CardTitle>
                </div>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="rounded-lg border border-emerald-500/20 bg-emerald-500/5 p-3 text-xs text-muted-foreground">
                  📈 您的信用评分本月上升了3分。继续保持按时还款，有望在下月升级到 Lv.4。
                </div>
                <div className="rounded-lg border border-cyan-500/20 bg-cyan-500/5 p-3 text-xs text-muted-foreground">
                  💡 当前市场上有3笔出借挂单的利率低于您上次借款利率，建议关注。
                </div>
                <div className="rounded-lg border border-amber-500/20 bg-amber-500/5 p-3 text-xs text-muted-foreground">
                  ⏰ 您有1笔还款将于12月20日到期，请确保账户余额充足。
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </div>
    </div>
  )
}
