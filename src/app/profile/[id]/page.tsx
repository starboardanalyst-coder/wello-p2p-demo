"use client"

import { motion } from "framer-motion"
import dynamic from "next/dynamic"
import {
  Building2, MapPin, Factory, Calendar,
  CheckCircle2, XCircle, FileText, BarChart3,
  Star, Shield,
} from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { borrowerProfile } from "@/data/mock"

const CashFlowChart = dynamic(() => import("@/components/charts/CashFlowChart"), { ssr: false })

const fadeUp = { initial: { opacity: 0, y: 20 }, animate: { opacity: 1, y: 0 } }

export default function ProfilePage() {
  const p = borrowerProfile
  const overallScore = p.creditScoreBreakdown.reduce((s, c) => s + (c.score * c.weight) / 100, 0)

  return (
    <div className="mx-auto max-w-5xl px-4 py-8 sm:px-6">
      {/* Header */}
      <motion.div {...fadeUp} className="mb-8">
        <div className="flex items-center gap-4">
          <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br from-cyan-500/20 to-violet-500/20">
            <Building2 className="h-8 w-8 text-cyan-400" />
          </div>
          <div>
            <h1 className="text-2xl font-bold">{p.companyName}</h1>
            <div className="mt-1 flex flex-wrap items-center gap-3 text-sm text-muted-foreground">
              <span className="flex items-center gap-1"><MapPin className="h-3.5 w-3.5" /> {p.country}</span>
              <span className="flex items-center gap-1"><Factory className="h-3.5 w-3.5" /> {p.industry}</span>
              <span className="flex items-center gap-1"><Calendar className="h-3.5 w-3.5" /> 成立于 {p.foundedYear}</span>
            </div>
          </div>
        </div>
      </motion.div>

      <div className="grid gap-6 lg:grid-cols-3">
        <div className="space-y-6 lg:col-span-2">
          {/* Company Info */}
          <motion.div {...fadeUp} transition={{ delay: 0.1 }}>
            <Card className="border-border/50">
              <CardHeader className="pb-3">
                <CardTitle className="text-base">公司基本信息</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 gap-4 sm:grid-cols-3">
                  {[
                    { label: "注册号", value: p.registrationNumber },
                    { label: "行业", value: p.industry },
                    { label: "规模", value: p.businessScale },
                    { label: "员工数", value: `${p.employees} 人` },
                    { label: "成立年份", value: `${p.foundedYear}` },
                    { label: "注册地", value: p.country },
                  ].map((item) => (
                    <div key={item.label} className="rounded-lg bg-secondary/30 p-3">
                      <div className="text-xs text-muted-foreground">{item.label}</div>
                      <div className="mt-1 text-sm font-medium">{item.value}</div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </motion.div>

          {/* KYB Status */}
          <motion.div {...fadeUp} transition={{ delay: 0.15 }}>
            <Card className="border-border/50">
              <CardHeader className="pb-3">
                <div className="flex items-center gap-2">
                  <Shield className="h-4 w-4 text-emerald-400" />
                  <CardTitle className="text-base">KYB 验证状态</CardTitle>
                </div>
              </CardHeader>
              <CardContent>
                <div className="grid gap-2 sm:grid-cols-2">
                  {p.kybStatus.map((item) => (
                    <div key={item.item} className="flex items-center gap-3 rounded-lg border border-border/30 p-3">
                      {item.verified ? (
                        <CheckCircle2 className="h-5 w-5 shrink-0 text-emerald-400" />
                      ) : (
                        <XCircle className="h-5 w-5 shrink-0 text-muted-foreground" />
                      )}
                      <span className="text-sm">{item.item}</span>
                      <Badge
                        variant={item.verified ? "secondary" : "outline"}
                        className={`ml-auto text-xs ${item.verified ? "text-emerald-400" : ""}`}
                      >
                        {item.verified ? "已验证" : "未完成"}
                      </Badge>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </motion.div>

          {/* Fund Usage */}
          <motion.div {...fadeUp} transition={{ delay: 0.2 }}>
            <Card className="border-border/50">
              <CardHeader className="pb-3">
                <div className="flex items-center gap-2">
                  <FileText className="h-4 w-4 text-amber-400" />
                  <CardTitle className="text-base">资金用途声明</CardTitle>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground leading-relaxed">{p.fundUsage}</p>
              </CardContent>
            </Card>
          </motion.div>

          {/* Cash Flow Chart */}
          <motion.div {...fadeUp} transition={{ delay: 0.25 }}>
            <Card className="border-border/50">
              <CardHeader className="pb-3">
                <div className="flex items-center gap-2">
                  <BarChart3 className="h-4 w-4 text-cyan-400" />
                  <CardTitle className="text-base">月均资金流</CardTitle>
                </div>
              </CardHeader>
              <CardContent>
                <CashFlowChart />
              </CardContent>
            </Card>
          </motion.div>
        </div>

        {/* Right sidebar */}
        <div className="space-y-6">
          {/* Trading History */}
          <motion.div {...fadeUp} transition={{ delay: 0.1 }}>
            <Card className="border-border/50">
              <CardHeader className="pb-3">
                <CardTitle className="text-base">平台交易历史</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                {[
                  { label: "总借款次数", value: `${p.totalLoans} 笔` },
                  { label: "总借款金额", value: `$${p.totalAmount.toLocaleString()}` },
                  { label: "按时还款率", value: `${p.onTimeRate}%`, cls: "text-emerald-400" },
                  { label: "平均借款期限", value: `${p.avgTerm} 天` },
                ].map((item) => (
                  <div key={item.label} className="flex items-center justify-between text-sm">
                    <span className="text-muted-foreground">{item.label}</span>
                    <span className={`font-medium ${item.cls || ""}`}>{item.value}</span>
                  </div>
                ))}
              </CardContent>
            </Card>
          </motion.div>

          {/* Credit Score Breakdown */}
          <motion.div {...fadeUp} transition={{ delay: 0.2 }}>
            <Card className="border-border/50">
              <CardHeader className="pb-3">
                <div className="flex items-center gap-2">
                  <Star className="h-4 w-4 text-amber-400" />
                  <CardTitle className="text-base">信用评分详情</CardTitle>
                </div>
              </CardHeader>
              <CardContent>
                <div className="mb-4 text-center">
                  <div className="text-3xl font-bold text-emerald-400">{overallScore.toFixed(0)}</div>
                  <div className="text-xs text-muted-foreground">综合评分</div>
                </div>
                <div className="space-y-3">
                  {p.creditScoreBreakdown.map((item) => (
                    <div key={item.category}>
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

          {/* Operational */}
          <motion.div {...fadeUp} transition={{ delay: 0.3 }}>
            <Card className="border-border/50">
              <CardHeader className="pb-3">
                <CardTitle className="text-base">运营数据摘要</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3 text-sm">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">月均资金流</span>
                  <span className="font-medium">
                    ${(p.monthlyCashFlow.reduce((a, b) => a + b, 0) / 12).toLocaleString(undefined, { maximumFractionDigits: 0 })}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">业务规模</span>
                  <span className="font-medium">{p.businessScale}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">员工人数</span>
                  <span className="font-medium">{p.employees}</span>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </div>
    </div>
  )
}
