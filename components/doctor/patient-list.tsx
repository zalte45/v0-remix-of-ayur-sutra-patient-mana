"use client"

import { useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Eye, Edit, Calendar, Phone, Mail } from "lucide-react"

export function PatientList() {
  const [filter, setFilter] = useState("all")

  const patients = [
    {
      id: 1,
      name: "Priya Sharma",
      age: 34,
      gender: "Female",
      phone: "+91 98765 43210",
      email: "priya.sharma@email.com",
      condition: "Stress Management",
      lastVisit: "Today",
      nextAppointment: "Tomorrow, 10:00 AM",
      status: "active",
      progress: "Improving",
      avatar: "PS",
    },
    {
      id: 2,
      name: "Amit Patel",
      age: 42,
      gender: "Male",
      phone: "+91 98765 43211",
      email: "amit.patel@email.com",
      condition: "Digestive Issues",
      lastVisit: "Yesterday",
      nextAppointment: "Dec 28, 2:00 PM",
      status: "active",
      progress: "Good",
      avatar: "AP",
    },
    {
      id: 3,
      name: "Sunita Reddy",
      age: 38,
      gender: "Female",
      phone: "+91 98765 43212",
      email: "sunita.reddy@email.com",
      condition: "Joint Pain",
      lastVisit: "2 days ago",
      nextAppointment: "Dec 30, 11:00 AM",
      status: "active",
      progress: "Excellent",
      avatar: "SR",
    },
    {
      id: 4,
      name: "Vikram Singh",
      age: 45,
      gender: "Male",
      phone: "+91 98765 43213",
      email: "vikram.singh@email.com",
      condition: "Insomnia",
      lastVisit: "3 days ago",
      nextAppointment: "Jan 2, 9:00 AM",
      status: "active",
      progress: "Improving",
      avatar: "VS",
    },
    {
      id: 5,
      name: "Meera Joshi",
      age: 29,
      gender: "Female",
      phone: "+91 98765 43214",
      email: "meera.joshi@email.com",
      condition: "Skin Issues",
      lastVisit: "1 week ago",
      nextAppointment: "Not scheduled",
      status: "inactive",
      progress: "Stable",
      avatar: "MJ",
    },
  ]

  const filteredPatients = patients.filter((patient) => {
    if (filter === "all") return true
    return patient.status === filter
  })

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Select value={filter} onValueChange={setFilter}>
            <SelectTrigger className="w-40">
              <SelectValue placeholder="Filter patients" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Patients</SelectItem>
              <SelectItem value="active">Active</SelectItem>
              <SelectItem value="inactive">Inactive</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <p className="text-sm text-muted-foreground">{filteredPatients.length} patients</p>
      </div>

      <div className="grid gap-4">
        {filteredPatients.map((patient) => (
          <Card key={patient.id}>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <Avatar className="h-12 w-12">
                    <AvatarImage src="/placeholder.svg?height=48&width=48" />
                    <AvatarFallback>{patient.avatar}</AvatarFallback>
                  </Avatar>
                  <div>
                    <div className="flex items-center gap-2 mb-1">
                      <h3 className="font-semibold">{patient.name}</h3>
                      <Badge variant={patient.status === "active" ? "default" : "secondary"}>{patient.status}</Badge>
                    </div>
                    <p className="text-sm text-muted-foreground">
                      {patient.age} years • {patient.gender} • {patient.condition}
                    </p>
                    <div className="flex items-center gap-4 mt-2 text-xs text-muted-foreground">
                      <div className="flex items-center gap-1">
                        <Phone className="h-3 w-3" />
                        {patient.phone}
                      </div>
                      <div className="flex items-center gap-1">
                        <Mail className="h-3 w-3" />
                        {patient.email}
                      </div>
                    </div>
                  </div>
                </div>

                <div className="text-right">
                  <div className="space-y-2 mb-4">
                    <div>
                      <p className="text-xs text-muted-foreground">Last Visit</p>
                      <p className="text-sm font-medium">{patient.lastVisit}</p>
                    </div>
                    <div>
                      <p className="text-xs text-muted-foreground">Next Appointment</p>
                      <p className="text-sm font-medium">{patient.nextAppointment}</p>
                    </div>
                    <div>
                      <p className="text-xs text-muted-foreground">Progress</p>
                      <Badge variant="outline" className="text-xs">
                        {patient.progress}
                      </Badge>
                    </div>
                  </div>

                  <div className="flex gap-2">
                    <Button size="sm" variant="outline">
                      <Eye className="h-4 w-4 mr-1" />
                      View
                    </Button>
                    <Button size="sm" variant="outline">
                      <Edit className="h-4 w-4 mr-1" />
                      Edit
                    </Button>
                    <Button size="sm" variant="outline">
                      <Calendar className="h-4 w-4 mr-1" />
                      Schedule
                    </Button>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}
