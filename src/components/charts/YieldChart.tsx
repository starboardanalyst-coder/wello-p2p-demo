"use client"

import { ResponsiveContainer, XAxis, YAxis, Tooltip, CartesianGrid, Area, AreaChart } from "recharts"
import { yieldData } from "@/data/mock"

export default function YieldChart() {
  return (
    <ResponsiveContainer width="100%" height={220}>
      <AreaChart data={yieldData} margin={{ top: 5, right: 5, bottom: 5, left: -20 }}>
        <defs>
          <linearGradient id="yieldGrad" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#22c55e" stopOpacity={0.3} />
            <stop offset="100%" stopColor="#22c55e" stopOpacity={0} />
          </linearGradient>
        </defs>
        <CartesianGrid strokeDasharray="3 3" stroke="hsl(217 33% 17%)" />
        <XAxis dataKey="day" tick={{ fontSize: 11, fill: "hsl(215 20% 65%)" }} axisLine={false} tickLine={false} />
        <YAxis tick={{ fontSize: 11, fill: "hsl(215 20% 65%)" }} axisLine={false} tickLine={false} domain={[4, 5.5]} />
        <Tooltip
          contentStyle={{ background: "hsl(222 47% 8%)", border: "1px solid hsl(217 33% 17%)", borderRadius: 8, fontSize: 12 }}
          labelStyle={{ color: "hsl(215 20% 65%)" }}
        />
        <Area type="monotone" dataKey="yield" stroke="#22c55e" fill="url(#yieldGrad)" strokeWidth={2} dot={false} name="APY %" />
      </AreaChart>
    </ResponsiveContainer>
  )
}
