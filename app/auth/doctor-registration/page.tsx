"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { Leaf, Mail, User, Phone, Stethoscope, GraduationCap, MapPin } from "lucide-react"
import Link from "next/link"

export default function DoctorRegistrationPage() {
  const [isLoading, setIsLoading] = useState(false)

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    // Simulate registration process
    setTimeout(() => {
      setIsLoading(false)
      alert("Registration request submitted! We'll review your application and contact you within 2-3 business days.")
      window.location.href = "/"
    }, 2000)
  }

  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-4">
      <div className="w-full max-w-2xl">
        <div className="text-center mb-8">
          <Link href="/" className="inline-flex items-center gap-2 mb-4">
            <Leaf className="h-8 w-8 text-primary" />
            <span className="text-2xl font-bold text-foreground">AyurSutra</span>
          </Link>
          <h1 className="text-2xl font-bold text-foreground mb-2">Doctor Registration</h1>
          <p className="text-muted-foreground">Apply to join our network of Ayurvedic practitioners</p>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Professional Registration</CardTitle>
            <CardDescription>
              Please provide your professional details. All applications are reviewed manually for verification.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleRegister} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="first-name">First Name</Label>
                  <div className="relative">
                    <User className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                    <Input id="first-name" type="text" placeholder="First name" className="pl-10" required />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="last-name">Last Name</Label>
                  <Input id="last-name" type="text" placeholder="Last name" required />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                    <Input id="email" type="email" placeholder="Professional email" className="pl-10" required />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="phone">Phone Number</Label>
                  <div className="relative">
                    <Phone className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                    <Input id="phone" type="tel" placeholder="Professional phone" className="pl-10" required />
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="license-number">Medical License Number</Label>
                  <div className="relative">
                    <Stethoscope className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                    <Input id="license-number" type="text" placeholder="License number" className="pl-10" required />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="specialization">Specialization</Label>
                  <Select required>
                    <SelectTrigger>
                      <SelectValue placeholder="Select specialization" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="panchakarma">Panchakarma Specialist</SelectItem>
                      <SelectItem value="general-ayurveda">General Ayurveda</SelectItem>
                      <SelectItem value="ayurvedic-medicine">Ayurvedic Medicine</SelectItem>
                      <SelectItem value="ayurvedic-surgery">Ayurvedic Surgery</SelectItem>
                      <SelectItem value="kayachikitsa">Kayachikitsa</SelectItem>
                      <SelectItem value="shalakya-tantra">Shalakya Tantra</SelectItem>
                      <SelectItem value="other">Other</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="qualification">Educational Qualification</Label>
                <div className="relative">
                  <GraduationCap className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                  <Input
                    id="qualification"
                    type="text"
                    placeholder="e.g., BAMS, MD (Ayurveda), PhD"
                    className="pl-10"
                    required
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="experience">Years of Experience</Label>
                <Select required>
                  <SelectTrigger>
                    <SelectValue placeholder="Select experience" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="0-2">0-2 years</SelectItem>
                    <SelectItem value="3-5">3-5 years</SelectItem>
                    <SelectItem value="6-10">6-10 years</SelectItem>
                    <SelectItem value="11-15">11-15 years</SelectItem>
                    <SelectItem value="16-20">16-20 years</SelectItem>
                    <SelectItem value="20+">20+ years</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="clinic-address">Clinic/Practice Address</Label>
                <div className="relative">
                  <MapPin className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                  <Textarea
                    id="clinic-address"
                    placeholder="Complete address of your practice"
                    className="pl-10 min-h-[80px]"
                    required
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="bio">Professional Bio</Label>
                <Textarea
                  id="bio"
                  placeholder="Brief description of your practice, expertise, and approach to Ayurvedic treatment"
                  className="min-h-[100px]"
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="references">Professional References (Optional)</Label>
                <Textarea
                  id="references"
                  placeholder="Names and contact information of professional references"
                  className="min-h-[80px]"
                />
              </div>

              <div className="bg-accent/50 p-4 rounded-lg">
                <h4 className="font-semibold text-foreground mb-2">Required Documents</h4>
                <p className="text-sm text-muted-foreground mb-3">
                  Please have the following documents ready to upload after submission:
                </p>
                <ul className="text-sm text-muted-foreground space-y-1">
                  <li>• Medical license certificate</li>
                  <li>• Educational qualification certificates</li>
                  <li>• Professional registration documents</li>
                  <li>• Recent photograph</li>
                </ul>
              </div>

              <Button type="submit" className="w-full" disabled={isLoading}>
                {isLoading ? "Submitting application..." : "Submit Application"}
              </Button>
            </form>

            <div className="mt-6 text-center text-sm">
              <span className="text-muted-foreground">Already have an account? </span>
              <Link href="/auth/login" className="text-primary hover:underline">
                Sign in
              </Link>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
