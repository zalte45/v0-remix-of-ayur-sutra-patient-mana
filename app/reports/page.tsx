"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Download, TrendingUp, Users, Activity, Clock } from "lucide-react"
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
} from "recharts"

const patientProgressData = [
  { month: "Jan", wellness: 65, stress: 45, energy: 70 },
  { month: "Feb", wellness: 70, stress: 40, energy: 75 },
  { month: "Mar", wellness: 75, stress: 35, energy: 80 },
  { month: "Apr", wellness: 80, stress: 30, energy: 85 },
  { month: "May", wellness: 85, stress: 25, energy: 90 },
  { month: "Jun", wellness: 88, stress: 20, energy: 92 },
]

const therapyDistribution = [
  { name: "Abhyanga", value: 35, color: "#22c55e" },
  { name: "Shirodhara", value: 25, color: "#3b82f6" },
  { name: "Panchakarma", value: 20, color: "#f59e0b" },
  { name: "Nasya", value: 12, color: "#ef4444" },
  { name: "Basti", value: 8, color: "#8b5cf6" },
]

const appointmentData = [
  { day: "Mon", appointments: 12, completed: 10 },
  { day: "Tue", appointments: 15, completed: 14 },
  { day: "Wed", appointments: 18, completed: 16 },
  { day: "Thu", appointments: 14, completed: 13 },
  { day: "Fri", appointments: 16, completed: 15 },
  { day: "Sat", appointments: 8, completed: 8 },
  { day: "Sun", appointments: 5, completed: 5 },
]

