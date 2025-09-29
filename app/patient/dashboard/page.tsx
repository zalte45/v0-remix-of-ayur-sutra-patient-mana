"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Calendar, Clock, Bell, Activity, Heart, Leaf, Plus, CheckCircle } from "lucide-react"
import { PatientSidebar } from "@/components/patient/patient-sidebar"
import { TherapyProgressChart } from "@/components/patient/therapy-progress-chart"
import { UpcomingSessions } from "@/components/patient/upcoming-sessions"
import { HealthMetrics } from "@/components/patient/health-metrics"
import AIChatbot from "@/components/ai-chatbot"
import Link from "next/link"
import { LanguageSwitcher } from "@/components/language-switcher"
import { getDisplayName, getUserInitials, type UserData } from "@/lib/auth-utils"

export default function PatientDashboard() {
  const [activeTab, setActiveTab] = useState("overview")
  const [currentUser, setCurrentUser] = useState<UserData | null>(null)
  const [notifications, setNotifications] = useState([
    {
      id: 1,
      title: "Upcoming Session Reminder",
      message: "Your Abhyanga massage is scheduled for tomorrow at 10:00 AM",
      time: "2 hours ago",
      read: false,
      type: "appointment",
    },
    {
      id: 2,
      title: "Medication Reminder",
      message: "Time to take your Triphala supplement",
      time: "4 hours ago",
      read: false,
      type: "medication",
    },
    {
      id: 3,
      title: "Progress Update",
      message: "Your wellness score has improved by 0.5 points this week!",
      time: "1 day ago",
      read: true,
      type: "progress",
    },
  ])
  const [showNotifications, setShowNotifications] = useState(false)

  useEffect(() => {
    const userData = localStorage.getItem("currentUser")
    if (userData) {
      setCurrentUser(JSON.parse(userData))
    }
  }, [])

  // Mock patient data - in real app, this would come from API
  const patientData = {
    name: currentUser ? getDisplayName(currentUser) : "Priya Sharma",
    email: currentUser?.email || "priya.sharma@email.com",
    phone: "+91 98765 43210",
    age: 34,
    gender: "Female",
    joinDate: "March 2024",
    currentTherapy: "Panchakarma Detox Program",
    therapyProgress: 65,
    completedSessions: 13,
    totalSessions: 20,
    nextSession: "Tomorrow, 10:00 AM",
    doctor: "Dr. Rajesh Kumar",
  }

  const upcomingSessions = [
    {
      id: 1,
      therapy: "Abhyanga Massage",
      date: "Tomorrow",
      time: "10:00 AM",
      duration: "60 min",
      doctor: "Dr. Rajesh Kumar",
      status: "confirmed",
    },
    {
      id: 2,
      therapy: "Shirodhara",
      date: "Dec 28",
      time: "2:00 PM",
      duration: "45 min",
      doctor: "Dr. Rajesh Kumar",
      status: "confirmed",
    },
    {
      id: 3,
      therapy: "Consultation",
      date: "Dec 30",
      time: "11:00 AM",
      duration: "30 min",
      doctor: "Dr. Rajesh Kumar",
      status: "pending",
    },
  ]

  const recentActivities = [
    {
      id: 1,
      type: "session",
      title: "Completed Abhyanga Massage",
      time: "2 hours ago",
      icon: <CheckCircle className="h-4 w-4 text-green-500" />,
    },
    {
      id: 2,
      type: "reminder",
      title: "Medication reminder: Take Triphala",
      time: "4 hours ago",
      icon: <Bell className="h-4 w-4 text-blue-500" />,
    },
    {
      id: 3,
      type: "appointment",
      title: "Next session scheduled",
      time: "1 day ago",
      icon: <Calendar className="h-4 w-4 text-primary" />,
    },
    {
      id: 4,
      type: "progress",
      title: "Therapy progress updated",
      time: "2 days ago",
      icon: <Activity className="h-4 w-4 text-purple-500" />,
    },
  ]

  const resourcesData = [
    {
      id: 1,
      title: "Understanding Panchakarma",
      description: "A comprehensive guide to the five-fold detoxification process",
      type: "Article",
      duration: "10 min read",
      category: "Education",
    },
    {
      id: 2,
      title: "Daily Ayurvedic Routine",
      description: "Establish a healthy daily routine aligned with Ayurvedic principles",
      type: "Guide",
      duration: "15 min read",
      category: "Lifestyle",
    },
    {
      id: 3,
      title: "Meditation for Beginners",
      description: "Learn basic meditation techniques for mental wellness",
      type: "Video",
      duration: "20 min",
      category: "Wellness",
    },
    {
      id: 4,
      title: "Ayurvedic Diet Guidelines",
      description: "Nutritional recommendations based on your dosha type",
      type: "PDF",
      duration: "Download",
      category: "Nutrition",
    },
  ]

  const settingsData = {
    notifications: {
      email: true,
      sms: false,
      push: true,
      reminders: true,
    },
    privacy: {
      shareData: false,
      analytics: true,
      marketing: false,
    },
    preferences: {
      language: "English",
      timezone: "Asia/Kolkata",
      theme: "Light",
    },
  }

  const handleLogout = () => {
    localStorage.removeItem("currentUser")
    // In a real app, this would clear auth tokens and redirect
    alert("Logout functionality would redirect to login page")
  }

  return (
    <div className="flex h-screen bg-background">
      <PatientSidebar activeTab={activeTab} setActiveTab={setActiveTab} onLogout={handleLogout} />

      <main className="flex-1 overflow-y-auto">
        <div className="p-6">
          {/* Header */}
          <div className="flex items-center justify-between mb-8">
            <div>
              <h1 className="text-3xl font-bold text-foreground">
                Welcome back, {currentUser ? getDisplayName(currentUser).split(" ")[0] : patientData.name.split(" ")[0]}
                !
              </h1>
              <p className="text-muted-foreground">Track your wellness journey and manage your therapy sessions</p>
            </div>
            <div className="flex items-center gap-4">
              <LanguageSwitcher />
              <div className="relative">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setShowNotifications(!showNotifications)}
                  className="relative"
                >
                  <Bell className="h-4 w-4 mr-2" />
                  Notifications
                  {notifications.filter((n) => !n.read).length > 0 && (
                    <span className="absolute -top-1 -right-1 h-3 w-3 bg-red-500 rounded-full text-xs"></span>
                  )}
                </Button>

                {showNotifications && (
                  <div className="absolute right-0 top-12 w-80 bg-card border border-border rounded-lg shadow-lg z-50">
                    <div className="p-4 border-b border-border">
                      <h3 className="font-semibold">Notifications</h3>
                    </div>
                    <div className="max-h-64 overflow-y-auto">
                      {notifications.map((notification) => (
                        <div
                          key={notification.id}
                          className={`p-3 border-b border-border last:border-b-0 ${!notification.read ? "bg-accent/20" : ""}`}
                        >
                          <div className="flex justify-between items-start">
                            <div className="flex-1">
                              <p className="text-sm font-medium">{notification.title}</p>
                              <p className="text-xs text-muted-foreground mt-1">{notification.message}</p>
                              <p className="text-xs text-muted-foreground mt-1">{notification.time}</p>
                            </div>
                            {!notification.read && <div className="w-2 h-2 bg-blue-500 rounded-full mt-1"></div>}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
              <Avatar>
                <AvatarImage src="/placeholder.svg?height=40&width=40" />
                <AvatarFallback>{currentUser ? getUserInitials(currentUser) : "PS"}</AvatarFallback>
              </Avatar>
            </div>
          </div>

          {activeTab === "overview" && (
            <div className="space-y-6">
              {/* Quick Stats */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <Card>
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">Current Therapy</CardTitle>
                    <Leaf className="h-4 w-4 text-muted-foreground" />
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">{patientData.therapyProgress}%</div>
                    <p className="text-xs text-muted-foreground">
                      {patientData.completedSessions} of {patientData.totalSessions} sessions
                    </p>
                    <Progress value={patientData.therapyProgress} className="mt-2" />
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">Next Session</CardTitle>
                    <Clock className="h-4 w-4 text-muted-foreground" />
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">Tomorrow</div>
                    <p className="text-xs text-muted-foreground">10:00 AM - Abhyanga</p>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">Wellness Score</CardTitle>
                    <Heart className="h-4 w-4 text-muted-foreground" />
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">8.2</div>
                    <p className="text-xs text-muted-foreground">+0.5 from last week</p>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">Days Active</CardTitle>
                    <Activity className="h-4 w-4 text-muted-foreground" />
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">28</div>
                    <p className="text-xs text-muted-foreground">This month</p>
                  </CardContent>
                </Card>
              </div>

              {/* Main Content Grid */}
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Therapy Progress */}
                <div className="lg:col-span-2">
                  <Card>
                    <CardHeader>
                      <CardTitle>Therapy Progress</CardTitle>
                      <CardDescription>Your wellness journey over time</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <TherapyProgressChart />
                    </CardContent>
                  </Card>
                </div>

                {/* Upcoming Sessions */}
                <div>
                  <Card>
                    <CardHeader className="flex flex-row items-center justify-between">
                      <div>
                        <CardTitle>Upcoming Sessions</CardTitle>
                        <CardDescription>Your scheduled appointments</CardDescription>
                      </div>
                      <Button size="sm" variant="outline" asChild>
                        <Link href="/booking">
                          <Plus className="h-4 w-4 mr-2" />
                          Book
                        </Link>
                      </Button>
                    </CardHeader>
                    <CardContent>
                      <UpcomingSessions sessions={upcomingSessions} />
                    </CardContent>
                  </Card>
                </div>
              </div>

              {/* Health Metrics and Recent Activity */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Health Metrics</CardTitle>
                    <CardDescription>Track your vital signs and wellness indicators</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <HealthMetrics />
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Recent Activity</CardTitle>
                    <CardDescription>Your latest updates and reminders</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {recentActivities.map((activity) => (
                        <div key={activity.id} className="flex items-center gap-3">
                          {activity.icon}
                          <div className="flex-1">
                            <p className="text-sm font-medium">{activity.title}</p>
                            <p className="text-xs text-muted-foreground">{activity.time}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* Current Therapy Program */}
              <Card>
                <CardHeader>
                  <CardTitle>Current Therapy Program</CardTitle>
                  <CardDescription>{patientData.currentTherapy}</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div className="space-y-2">
                      <h4 className="font-semibold">Program Details</h4>
                      <p className="text-sm text-muted-foreground">
                        A comprehensive 20-session Panchakarma program designed for deep detoxification and
                        rejuvenation.
                      </p>
                      <Badge variant="secondary">20 Sessions</Badge>
                    </div>
                    <div className="space-y-2">
                      <h4 className="font-semibold">Your Doctor</h4>
                      <div className="flex items-center gap-2">
                        <Avatar className="h-8 w-8">
                          <AvatarImage src="/placeholder.svg?height=32&width=32" />
                          <AvatarFallback>RK</AvatarFallback>
                        </Avatar>
                        <div>
                          <p className="text-sm font-medium">{patientData.doctor}</p>
                          <p className="text-xs text-muted-foreground">Panchakarma Specialist</p>
                        </div>
                      </div>
                    </div>
                    <div className="space-y-2">
                      <h4 className="font-semibold">Progress</h4>
                      <div className="space-y-2">
                        <div className="flex justify-between text-sm">
                          <span>Completed</span>
                          <span>
                            {patientData.completedSessions}/{patientData.totalSessions}
                          </span>
                        </div>
                        <Progress value={patientData.therapyProgress} />
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          )}

          {activeTab === "appointments" && (
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <h2 className="text-2xl font-bold">My Appointments</h2>
                <Button asChild>
                  <Link href="/booking">
                    <Plus className="h-4 w-4 mr-2" />
                    Book New Session
                  </Link>
                </Button>
              </div>
              <Card>
                <CardContent className="p-6">
                  <div className="space-y-4">
                    {upcomingSessions.map((session) => (
                      <div
                        key={session.id}
                        className="flex items-center justify-between p-4 border rounded-lg hover:bg-accent/50 transition-colors"
                      >
                        <div className="flex items-center gap-4">
                          <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center">
                            <Leaf className="h-6 w-6 text-primary" />
                          </div>
                          <div>
                            <h3 className="font-semibold">{session.therapy}</h3>
                            <p className="text-sm text-muted-foreground">
                              {session.date} at {session.time} • {session.duration}
                            </p>
                            <p className="text-sm text-muted-foreground">with {session.doctor}</p>
                          </div>
                        </div>
                        <div className="flex items-center gap-2">
                          <Badge variant={session.status === "confirmed" ? "default" : "secondary"}>
                            {session.status}
                          </Badge>
                          <Button variant="outline" size="sm">
                            Reschedule
                          </Button>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          )}

          {activeTab === "resources" && (
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <h2 className="text-2xl font-bold">Resources & Learning</h2>
                <Button variant="outline">
                  <Plus className="h-4 w-4 mr-2" />
                  Request Resource
                </Button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {resourcesData.map((resource) => (
                  <Card key={resource.id} className="hover:shadow-lg transition-shadow cursor-pointer">
                    <CardHeader>
                      <div className="flex items-center justify-between">
                        <Badge variant="outline">{resource.category}</Badge>
                        <Badge variant="secondary">{resource.type}</Badge>
                      </div>
                      <CardTitle className="text-lg">{resource.title}</CardTitle>
                      <CardDescription>{resource.description}</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="flex items-center justify-between">
                        <span className="text-sm text-muted-foreground">{resource.duration}</span>
                        <Button size="sm">
                          {resource.type === "PDF" ? "Download" : resource.type === "Video" ? "Watch" : "Read"}
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          )}

          {activeTab === "settings" && (
            <div className="space-y-6">
              <h2 className="text-2xl font-bold">Settings</h2>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Notification Preferences</CardTitle>
                    <CardDescription>Manage how you receive notifications</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="font-medium">Email Notifications</p>
                        <p className="text-sm text-muted-foreground">Receive updates via email</p>
                      </div>
                      <Button variant={settingsData.notifications.email ? "default" : "outline"} size="sm">
                        {settingsData.notifications.email ? "On" : "Off"}
                      </Button>
                    </div>
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="font-medium">SMS Notifications</p>
                        <p className="text-sm text-muted-foreground">Receive updates via SMS</p>
                      </div>
                      <Button variant={settingsData.notifications.sms ? "default" : "outline"} size="sm">
                        {settingsData.notifications.sms ? "On" : "Off"}
                      </Button>
                    </div>
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="font-medium">Push Notifications</p>
                        <p className="text-sm text-muted-foreground">Receive push notifications</p>
                      </div>
                      <Button variant={settingsData.notifications.push ? "default" : "outline"} size="sm">
                        {settingsData.notifications.push ? "On" : "Off"}
                      </Button>
                    </div>
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="font-medium">Appointment Reminders</p>
                        <p className="text-sm text-muted-foreground">Get reminded about upcoming sessions</p>
                      </div>
                      <Button variant={settingsData.notifications.reminders ? "default" : "outline"} size="sm">
                        {settingsData.notifications.reminders ? "On" : "Off"}
                      </Button>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Privacy Settings</CardTitle>
                    <CardDescription>Control your data and privacy preferences</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="font-medium">Share Data for Research</p>
                        <p className="text-sm text-muted-foreground">Help improve Ayurvedic treatments</p>
                      </div>
                      <Button variant={settingsData.privacy.shareData ? "default" : "outline"} size="sm">
                        {settingsData.privacy.shareData ? "On" : "Off"}
                      </Button>
                    </div>
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="font-medium">Analytics</p>
                        <p className="text-sm text-muted-foreground">Help us improve the app</p>
                      </div>
                      <Button variant={settingsData.privacy.analytics ? "default" : "outline"} size="sm">
                        {settingsData.privacy.analytics ? "On" : "Off"}
                      </Button>
                    </div>
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="font-medium">Marketing Communications</p>
                        <p className="text-sm text-muted-foreground">Receive promotional content</p>
                      </div>
                      <Button variant={settingsData.privacy.marketing ? "default" : "outline"} size="sm">
                        {settingsData.privacy.marketing ? "On" : "Off"}
                      </Button>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>App Preferences</CardTitle>
                    <CardDescription>Customize your app experience</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="font-medium">Language</p>
                        <p className="text-sm text-muted-foreground">App display language</p>
                      </div>
                      <Button variant="outline" size="sm">
                        {settingsData.preferences.language}
                      </Button>
                    </div>
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="font-medium">Timezone</p>
                        <p className="text-sm text-muted-foreground">Your local timezone</p>
                      </div>
                      <Button variant="outline" size="sm">
                        {settingsData.preferences.timezone}
                      </Button>
                    </div>
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="font-medium">Theme</p>
                        <p className="text-sm text-muted-foreground">App appearance</p>
                      </div>
                      <Button variant="outline" size="sm">
                        {settingsData.preferences.theme}
                      </Button>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Account Actions</CardTitle>
                    <CardDescription>Manage your account</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <Button variant="outline" className="w-full bg-transparent">
                      Change Password
                    </Button>
                    <Button variant="outline" className="w-full bg-transparent">
                      Download My Data
                    </Button>
                    <Button variant="destructive" className="w-full" onClick={handleLogout}>
                      Sign Out
                    </Button>
                  </CardContent>
                </Card>
              </div>
            </div>
          )}

          {activeTab === "profile" && (
            <div className="space-y-6">
              <h2 className="text-2xl font-bold">My Profile</h2>
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <Card className="lg:col-span-2">
                  <CardHeader>
                    <CardTitle>Personal Information</CardTitle>
                    <CardDescription>Manage your account details</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="text-sm font-medium">Full Name</label>
                        <p className="text-sm text-muted-foreground">{patientData.name}</p>
                      </div>
                      <div>
                        <label className="text-sm font-medium">Email</label>
                        <p className="text-sm text-muted-foreground">{patientData.email}</p>
                      </div>
                      <div>
                        <label className="text-sm font-medium">Phone</label>
                        <p className="text-sm text-muted-foreground">{patientData.phone}</p>
                      </div>
                      <div>
                        <label className="text-sm font-medium">Age</label>
                        <p className="text-sm text-muted-foreground">{patientData.age} years</p>
                      </div>
                      <div>
                        <label className="text-sm font-medium">Gender</label>
                        <p className="text-sm text-muted-foreground">{patientData.gender}</p>
                      </div>
                      <div>
                        <label className="text-sm font-medium">Member Since</label>
                        <p className="text-sm text-muted-foreground">{patientData.joinDate}</p>
                      </div>
                    </div>
                    <Button>Edit Profile</Button>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Health Summary</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="text-center">
                      <div className="w-20 h-20 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                        <Heart className="h-10 w-10 text-primary" />
                      </div>
                      <h3 className="font-semibold">Overall Health</h3>
                      <p className="text-2xl font-bold text-primary">Good</p>
                    </div>
                    <div className="space-y-2">
                      <div className="flex justify-between">
                        <span className="text-sm">Wellness Score</span>
                        <span className="text-sm font-medium">8.2/10</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-sm">Active Days</span>
                        <span className="text-sm font-medium">28 this month</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-sm">Therapy Progress</span>
                        <span className="text-sm font-medium">{patientData.therapyProgress}%</span>
                      </div>
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
