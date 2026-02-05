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
  active: { label: "Active", variant: "default" },
  completed: { label: "Completed", variant: "secondary" },
  overdue: { label: "Overdue", variant: "destructive" },
  pending: { label: "Pending Match", variant: "outline" },
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
          Welcome back, <span className="gradient-text">{borrowerUser.name}</span>
        </h1>
        <p className="mt-1 text-muted-foreground">Borrower Control Center · {borrowerUser.company}</p>
      </motion.div>

      {/* Top Cards */}
      <div className="mb-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {/* Credit Level */}
        <motion.div {...fadeUp} transition={{ delay: 0.05 }}>
          <Card className="border-border/50 bg-gradient-to-br from-violet-500/10 to-transparent">
            <CardContent className="p-5">
              <div className="flex items-center justify-between">
                <span className="text-sm text-muted-foreground">Credit Level</span>
                <CreditCard className="h-4 w-4 text-violet-400" />
              </div>
              <div className="mt-2 flex items-baseline gap-2">
                <span className="text-3xl font-bold text-violet-400">Lv.{borrowerUser.creditLevel}</span>
                <span className="text-sm text-muted-foreground">Intermediate</span>
              </div>
              <div className="mt-1 text-xs text-muted-foreground">Upgrade requirements: Complete 8 loans, on-time rate &gt;95%</div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Available */}
        <motion.div {...fadeUp} transition={{ delay: 0.1 }}>
          <Card className="border-border/50 bg-gradient-to-br from-emerald-500/10 to-transparent glow-green">
            <CardContent className="p-5">
              <div className="flex items-center justify-between">
                <span className="text-sm text-muted-foreground">Available Credit</span>
                <ArrowUpRight className="h-4 w-4 text-emerald-400" />
              </div>
              <div className="mt-2 text-2xl font-bold">${available.toLocaleString()}</div>
              <Progress value={100 - usedPct} className="mt-2 h-1.5" />
              <div className="mt-1 text-xs text-muted-foreground">Total Limit ${borrowerUser.totalLimit?.toLocaleString()}</div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Used */}
        <motion.div {...fadeUp} transition={{ delay: 0.15 }}>
          <Card className="border-border/50">
            <CardContent className="p-5">
              <div className="flex items-center justify-between">
                <span className="text-sm text-muted-foreground">Used Credit</span>
                <TrendingUp className="h-4 w-4 text-amber-400" />
              </div>
              <div className="mt-2 text-2xl font-bold">${borrowerUser.usedLimit?.toLocaleString()}</div>
              <Progress value={usedPct} className="mt-2 h-1.5" />
              <div className="mt-1 text-xs text-muted-foreground">Utilization {usedPct.toFixed(0)}%</div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Credit Score */}
        <motion.div {...fadeUp} transition={{ delay: 0.2 }}>
          <Card className="border-border/50 bg-gradient-to-br from-cyan-500/10 to-transparent">
            <CardContent className="p-5">
              <div className="flex items-center justify-between">
                <span className="text-sm text-muted-foreground">Credit Score</span>
                <Sparkles className="h-4 w-4 text-cyan-400" />
              </div>
              <div className="mt-2 text-2xl font-bold text-emerald-400">{borrowerUser.creditScore}</div>
              <div className="mt-1 flex items-center gap-1 text-xs text-emerald-400">
                <ArrowUpRight className="h-3 w-3" /> +3 this month
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>

      {/* Action Buttons */}
      <motion.div {...fadeUp} transition={{ delay: 0.25 }} className="mb-8 flex flex-wrap gap-3">
        <Link href="/post/borrow">
          <Button className="gap-2 bg-emerald-600 hover:bg-emerald-700">
            <Plus className="h-4 w-4" /> Post Borrowing Request
          </Button>
        </Link>
        <Link href="/market">
          <Button variant="outline" className="gap-2 border-border/50">
            <Store className="h-4 w-4" /> Browse Market
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
                <CardTitle className="text-base">Borrowing History</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="overflow-x-auto">
                  <table className="w-full text-sm">
                    <thead>
                      <tr className="border-b border-border/50 text-xs text-muted-foreground">
                        <th className="pb-3 text-left font-medium">Transaction ID</th>
                        <th className="pb-3 text-left font-medium">Lender</th>
                        <th className="pb-3 text-right font-medium">Amount</th>
                        <th className="pb-3 text-right font-medium">Rate</th>
                        <th className="pb-3 text-right font-medium">Term</th>
                        <th className="pb-3 text-center font-medium">Status</th>
                        <th className="pb-3 text-center font-medium">Action</th>
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
                            <td className="py-3 text-right">{loan.term} days</td>
                            <td className="py-3 text-center">
                              <Badge variant={st?.variant ?? "outline"} className="text-xs">{st?.label ?? loan.status}</Badge>
                            </td>
                            <td className="py-3 text-center">
                              <Link href={`/transaction/${loan.id}`}>
                                <Button variant="ghost" size="sm" className="h-7 gap-1 text-xs">
                                  <Eye className="h-3 w-3" /> Details
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
                  <CardTitle className="text-base">Repayment Schedule</CardTitle>
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
                          <div className="text-sm font-medium">Installment #{inst.number} · {inst.loanId}</div>
                          <div className="text-xs text-muted-foreground">Due: {inst.dueDate}</div>
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="text-sm font-medium">${inst.total.toLocaleString()}</div>
                        <div className="text-xs text-muted-foreground">
                          Principal ${inst.principal.toLocaleString()} + Interest ${inst.interest.toLocaleString()}
                        </div>
                      </div>
                      <div>
                        {inst.status === "paid" ? (
                          <Badge variant="secondary" className="text-xs">Paid</Badge>
                        ) : inst.status === "overdue" ? (
                          <Badge variant="destructive" className="text-xs">Overdue</Badge>
                        ) : (
                          <Button size="sm" className="h-7 bg-emerald-600 text-xs hover:bg-emerald-700">Pay Now</Button>
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
                <CardTitle className="text-base">Credit Score Details</CardTitle>
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
                <CardTitle className="text-base">Score Breakdown</CardTitle>
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
                  <CardTitle className="text-base">AI Suggestions</CardTitle>
                </div>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="rounded-lg border border-emerald-500/20 bg-emerald-500/5 p-3 text-xs text-muted-foreground">
                  📈 Your credit score increased by 3 points this month. Keep up the on-time payments and you could upgrade to Lv.4 next month.
                </div>
                <div className="rounded-lg border border-cyan-500/20 bg-cyan-500/5 p-3 text-xs text-muted-foreground">
                  💡 There are 3 lending orders in the market with rates lower than your last loan. Worth checking out.
                </div>
                <div className="rounded-lg border border-amber-500/20 bg-amber-500/5 p-3 text-xs text-muted-foreground">
                  ⏰ You have 1 payment due on December 20th. Please ensure sufficient account balance.
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </div>
    </div>
  )
}
