"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Calendar, Clock, Users, Activity, TrendingUp, Plus, Search } from "lucide-react"
import { DoctorSidebar } from "@/components/doctor/doctor-sidebar"
import { PatientList } from "@/components/doctor/patient-list"
import { ScheduleCalendar } from "@/components/doctor/schedule-calendar"
import { PracticeStats } from "@/components/doctor/practice-stats"
import { Input } from "@/components/ui/input"
import AIChatbot from "@/components/ai-chatbot"
import { LanguageSwitcher } from "@/components/language-switcher"
import { getDisplayName, getUserInitials, type UserData } from "@/lib/auth-utils"

export default function DoctorDashboard() {
  const [activeTab, setActiveTab] = useState("overview")
  const [currentUser, setCurrentUser] = useState<UserData | null>(null)

  useEffect(() => {
    const userData = localStorage.getItem("currentUser")
    if (userData) {
      setCurrentUser(JSON.parse(userData))
    }
  }, [])

  // Mock doctor data - in real app, this would come from API
  const doctorData = {
    name: currentUser ? getDisplayName(currentUser) : "Dr. Rajesh Kumar",
    specialization: "Panchakarma Specialist",
    email: currentUser?.email || "dr.rajesh@ayursutra.com",
    phone: "+91 98765 43210",
    license: "AYU-2019-MH-1234",
    experience: "15 years",
    patients: 156,
    todayAppointments: 8,
    weeklyHours: 42,
    rating: 4.8,
  }

  const todaySchedule = [
    {
      id: 1,
      patient: "Priya Sharma",
      time: "09:00 AM",
      therapy: "Abhyanga Massage",
      duration: "60 min",
      status: "confirmed",
      type: "follow-up",
    },
    {
      id: 2,
      patient: "Amit Patel",
      time: "10:30 AM",
      therapy: "Consultation",
      duration: "30 min",
      status: "confirmed",
      type: "new",
    },
    {
      id: 3,
      patient: "Sunita Reddy",
      time: "11:30 AM",
      therapy: "Shirodhara",
      duration: "45 min",
      status: "pending",
      type: "follow-up",
    },
    {
      id: 4,
      patient: "Vikram Singh",
      time: "02:00 PM",
      therapy: "Panchakarma Assessment",
      duration: "45 min",
      status: "confirmed",
      type: "assessment",
    },
    {
      id: 5,
      patient: "Meera Joshi",
      time: "03:00 PM",
      therapy: "Nasya Therapy",
      duration: "30 min",
      status: "confirmed",
      type: "follow-up",
    },
  ]

  const recentPatients = [
    {
      id: 1,
      name: "Priya Sharma",
      age: 34,
      lastVisit: "Today",
      condition: "Stress Management",
      progress: "Improving",
      avatar: "PS",
    },
    {
      id: 2,
      name: "Amit Patel",
      age: 42,
      lastVisit: "Yesterday",
      condition: "Digestive Issues",
      progress: "Good",
      avatar: "AP",
    },
    {
      id: 3,
      name: "Sunita Reddy",
      age: 38,
      lastVisit: "2 days ago",
      condition: "Joint Pain",
      progress: "Excellent",
      avatar: "SR",
    },
    {
      id: 4,
      name: "Vikram Singh",
      age: 45,
      lastVisit: "3 days ago",
      condition: "Insomnia",
      progress: "Improving",
      avatar: "VS",
    },
  ]

  const handleLogout = () => {
    localStorage.removeItem("currentUser")
    alert("Logout functionality would redirect to login page")
  }

  return (
    <div className="flex h-screen bg-background">
      <DoctorSidebar activeTab={activeTab} setActiveTab={setActiveTab} onLogout={handleLogout} />

      <main className="flex-1 overflow-y-auto">
        <div className="p-6">
          {/* Header */}
          <div className="flex items-center justify-between mb-8">
            <div>
              <h1 className="text-3xl font-bold text-foreground">
                Good morning, {currentUser ? getDisplayName(currentUser).split(" ")[0] : "Dr. Kumar"}!
              </h1>
              <p className="text-muted-foreground">You have {todaySchedule.length} appointments today</p>
            </div>
            <div className="flex items-center gap-4">
              <LanguageSwitcher />
              <Button
                variant="outline"
                size="sm"
                onClick={() => alert("Set Availability functionality would open availability settings")}
              >
                <Calendar className="h-4 w-4 mr-2" />
                Set Availability
              </Button>
              <Button size="sm">
                <Plus className="h-4 w-4 mr-2" />
                New Appointment
              </Button>
              <Avatar>
                <AvatarImage src="/placeholder.svg?height=40&width=40" />
                <AvatarFallback>{currentUser ? getUserInitials(currentUser) : "RK"}</AvatarFallback>
              </Avatar>
            </div>
          </div>

          {activeTab === "overview" && (
            <div className="space-y-6">
              {/* Quick Stats */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <Card>
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">Total Patients</CardTitle>
                    <Users className="h-4 w-4 text-muted-foreground" />
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">{doctorData.patients}</div>
                    <p className="text-xs text-muted-foreground">+12 this month</p>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">Today's Appointments</CardTitle>
                    <Calendar className="h-4 w-4 text-muted-foreground" />
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">{doctorData.todayAppointments}</div>
                    <p className="text-xs text-muted-foreground">Next at 9:00 AM</p>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">Weekly Hours</CardTitle>
                    <Clock className="h-4 w-4 text-muted-foreground" />
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">{doctorData.weeklyHours}</div>
                    <p className="text-xs text-muted-foreground">6 hours today</p>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">Patient Rating</CardTitle>
                    <TrendingUp className="h-4 w-4 text-muted-foreground" />
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">{doctorData.rating}</div>
                    <p className="text-xs text-muted-foreground">+0.2 this month</p>
                  </CardContent>
                </Card>
              </div>

              {/* Main Content Grid */}
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Today's Schedule */}
                <div className="lg:col-span-2">
                  <Card>
                    <CardHeader className="flex flex-row items-center justify-between">
                      <div>
                        <CardTitle>Today's Schedule</CardTitle>
                        <CardDescription>Your appointments for today</CardDescription>
                      </div>
                      <Button size="sm" variant="outline">
                        View Calendar
                      </Button>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        {todaySchedule.map((appointment) => (
                          <div
                            key={appointment.id}
                            className="flex items-center justify-between p-4 border rounded-lg hover:bg-accent/50 transition-colors"
                          >
                            <div className="flex items-center gap-4">
                              <div className="text-center">
                                <div className="text-sm font-medium">{appointment.time}</div>
                                <div className="text-xs text-muted-foreground">{appointment.duration}</div>
                              </div>
                              <div>
                                <h4 className="font-semibold">{appointment.patient}</h4>
                                <p className="text-sm text-muted-foreground">{appointment.therapy}</p>
                              </div>
                            </div>
                            <div className="flex items-center gap-2">
                              <Badge
                                variant={
                                  appointment.type === "new"
                                    ? "default"
                                    : appointment.type === "assessment"
                                      ? "secondary"
                                      : "outline"
                                }
                              >
                                {appointment.type}
                              </Badge>
                              <Badge
                                variant={appointment.status === "confirmed" ? "default" : "secondary"}
                                className="text-xs"
                              >
                                {appointment.status}
                              </Badge>
                            </div>
                          </div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                </div>

                {/* Recent Patients */}
                <div>
                  <Card>
                    <CardHeader className="flex flex-row items-center justify-between">
                      <div>
                        <CardTitle>Recent Patients</CardTitle>
                        <CardDescription>Latest patient interactions</CardDescription>
                      </div>
                      <Button size="sm" variant="outline">
                        View All
                      </Button>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        {recentPatients.map((patient) => (
                          <div key={patient.id} className="flex items-center gap-3">
                            <Avatar className="h-10 w-10">
                              <AvatarImage src="/placeholder.svg?height=40&width=40" />
                              <AvatarFallback>{patient.avatar}</AvatarFallback>
                            </Avatar>
                            <div className="flex-1">
                              <div className="flex items-center justify-between">
                                <h4 className="text-sm font-semibold">{patient.name}</h4>
                                <span className="text-xs text-muted-foreground">{patient.lastVisit}</span>
                              </div>
                              <p className="text-xs text-muted-foreground">{patient.condition}</p>
                              <Badge variant="outline" className="text-xs mt-1">
                                {patient.progress}
                              </Badge>
                            </div>
                          </div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </div>

              {/* Practice Statistics */}
              <PracticeStats />
            </div>
          )}

          {activeTab === "patients" && (
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <h2 className="text-2xl font-bold">Patient Management</h2>
                <div className="flex items-center gap-4">
                  <div className="relative">
                    <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                    <Input placeholder="Search patients..." className="pl-10 w-64" />
                  </div>
                  <Button>
                    <Plus className="h-4 w-4 mr-2" />
                    Add Patient
                  </Button>
                </div>
              </div>
              <PatientList />
            </div>
          )}

          {activeTab === "schedule" && (
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <h2 className="text-2xl font-bold">Schedule & Availability</h2>
                <div className="flex items-center gap-2">
                  <Button
                    onClick={() =>
                      alert("Block Time functionality would open time blocking interface with available slots")
                    }
                  >
                    <Plus className="h-4 w-4 mr-2" />
                    Block Time
                  </Button>
                </div>
              </div>
              <ScheduleCalendar />
            </div>
          )}

          {activeTab === "profile" && (
            <div className="space-y-6">
              <h2 className="text-2xl font-bold">Doctor Profile</h2>
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <Card className="lg:col-span-2">
                  <CardHeader>
                    <CardTitle>Professional Information</CardTitle>
                    <CardDescription>Manage your professional details</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="text-sm font-medium">Full Name</label>
                        <p className="text-sm text-muted-foreground">{doctorData.name}</p>
                      </div>
                      <div>
                        <label className="text-sm font-medium">Specialization</label>
                        <p className="text-sm text-muted-foreground">{doctorData.specialization}</p>
                      </div>
                      <div>
                        <label className="text-sm font-medium">Email</label>
                        <p className="text-sm text-muted-foreground">{doctorData.email}</p>
                      </div>
                      <div>
                        <label className="text-sm font-medium">Phone</label>
                        <p className="text-sm text-muted-foreground">{doctorData.phone}</p>
                      </div>
                      <div>
                        <label className="text-sm font-medium">License Number</label>
                        <p className="text-sm text-muted-foreground">{doctorData.license}</p>
                      </div>
                      <div>
                        <label className="text-sm font-medium">Experience</label>
                        <p className="text-sm text-muted-foreground">{doctorData.experience}</p>
                      </div>
                    </div>
                    <Button>Edit Profile</Button>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Practice Summary</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="text-center">
                      <div className="w-20 h-20 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                        <Activity className="h-10 w-10 text-primary" />
                      </div>
                      <h3 className="font-semibold">Practice Rating</h3>
                      <p className="text-2xl font-bold text-primary">{doctorData.rating}/5.0</p>
                    </div>
                    <div className="space-y-2">
                      <div className="flex justify-between">
                        <span className="text-sm">Total Patients</span>
                        <span className="text-sm font-medium">{doctorData.patients}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-sm">Weekly Hours</span>
                        <span className="text-sm font-medium">{doctorData.weeklyHours}h</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-sm">Experience</span>
                        <span className="text-sm font-medium">{doctorData.experience}</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          )}

          {activeTab === "analysis" && (
            <div className="space-y-6">
              <h2 className="text-2xl font-bold">Practice Analysis</h2>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <Card>
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">Monthly Revenue</CardTitle>
                    <TrendingUp className="h-4 w-4 text-muted-foreground" />
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">₹2,45,000</div>
                    <p className="text-xs text-muted-foreground">+15% from last month</p>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">Patient Satisfaction</CardTitle>
                    <Activity className="h-4 w-4 text-muted-foreground" />
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">4.8/5</div>
                    <p className="text-xs text-muted-foreground">Based on 124 reviews</p>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">Treatment Success Rate</CardTitle>
                    <Users className="h-4 w-4 text-muted-foreground" />
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">92%</div>
                    <p className="text-xs text-muted-foreground">Improved outcomes</p>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">Avg Session Duration</CardTitle>
                    <Clock className="h-4 w-4 text-muted-foreground" />
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">45 min</div>
                    <p className="text-xs text-muted-foreground">Optimal therapy time</p>
                  </CardContent>
                </Card>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Popular Treatments</CardTitle>
                    <CardDescription>Most requested therapies this month</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {[
                        { name: "Abhyanga Massage", count: 45, percentage: 35 },
                        { name: "Shirodhara", count: 32, percentage: 25 },
                        { name: "Panchakarma Detox", count: 28, percentage: 22 },
                        { name: "Consultation", count: 23, percentage: 18 },
                      ].map((treatment, index) => (
                        <div key={index} className="flex items-center justify-between">
                          <div className="flex-1">
                            <p className="text-sm font-medium">{treatment.name}</p>
                            <div className="w-full bg-muted rounded-full h-2 mt-1">
                              <div
                                className="bg-primary h-2 rounded-full"
                                style={{ width: `${treatment.percentage}%` }}
                              ></div>
                            </div>
                          </div>
                          <span className="text-sm font-medium ml-4">{treatment.count}</span>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Patient Demographics</CardTitle>
                    <CardDescription>Age distribution of your patients</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {[
                        { range: "25-35 years", count: 42, percentage: 27 },
                        { range: "36-45 years", count: 38, percentage: 24 },
                        { range: "46-55 years", count: 35, percentage: 22 },
                        { range: "18-24 years", count: 25, percentage: 16 },
                        { range: "55+ years", count: 16, percentage: 11 },
                      ].map((demo, index) => (
                        <div key={index} className="flex items-center justify-between">
                          <div className="flex-1">
                            <p className="text-sm font-medium">{demo.range}</p>
                            <div className="w-full bg-muted rounded-full h-2 mt-1">
                              <div
                                className="bg-secondary h-2 rounded-full"
                                style={{ width: `${demo.percentage}%` }}
                              ></div>
                            </div>
                          </div>
                          <span className="text-sm font-medium ml-4">{demo.count}</span>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          )}
        </div>
      </main>

      <AIChatbot />
    </div>
  )
}
