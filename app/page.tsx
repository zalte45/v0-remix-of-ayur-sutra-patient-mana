"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Leaf, Calendar, Users, BarChart3, Moon, Sun } from "lucide-react"
import { useTheme } from "next-themes"
import { motion } from "framer-motion"
import { useEffect, useState } from "react"
import Link from "next/link"
import AIChatbot from "@/components/ai-chatbot"

export default function HomePage() {
  const { theme, setTheme } = useTheme()
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) return null

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border bg-card/50 backdrop-blur-sm sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Leaf className="h-8 w-8 text-primary" />
            <h1 className="text-2xl font-bold text-foreground">AyurSutra</h1>
          </div>
          <div className="flex items-center gap-4">
            <Button variant="ghost" size="icon" onClick={() => setTheme(theme === "dark" ? "light" : "dark")}>
              {theme === "dark" ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
            </Button>
            <Button variant="ghost" asChild>
              <Link href="/auth/login">Patient Login</Link>
            </Button>
            <Button variant="outline" asChild>
              <Link href="/auth/login">Doctor Login</Link>
            </Button>
            <Button asChild>
              <Link href="/auth/register">Book Therapy</Link>
            </Button>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative py-20 overflow-hidden">
        <div
          className="absolute inset-0 bg-gradient-to-br from-primary/10 via-accent/20 to-secondary/10"
          style={{
            backgroundImage: `url('/ayurveda-herbs-lotus-meditation-peaceful-nature.jpg')`,
          }}
        />
        <div className="absolute inset-0 bg-background/80" />

        <div className="container mx-auto px-4 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center max-w-4xl mx-auto"
          >
            <Badge variant="secondary" className="mb-4">
              Ayurveda-Powered Healthcare
            </Badge>
            <h2 className="text-5xl md:text-6xl font-bold text-foreground mb-6 text-balance">
              Smart Panchakarma Patient Management & Therapy Scheduling
            </h2>
            <p className="text-xl text-muted-foreground mb-8 text-pretty max-w-2xl mx-auto">
              Streamline your Ayurvedic practice with our comprehensive patient management system. Schedule therapies,
              track progress, and provide holistic care with ancient wisdom and modern technology.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" className="text-lg px-8" asChild>
                <Link href="/auth/register">
                  <Calendar className="mr-2 h-5 w-5" />
                  Book Therapy Session
                </Link>
              </Button>
              <Button size="lg" variant="outline" className="text-lg px-8 bg-transparent" asChild>
                <Link href="/auth/login">
                  <Users className="mr-2 h-5 w-5" />
                  Login Portal
                </Link>
              </Button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-card/30">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h3 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
              Comprehensive Panchakarma Management
            </h3>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Everything you need to manage your Ayurvedic practice efficiently and provide exceptional patient care.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                icon: <Calendar className="h-8 w-8 text-primary" />,
                title: "Smart Scheduling",
                description: "Intelligent therapy scheduling with automated reminders and conflict resolution.",
              },
              {
                icon: <Users className="h-8 w-8 text-primary" />,
                title: "Patient Management",
                description: "Comprehensive patient profiles with treatment history and progress tracking.",
              },
              {
                icon: <BarChart3 className="h-8 w-8 text-primary" />,
                title: "Analytics & Reports",
                description: "Detailed insights into treatment outcomes and practice performance.",
              },
              {
                icon: <Leaf className="h-8 w-8 text-primary" />,
                title: "Ayurveda-Focused",
                description: "Designed specifically for Panchakarma treatments and Ayurvedic practices.",
              },
              {
                icon: <Moon className="h-8 w-8 text-primary" />,
                title: "AI Assistant",
                description: "Meet AyurBot, your AI assistant for Ayurveda knowledge and wellness guidance.",
              },
              {
                icon: <Sun className="h-8 w-8 text-primary" />,
                title: "Holistic Care",
                description: "Track complete wellness journey from consultation to recovery.",
              },
            ].map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <Card className="h-full hover:shadow-lg transition-shadow duration-300">
                  <CardHeader>
                    <div className="mb-4">{feature.icon}</div>
                    <CardTitle className="text-xl">{feature.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <CardDescription className="text-base">{feature.description}</CardDescription>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* About Panchakarma Section */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
            >
              <h3 className="text-3xl md:text-4xl font-bold text-foreground mb-6">About Panchakarma</h3>
              <p className="text-lg text-muted-foreground mb-6">
                Panchakarma is the cornerstone of Ayurvedic healing, offering a comprehensive detoxification and
                rejuvenation program that addresses the root causes of illness.
              </p>

              <div className="space-y-4">
                {[
                  {
                    title: "Detoxification",
                    description: "Deep cleansing of toxins from body and mind",
                  },
                  {
                    title: "Rejuvenation",
                    description: "Restoration of natural balance and vitality",
                  },
                  {
                    title: "Chronic Disease Management",
                    description: "Holistic approach to managing long-term health conditions",
                  },
                ].map((item, index) => (
                  <div key={index} className="flex gap-4">
                    <div className="flex-shrink-0 w-2 h-2 bg-primary rounded-full mt-3" />
                    <div>
                      <h4 className="font-semibold text-foreground mb-1">{item.title}</h4>
                      <p className="text-muted-foreground">{item.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className="relative"
            >
              <img
                src="/ayurveda-panchakarma-therapy-herbs-oil-massage-pea.jpg"
                alt="Panchakarma Therapy"
                className="rounded-lg shadow-lg w-full"
              />
            </motion.div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-primary/5">
        <div className="container mx-auto px-4 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <h3 className="text-3xl md:text-4xl font-bold text-foreground mb-6">Ready to Transform Your Practice?</h3>
            <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto">
              Join hundreds of Ayurvedic practitioners who trust AyurSutra for their patient management needs.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" className="text-lg px-8" asChild>
                <Link href="/auth/register">
                  <Calendar className="mr-2 h-5 w-5" />
                  Book Therapy Session
                </Link>
              </Button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-border bg-card/50 py-12">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row items-center justify-between">
            <div className="flex items-center gap-2 mb-4 md:mb-0">
              <Leaf className="h-6 w-6 text-primary" />
              <span className="text-lg font-semibold text-foreground">AyurSutra</span>
            </div>
            <p className="text-muted-foreground text-center md:text-right">
              © 2025 AyurSutra. Empowering Ayurvedic practices with modern technology.
            </p>
          </div>
        </div>
      </footer>

      <AIChatbot />
    </div>
  )
}
