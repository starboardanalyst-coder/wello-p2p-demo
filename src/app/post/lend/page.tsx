"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { motion } from "framer-motion"
import {
  DollarSign, Percent, Clock, CreditCard,
  Shield, ChevronDown, ChevronUp, Loader2, Sparkles,
} from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Slider } from "@/components/ui/slider"
const terms = [7, 14, 30, 60, 90, 180, 365]
const repayMethods = [
  { value: "bullet", label: "到期还本付息" },
  { value: "equal_installment", label: "等额本息" },
  { value: "interest_first", label: "先息后本" },
  { value: "equal_principal", label: "等额本金" },
]
const currencies = ["USDT", "USDC", "NGN", "USD"]

export default function PostLend() {
  const router = useRouter()
  const [amount, setAmount] = useState("")
  const [currency, setCurrency] = useState("USDT")
  const [rate, setRate] = useState([18])
  const [selectedTerm, setSelectedTerm] = useState(60)
  const [repayMethod, setRepayMethod] = useState("equal_installment")
  const [collateral, setCollateral] = useState(false)
  const [collateralRate, setCollateralRate] = useState([120])
  const [advancedOpen, setAdvancedOpen] = useState(false)
  const [minCredit, setMinCredit] = useState("")
  const [minTxns, setMinTxns] = useState("")
  const [note, setNote] = useState("")
  const [submitting, setSubmitting] = useState(false)

  const handleSubmit = () => {
    setSubmitting(true)
    setTimeout(() => {
      router.push("/match/results")
    }, 2000)
  }

  return (
    <div className="mx-auto max-w-3xl px-4 py-8 sm:px-6">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
        <div className="mb-8">
          <h1 className="text-2xl font-bold sm:text-3xl">发布出借需求</h1>
          <p className="mt-1 text-muted-foreground">设置您的出借条件，AI Agent 将为您匹配最优借款方</p>
        </div>

        <div className="space-y-6">
          {/* Amount + Currency */}
          <Card className="border-border/50">
            <CardHeader className="pb-3">
              <div className="flex items-center gap-2">
                <DollarSign className="h-4 w-4 text-emerald-400" />
                <CardTitle className="text-base">出借金额</CardTitle>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex gap-3">
                <Input
                  type="number"
                  placeholder="输入金额"
                  value={amount}
                  onChange={(e) => setAmount(e.target.value)}
                  className="flex-1 text-lg"
                />
                <div className="flex gap-1">
                  {currencies.map((c) => (
                    <Button
                      key={c}
                      variant={currency === c ? "default" : "outline"}
                      size="sm"
                      onClick={() => setCurrency(c)}
                      className={currency === c ? "bg-emerald-600 hover:bg-emerald-700" : "border-border/50"}
                    >
                      {c}
                    </Button>
                  ))}
                </div>
              </div>
              <div className="text-xs text-muted-foreground">可用余额: 45,000 USDT · 32,000 USDC</div>
            </CardContent>
          </Card>

          {/* Interest Rate */}
          <Card className="border-border/50">
            <CardHeader className="pb-3">
              <div className="flex items-center gap-2">
                <Percent className="h-4 w-4 text-cyan-400" />
                <CardTitle className="text-base">年化利率</CardTitle>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center gap-4">
                <Slider value={rate} onValueChange={setRate} min={5} max={50} step={0.5} className="flex-1" />
                <div className="flex items-center gap-1 rounded-lg border border-border/50 px-3 py-1.5">
                  <span className="text-lg font-bold text-emerald-400">{rate[0]}%</span>
                </div>
              </div>
              <div className="flex items-center justify-between text-xs text-muted-foreground">
                <span>5%</span>
                <span>市场参考: 15%-25%</span>
                <span>50%</span>
              </div>
            </CardContent>
          </Card>

          {/* Term */}
          <Card className="border-border/50">
            <CardHeader className="pb-3">
              <div className="flex items-center gap-2">
                <Clock className="h-4 w-4 text-violet-400" />
                <CardTitle className="text-base">借贷期限</CardTitle>
              </div>
            </CardHeader>
            <CardContent>
              <div className="flex flex-wrap gap-2">
                {terms.map((t) => (
                  <Button
                    key={t}
                    variant={selectedTerm === t ? "default" : "outline"}
                    size="sm"
                    onClick={() => setSelectedTerm(t)}
                    className={selectedTerm === t ? "bg-emerald-600 hover:bg-emerald-700" : "border-border/50"}
                  >
                    {t}天
                  </Button>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Repayment Method */}
          <Card className="border-border/50">
            <CardHeader className="pb-3">
              <div className="flex items-center gap-2">
                <CreditCard className="h-4 w-4 text-amber-400" />
                <CardTitle className="text-base">还款方式</CardTitle>
              </div>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 gap-2">
                {repayMethods.map((m) => (
                  <Button
                    key={m.value}
                    variant={repayMethod === m.value ? "default" : "outline"}
                    size="sm"
                    onClick={() => setRepayMethod(m.value)}
                    className={`justify-start ${repayMethod === m.value ? "bg-emerald-600 hover:bg-emerald-700" : "border-border/50"}`}
                  >
                    {m.label}
                  </Button>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Collateral */}
          <Card className="border-border/50">
            <CardHeader className="pb-3">
              <div className="flex items-center gap-2">
                <Shield className="h-4 w-4 text-red-400" />
                <CardTitle className="text-base">抵押要求</CardTitle>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center gap-3">
                <button
                  onClick={() => setCollateral(!collateral)}
                  className={`relative h-6 w-11 rounded-full transition-colors ${collateral ? "bg-emerald-600" : "bg-secondary"}`}
                >
                  <span className={`absolute top-0.5 h-5 w-5 rounded-full bg-white shadow transition-transform ${collateral ? "translate-x-5" : "translate-x-0.5"}`} />
                </button>
                <span className="text-sm">{collateral ? "要求质押" : "不要求质押"}</span>
              </div>
              {collateral && (
                <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: "auto" }}>
                  <div className="flex items-center gap-4">
                    <span className="text-sm text-muted-foreground">质押率</span>
                    <Slider value={collateralRate} onValueChange={setCollateralRate} min={100} max={300} step={10} className="flex-1" />
                    <span className="font-bold text-emerald-400">{collateralRate[0]}%</span>
                  </div>
                </motion.div>
              )}
            </CardContent>
          </Card>

          {/* Advanced Options */}
          <Card className="border-border/50">
            <div
              className="flex cursor-pointer items-center justify-between p-5"
              onClick={() => setAdvancedOpen(!advancedOpen)}
            >
              <span className="font-medium">对手方要求（高级选项）</span>
              {advancedOpen ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
            </div>
            {advancedOpen && (
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
                <CardContent className="space-y-4 pt-0">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="mb-1 block text-xs text-muted-foreground">最低信用评分</label>
                      <Input type="number" placeholder="例如: 70" value={minCredit} onChange={(e) => setMinCredit(e.target.value)} />
                    </div>
                    <div>
                      <label className="mb-1 block text-xs text-muted-foreground">最少交易次数</label>
                      <Input type="number" placeholder="例如: 3" value={minTxns} onChange={(e) => setMinTxns(e.target.value)} />
                    </div>
                  </div>
                  <div>
                    <label className="mb-1 block text-xs text-muted-foreground">行业偏好</label>
                    <div className="flex flex-wrap gap-2">
                      {["跨境贸易", "物流运输", "新能源", "农业", "制造业", "科技"].map((tag) => (
                        <Badge key={tag} variant="outline" className="cursor-pointer border-border/50 hover:bg-secondary">
                          {tag}
                        </Badge>
                      ))}
                    </div>
                  </div>
                </CardContent>
              </motion.div>
            )}
          </Card>

          {/* Note */}
          <Card className="border-border/50">
            <CardContent className="p-5">
              <label className="mb-2 block text-sm font-medium">备注</label>
              <textarea
                className="w-full rounded-lg border border-border/50 bg-background p-3 text-sm placeholder:text-muted-foreground focus:outline-none focus:ring-1 focus:ring-ring"
                rows={3}
                placeholder="补充说明..."
                value={note}
                onChange={(e) => setNote(e.target.value)}
              />
            </CardContent>
          </Card>

          {/* Summary + Submit */}
          <Card className="border-emerald-500/20 bg-gradient-to-br from-emerald-500/5 to-transparent">
            <CardContent className="p-5">
              <h3 className="mb-3 font-medium">订单摘要</h3>
              <div className="mb-4 grid grid-cols-2 gap-2 text-sm">
                <span className="text-muted-foreground">金额:</span>
                <span className="font-medium">{amount || "—"} {currency}</span>
                <span className="text-muted-foreground">利率:</span>
                <span className="font-medium text-emerald-400">{rate[0]}%</span>
                <span className="text-muted-foreground">期限:</span>
                <span className="font-medium">{selectedTerm}天</span>
                <span className="text-muted-foreground">还款方式:</span>
                <span className="font-medium">{repayMethods.find(m => m.value === repayMethod)?.label}</span>
                <span className="text-muted-foreground">质押:</span>
                <span className="font-medium">{collateral ? `是 (${collateralRate[0]}%)` : "否"}</span>
              </div>
              <Button
                className="w-full gap-2 bg-emerald-600 hover:bg-emerald-700"
                size="lg"
                onClick={handleSubmit}
                disabled={!amount || submitting}
              >
                {submitting ? (
                  <>
                    <Loader2 className="h-4 w-4 animate-spin" />
                    <Sparkles className="h-4 w-4" />
                    Agent 正在匹配...
                  </>
                ) : (
                  <>提交出借需求</>
                )}
              </Button>
            </CardContent>
          </Card>
        </div>
      </motion.div>
    </div>
  )
}