export default function ReportsPage() {
  const [dateRange, setDateRange] = useState("last-30-days")
  const [reportType, setReportType] = useState("overview")

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-cream-50 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold text-green-800 mb-2">Reports & Analytics</h1>
            <p className="text-green-600">Comprehensive insights into therapy progress and practice performance</p>
          </div>
          <div className="flex gap-4">
            <Select value={dateRange} onValueChange={setDateRange}>
              <SelectTrigger className="w-48">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="last-7-days">Last 7 Days</SelectItem>
                <SelectItem value="last-30-days">Last 30 Days</SelectItem>
                <SelectItem value="last-3-months">Last 3 Months</SelectItem>
                <SelectItem value="last-year">Last Year</SelectItem>
              </SelectContent>
            </Select>
            <Button className="bg-green-600 hover:bg-green-700">
              <Download className="w-4 h-4 mr-2" />
              Export Report
            </Button>
          </div>
        </div>

        <Tabs value={reportType} onValueChange={setReportType} className="space-y-6">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="patient-progress">Patient Progress</TabsTrigger>
            <TabsTrigger value="therapy-analytics">Therapy Analytics</TabsTrigger>
            <TabsTrigger value="financial">Financial Reports</TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-6">
            {/* Key Metrics */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Total Patients</CardTitle>
                  <Users className="h-4 w-4 text-green-600" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-green-800">1,247</div>
                  <p className="text-xs text-green-600">+12% from last month</p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Active Treatments</CardTitle>
                  <Activity className="h-4 w-4 text-blue-600" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-green-800">342</div>
                  <p className="text-xs text-green-600">+8% from last month</p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Avg. Session Duration</CardTitle>
                  <Clock className="h-4 w-4 text-amber-600" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-green-800">75 min</div>
                  <p className="text-xs text-green-600">+5 min from last month</p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Success Rate</CardTitle>
                  <TrendingUp className="h-4 w-4 text-green-600" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-green-800">94.2%</div>
                  <p className="text-xs text-green-600">+2.1% from last month</p>
                </CardContent>
              </Card>
            </div>

            {/* Weekly Appointments Chart */}
            <Card>
              <CardHeader>
                <CardTitle>Weekly Appointment Overview</CardTitle>
                <CardDescription>Scheduled vs completed appointments this week</CardDescription>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <BarChart data={appointmentData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="day" />
                    <YAxis />
                    <Tooltip />
                    <Bar dataKey="appointments" fill="#22c55e" name="Scheduled" />
                    <Bar dataKey="completed" fill="#16a34a" name="Completed" />
                  </BarChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="patient-progress" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Patient Wellness Trends</CardTitle>
                <CardDescription>Average wellness metrics across all patients</CardDescription>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={400}>
                  <LineChart data={patientProgressData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="month" />
                    <YAxis />
                    <Tooltip />
                    <Line type="monotone" dataKey="wellness" stroke="#22c55e" strokeWidth={3} name="Wellness Score" />
                    <Line type="monotone" dataKey="stress" stroke="#ef4444" strokeWidth={3} name="Stress Level" />
                    <Line type="monotone" dataKey="energy" stroke="#3b82f6" strokeWidth={3} name="Energy Level" />
                  </LineChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Treatment Completion Rates</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex justify-between items-center">
                      <span>Panchakarma Complete Course</span>
                      <span className="font-semibold">89%</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div className="bg-green-600 h-2 rounded-full" style={{ width: "89%" }}></div>
                    </div>
                    <div className="flex justify-between items-center">
                      <span>Abhyanga Sessions</span>
                      <span className="font-semibold">95%</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div className="bg-green-600 h-2 rounded-full" style={{ width: "95%" }}></div>
                    </div>
                    <div className="flex justify-between items-center">
                      <span>Shirodhara Therapy</span>
                      <span className="font-semibold">92%</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div className="bg-green-600 h-2 rounded-full" style={{ width: "92%" }}></div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Patient Satisfaction</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-center">
                    <div className="text-4xl font-bold text-green-800 mb-2">4.8/5</div>
                    <p className="text-green-600 mb-4">Average Rating</p>
                    <div className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span>5 Stars</span>
                        <span>78%</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span>4 Stars</span>
                        <span>18%</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span>3 Stars</span>
                        <span>3%</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span>2 Stars</span>
                        <span>1%</span>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="therapy-analytics" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Therapy Distribution</CardTitle>
                  <CardDescription>Most popular treatments this month</CardDescription>
                </CardHeader>
                <CardContent>
                  <ResponsiveContainer width="100%" height={300}>
                    <PieChart>
                      <Pie
                        data={therapyDistribution}
                        cx="50%"
                        cy="50%"
                        outerRadius={80}
                        fill="#8884d8"
                        dataKey="value"
                        label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                      >
                        {therapyDistribution.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={entry.color} />
                        ))}
                      </Pie>
                      <Tooltip />
                    </PieChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Therapy Effectiveness</CardTitle>
                  <CardDescription>Success rates by treatment type</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {therapyDistribution.map((therapy, index) => (
                      <div key={index} className="space-y-2">
                        <div className="flex justify-between">
                          <span className="font-medium">{therapy.name}</span>
                          <span className="text-sm text-green-600">{95 - index * 2}% success</span>
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-2">
                          <div className="bg-green-600 h-2 rounded-full" style={{ width: `${95 - index * 2}%` }}></div>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>

            <Card>
              <CardHeader>
                <CardTitle>Monthly Therapy Trends</CardTitle>
                <CardDescription>Therapy session volume over time</CardDescription>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <LineChart data={patientProgressData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="month" />
                    <YAxis />
                    <Tooltip />
                    <Line
                      type="monotone"
                      dataKey="wellness"
                      stroke="#22c55e"
                      strokeWidth={2}
                      name="Sessions Completed"
                    />
                  </LineChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="financial" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Monthly Revenue</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-green-800">₹2,45,000</div>
                  <p className="text-xs text-green-600">+15% from last month</p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader>
                  <CardTitle>Average Session Cost</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-green-800">₹1,850</div>
                  <p className="text-xs text-green-600">+5% from last month</p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader>
                  <CardTitle>Outstanding Payments</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-amber-600">₹18,500</div>
                  <p className="text-xs text-green-600">-12% from last month</p>
                </CardContent>
              </Card>
            </div>

            <Card>
              <CardHeader>
                <CardTitle>Revenue by Therapy Type</CardTitle>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <BarChart data={therapyDistribution}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip />
                    <Bar dataKey="value" fill="#22c55e" />
                  </BarChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
