"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import {
  Shield, Brain, TrendingUp, Calculator, Lock,
  Eye, AlertTriangle, ShieldCheck, ChevronDown,
  Phone, Scale, Banknote, Bot,
} from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { riskLayers, creditLevels, faqItems } from "@/data/mock"

const iconMap: Record<string, React.ElementType> = {
  Shield, Brain, TrendingUp, Calculator, Lock, Eye, AlertTriangle, ShieldCheck,
}

const collectionMethods = [
  { icon: Bot, title: "AI 自动催收", desc: "智能短信、邮件和App推送提醒，还款日前3天自动触发", stage: "D-3" },
  { icon: Phone, title: "人工电话催收", desc: "专业催收团队电话沟通，协商还款方案", stage: "D+3" },
  { icon: Scale, title: "法务催收", desc: "律师函、仲裁申请、诉讼等法律手段", stage: "D+30" },
  { icon: Lock, title: "质押物处置", desc: "Crypto质押自动清算，保证金扣款", stage: "D+7" },
  { icon: Banknote, title: "资产处置", desc: "第三方资产处置机构介入，债权转让", stage: "D+60" },
]

export default function RiskControlPage() {
  const [openFaq, setOpenFaq] = useState<number | null>(null)

  return (
    <div className="mx-auto max-w-6xl px-4 py-8 sm:px-6">
      {/* Hero */}
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="mb-12 text-center">
        <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br from-emerald-500/20 to-cyan-500/20">
          <Shield className="h-8 w-8 text-emerald-400" />
        </div>
        <h1 className="mb-4 text-3xl font-bold sm:text-4xl">
          八重<span className="gradient-text">风控体系</span>
        </h1>
        <p className="mx-auto max-w-2xl text-muted-foreground">
          多层次、全方位的风险管理系统，保障每一笔交易的安全。
        </p>
      </motion.div>

      {/* 8-Layer Risk System */}
      <div className="mb-16">
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {riskLayers.map((layer, i) => {
            const Icon = iconMap[layer.icon] || Shield
            return (
              <motion.div
                key={layer.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.08 }}
              >
                <Card className="group h-full border-border/50 transition-all hover:border-border hover:shadow-lg">
                  <CardContent className="p-6">
                    <div className="mb-3 flex items-center gap-3">
                      <div
                        className="flex h-10 w-10 items-center justify-center rounded-xl"
                        style={{ backgroundColor: `${layer.color}20`, color: layer.color }}
                      >
                        <Icon className="h-5 w-5" />
                      </div>
                      <Badge variant="outline" className="text-xs" style={{ borderColor: `${layer.color}40`, color: layer.color }}>
                        第{layer.id}层
                      </Badge>
                    </div>
                    <h3 className="mb-2 font-semibold">{layer.name}</h3>
                    <p className="text-xs text-muted-foreground leading-relaxed">{layer.description}</p>
                  </CardContent>
                </Card>
              </motion.div>
            )
          })}
        </div>
      </div>

      {/* Progressive Credit System */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="mb-16"
      >
        <div className="mb-8 text-center">
          <h2 className="mb-2 text-2xl font-bold">渐进式额度体系</h2>
          <p className="text-muted-foreground">从小额开始建立信任，逐步提升借款额度</p>
        </div>

        <Card className="border-border/50">
          <CardContent className="p-6">
            <div className="space-y-4">
              {creditLevels.map((level, i) => (
                <motion.div
                  key={level.level}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                  className="flex items-center gap-4"
                >
                  <div
                    className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl font-bold"
                    style={{ backgroundColor: `${level.color}20`, color: level.color }}
                  >
                    Lv.{level.level}
                  </div>
                  <div className="min-w-0 flex-1">
                    <div className="mb-1 flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <span className="font-medium">{level.name}</span>
                        <span className="text-sm font-bold" style={{ color: level.color }}>
                          ${level.limit.toLocaleString()}
                        </span>
                      </div>
                    </div>
                    <p className="text-xs text-muted-foreground">{level.requirements}</p>
                    <Progress
                      value={((i + 1) / creditLevels.length) * 100}
                      className="mt-2 h-1.5"
                    />
                  </div>
                </motion.div>
              ))}
            </div>
          </CardContent>
        </Card>
      </motion.div>

      {/* Collection Methods */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="mb-16"
      >
        <div className="mb-8 text-center">
          <h2 className="mb-2 text-2xl font-bold">多级催收体系</h2>
          <p className="text-muted-foreground">分阶段、分级别的催收手段，最大化回收率</p>
        </div>

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {collectionMethods.map((method, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.08 }}
            >
              <Card className="h-full border-border/50">
                <CardContent className="p-5">
                  <div className="mb-3 flex items-center justify-between">
                    <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-secondary text-muted-foreground">
                      <method.icon className="h-5 w-5" />
                    </div>
                    <Badge variant="outline" className="text-xs">{method.stage}</Badge>
                  </div>
                  <h3 className="mb-1 font-medium">{method.title}</h3>
                  <p className="text-xs text-muted-foreground">{method.desc}</p>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </motion.div>

      {/* Market Data */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="mb-16"
      >
        <div className="mb-8 text-center">
          <h2 className="mb-2 text-2xl font-bold">风控数据</h2>
          <p className="text-muted-foreground">用数据证明风控能力</p>
        </div>

        <div className="grid gap-6 sm:grid-cols-2">
          <Card className="border-border/50">
            <CardContent className="p-6">
              <h3 className="mb-4 text-sm font-medium text-muted-foreground">坏账率对比</h3>
              <div className="space-y-4">
                <div>
                  <div className="mb-1 flex justify-between text-sm">
                    <span>行业平均</span>
                    <span className="font-bold text-red-400">8.5%</span>
                  </div>
                  <div className="h-3 overflow-hidden rounded-full bg-secondary">
                    <motion.div
                      className="h-full rounded-full bg-red-500/60"
                      initial={{ width: 0 }}
                      whileInView={{ width: "85%" }}
                      viewport={{ once: true }}
                      transition={{ duration: 1 }}
                    />
                  </div>
                </div>
                <div>
                  <div className="mb-1 flex justify-between text-sm">
                    <span>Wello 平台</span>
                    <span className="font-bold text-emerald-400">1.2%</span>
                  </div>
                  <div className="h-3 overflow-hidden rounded-full bg-secondary">
                    <motion.div
                      className="h-full rounded-full bg-emerald-500"
                      initial={{ width: 0 }}
                      whileInView={{ width: "12%" }}
                      viewport={{ once: true }}
                      transition={{ duration: 1, delay: 0.2 }}
                    />
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="border-border/50">
            <CardContent className="p-6">
              <h3 className="mb-4 text-sm font-medium text-muted-foreground">催收成功率</h3>
              <div className="space-y-4">
                <div>
                  <div className="mb-1 flex justify-between text-sm">
                    <span>D+7 催收率</span>
                    <span className="font-bold text-emerald-400">92%</span>
                  </div>
                  <div className="h-3 overflow-hidden rounded-full bg-secondary">
                    <motion.div
                      className="h-full rounded-full bg-emerald-500"
                      initial={{ width: 0 }}
                      whileInView={{ width: "92%" }}
                      viewport={{ once: true }}
                      transition={{ duration: 1 }}
                    />
                  </div>
                </div>
                <div>
                  <div className="mb-1 flex justify-between text-sm">
                    <span>D+30 催收率</span>
                    <span className="font-bold text-cyan-400">96.5%</span>
                  </div>
                  <div className="h-3 overflow-hidden rounded-full bg-secondary">
                    <motion.div
                      className="h-full rounded-full bg-cyan-500"
                      initial={{ width: 0 }}
                      whileInView={{ width: "96.5%" }}
                      viewport={{ once: true }}
                      transition={{ duration: 1, delay: 0.2 }}
                    />
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </motion.div>

      {/* FAQ */}
      <div className="mb-8 text-center">
        <h2 className="mb-2 text-2xl font-bold">常见问题</h2>
      </div>
      <div className="space-y-3">
        {faqItems.map((faq, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.05 }}
          >
            <div
              className="cursor-pointer rounded-xl border border-border/50 bg-card/50 transition-all hover:border-border"
              onClick={() => setOpenFaq(openFaq === i ? null : i)}
            >
              <div className="flex items-center justify-between p-5">
                <span className="font-medium">{faq.q}</span>
                <ChevronDown className={`h-4 w-4 shrink-0 text-muted-foreground transition-transform ${openFaq === i ? "rotate-180" : ""}`} />
              </div>
              {openFaq === i && (
                <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="px-5 pb-5 text-sm text-muted-foreground">
                  {faq.a}
                </motion.div>
              )}
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  )
}
