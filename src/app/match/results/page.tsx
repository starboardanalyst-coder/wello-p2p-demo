"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import Link from "next/link"
import {
  Sparkles, CheckCircle2, XCircle, Edit3,
  ChevronDown,
  Brain, User,
} from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Separator } from "@/components/ui/separator"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog"
import { matchResults } from "@/data/mock"

export default function MatchResultsPage() {
  const [phase, setPhase] = useState<"loading" | "results">("loading")
  const [loadProgress, setLoadProgress] = useState(0)
  const [confirmOpen, setConfirmOpen] = useState(false)
  const [confirmed, setConfirmed] = useState(false)
  const [expandExplain, setExpandExplain] = useState(false)

  useEffect(() => {
    const timer = setInterval(() => {
      setLoadProgress((p) => {
        if (p >= 100) {
          clearInterval(timer)
          setTimeout(() => setPhase("results"), 300)
          return 100
        }
        return p + 2
      })
    }, 50)
    return () => clearInterval(timer)
  }, [])

  const topMatch = matchResults[0]
  const otherMatches = matchResults.slice(1)

  const handleAccept = () => {
    setConfirmed(true)
    setTimeout(() => setConfirmOpen(false), 1500)
  }

  if (phase === "loading") {
    return (
      <div className="flex min-h-[70vh] flex-col items-center justify-center px-4">
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          className="text-center"
        >
          <div className="mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-gradient-to-br from-emerald-500/20 to-cyan-500/20">
            <motion.div animate={{ rotate: 360 }} transition={{ duration: 2, repeat: Infinity, ease: "linear" }}>
              <Brain className="h-10 w-10 text-emerald-400" />
            </motion.div>
          </div>
          <h2 className="mb-2 text-xl font-bold">AI Agent 正在分析...</h2>
          <p className="mb-6 text-sm text-muted-foreground">
            {loadProgress < 30 && "扫描市场挂单..."}
            {loadProgress >= 30 && loadProgress < 60 && "评估信用风险..."}
            {loadProgress >= 60 && loadProgress < 85 && "计算匹配得分..."}
            {loadProgress >= 85 && "生成推荐结果..."}
          </p>
          <div className="mx-auto w-64">
            <Progress value={loadProgress} className="h-2" />
          </div>
          <p className="mt-2 text-xs text-muted-foreground">{loadProgress}%</p>
        </motion.div>
      </div>
    )
  }

  return (
    <div className="mx-auto max-w-5xl px-4 py-8 sm:px-6">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
        <div className="mb-8 text-center">
          <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-emerald-500/20">
            <Sparkles className="h-7 w-7 text-emerald-400" />
          </div>
          <h1 className="text-2xl font-bold sm:text-3xl">匹配结果</h1>
          <p className="mt-1 text-muted-foreground">AI Agent 为您找到 {matchResults.length} 个匹配方案</p>
        </div>

        {/* Top Match */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.2 }}
          className="mb-8"
        >
          <Card className="relative overflow-hidden border-emerald-500/30 bg-gradient-to-br from-emerald-500/10 to-transparent glow-green">
            <div className="absolute right-4 top-4">
              <Badge className="bg-emerald-500 text-white">🏆 最佳匹配</Badge>
            </div>
            <CardContent className="p-6 sm:p-8">
              <div className="grid gap-6 sm:grid-cols-2">
                <div>
                  <div className="mb-4 flex items-center gap-3">
                    <div className="flex h-12 w-12 items-center justify-center rounded-full bg-emerald-500/20">
                      <User className="h-6 w-6 text-emerald-400" />
                    </div>
                    <div>
                      <h3 className="text-lg font-bold">{topMatch.counterpartyName}</h3>
                      <Link href={`/profile/${topMatch.counterpartyId}`}>
                        <span className="text-xs text-emerald-400 hover:underline">查看画像 →</span>
                      </Link>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-3 text-sm">
                    <div className="rounded-lg bg-secondary/30 p-3">
                      <span className="text-xs text-muted-foreground">金额</span>
                      <div className="font-bold">{topMatch.amount.toLocaleString()} {topMatch.currency}</div>
                    </div>
                    <div className="rounded-lg bg-secondary/30 p-3">
                      <span className="text-xs text-muted-foreground">利率</span>
                      <div className="font-bold text-emerald-400">{topMatch.interestRate}%</div>
                    </div>
                    <div className="rounded-lg bg-secondary/30 p-3">
                      <span className="text-xs text-muted-foreground">期限</span>
                      <div className="font-bold">{topMatch.term}天</div>
                    </div>
                    <div className="rounded-lg bg-secondary/30 p-3">
                      <span className="text-xs text-muted-foreground">信用评分</span>
                      <div className="font-bold text-cyan-400">{topMatch.creditScore}</div>
                    </div>
                  </div>
                </div>

                <div className="flex flex-col items-center justify-center">
                  <div className="relative mb-4">
                    <svg width="140" height="140" viewBox="0 0 140 140">
                      <circle cx="70" cy="70" r="60" fill="none" stroke="hsl(217 33% 17%)" strokeWidth="8" />
                      <motion.circle
                        cx="70"
                        cy="70"
                        r="60"
                        fill="none"
                        stroke="#22c55e"
                        strokeWidth="8"
                        strokeLinecap="round"
                        strokeDasharray={`${2 * Math.PI * 60}`}
                        strokeDashoffset={`${2 * Math.PI * 60 * (1 - topMatch.matchScore / 100)}`}
                        transform="rotate(-90 70 70)"
                        initial={{ strokeDashoffset: 2 * Math.PI * 60 }}
                        animate={{ strokeDashoffset: 2 * Math.PI * 60 * (1 - topMatch.matchScore / 100) }}
                        transition={{ duration: 1.5, delay: 0.5, ease: "easeOut" }}
                      />
                    </svg>
                    <div className="absolute inset-0 flex flex-col items-center justify-center">
                      <span className="text-3xl font-bold text-emerald-400">{topMatch.matchScore}%</span>
                      <span className="text-xs text-muted-foreground">匹配度</span>
                    </div>
                  </div>

                  <div className="space-y-1.5">
                    {topMatch.highlights.map((h, i) => (
                      <div key={i} className="flex items-center gap-2 text-xs text-muted-foreground">
                        <CheckCircle2 className="h-3 w-3 text-emerald-400 shrink-0" />
                        {h}
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              <Separator className="my-6" />

              <div className="flex flex-col gap-3 sm:flex-row">
                <Button
                  className="flex-1 gap-2 bg-emerald-600 hover:bg-emerald-700"
                  size="lg"
                  onClick={() => setConfirmOpen(true)}
                >
                  <CheckCircle2 className="h-4 w-4" /> 接受匹配
                </Button>
                <Link href="/market" className="flex-1">
                  <Button variant="outline" className="w-full gap-2 border-border/50" size="lg">
                    <XCircle className="h-4 w-4" /> 拒绝，转为挂单
                  </Button>
                </Link>
                <Link href="/post/lend" className="flex-1">
                  <Button variant="outline" className="w-full gap-2 border-border/50" size="lg">
                    <Edit3 className="h-4 w-4" /> 修改条件
                  </Button>
                </Link>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Other Matches */}
        <div className="mb-8">
          <h2 className="mb-4 text-lg font-bold">其他匹配方案</h2>
          <div className="grid gap-4 sm:grid-cols-3">
            {otherMatches.map((match, i) => (
              <motion.div
                key={match.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 + i * 0.1 }}
              >
                <Card className="border-border/50 hover:border-border transition-all">
                  <CardContent className="p-5">
                    <div className="mb-3 flex items-center justify-between">
                      <span className="font-medium">{match.counterpartyName}</span>
                      <Badge variant="outline" className="text-xs">
                        {match.matchScore}%
                      </Badge>
                    </div>
                    <div className="mb-3 grid grid-cols-2 gap-2 text-xs">
                      <span className="text-muted-foreground">金额: <span className="text-foreground font-medium">{match.amount.toLocaleString()}</span></span>
                      <span className="text-muted-foreground">利率: <span className="text-emerald-400 font-medium">{match.interestRate}%</span></span>
                      <span className="text-muted-foreground">期限: <span className="text-foreground font-medium">{match.term}天</span></span>
                      <span className="text-muted-foreground">信用: <span className="text-foreground font-medium">{match.creditScore}分</span></span>
                    </div>
                    {match.differences.length > 0 && (
                      <div className="mb-3 space-y-1">
                        {match.differences.map((d, j) => (
                          <div key={j} className="flex items-center gap-1 text-xs text-amber-400">
                            <span>⚠</span> {d}
                          </div>
                        ))}
                      </div>
                    )}
                    <Button size="sm" variant="outline" className="w-full border-border/50 text-xs">
                      查看详情
                    </Button>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Explanation */}
        <Card className="border-border/50">
          <div
            className="flex cursor-pointer items-center justify-between p-5"
            onClick={() => setExpandExplain(!expandExplain)}
          >
            <div className="flex items-center gap-2">
              <Brain className="h-4 w-4 text-violet-400" />
              <span className="font-medium">匹配逻辑说明</span>
            </div>
            <ChevronDown className={`h-4 w-4 transition-transform ${expandExplain ? "rotate-180" : ""}`} />
          </div>
          <AnimatePresence>
            {expandExplain && (
              <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }} exit={{ height: 0, opacity: 0 }}>
                <CardContent className="pt-0 text-sm text-muted-foreground space-y-2">
                  <p>AI Agent 匹配算法综合考虑以下因素：</p>
                  <ul className="list-disc pl-5 space-y-1">
                    <li><strong>信用评分 (30%)</strong> — 借款方的历史信用表现和评分等级</li>
                    <li><strong>条件匹配度 (25%)</strong> — 金额、利率、期限等条件的契合程度</li>
                    <li><strong>还款历史 (20%)</strong> — 历史按时还款率和交易记录</li>
                    <li><strong>行业匹配 (15%)</strong> — 出借方偏好行业与借款方行业的匹配</li>
                    <li><strong>风控评级 (10%)</strong> — 综合风险评估和质押物评估</li>
                  </ul>
                  <p>匹配度分数为各项加权计算后的综合结果，分数越高匹配质量越好。</p>
                </CardContent>
              </motion.div>
            )}
          </AnimatePresence>
        </Card>
      </motion.div>

      {/* Confirm Dialog */}
      <Dialog open={confirmOpen} onOpenChange={setConfirmOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>{confirmed ? "🎉 匹配成功！" : "确认接受匹配"}</DialogTitle>
            <DialogDescription>
              {confirmed
                ? "交易已创建，请在 Dashboard 查看详情。"
                : `您确定接受与 ${topMatch.counterpartyName} 的匹配吗？金额 ${topMatch.amount.toLocaleString()} ${topMatch.currency}，利率 ${topMatch.interestRate}%，期限 ${topMatch.term}天。`
              }
            </DialogDescription>
          </DialogHeader>
          {!confirmed ? (
            <div className="flex gap-3">
              <Button className="flex-1 bg-emerald-600 hover:bg-emerald-700" onClick={handleAccept}>
                确认
              </Button>
              <Button variant="outline" className="flex-1" onClick={() => setConfirmOpen(false)}>
                取消
              </Button>
            </div>
          ) : (
            <Link href="/lender/dashboard">
              <Button className="w-full bg-emerald-600 hover:bg-emerald-700">
                前往 Dashboard →
              </Button>
            </Link>
          )}
        </DialogContent>
      </Dialog>
    </div>
  )
}
