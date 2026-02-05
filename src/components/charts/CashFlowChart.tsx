"use client"

import { ResponsiveContainer, BarChart, Bar, XAxis, YAxis, Tooltip, CartesianGrid } from "recharts"
import { borrowerProfile } from "@/data/mock"

const months = ["1月","2月","3月","4月","5月","6月","7月","8月","9月","10月","11月","12月"]

export default function CashFlowChart() {
  const data = borrowerProfile.monthlyCashFlow.map((v, i) => ({
    month: months[i],
    cashFlow: v,
  }))

  return (
    <ResponsiveContainer width="100%" height={220}>
      <BarChart data={data} margin={{ top: 5, right: 5, bottom: 5, left: -20 }}>
        <CartesianGrid strokeDasharray="3 3" stroke="hsl(217 33% 17%)" />
        <XAxis dataKey="month" tick={{ fontSize: 11, fill: "hsl(215 20% 65%)" }} axisLine={false} tickLine={false} />
        <YAxis tick={{ fontSize: 11, fill: "hsl(215 20% 65%)" }} axisLine={false} tickLine={false} />
        <Tooltip
          contentStyle={{ background: "hsl(222 47% 8%)", border: "1px solid hsl(217 33% 17%)", borderRadius: 8, fontSize: 12 }}
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          formatter={(value: any) => [`$${Number(value).toLocaleString()}`, "月资金流"]}
        />
        <Bar dataKey="cashFlow" fill="#0ea5e9" radius={[4, 4, 0, 0]} />
      </BarChart>
    </ResponsiveContainer>
  )
}
