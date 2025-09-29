import { Progress } from "@/components/ui/progress"
import { Heart, Activity, Moon, Droplets } from "lucide-react"

export function HealthMetrics() {
  const metrics = [
    {
      name: "Heart Rate",
      value: 72,
      unit: "bpm",
      progress: 75,
      icon: <Heart className="h-4 w-4 text-red-500" />,
      status: "Normal",
    },
    {
      name: "Energy Level",
      value: 8.0,
      unit: "/10",
      progress: 80,
      icon: <Activity className="h-4 w-4 text-orange-500" />,
      status: "Good",
    },
    {
      name: "Sleep Quality",
      value: 8.2,
      unit: "/10",
      progress: 82,
      icon: <Moon className="h-4 w-4 text-blue-500" />,
      status: "Excellent",
    },
    {
      name: "Hydration",
      value: 2.1,
      unit: "L",
      progress: 70,
      icon: <Droplets className="h-4 w-4 text-cyan-500" />,
      status: "Good",
    },
  ]

  return (
    <div className="space-y-4">
      {metrics.map((metric, index) => (
        <div key={index} className="space-y-2">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              {metric.icon}
              <span className="text-sm font-medium">{metric.name}</span>
            </div>
            <div className="text-right">
              <span className="text-sm font-bold">
                {metric.value}
                {metric.unit}
              </span>
              <p className="text-xs text-muted-foreground">{metric.status}</p>
            </div>
          </div>
          <Progress value={metric.progress} className="h-2" />
        </div>
      ))}
    </div>
  )
}
