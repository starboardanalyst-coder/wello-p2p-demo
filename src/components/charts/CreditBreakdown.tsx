"use client"

import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from "recharts"
import { creditScoreBreakdown } from "@/data/mock"

const COLORS = ["#22c55e", "#3b82f6", "#f59e0b", "#8b5cf6"]

export default function CreditBreakdown() {
  return (
    <ResponsiveContainer width="100%" height={180}>
      <PieChart>
        <Pie
          data={creditScoreBreakdown}
          cx="50%"
          cy="50%"
          outerRadius={70}
          innerRadius={40}
          dataKey="weight"
          nameKey="category"
          stroke="none"
        >
          {creditScoreBreakdown.map((_, i) => (
            <Cell key={i} fill={COLORS[i % COLORS.length]} />
          ))}
        </Pie>
        <Tooltip
          contentStyle={{ background: "hsl(222 47% 8%)", border: "1px solid hsl(217 33% 17%)", borderRadius: 8, fontSize: 12 }}
        />
      </PieChart>
    </ResponsiveContainer>
  )
}
