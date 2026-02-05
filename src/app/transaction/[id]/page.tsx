"use client"

import { motion } from "framer-motion"
import Link from "next/link"
import {
  ArrowRight, CheckCircle2, Clock, AlertCircle,
  User, Shield, CreditCard, Wallet, ExternalLink,
} from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { transactionDetail } from "@/data/mock"

const statusConfig = {
  active: { label: "进行中", color: "bg-emerald-500", textColor: "text-emerald-400" },
  completed: { label: "已完成", color: "bg-blue-500", textColor: "text-blue-400" },
  overdue: { label: "逾期", color: "bg-red-500", textColor: "text-red-400" },
  cancelled: { label: "已取消", color: "bg-gray-500", textColor: "text-gray-400" },
}

const fadeUp = { initial: { opacity: 0, y: 20 }, animate: { opacity: 1, y: 0 } }

export default function TransactionDetailPage() {
  const txn = transactionDetail
  const st = statusConfig[txn.status]

  return (
    <div className="mx-auto max-w-5xl px-4 py-8 sm:px-6">
      {/* Header */}
      <motion.div {...fadeUp} className="mb-8">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <div className="flex items-center gap-3">
              <h1 className="text-2xl font-bold">交易详情</h1>
              <Badge className={`${st.color} text-white`}>{st.label}</Badge>
            </div>
            <p className="mt-1 font-mono text-sm text-muted-foreground">{txn.id}</p>
          </div>
          <Button variant="outline" className="gap-2 border-border/50">
            联系对手方 <ExternalLink className="h-3.5 w-3.5" />
          </Button>
        </div>
      </motion.div>

      <div className="grid gap-6 lg:grid-cols-3">
        {/* Left: Details */}
        <div className="space-y-6 lg:col-span-2">
          {/* Basic Info */}
          <motion.div {...fadeUp} transition={{ delay: 0.1 }}>
            <Card className="border-border/50">
              <CardHeader className="pb-3">
                <CardTitle className="text-base">交易信息</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 gap-4 sm:grid-cols-3">
                  {[
                    { label: "金额", value: `${txn.amount.toLocaleString()} ${txn.currency}` },
                    { label: "年化利率", value: `${txn.interestRate}%`, cls: "text-emerald-400" },
                    { label: "期限", value: `${txn.term}天` },
                    { label: "还款方式", value: txn.repaymentMethod },
                    { label: "创建日期", value: txn.createdAt },
                    { label: "到期日", value: txn.expiresAt },
                  ].map((item) => (
                    <div key={item.label} className="rounded-lg bg-secondary/30 p-3">
                      <div className="text-xs text-muted-foreground">{item.label}</div>
                      <div className={`mt-1 font-medium ${item.cls || ""}`}>{item.value}</div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </motion.div>

          {/* Repayment Timeline */}
          <motion.div {...fadeUp} transition={{ delay: 0.2 }}>
            <Card className="border-border/50">
              <CardHeader className="pb-3">
                <CardTitle className="text-base">还款时间线</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="relative">
                  {txn.repayments.map((r, i) => (
                    <div key={i} className="relative flex gap-4 pb-8 last:pb-0">
                      {/* Timeline line */}
                      {i < txn.repayments.length - 1 && (
                        <div className="absolute left-[15px] top-8 h-full w-px bg-border" />
                      )}
                      {/* Icon */}
                      <div className="z-10 shrink-0">
                        {r.status === "paid" ? (
                          <div className="flex h-8 w-8 items-center justify-center rounded-full bg-emerald-500/20">
                            <CheckCircle2 className="h-4 w-4 text-emerald-400" />
                          </div>
                        ) : (r.status as string) === "overdue" ? (
                          <div className="flex h-8 w-8 items-center justify-center rounded-full bg-red-500/20">
                            <AlertCircle className="h-4 w-4 text-red-400" />
                          </div>
                        ) : (
                          <div className="flex h-8 w-8 items-center justify-center rounded-full bg-amber-500/20">
                            <Clock className="h-4 w-4 text-amber-400" />
                          </div>
                        )}
                      </div>
                      {/* Content */}
                      <div className="flex-1 rounded-lg border border-border/30 bg-secondary/20 p-4">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-2">
                            <span className="font-medium">第 {r.number} 期</span>
                            <Badge
                              variant={r.status === "paid" ? "secondary" : (r.status as string) === "overdue" ? "destructive" : "outline"}
                              className="text-xs"
                            >
                              {r.status === "paid" ? "✅ 已还" : (r.status as string) === "overdue" ? "🔴 逾期" : "⏳ 待还"}
                            </Badge>
                          </div>
                          <span className="text-lg font-bold">${r.total.toLocaleString()}</span>
                        </div>
                        <div className="mt-2 flex flex-wrap gap-4 text-xs text-muted-foreground">
                          <span>到期日: {r.dueDate}</span>
                          <span>本金: ${r.principal.toLocaleString()}</span>
                          <span>利息: ${r.interest.toLocaleString()}</span>
                          {r.paidAt && <span className="text-emerald-400">还款日: {r.paidAt}</span>}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </motion.div>

          {/* Fund Flow Diagram */}
          <motion.div {...fadeUp} transition={{ delay: 0.3 }}>
            <Card className="border-border/50">
              <CardHeader className="pb-3">
                <CardTitle className="text-base">资金流向</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex items-center justify-between overflow-x-auto py-4">
                  {[
                    { icon: Wallet, label: "出借方钱包", sub: "L-****8832", color: "text-emerald-400", bg: "bg-emerald-500/10" },
                    { icon: Shield, label: "智能合约", sub: "托管", color: "text-violet-400", bg: "bg-violet-500/10" },
                    { icon: CreditCard, label: "借款方钱包", sub: txn.counterparty.name, color: "text-cyan-400", bg: "bg-cyan-500/10" },
                    { icon: ArrowRight, label: "还款路由", sub: "自动扣款", color: "text-amber-400", bg: "bg-amber-500/10" },
                  ].map((node, i) => (
                    <div key={i} className="flex items-center">
                      <div className="flex flex-col items-center text-center">
                        <div className={`flex h-14 w-14 items-center justify-center rounded-xl ${node.bg} ${node.color}`}>
                          <node.icon className="h-6 w-6" />
                        </div>
                        <span className="mt-2 text-xs font-medium">{node.label}</span>
                        <span className="text-xs text-muted-foreground">{node.sub}</span>
                      </div>
                      {i < 3 && (
                        <div className="mx-3 flex items-center text-muted-foreground/30">
                          <div className="h-px w-8 bg-border sm:w-12" />
                          <ArrowRight className="h-3 w-3" />
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </div>

        {/* Right: Counterparty */}
        <div className="space-y-6">
          <motion.div {...fadeUp} transition={{ delay: 0.15 }}>
            <Card className="border-border/50">
              <CardHeader className="pb-3">
                <CardTitle className="text-base">对手方信息</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center gap-3">
                  <div className="flex h-12 w-12 items-center justify-center rounded-full bg-cyan-500/20">
                    <User className="h-6 w-6 text-cyan-400" />
                  </div>
                  <div>
                    <div className="font-medium">{txn.counterparty.name}</div>
                    <div className="text-xs text-muted-foreground">ID: {txn.counterparty.id}</div>
                  </div>
                </div>
                <Separator />
                <div className="space-y-3 text-sm">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">信用评分</span>
                    <span className="font-medium text-emerald-400">{txn.counterparty.creditScore}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">历史交易数</span>
                    <span className="font-medium">{txn.counterparty.totalTransactions}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">逾期率</span>
                    <span className="font-medium">{txn.counterparty.overdueRate}%</span>
                  </div>
                </div>
                <Link href={`/profile/${txn.counterparty.id}`}>
                  <Button variant="outline" className="w-full gap-2 border-border/50 text-xs" size="sm">
                    查看完整画像 <ExternalLink className="h-3 w-3" />
                  </Button>
                </Link>
              </CardContent>
            </Card>
          </motion.div>

          <motion.div {...fadeUp} transition={{ delay: 0.25 }}>
            <Card className="border-border/50 bg-gradient-to-br from-emerald-500/5 to-transparent">
              <CardContent className="p-5 text-center">
                <div className="mb-2 text-sm text-muted-foreground">下次还款</div>
                <div className="text-2xl font-bold">$5,550</div>
                <div className="text-xs text-muted-foreground">2025-01-13</div>
                <Button className="mt-4 w-full gap-2 bg-emerald-600 hover:bg-emerald-700" size="sm">
                  立即还款
                </Button>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </div>
    </div>
  )
}
