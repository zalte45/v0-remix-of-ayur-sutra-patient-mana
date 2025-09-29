"use client"

import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Clock, IndianRupee } from "lucide-react"

const therapies = [
  {
    id: 1,
    name: "Abhyanga Massage",
    description: "Full body oil massage with warm herbal oils for deep relaxation and detoxification",
    duration: 60,
    price: 2500,
    benefits: ["Stress Relief", "Improved Circulation", "Muscle Relaxation"],
    category: "Massage Therapy",
  },
  {
    id: 2,
    name: "Shirodhara",
    description: "Continuous pouring of warm oil on the forehead for mental clarity and relaxation",
    duration: 45,
    price: 3000,
    benefits: ["Mental Clarity", "Stress Reduction", "Better Sleep"],
    category: "Specialized Therapy",
  },
  {
    id: 3,
    name: "Panchakarma Assessment",
    description: "Comprehensive evaluation and personalized treatment plan development",
    duration: 45,
    price: 1500,
    benefits: ["Personalized Plan", "Health Assessment", "Treatment Guidance"],
    category: "Consultation",
  },
  {
    id: 4,
    name: "Nasya Therapy",
    description: "Nasal administration of medicated oils for respiratory and sinus health",
    duration: 30,
    price: 1800,
    benefits: ["Respiratory Health", "Sinus Relief", "Mental Clarity"],
    category: "Specialized Therapy",
  },
  {
    id: 5,
    name: "Udvartana",
    description: "Herbal powder massage for weight management and skin health",
    duration: 60,
    price: 2800,
    benefits: ["Weight Management", "Skin Health", "Improved Metabolism"],
    category: "Massage Therapy",
  },
  {
    id: 6,
    name: "Ayurvedic Consultation",
    description: "Initial consultation with detailed health assessment and treatment recommendations",
    duration: 30,
    price: 1200,
    benefits: ["Health Assessment", "Treatment Plan", "Lifestyle Guidance"],
    category: "Consultation",
  },
]

interface TherapySelectorProps {
  selectedTherapy: any
  onSelect: (therapy: any) => void
}

export function TherapySelector({ selectedTherapy, onSelect }: TherapySelectorProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      {therapies.map((therapy) => (
        <Card
          key={therapy.id}
          className={`cursor-pointer transition-all duration-200 hover:shadow-lg ${
            selectedTherapy?.id === therapy.id ? "ring-2 ring-primary bg-primary/5" : ""
          }`}
          onClick={() => onSelect(therapy)}
        >
          <CardContent className="p-6">
            <div className="space-y-4">
              <div className="flex items-start justify-between">
                <div>
                  <h3 className="font-semibold text-lg">{therapy.name}</h3>
                  <Badge variant="secondary" className="mt-1">
                    {therapy.category}
                  </Badge>
                </div>
                <div className="text-right">
                  <div className="flex items-center text-primary font-bold">
                    <IndianRupee className="h-4 w-4" />
                    {therapy.price}
                  </div>
                  <div className="flex items-center text-sm text-muted-foreground mt-1">
                    <Clock className="h-3 w-3 mr-1" />
                    {therapy.duration} min
                  </div>
                </div>
              </div>

              <p className="text-sm text-muted-foreground">{therapy.description}</p>

              <div>
                <h4 className="text-sm font-medium mb-2">Key Benefits:</h4>
                <div className="flex flex-wrap gap-1">
                  {therapy.benefits.map((benefit, index) => (
                    <Badge key={index} variant="outline" className="text-xs">
                      {benefit}
                    </Badge>
                  ))}
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  )
}
