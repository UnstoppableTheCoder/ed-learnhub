"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import Image from "next/image"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"
import { Play, Clock } from "lucide-react"
import { createClient } from "@/lib/supabase/client"
import { useUser } from "@/lib/user-context"

interface EnrolledCourse {
  id: string
  title: string
  thumbnail: string | null
  category: string
  teacher_name: string
  total_videos: number
  completed_videos: number
  progress: number
  last_accessed_at: string
}

export function RecentCourses() {
  const { user } = useUser()
  const [courses, setCourses] = useState<EnrolledCourse[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchEnrolledCourses = async () => {
      if (!user) {
        setLoading(false)
        return
      }

      const supabase = createClient()

      // Fetch enrollments with course details
      const { data: enrollments } = await supabase
        .from("enrollments")
        .select(`
          id,
          last_accessed_at,
          course:courses(
            id,
            title,
            thumbnail,
            category,
            teacher:profiles!courses_teacher_id_fkey(name)
          )
        `)
        .eq("user_id", user.id)
        .order("last_accessed_at", { ascending: false })
        .limit(3)

      if (enrollments) {
        const coursesWithProgress = await Promise.all(
          enrollments.map(async (enrollment: any) => {
            const course = enrollment.course

            // Get total videos for this course
            const { count: totalVideos } = await supabase
              .from("videos")
              .select("*", { count: "exact", head: true })
              .eq("course_id", course.id)

            // Get completed videos for this user
            const { count: completedVideos } = await supabase
              .from("progress")
              .select("*", { count: "exact", head: true })
              .eq("user_id", user.id)
              .eq("completed", true)
              .in("video_id", 
                (await supabase.from("videos").select("id").eq("course_id", course.id)).data?.map((v: any) => v.id) || []
              )

            const progress = totalVideos ? Math.round((completedVideos || 0) / totalVideos * 100) : 0

            return {
              id: course.id,
              title: course.title,
              thumbnail: course.thumbnail,
              category: course.category,
              teacher_name: course.teacher?.name || "Unknown",
              total_videos: totalVideos || 0,
              completed_videos: completedVideos || 0,
              progress,
              last_accessed_at: enrollment.last_accessed_at,
            }
          })
        )

        setCourses(coursesWithProgress)
      }
      setLoading(false)
    }

    fetchEnrolledCourses()
  }, [user])

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle>Continue Learning</CardTitle>
        <Link href="/courses">
          <Button variant="ghost" size="sm">
            View all
          </Button>
        </Link>
      </CardHeader>
      <CardContent className="space-y-4">
        {loading ? (
          <div className="space-y-4">
            {[...Array(2)].map((_, i) => (
              <div key={i} className="h-24 bg-muted animate-pulse rounded-lg" />
            ))}
          </div>
        ) : courses.length > 0 ? (
          courses.map((course) => (
            <Link key={course.id} href={`/learning/${course.id}`}>
              <div className="flex flex-col sm:flex-row gap-4 p-4 rounded-lg border bg-card hover:bg-accent/50 transition-colors">
                <div className="flex-shrink-0 w-full sm:w-32 h-20 rounded-md bg-muted relative overflow-hidden">
                  {course.thumbnail ? (
                    <Image
                      src={course.thumbnail}
                      alt={course.title}
                      fill
                      className="object-cover"
                    />
                  ) : (
                    <div className="flex items-center justify-center h-full">
                      <Play className="h-8 w-8 text-muted-foreground" />
                    </div>
                  )}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-start justify-between gap-2">
                    <div>
                      <h3 className="font-semibold line-clamp-1">{course.title}</h3>
                      <p className="text-sm text-muted-foreground">
                        {course.teacher_name}
                      </p>
                    </div>
                    <Badge variant="secondary" className="hidden sm:inline-flex">
                      {course.category}
                    </Badge>
                  </div>
                  <div className="mt-3">
                    <div className="flex items-center justify-between text-sm mb-1">
                      <span className="text-muted-foreground">
                        {course.completed_videos} / {course.total_videos} lessons
                      </span>
                      <span className="font-medium">{course.progress}%</span>
                    </div>
                    <Progress value={course.progress} className="h-2" />
                  </div>
                  <div className="flex items-center gap-2 mt-2 text-xs text-muted-foreground">
                    <Clock className="h-3 w-3" />
                    Last accessed {new Date(course.last_accessed_at).toLocaleDateString()}
                  </div>
                </div>
              </div>
            </Link>
          ))
        ) : (
          <div className="text-center py-8">
            <p className="text-muted-foreground mb-4">You haven&apos;t enrolled in any courses yet.</p>
            <Link href="/courses">
              <Button>Browse Courses</Button>
            </Link>
          </div>
        )}
      </CardContent>
    </Card>
  )
}
