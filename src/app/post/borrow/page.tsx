"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { motion } from "framer-motion"
import {
  DollarSign, Percent, Clock, CreditCard,
  Shield, FileText, Loader2, Sparkles, Upload,
} from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Slider } from "@/components/ui/slider"
import { Progress } from "@/components/ui/progress"

const terms = [7, 14, 30, 60, 90, 180, 365]
const repayMethods = [
  { value: "bullet", label: "到期还本付息" },
  { value: "equal_installment", label: "等额本息" },
  { value: "interest_first", label: "先息后本" },
  { value: "equal_principal", label: "等额本金" },
]
const currencies = ["USDT", "USDC", "NGN", "USD"]
const usageCategories = ["采购原材料", "运营周转", "设备购置", "市场拓展", "应收账款垫资", "其他"]
const collateralTypes = [
  { value: "none", label: "无" },
  { value: "crypto", label: "Crypto 质押" },
  { value: "guarantee", label: "第三方保证金" },
]

export default function PostBorrow() {
  const router = useRouter()
  const [amount, setAmount] = useState("")
  const [currency, setCurrency] = useState("USDT")
  const [maxRate, setMaxRate] = useState([22])
  const [selectedTerm, setSelectedTerm] = useState(60)
  const [repayMethod, setRepayMethod] = useState("equal_installment")
  const [collateralType, setCollateralType] = useState("none")
  const [usageCategory, setUsageCategory] = useState("")
  const [usageDetail, setUsageDetail] = useState("")
  const [submitting, setSubmitting] = useState(false)

  const available = 65000

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
          <h1 className="text-2xl font-bold sm:text-3xl">发布借款需求</h1>
          <p className="mt-1 text-muted-foreground">设置您的借款条件，AI Agent 将为您匹配最优出借方</p>
        </div>

        <div className="space-y-6">
          {/* Amount */}
          <Card className="border-border/50">
            <CardHeader className="pb-3">
              <div className="flex items-center gap-2">
                <DollarSign className="h-4 w-4 text-cyan-400" />
                <CardTitle className="text-base">借款金额</CardTitle>
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
                      className={currency === c ? "bg-cyan-600 hover:bg-cyan-700" : "border-border/50"}
                    >
                      {c}
                    </Button>
                  ))}
                </div>
              </div>
              <div className="flex items-center justify-between text-xs text-muted-foreground">
                <span>可用额度: ${available.toLocaleString()}</span>
                {amount && (
                  <span className={Number(amount) > available ? "text-red-400" : "text-emerald-400"}>
                    {Number(amount) > available ? "超出可用额度" : "额度充足"}
                  </span>
                )}
              </div>
              {amount && (
                <Progress value={Math.min((Number(amount) / available) * 100, 100)} className="h-1.5" />
              )}
            </CardContent>
          </Card>

          {/* Max Rate */}
          <Card className="border-border/50">
            <CardHeader className="pb-3">
              <div className="flex items-center gap-2">
                <Percent className="h-4 w-4 text-amber-400" />
                <CardTitle className="text-base">可接受最高年化利率</CardTitle>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center gap-4">
                <Slider value={maxRate} onValueChange={setMaxRate} min={5} max={60} step={0.5} className="flex-1" />
                <div className="flex items-center gap-1 rounded-lg border border-border/50 px-3 py-1.5">
                  <span className="text-lg font-bold text-amber-400">{maxRate[0]}%</span>
                </div>
              </div>
              <div className="flex items-center justify-between text-xs text-muted-foreground">
                <span>5%</span>
                <span>市场参考: 15%-25%</span>
                <span>60%</span>
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
                    className={selectedTerm === t ? "bg-cyan-600 hover:bg-cyan-700" : "border-border/50"}
                  >
                    {t}天
                  </Button>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Repayment */}
          <Card className="border-border/50">
            <CardHeader className="pb-3">
              <div className="flex items-center gap-2">
                <CreditCard className="h-4 w-4 text-emerald-400" />
                <CardTitle className="text-base">还款方式偏好</CardTitle>
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
                    className={`justify-start ${repayMethod === m.value ? "bg-cyan-600 hover:bg-cyan-700" : "border-border/50"}`}
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
                <Shield className="h-4 w-4 text-violet-400" />
                <CardTitle className="text-base">可提供质押</CardTitle>
              </div>
            </CardHeader>
            <CardContent>
              <div className="flex gap-2">
                {collateralTypes.map((ct) => (
                  <Button
                    key={ct.value}
                    variant={collateralType === ct.value ? "default" : "outline"}
                    size="sm"
                    onClick={() => setCollateralType(ct.value)}
                    className={collateralType === ct.value ? "bg-cyan-600 hover:bg-cyan-700" : "border-border/50"}
                  >
                    {ct.label}
                  </Button>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Fund Usage (Required) */}
          <Card className="border-border/50">
            <CardHeader className="pb-3">
              <div className="flex items-center gap-2">
                <FileText className="h-4 w-4 text-amber-400" />
                <CardTitle className="text-base">资金用途 <span className="text-xs text-red-400">*必填</span></CardTitle>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex flex-wrap gap-2">
                {usageCategories.map((cat) => (
                  <Button
                    key={cat}
                    variant={usageCategory === cat ? "default" : "outline"}
                    size="sm"
                    onClick={() => setUsageCategory(cat)}
                    className={usageCategory === cat ? "bg-cyan-600 hover:bg-cyan-700" : "border-border/50"}
                  >
                    {cat}
                  </Button>
                ))}
              </div>
              <div>
                <div className="mb-1 flex justify-between text-xs text-muted-foreground">
                  <span>详细说明（最少50字）</span>
                  <span className={usageDetail.length >= 50 ? "text-emerald-400" : "text-amber-400"}>
                    {usageDetail.length}/50
                  </span>
                </div>
                <textarea
                  className="w-full rounded-lg border border-border/50 bg-background p-3 text-sm placeholder:text-muted-foreground focus:outline-none focus:ring-1 focus:ring-ring"
                  rows={4}
                  placeholder="请详细描述资金用途、预期收益、还款来源等信息..."
                  value={usageDetail}
                  onChange={(e) => setUsageDetail(e.target.value)}
                />
              </div>
              <div className="flex items-center gap-3 rounded-lg border border-dashed border-border/50 p-4">
                <Upload className="h-5 w-5 text-muted-foreground" />
                <div>
                  <div className="text-sm">上传附件</div>
                  <div className="text-xs text-muted-foreground">支持 PDF、图片等（Demo 模拟）</div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Summary + Submit */}
          <Card className="border-cyan-500/20 bg-gradient-to-br from-cyan-500/5 to-transparent">
            <CardContent className="p-5">
              <h3 className="mb-3 font-medium">订单摘要</h3>
              <div className="mb-4 grid grid-cols-2 gap-2 text-sm">
                <span className="text-muted-foreground">金额:</span>
                <span className="font-medium">{amount || "—"} {currency}</span>
                <span className="text-muted-foreground">最高利率:</span>
                <span className="font-medium text-amber-400">{maxRate[0]}%</span>
                <span className="text-muted-foreground">期限:</span>
                <span className="font-medium">{selectedTerm}天</span>
                <span className="text-muted-foreground">还款方式:</span>
                <span className="font-medium">{repayMethods.find(m => m.value === repayMethod)?.label}</span>
                <span className="text-muted-foreground">质押:</span>
                <span className="font-medium">{collateralTypes.find(c => c.value === collateralType)?.label}</span>
                <span className="text-muted-foreground">用途:</span>
                <span className="font-medium">{usageCategory || "—"}</span>
              </div>
              <Button
                className="w-full gap-2 bg-cyan-600 hover:bg-cyan-700"
                size="lg"
                onClick={handleSubmit}
                disabled={!amount || !usageCategory || usageDetail.length < 50 || submitting}
              >
                {submitting ? (
                  <>
                    <Loader2 className="h-4 w-4 animate-spin" />
                    <Sparkles className="h-4 w-4" />
                    Agent 正在匹配...
                  </>
                ) : (
                  <>提交借款需求</>
                )}
              </Button>
              {(!amount || !usageCategory || usageDetail.length < 50) && (
                <p className="mt-2 text-center text-xs text-muted-foreground">
                  请完成所有必填项后提交
                </p>
              )}
            </CardContent>
          </Card>
        </div>
      </motion.div>
    </div>
  )
}
