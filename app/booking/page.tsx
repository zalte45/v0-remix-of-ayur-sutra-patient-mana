"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Textarea } from "@/components/ui/textarea"
import { Leaf, ArrowLeft, Check } from "lucide-react"
import Link from "next/link"
import { BookingCalendar } from "@/components/booking/booking-calendar"
import { TherapySelector } from "@/components/booking/therapy-selector"
import { DoctorSelector } from "@/components/booking/doctor-selector"
import { BookingConfirmation } from "@/components/booking/booking-confirmation"

export default function BookingPage() {
  const [step, setStep] = useState(1)
  const [selectedTherapy, setSelectedTherapy] = useState(null)
  const [selectedDoctor, setSelectedDoctor] = useState(null)
  const [selectedDate, setSelectedDate] = useState(null)
  const [selectedTime, setSelectedTime] = useState(null)
  const [notes, setNotes] = useState("")

  const steps = [
    { number: 1, title: "Select Therapy", description: "Choose your treatment" },
    { number: 2, title: "Choose Doctor", description: "Select your practitioner" },
    { number: 3, title: "Pick Date & Time", description: "Schedule your session" },
    { number: 4, title: "Confirmation", description: "Review and confirm" },
  ]

  const handleNext = () => {
    if (step < 4) setStep(step + 1)
  }

  const handleBack = () => {
    if (step > 1) setStep(step - 1)
  }

  const canProceed = () => {
    switch (step) {
      case 1:
        return selectedTherapy !== null
      case 2:
        return selectedDoctor !== null
      case 3:
        return selectedDate !== null && selectedTime !== null
      default:
        return true
    }
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border bg-card/50 backdrop-blur-sm">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2">
            <Leaf className="h-8 w-8 text-primary" />
            <span className="text-xl font-bold text-foreground">AyurSutra</span>
          </Link>
          <Link href="/patient/dashboard">
            <Button variant="outline">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Dashboard
            </Button>
          </Link>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        {/* Progress Steps */}
        <div className="mb-8">
          <div className="flex items-center justify-center mb-6">
            {steps.map((stepItem, index) => (
              <div key={stepItem.number} className="flex items-center">
                <div className="flex flex-col items-center">
                  <div
                    className={`w-10 h-10 rounded-full flex items-center justify-center text-sm font-medium ${
                      step >= stepItem.number ? "bg-primary text-primary-foreground" : "bg-muted text-muted-foreground"
                    }`}
                  >
                    {step > stepItem.number ? <Check className="h-5 w-5" /> : stepItem.number}
                  </div>
                  <div className="text-center mt-2">
                    <p className="text-sm font-medium">{stepItem.title}</p>
                    <p className="text-xs text-muted-foreground">{stepItem.description}</p>
                  </div>
                </div>
                {index < steps.length - 1 && (
                  <div className={`w-16 h-0.5 mx-4 ${step > stepItem.number ? "bg-primary" : "bg-muted"}`} />
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Step Content */}
        <div className="max-w-4xl mx-auto">
          {step === 1 && (
            <Card>
              <CardHeader>
                <CardTitle>Select Your Therapy</CardTitle>
                <CardDescription>Choose the Ayurvedic treatment that best suits your needs</CardDescription>
              </CardHeader>
              <CardContent>
                <TherapySelector selectedTherapy={selectedTherapy} onSelect={setSelectedTherapy} />
              </CardContent>
            </Card>
          )}

          {step === 2 && (
            <Card>
              <CardHeader>
                <CardTitle>Choose Your Doctor</CardTitle>
                <CardDescription>Select from our experienced Ayurvedic practitioners</CardDescription>
              </CardHeader>
              <CardContent>
                <DoctorSelector
                  selectedDoctor={selectedDoctor}
                  onSelect={setSelectedDoctor}
                  therapy={selectedTherapy}
                />
              </CardContent>
            </Card>
          )}

          {step === 3 && (
            <Card>
              <CardHeader>
                <CardTitle>Schedule Your Session</CardTitle>
                <CardDescription>Pick a convenient date and time for your appointment</CardDescription>
              </CardHeader>
              <CardContent>
                <BookingCalendar
                  selectedDate={selectedDate}
                  selectedTime={selectedTime}
                  onDateSelect={setSelectedDate}
                  onTimeSelect={setSelectedTime}
                  doctor={selectedDoctor}
                />
                <div className="mt-6">
                  <label className="text-sm font-medium mb-2 block">Additional Notes (Optional)</label>
                  <Textarea
                    placeholder="Any specific concerns or requirements for your session..."
                    value={notes}
                    onChange={(e) => setNotes(e.target.value)}
                    className="min-h-[100px]"
                  />
                </div>
              </CardContent>
            </Card>
          )}

          {step === 4 && (
            <BookingConfirmation
              therapy={selectedTherapy}
              doctor={selectedDoctor}
              date={selectedDate}
              time={selectedTime}
              notes={notes}
            />
          )}

          {/* Navigation Buttons */}
          <div className="flex items-center justify-between mt-8">
            <Button variant="outline" onClick={handleBack} disabled={step === 1}>
              Back
            </Button>
            <div className="flex gap-2">
              {step < 4 ? (
                <Button onClick={handleNext} disabled={!canProceed()}>
                  Continue
                </Button>
              ) : (
                <Button className="bg-primary">Confirm Booking</Button>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
