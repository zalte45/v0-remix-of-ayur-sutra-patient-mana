"use client"

import { Button } from "@/components/ui/button"
import { Leaf, Home, Calendar, User, BookOpen, Settings, LogOut } from "lucide-react"
import Link from "next/link"
import { LanguageSwitcher } from "@/components/language-switcher"

interface PatientSidebarProps {
  activeTab: string
  setActiveTab: (tab: string) => void
  onLogout?: () => void
}

export function PatientSidebar({ activeTab, setActiveTab, onLogout }: PatientSidebarProps) {
  const menuItems = [
    { id: "overview", label: "Overview", icon: Home },
    { id: "appointments", label: "Appointments", icon: Calendar },
    { id: "profile", label: "My Profile", icon: User },
    { id: "resources", label: "Resources", icon: BookOpen },
    { id: "settings", label: "Settings", icon: Settings },
  ]

  return (
    <div className="w-64 bg-card border-r border-border flex flex-col">
      {/* Logo */}
      <div className="p-6 border-b border-border">
        <Link href="/" className="flex items-center gap-2">
          <Leaf className="h-8 w-8 text-primary" />
          <span className="text-xl font-bold text-foreground">AyurSutra</span>
        </Link>
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
          onClick={onLogout}
        >
          <LogOut className="h-4 w-4 mr-3" />
          Sign Out
        </Button>
      </div>
    </div>
  )
}
