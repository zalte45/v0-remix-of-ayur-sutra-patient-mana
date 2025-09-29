"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Separator } from "@/components/ui/separator"
import { Calendar, Clock, User, MapPin, IndianRupee, FileText } from "lucide-react"

interface BookingConfirmationProps {
  therapy: any
  doctor: any
  date: any
  time: any
  notes: string
}

export function BookingConfirmation({ therapy, doctor, date, time, notes }: BookingConfirmationProps) {
  if (!therapy || !doctor || !date || !time) {
    return (
      <Card>
        <CardContent className="p-8 text-center">
          <p className="text-muted-foreground">Please complete all previous steps to see the confirmation.</p>
        </CardContent>
      </Card>
    )
  }

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="text-center">Booking Confirmation</CardTitle>
          <p className="text-center text-muted-foreground">Please review your appointment details</p>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Therapy Details */}
          <div>
            <h3 className="font-semibold mb-3 flex items-center gap-2">
              <FileText className="h-5 w-5 text-primary" />
              Therapy Details
            </h3>
            <div className="bg-accent/50 p-4 rounded-lg">
              <div className="flex items-start justify-between">
                <div>
                  <h4 className="font-semibold">{therapy.name}</h4>
                  <p className="text-sm text-muted-foreground mt-1">{therapy.description}</p>
                  <div className="flex gap-2 mt-2">
                    {therapy.benefits.map((benefit: string, index: number) => (
                      <Badge key={index} variant="outline" className="text-xs">
                        {benefit}
                      </Badge>
                    ))}
                  </div>
                </div>
                <div className="text-right">
                  <div className="flex items-center text-primary font-bold text-lg">
                    <IndianRupee className="h-5 w-5" />
                    {therapy.price}
                  </div>
                  <div className="flex items-center text-sm text-muted-foreground mt-1">
                    <Clock className="h-4 w-4 mr-1" />
                    {therapy.duration} minutes
                  </div>
                </div>
              </div>
            </div>
          </div>

          <Separator />

          {/* Doctor Details */}
          <div>
            <h3 className="font-semibold mb-3 flex items-center gap-2">
              <User className="h-5 w-5 text-primary" />
              Your Practitioner
            </h3>
            <div className="flex items-center gap-4 p-4 bg-accent/50 rounded-lg">
              <Avatar className="h-16 w-16">
                <AvatarImage src="/placeholder.svg?height=64&width=64" />
                <AvatarFallback className="text-lg">{doctor.avatar}</AvatarFallback>
              </Avatar>
              <div className="flex-1">
                <h4 className="font-semibold">{doctor.name}</h4>
                <p className="text-primary font-medium">{doctor.specialization}</p>
                <p className="text-sm text-muted-foreground">{doctor.experience} experience</p>
                <div className="flex items-center gap-2 mt-1">
                  <MapPin className="h-4 w-4 text-muted-foreground" />
                  <span className="text-sm text-muted-foreground">{doctor.location}</span>
                </div>
              </div>
            </div>
          </div>

          <Separator />

          {/* Appointment Details */}
          <div>
            <h3 className="font-semibold mb-3 flex items-center gap-2">
              <Calendar className="h-5 w-5 text-primary" />
              Appointment Details
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="p-4 bg-accent/50 rounded-lg">
                <div className="flex items-center gap-2 mb-2">
                  <Calendar className="h-4 w-4 text-primary" />
                  <span className="font-medium">Date</span>
                </div>
                <p className="text-lg">
                  {date.date.toLocaleDateString("en-US", {
                    weekday: "long",
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                  })}
                </p>
              </div>
              <div className="p-4 bg-accent/50 rounded-lg">
                <div className="flex items-center gap-2 mb-2">
                  <Clock className="h-4 w-4 text-primary" />
                  <span className="font-medium">Time</span>
                </div>
                <p className="text-lg">{time}</p>
              </div>
            </div>
          </div>

          {notes && (
            <>
              <Separator />
              <div>
                <h3 className="font-semibold mb-3">Additional Notes</h3>
                <div className="p-4 bg-accent/50 rounded-lg">
                  <p className="text-sm">{notes}</p>
                </div>
              </div>
            </>
          )}

          <Separator />

          {/* Summary */}
          <div className="bg-primary/5 p-4 rounded-lg border border-primary/20">
            <div className="flex items-center justify-between mb-2">
              <span className="font-semibold">Total Amount</span>
              <div className="flex items-center text-primary font-bold text-xl">
                <IndianRupee className="h-5 w-5" />
                {therapy.price}
              </div>
            </div>
            <p className="text-sm text-muted-foreground">Payment will be collected at the time of your appointment</p>
          </div>

          {/* Important Notes */}
          <div className="bg-accent/50 p-4 rounded-lg">
            <h4 className="font-semibold mb-2">Important Notes:</h4>
            <ul className="text-sm text-muted-foreground space-y-1">
              <li>• Please arrive 15 minutes before your appointment time</li>
              <li>• Bring a valid ID and any relevant medical records</li>
              <li>• Cancellations must be made at least 24 hours in advance</li>
              <li>• You will receive a confirmation email and SMS shortly</li>
            </ul>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
