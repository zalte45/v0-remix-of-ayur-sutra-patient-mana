import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Calendar, Clock, User } from "lucide-react"

interface Session {
  id: number
  therapy: string
  date: string
  time: string
  duration: string
  doctor: string
  status: string
}

interface UpcomingSessionsProps {
  sessions: Session[]
}

export function UpcomingSessions({ sessions }: UpcomingSessionsProps) {
  return (
    <div className="space-y-4">
      {sessions.map((session) => (
        <div key={session.id} className="p-4 border rounded-lg hover:bg-accent/50 transition-colors">
          <div className="flex items-start justify-between mb-2">
            <h4 className="font-semibold text-sm">{session.therapy}</h4>
            <Badge variant={session.status === "confirmed" ? "default" : "secondary"} className="text-xs">
              {session.status}
            </Badge>
          </div>
          <div className="space-y-1 text-xs text-muted-foreground">
            <div className="flex items-center gap-1">
              <Calendar className="h-3 w-3" />
              {session.date}
            </div>
            <div className="flex items-center gap-1">
              <Clock className="h-3 w-3" />
              {session.time} • {session.duration}
            </div>
            <div className="flex items-center gap-1">
              <User className="h-3 w-3" />
              {session.doctor}
            </div>
          </div>
          <div className="flex gap-2 mt-3">
            <Button size="sm" variant="outline" className="text-xs h-7 bg-transparent">
              Reschedule
            </Button>
            <Button size="sm" variant="ghost" className="text-xs h-7">
              Cancel
            </Button>
          </div>
        </div>
      ))}
    </div>
  )
}
