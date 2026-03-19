"use client"

import { useEffect, useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { BookOpen, Clock, Trophy, Flame } from "lucide-react"
import { createClient } from "@/lib/supabase/client"
import { useUser } from "@/lib/user-context"

interface Stats {
  coursesEnrolled: number
  hoursLearned: number
  certificates: number
  streakDays: number
}

export function StatsCards() {
  const { user, profile } = useUser()
  const [stats, setStats] = useState<Stats>({
    coursesEnrolled: 0,
    hoursLearned: 0,
    certificates: 0,
    streakDays: 0,
  })
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchStats = async () => {
      if (!user) {
        setLoading(false)
        return
      }

      const supabase = createClient()

      // Fetch enrollment count
      const { count: enrollmentCount } = await supabase
        .from("enrollments")
        .select("*", { count: "exact", head: true })
        .eq("user_id", user.id)

      // Fetch certificates count
      const { count: certificateCount } = await supabase
        .from("certificates")
        .select("*", { count: "exact", head: true })
        .eq("user_id", user.id)

      setStats({
        coursesEnrolled: enrollmentCount || 0,
        hoursLearned: profile?.total_hours_learned || 0,
        certificates: certificateCount || 0,
        streakDays: profile?.streak_days || 0,
      })
      setLoading(false)
    }

    fetchStats()
  }, [user, profile])

  const statItems = [
    {
      title: "Courses Enrolled",
      value: loading ? "-" : stats.coursesEnrolled.toString(),
      change: "Keep learning!",
      icon: BookOpen,
    },
    {
      title: "Hours Learned",
      value: loading ? "-" : stats.hoursLearned.toFixed(1),
      change: "Total time",
      icon: Clock,
    },
    {
      title: "Certificates",
      value: loading ? "-" : stats.certificates.toString(),
      change: "Earned",
      icon: Trophy,
    },
    {
      title: "Day Streak",
      value: loading ? "-" : stats.streakDays.toString(),
      change: stats.streakDays > 0 ? "Keep it up!" : "Start learning!",
      icon: Flame,
    },
  ]

  return (
    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
      {statItems.map((stat) => (
        <Card key={stat.title}>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              {stat.title}
            </CardTitle>
            <stat.icon className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stat.value}</div>
            <p className="text-xs text-muted-foreground mt-1">{stat.change}</p>
          </CardContent>
        </Card>
      ))}
    </div>
  )
}
