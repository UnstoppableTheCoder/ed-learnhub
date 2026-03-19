"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Video, Clock, Users } from "lucide-react"
import { createClient } from "@/lib/supabase/client"
import { format, isToday, isTomorrow, differenceInHours } from "date-fns"

interface LiveClass {
  id: string
  title: string
  teacher_name: string
  scheduled_at: string
  duration: number
  current_participants: number
  max_participants: number
  category: string
}

export function UpcomingClasses() {
  const [classes, setClasses] = useState<LiveClass[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchUpcomingClasses = async () => {
      const supabase = createClient()

      const { data } = await supabase
        .from("live_classes")
        .select(`
          id,
          title,
          scheduled_at,
          duration,
          current_participants,
          max_participants,
          category,
          teacher:profiles!live_classes_teacher_id_fkey(name)
        `)
        .gte("scheduled_at", new Date().toISOString())
        .order("scheduled_at", { ascending: true })
        .limit(3)

      if (data) {
        setClasses(
          data.map((item: any) => ({
            id: item.id,
            title: item.title,
            teacher_name: item.teacher?.name || "Unknown",
            scheduled_at: item.scheduled_at,
            duration: item.duration,
            current_participants: item.current_participants,
            max_participants: item.max_participants,
            category: item.category,
          }))
        )
      }
      setLoading(false)
    }

    fetchUpcomingClasses()
  }, [])

  const formatScheduleTime = (dateStr: string) => {
    const date = new Date(dateStr)
    if (isToday(date)) {
      return `Today at ${format(date, "h:mm a")}`
    }
    if (isTomorrow(date)) {
      return `Tomorrow at ${format(date, "h:mm a")}`
    }
    return format(date, "MMM d 'at' h:mm a")
  }

  const isStartingSoon = (dateStr: string) => {
    const hoursUntil = differenceInHours(new Date(dateStr), new Date())
    return hoursUntil <= 2 && hoursUntil >= 0
  }

  return (
    <Card>
      <CardHeader className="pb-2">
        <CardTitle className="flex items-center gap-2">
          <Video className="h-5 w-5 text-primary" />
          Live Classes
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {loading ? (
          <div className="space-y-3">
            {[...Array(2)].map((_, i) => (
              <div key={i} className="h-32 bg-muted animate-pulse rounded-lg" />
            ))}
          </div>
        ) : classes.length > 0 ? (
          classes.map((classItem) => (
            <div
              key={classItem.id}
              className="p-3 rounded-lg border bg-card space-y-2"
            >
              <div className="flex items-start justify-between gap-2">
                <h4 className="font-medium text-sm line-clamp-1">
                  {classItem.title}
                </h4>
                {isStartingSoon(classItem.scheduled_at) && (
                  <Badge variant="destructive" className="text-xs">
                    Soon
                  </Badge>
                )}
              </div>
              <p className="text-xs text-muted-foreground">
                {classItem.teacher_name}
              </p>
              <div className="flex items-center gap-3 text-xs text-muted-foreground">
                <span className="flex items-center gap-1">
                  <Clock className="h-3 w-3" />
                  {formatScheduleTime(classItem.scheduled_at)}
                </span>
                <span className="flex items-center gap-1">
                  <Users className="h-3 w-3" />
                  {classItem.current_participants}/{classItem.max_participants}
                </span>
              </div>
              <Link href={`/live-classes/${classItem.id}`}>
                <Button size="sm" variant="outline" className="w-full mt-2">
                  {isStartingSoon(classItem.scheduled_at) ? "Join Now" : "Set Reminder"}
                </Button>
              </Link>
            </div>
          ))
        ) : (
          <div className="text-center py-4">
            <p className="text-muted-foreground text-sm mb-3">No upcoming live classes.</p>
            <Link href="/live-classes">
              <Button size="sm" variant="outline">Browse Classes</Button>
            </Link>
          </div>
        )}
      </CardContent>
    </Card>
  )
}
