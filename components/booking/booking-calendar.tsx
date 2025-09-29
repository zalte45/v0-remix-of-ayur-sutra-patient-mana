"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { ChevronLeft, ChevronRight, Clock } from "lucide-react"

interface BookingCalendarProps {
  selectedDate: any
  selectedTime: any
  onDateSelect: (date: any) => void
  onTimeSelect: (time: any) => void
  doctor: any
}

export function BookingCalendar({
  selectedDate,
  selectedTime,
  onDateSelect,
  onTimeSelect,
  doctor,
}: BookingCalendarProps) {
  const [currentDate, setCurrentDate] = useState(new Date())

  // Mock availability data
  const availability = {
    "2024-12-27": ["09:00", "10:30", "14:00", "15:30"],
    "2024-12-28": ["09:30", "11:00", "15:00", "16:30"],
    "2024-12-30": ["10:00", "11:30", "14:30", "16:00"],
    "2024-12-31": ["09:00", "10:30", "14:00"],
    "2025-01-02": ["09:30", "11:00", "14:30", "16:00"],
    "2025-01-03": ["10:00", "11:30", "15:00", "16:30"],
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

  const handleDateClick = (day: number) => {
    const dateKey = formatDateKey(currentDate.getFullYear(), currentDate.getMonth(), day)
    const dateObj = new Date(currentDate.getFullYear(), currentDate.getMonth(), day)

    if (availability[dateKey] && dateObj >= new Date()) {
      onDateSelect({ date: dateObj, key: dateKey })
      onTimeSelect(null) // Reset time selection when date changes
    }
  }

  const selectedDateKey = selectedDate?.key
  const availableTimes = selectedDateKey ? availability[selectedDateKey] || [] : []

  return (
    <div className="space-y-6">
      {doctor && (
        <div className="bg-accent/50 p-4 rounded-lg">
          <h3 className="font-semibold mb-2">Booking with: {doctor.name}</h3>
          <p className="text-sm text-muted-foreground">
            {doctor.specialization} • Available: {doctor.availability}
          </p>
        </div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Calendar */}
        <Card>
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle>Select Date</CardTitle>
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
                  return <div key={index} className="p-2 h-10"></div>
                }

                const dateKey = formatDateKey(currentDate.getFullYear(), currentDate.getMonth(), day)
                const dateObj = new Date(currentDate.getFullYear(), currentDate.getMonth(), day)
                const isAvailable = availability[dateKey] && dateObj >= new Date()
                const isSelected = selectedDateKey === dateKey
                const isPast = dateObj < new Date()

                return (
                  <Button
                    key={day}
                    variant={isSelected ? "default" : "ghost"}
                    size="sm"
                    className={`h-10 p-0 ${
                      !isAvailable || isPast ? "opacity-50 cursor-not-allowed" : "hover:bg-accent"
                    }`}
                    onClick={() => handleDateClick(day)}
                    disabled={!isAvailable || isPast}
                  >
                    {day}
                  </Button>
                )
              })}
            </div>
          </CardContent>
        </Card>

        {/* Time Slots */}
        <Card>
          <CardHeader>
            <CardTitle>Select Time</CardTitle>
            {selectedDate && (
              <p className="text-sm text-muted-foreground">
                {selectedDate.date.toLocaleDateString("en-US", {
                  weekday: "long",
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                })}
              </p>
            )}
          </CardHeader>
          <CardContent>
            {!selectedDate ? (
              <p className="text-muted-foreground text-center py-8">Please select a date first</p>
            ) : availableTimes.length === 0 ? (
              <p className="text-muted-foreground text-center py-8">No available times for this date</p>
            ) : (
              <div className="grid grid-cols-2 gap-3">
                {availableTimes.map((time) => (
                  <Button
                    key={time}
                    variant={selectedTime === time ? "default" : "outline"}
                    className="justify-start bg-transparent"
                    onClick={() => onTimeSelect(time)}
                  >
                    <Clock className="h-4 w-4 mr-2" />
                    {time}
                  </Button>
                ))}
              </div>
            )}
          </CardContent>
        </Card>
      </div>

      {selectedDate && selectedTime && (
        <Card className="bg-primary/5 border-primary/20">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <h4 className="font-semibold">Selected Appointment</h4>
                <p className="text-sm text-muted-foreground">
                  {selectedDate.date.toLocaleDateString("en-US", {
                    weekday: "long",
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                  })}{" "}
                  at {selectedTime}
                </p>
              </div>
              <Badge variant="default">Confirmed</Badge>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  )
}
