"use client"

import { Button } from "@/components/ui/button"
import { Leaf, Home, Users, Calendar, BarChart3, Settings, LogOut, MessageCircle } from "lucide-react"
import Link from "next/link"
import { LanguageSwitcher } from "@/components/language-switcher"

interface DoctorSidebarProps {
  activeTab: string
  setActiveTab: (tab: string) => void
  onLogout?: () => void
}

export function DoctorSidebar({ activeTab, setActiveTab, onLogout }: DoctorSidebarProps) {
  const menuItems = [
    { id: "overview", label: "Overview", icon: Home },
    { id: "patients", label: "Patients", icon: Users },
    { id: "schedule", label: "Schedule", icon: Calendar },
    { id: "messages", label: "Messages", icon: MessageCircle },
    { id: "analysis", label: "Analysis", icon: BarChart3 },
    { id: "profile", label: "My Profile", icon: Settings },
  ]

  const handleLogout = () => {
    if (onLogout) {
      onLogout()
    } else {
      alert("Logout functionality would redirect to login page")
    }
  }

  return (
    <div className="w-64 bg-card border-r border-border flex flex-col">
      {/* Logo */}
      <div className="p-6 border-b border-border">
        <Link href="/" className="flex items-center gap-2">
          <Leaf className="h-8 w-8 text-primary" />
          <span className="text-xl font-bold text-foreground">AyurSutra</span>
        </Link>
        <p className="text-xs text-muted-foreground mt-1">Doctor Portal</p>
      </div>

      {/* Navigation */}
      <nav className="flex-1 p-4">
        <div className="space-y-2">
          {menuItems.map((item) => {
            const Icon = item.icon
            return (
              <Button
                key={item.id}
                variant={activeTab === item.id ? "default" : "ghost"}
                className="w-full justify-start"
                onClick={() => setActiveTab(item.id)}
              >
                <Icon className="h-4 w-4 mr-3" />
                {item.label}
              </Button>
            )
          })}
        </div>
      </nav>

      {/* Bottom Actions */}
      <div className="p-4 border-t border-border space-y-2">
        <div className="mb-2">
          <LanguageSwitcher variant="ghost" showText={false} />
        </div>
        <Button
          variant="ghost"
          className="w-full justify-start text-destructive hover:text-destructive"
          onClick={handleLogout}
        >
          <LogOut className="h-4 w-4 mr-3" />
          Sign Out
        </Button>
      </div>
    </div>
  )
}
