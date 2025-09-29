"use client"

import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts"

const data = [
  { week: "Week 1", wellness: 6.2, energy: 5.8, sleep: 6.0 },
  { week: "Week 2", wellness: 6.8, energy: 6.2, sleep: 6.5 },
  { week: "Week 3", wellness: 7.2, energy: 6.8, sleep: 7.0 },
  { week: "Week 4", wellness: 7.8, energy: 7.5, sleep: 7.8 },
  { week: "Week 5", wellness: 8.2, energy: 8.0, sleep: 8.2 },
]

export function TherapyProgressChart() {
  return (
    <div className="h-[300px]">
      <ResponsiveContainer width="100%" height="100%">
        <LineChart data={data}>
          <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
          <XAxis dataKey="week" className="text-muted-foreground" />
          <YAxis domain={[0, 10]} className="text-muted-foreground" />
          <Tooltip
            contentStyle={{
              backgroundColor: "hsl(var(--card))",
              border: "1px solid hsl(var(--border))",
              borderRadius: "8px",
            }}
          />
          <Line
            type="monotone"
            dataKey="wellness"
            stroke="hsl(var(--primary))"
            strokeWidth={2}
            dot={{ fill: "hsl(var(--primary))" }}
            name="Wellness Score"
          />
          <Line
            type="monotone"
            dataKey="energy"
            stroke="hsl(var(--chart-2))"
            strokeWidth={2}
            dot={{ fill: "hsl(var(--chart-2))" }}
            name="Energy Level"
          />
          <Line
            type="monotone"
            dataKey="sleep"
            stroke="hsl(var(--chart-3))"
            strokeWidth={2}
            dot={{ fill: "hsl(var(--chart-3))" }}
            name="Sleep Quality"
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  )
}
