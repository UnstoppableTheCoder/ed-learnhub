"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import Image from "next/image"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Star, Clock, ArrowRight } from "lucide-react"
import { createClient } from "@/lib/supabase/client"
import { useUser } from "@/lib/user-context"

interface Course {
  id: string
  title: string
  thumbnail: string | null
  category: string
  level: string
  rating: number
  duration: string
  teacher_name: string
  is_bestseller: boolean
}

export function RecommendedCourses() {
  const { user } = useUser()
  const [courses, setCourses] = useState<Course[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchRecommendedCourses = async () => {
      const supabase = createClient()

      // Get user's enrolled course IDs to exclude them
      let enrolledIds: string[] = []
      if (user) {
        const { data: enrollments } = await supabase
          .from("enrollments")
          .select("course_id")
          .eq("user_id", user.id)
        
        enrolledIds = enrollments?.map((e: any) => e.course_id) || []
      }

      // Fetch published courses, excluding enrolled ones
      let query = supabase
        .from("courses")
        .select(`
          id,
          title,
          thumbnail,
          category,
          level,
          rating,
          duration,
          is_bestseller,
          teacher:profiles!courses_teacher_id_fkey(name)
        `)
        .eq("is_published", true)
        .order("rating", { ascending: false })
        .limit(4)

      if (enrolledIds.length > 0) {
        query = query.not("id", "in", `(${enrolledIds.join(",")})`)
      }

      const { data } = await query

      if (data) {
        setCourses(
          data.map((course: any) => ({
            id: course.id,
            title: course.title,
            thumbnail: course.thumbnail,
            category: course.category,
            level: course.level,
            rating: course.rating,
            duration: course.duration,
            teacher_name: course.teacher?.name || "Unknown",
            is_bestseller: course.is_bestseller,
          }))
        )
      }
      setLoading(false)
    }

    fetchRecommendedCourses()
  }, [user])

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle>Recommended for You</CardTitle>
        <Link href="/courses">
          <Button variant="ghost" size="sm" className="gap-1">
            Browse all
            <ArrowRight className="h-4 w-4" />
          </Button>
        </Link>
      </CardHeader>
      <CardContent>
        {loading ? (
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {[...Array(4)].map((_, i) => (
              <div key={i} className="h-48 bg-muted animate-pulse rounded-lg" />
            ))}
          </div>
        ) : courses.length > 0 ? (
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {courses.map((course) => (
              <Link
                key={course.id}
                href={`/courses/${course.id}`}
                className="group block"
              >
                <div className="p-4 rounded-lg border bg-card hover:bg-accent/50 transition-colors h-full">
                  <div className="aspect-video rounded-md bg-muted mb-3 relative overflow-hidden">
                    {course.thumbnail ? (
                      <Image
                        src={course.thumbnail}
                        alt={course.title}
                        fill
                        className="object-cover"
                      />
                    ) : (
                      <div className="flex items-center justify-center h-full">
                        <span className="text-2xl font-bold text-muted-foreground/30">
                          {course.title.charAt(0)}
                        </span>
                      </div>
                    )}
                    {course.is_bestseller && (
                      <Badge className="absolute top-2 left-2 bg-yellow-500 text-yellow-950">
                        Bestseller
                      </Badge>
                    )}
                  </div>
                  <h4 className="font-semibold text-sm line-clamp-2 group-hover:text-primary transition-colors">
                    {course.title}
                  </h4>
                  <p className="text-xs text-muted-foreground mt-1">
                    {course.teacher_name}
                  </p>
                  <div className="flex items-center gap-2 mt-2">
                    <div className="flex items-center gap-1">
                      <Star className="h-3 w-3 fill-yellow-500 text-yellow-500" />
                      <span className="text-xs font-medium">{course.rating}</span>
                    </div>
                    <span className="text-muted-foreground text-xs">-</span>
                    <span className="text-xs text-muted-foreground flex items-center gap-1">
                      <Clock className="h-3 w-3" />
                      {course.duration}
                    </span>
                  </div>
                  <Badge variant="outline" className="mt-2 text-xs">
                    {course.level}
                  </Badge>
                </div>
              </Link>
            ))}
          </div>
        ) : (
          <p className="text-muted-foreground text-center py-4">
            No courses available at the moment.
          </p>
        )}
      </CardContent>
    </Card>
  )
}
