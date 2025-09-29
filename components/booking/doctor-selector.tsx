"use client"

import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Star, MapPin, Calendar } from "lucide-react"

const doctors = [
  {
    id: 1,
    name: "Dr. Rajesh Kumar",
    specialization: "Panchakarma Specialist",
    experience: "15 years",
    rating: 4.8,
    reviews: 156,
    location: "Mumbai, Maharashtra",
    languages: ["Hindi", "English", "Marathi"],
    availability: "Mon-Sat",
    nextAvailable: "Tomorrow",
    bio: "Specialized in traditional Panchakarma treatments with extensive experience in stress management and chronic disease treatment.",
    avatar: "RK",
  },
  {
    id: 2,
    name: "Dr. Priya Sharma",
    specialization: "Ayurvedic Medicine",
    experience: "12 years",
    rating: 4.9,
    reviews: 203,
    location: "Mumbai, Maharashtra",
    languages: ["Hindi", "English", "Gujarati"],
    availability: "Mon-Fri",
    nextAvailable: "Dec 28",
    bio: "Expert in women's health and reproductive wellness through Ayurvedic principles and personalized treatment plans.",
    avatar: "PS",
  },
  {
    id: 3,
    name: "Dr. Amit Patel",
    specialization: "Kayachikitsa",
    experience: "18 years",
    rating: 4.7,
    reviews: 189,
    location: "Mumbai, Maharashtra",
    languages: ["Hindi", "English", "Gujarati"],
    availability: "Tue-Sun",
    nextAvailable: "Dec 29",
    bio: "Focuses on digestive health and metabolic disorders using classical Ayurvedic treatments and modern diagnostic approaches.",
    avatar: "AP",
  },
]

interface DoctorSelectorProps {
  selectedDoctor: any
  onSelect: (doctor: any) => void
  therapy: any
}

export function DoctorSelector({ selectedDoctor, onSelect, therapy }: DoctorSelectorProps) {
  return (
    <div className="space-y-6">
      {therapy && (
        <div className="bg-accent/50 p-4 rounded-lg">
          <h3 className="font-semibold mb-2">Selected Therapy: {therapy.name}</h3>
          <p className="text-sm text-muted-foreground">
            Duration: {therapy.duration} minutes • Price: ₹{therapy.price}
          </p>
        </div>
      )}

      <div className="grid gap-6">
        {doctors.map((doctor) => (
          <Card
            key={doctor.id}
            className={`cursor-pointer transition-all duration-200 hover:shadow-lg ${
              selectedDoctor?.id === doctor.id ? "ring-2 ring-primary bg-primary/5" : ""
            }`}
            onClick={() => onSelect(doctor)}
          >
            <CardContent className="p-6">
              <div className="flex gap-6">
                <Avatar className="h-20 w-20">
                  <AvatarImage src="/placeholder.svg?height=80&width=80" />
                  <AvatarFallback className="text-lg">{doctor.avatar}</AvatarFallback>
                </Avatar>

                <div className="flex-1 space-y-3">
                  <div>
                    <h3 className="text-xl font-semibold">{doctor.name}</h3>
                    <p className="text-primary font-medium">{doctor.specialization}</p>
                    <p className="text-sm text-muted-foreground">{doctor.experience} experience</p>
                  </div>

                  <div className="flex items-center gap-4 text-sm">
                    <div className="flex items-center gap-1">
                      <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                      <span className="font-medium">{doctor.rating}</span>
                      <span className="text-muted-foreground">({doctor.reviews} reviews)</span>
                    </div>
                    <div className="flex items-center gap-1 text-muted-foreground">
                      <MapPin className="h-4 w-4" />
                      {doctor.location}
                    </div>
                  </div>

                  <p className="text-sm text-muted-foreground">{doctor.bio}</p>

                  <div className="flex items-center justify-between">
                    <div className="space-y-1">
                      <div className="flex items-center gap-2">
                        <span className="text-sm font-medium">Languages:</span>
                        <div className="flex gap-1">
                          {doctor.languages.map((lang, index) => (
                            <Badge key={index} variant="outline" className="text-xs">
                              {lang}
                            </Badge>
                          ))}
                        </div>
                      </div>
                      <div className="flex items-center gap-2 text-sm">
                        <Calendar className="h-4 w-4 text-muted-foreground" />
                        <span>Available: {doctor.availability}</span>
                        <span className="text-primary font-medium">Next: {doctor.nextAvailable}</span>
                      </div>
                    </div>
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
