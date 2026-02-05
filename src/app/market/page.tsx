"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import Link from "next/link"
import {
  Store, Clock, RefreshCw,
  Zap, TrendingUp, DollarSign, Users,
} from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { marketOrders } from "@/data/mock"

const repayMethodMap: Record<string, string> = {
  bullet: "到期还本付息",
  equal_installment: "等额本息",
  interest_first: "先息后本",
  equal_principal: "等额本金",
}

export default function MarketPage() {
  const [tab, setTab] = useState<"lend" | "borrow">("lend")
  const [countdown, setCountdown] = useState(600)

  useEffect(() => {
    const timer = setInterval(() => {
      setCountdown((c) => (c <= 1 ? 600 : c - 1))
    }, 1000)
    return () => clearInterval(timer)
  }, [])

  const filteredOrders = marketOrders.filter((o) => o.type === tab)
  const lendCount = marketOrders.filter((o) => o.type === "lend").length
  const borrowCount = marketOrders.filter((o) => o.type === "borrow").length
  const avgRate = marketOrders.reduce((s, o) => s + o.interestRate, 0) / marketOrders.length

  const formatTime = (s: number) => `${Math.floor(s / 60)}:${String(s % 60).padStart(2, "0")}`

  return (
    <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
        {/* Header */}
        <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h1 className="text-2xl font-bold sm:text-3xl">挂单市场</h1>
            <p className="mt-1 text-muted-foreground">浏览所有公开挂单，寻找最优匹配</p>
          </div>
          <div className="flex items-center gap-2 rounded-lg border border-border/50 bg-secondary/30 px-3 py-1.5 text-xs text-muted-foreground">
            <RefreshCw className="h-3 w-3 animate-spin text-emerald-400" style={{ animationDuration: "3s" }} />
            下次刷新: {formatTime(countdown)}
          </div>
        </div>

        {/* Market Overview */}
        <div className="mb-6 grid gap-4 sm:grid-cols-3">
          <Card className="border-border/50">
            <CardContent className="flex items-center gap-4 p-4">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-emerald-500/10 text-emerald-400">
                <Store className="h-5 w-5" />
              </div>
              <div>
                <div className="text-xl font-bold">{marketOrders.length}</div>
                <div className="text-xs text-muted-foreground">当前挂单总数</div>
              </div>
            </CardContent>
          </Card>
          <Card className="border-border/50">
            <CardContent className="flex items-center gap-4 p-4">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-cyan-500/10 text-cyan-400">
                <TrendingUp className="h-5 w-5" />
              </div>
              <div>
                <div className="text-xl font-bold">{avgRate.toFixed(1)}%</div>
                <div className="text-xs text-muted-foreground">平均利率</div>
              </div>
            </CardContent>
          </Card>
          <Card className="border-border/50">
            <CardContent className="flex items-center gap-4 p-4">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-violet-500/10 text-violet-400">
                <Clock className="h-5 w-5" />
              </div>
              <div>
                <div className="text-xl font-bold">60天</div>
                <div className="text-xs text-muted-foreground">最活跃期限</div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Tabs */}
        <div className="mb-6 flex gap-2">
          <Button
            variant={tab === "lend" ? "default" : "outline"}
            onClick={() => setTab("lend")}
            className={`gap-2 ${tab === "lend" ? "bg-emerald-600 hover:bg-emerald-700" : "border-border/50"}`}
          >
            <DollarSign className="h-4 w-4" />
            出借挂单
            <Badge variant="secondary" className="ml-1 text-xs">{lendCount}</Badge>
          </Button>
          <Button
            variant={tab === "borrow" ? "default" : "outline"}
            onClick={() => setTab("borrow")}
            className={`gap-2 ${tab === "borrow" ? "bg-cyan-600 hover:bg-cyan-700" : "border-border/50"}`}
          >
            <Users className="h-4 w-4" />
            借款挂单
            <Badge variant="secondary" className="ml-1 text-xs">{borrowCount}</Badge>
          </Button>
        </div>

        {/* Order Table */}
        <Card className="border-border/50">
          <CardContent className="p-0">
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-border/50 text-xs text-muted-foreground">
                    <th className="px-4 py-3 text-left font-medium">ID</th>
                    <th className="px-4 py-3 text-right font-medium">金额</th>
                    <th className="px-4 py-3 text-right font-medium">
                      {tab === "lend" ? "利率" : "最高利率"}
                    </th>
                    <th className="px-4 py-3 text-right font-medium">期限</th>
                    <th className="px-4 py-3 text-left font-medium">还款方式</th>
                    <th className="px-4 py-3 text-center font-medium">质押</th>
                    {tab === "lend" && <th className="px-4 py-3 text-center font-medium">最低信用分</th>}
                    {tab === "borrow" && <th className="px-4 py-3 text-left font-medium">借款方</th>}
                    <th className="px-4 py-3 text-left font-medium">发布时间</th>
                    <th className="px-4 py-3 text-center font-medium">操作</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredOrders.map((order, i) => (
                    <motion.tr
                      key={order.id}
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: i * 0.05 }}
                      className="border-b border-border/30 hover:bg-secondary/30"
                    >
                      <td className="px-4 py-3 font-mono text-xs">{order.id}</td>
                      <td className="px-4 py-3 text-right font-medium">
                        {order.amount.toLocaleString()} <span className="text-xs text-muted-foreground">{order.currency}</span>
                      </td>
                      <td className={`px-4 py-3 text-right font-medium ${tab === "lend" ? "text-emerald-400" : "text-amber-400"}`}>
                        {order.interestRate}%
                      </td>
                      <td className="px-4 py-3 text-right">{order.term}天</td>
                      <td className="px-4 py-3 text-xs">{repayMethodMap[order.repaymentMethod]}</td>
                      <td className="px-4 py-3 text-center">
                        {order.collateralRequired ? (
                          <Badge className="bg-emerald-500/20 text-emerald-400 text-xs">{order.collateralRate}%</Badge>
                        ) : (
                          <span className="text-xs text-muted-foreground">无</span>
                        )}
                      </td>
                      {tab === "lend" && (
                        <td className="px-4 py-3 text-center">
                          {order.minCreditScore ? (
                            <Badge variant="outline" className="text-xs">{order.minCreditScore}+</Badge>
                          ) : (
                            <span className="text-xs text-muted-foreground">—</span>
                          )}
                        </td>
                      )}
                      {tab === "borrow" && (
                        <td className="px-4 py-3 text-xs">{order.counterpartyName || "—"}</td>
                      )}
                      <td className="px-4 py-3 text-xs text-muted-foreground">
                        {new Date(order.createdAt).toLocaleDateString("zh-CN", { month: "short", day: "numeric", hour: "2-digit", minute: "2-digit" })}
                      </td>
                      <td className="px-4 py-3 text-center">
                        <div className="flex items-center justify-center gap-1">
                          <Link href="/match/results">
                            <Button size="sm" className="h-7 gap-1 bg-emerald-600 text-xs hover:bg-emerald-700">
                              <Zap className="h-3 w-3" /> 匹配
                            </Button>
                          </Link>
                        </div>
                      </td>
                    </motion.tr>
                  ))}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  )
}
