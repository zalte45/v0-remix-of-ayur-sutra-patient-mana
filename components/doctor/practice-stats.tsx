"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts"

const monthlyData = [
  { month: "Aug", patients: 45, sessions: 120, revenue: 85000 },
  { month: "Sep", patients: 52, sessions: 135, revenue: 92000 },
  { month: "Oct", patients: 48, sessions: 128, revenue: 88000 },
  { month: "Nov", patients: 58, sessions: 145, revenue: 98000 },
  { month: "Dec", patients: 62, sessions: 156, revenue: 105000 },
]

const therapyData = [
  { therapy: "Abhyanga", count: 45, percentage: 28 },
  { therapy: "Shirodhara", count: 38, percentage: 24 },
  { therapy: "Consultation", count: 32, percentage: 20 },
  { therapy: "Panchakarma", count: 25, percentage: 16 },
  { therapy: "Nasya", count: 20, percentage: 12 },
]

export function PracticeStats() {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      <Card>
        <CardHeader>
          <CardTitle>Monthly Overview</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={monthlyData}>
                <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
                <XAxis dataKey="month" className="text-muted-foreground" />
                <YAxis className="text-muted-foreground" />
                <Tooltip
                  contentStyle={{
                    backgroundColor: "hsl(var(--card))",
                    border: "1px solid hsl(var(--border))",
                    borderRadius: "8px",
                  }}
                />
                <Bar dataKey="patients" fill="hsl(var(--primary))" name="New Patients" />
                <Bar dataKey="sessions" fill="hsl(var(--chart-2))" name="Total Sessions" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Popular Therapies</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {therapyData.map((therapy, index) => (
              <div key={index} className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium">{therapy.therapy}</span>
                  <span className="text-sm text-muted-foreground">{therapy.count} sessions</span>
                </div>
                <div className="w-full bg-secondary rounded-full h-2">
                  <div
                    className="bg-primary h-2 rounded-full transition-all duration-300"
                    style={{ width: `${therapy.percentage}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
