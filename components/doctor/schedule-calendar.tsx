"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { ChevronLeft, ChevronRight, Clock } from "lucide-react"

export function ScheduleCalendar() {
  const [currentDate, setCurrentDate] = useState(new Date())

  // Mock schedule data
  const scheduleData = {
    "2024-12-27": [
      { time: "09:00", patient: "Priya Sharma", therapy: "Abhyanga", duration: 60 },
      { time: "10:30", patient: "Amit Patel", therapy: "Consultation", duration: 30 },
      { time: "14:00", patient: "Vikram Singh", therapy: "Assessment", duration: 45 },
    ],
    "2024-12-28": [
      { time: "09:30", patient: "Sunita Reddy", therapy: "Shirodhara", duration: 45 },
      { time: "11:00", patient: "Meera Joshi", therapy: "Consultation", duration: 30 },
      { time: "15:00", patient: "Raj Kumar", therapy: "Panchakarma", duration: 90 },
    ],
    "2024-12-30": [
      { time: "10:00", patient: "Anita Sharma", therapy: "Abhyanga", duration: 60 },
      { time: "14:30", patient: "Rohit Patel", therapy: "Nasya", duration: 30 },
    ],
  }

  const getDaysInMonth = (date: Date) => {
    const year = date.getFullYear()
    const month = date.getMonth()
    const firstDay = new Date(year, month, 1)
    const lastDay = new Date(year, month + 1, 0)
    const daysInMonth = lastDay.getDate()
    const startingDayOfWeek = firstDay.getDay()

    const days = []

    // Add empty cells for days before the first day of the month
    for (let i = 0; i < startingDayOfWeek; i++) {
      days.push(null)
    }

    // Add days of the month
    for (let day = 1; day <= daysInMonth; day++) {
      days.push(day)
    }

    return days
  }

  const formatDateKey = (year: number, month: number, day: number) => {
    return `${year}-${String(month + 1).padStart(2, "0")}-${String(day).padStart(2, "0")}`
  }

  const navigateMonth = (direction: "prev" | "next") => {
    setCurrentDate((prev) => {
      const newDate = new Date(prev)
      if (direction === "prev") {
        newDate.setMonth(prev.getMonth() - 1)
      } else {
        newDate.setMonth(prev.getMonth() + 1)
      }
      return newDate
    })
  }

  const days = getDaysInMonth(currentDate)
  const monthNames = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ]
  const dayNames = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"]

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle>Calendar View</CardTitle>
          <div className="flex items-center gap-2">
            <Button variant="outline" size="sm" onClick={() => navigateMonth("prev")}>
              <ChevronLeft className="h-4 w-4" />
            </Button>
            <span className="text-sm font-medium min-w-[120px] text-center">
              {monthNames[currentDate.getMonth()]} {currentDate.getFullYear()}
            </span>
            <Button variant="outline" size="sm" onClick={() => navigateMonth("next")}>
              <ChevronRight className="h-4 w-4" />
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-7 gap-2 mb-4">
            {dayNames.map((day) => (
              <div key={day} className="text-center text-sm font-medium text-muted-foreground p-2">
                {day}
              </div>
            ))}
          </div>
          <div className="grid grid-cols-7 gap-2">
            {days.map((day, index) => {
              if (day === null) {
                return <div key={index} className="p-2 h-24"></div>
              }

              const dateKey = formatDateKey(currentDate.getFullYear(), currentDate.getMonth(), day)
              const daySchedule = scheduleData[dateKey] || []
              const isToday =
                new Date().toDateString() ===
                new Date(currentDate.getFullYear(), currentDate.getMonth(), day).toDateString()

              return (
                <div
                  key={day}
                  className={`p-2 h-24 border rounded-lg hover:bg-accent/50 transition-colors ${
                    isToday ? "bg-primary/10 border-primary" : "border-border"
                  }`}
                >
                  <div className="text-sm font-medium mb-1">{day}</div>
                  <div className="space-y-1">
                    {daySchedule.slice(0, 2).map((appointment, idx) => (
                      <div key={idx} className="text-xs bg-primary/20 text-primary px-1 py-0.5 rounded truncate">
                        {appointment.time} {appointment.patient.split(" ")[0]}
                      </div>
                    ))}
                    {daySchedule.length > 2 && (
                      <div className="text-xs text-muted-foreground">+{daySchedule.length - 2} more</div>
                    )}
                  </div>
                </div>
              )
            })}
          </div>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Today's Schedule</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {scheduleData["2024-12-27"]?.map((appointment, index) => (
                <div key={index} className="flex items-center justify-between p-3 border rounded-lg">
                  <div className="flex items-center gap-3">
                    <div className="text-center">
                      <div className="text-sm font-medium">{appointment.time}</div>
                      <div className="text-xs text-muted-foreground">{appointment.duration}m</div>
                    </div>
                    <div>
                      <h4 className="font-semibold text-sm">{appointment.patient}</h4>
                      <p className="text-xs text-muted-foreground">{appointment.therapy}</p>
                    </div>
                  </div>
                  <Badge variant="outline">Confirmed</Badge>
                </div>
              )) || <p className="text-muted-foreground text-center py-4">No appointments today</p>}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Availability Settings</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-sm">Monday - Friday</span>
                <span className="text-sm font-medium">9:00 AM - 6:00 PM</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm">Saturday</span>
                <span className="text-sm font-medium">9:00 AM - 2:00 PM</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm">Sunday</span>
                <span className="text-sm font-medium">Closed</span>
              </div>
            </div>
            <Button className="w-full bg-transparent" variant="outline">
              <Clock className="h-4 w-4 mr-2" />
              Update Availability
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
