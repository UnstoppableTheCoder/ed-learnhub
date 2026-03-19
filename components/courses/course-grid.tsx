"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import Image from "next/image"
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Star, Clock, Users, BookOpen } from "lucide-react"
import { createClient } from "@/lib/supabase/client"

interface Course {
  id: string
  title: string
  thumbnail: string | null
  category: string
  level: string
  rating: number
  reviews_count: number
  students_count: number
  duration: string
  price: number
  original_price: number
  is_bestseller: boolean
  teacher_name: string
  video_count: number
}

export function CourseGrid() {
  const [sortBy, setSortBy] = useState("popular")
  const [courses, setCourses] = useState<Course[]>([])
  const [loading, setLoading] = useState(true)
  const [totalCount, setTotalCount] = useState(0)

  useEffect(() => {
    const fetchCourses = async () => {
      setLoading(true)
      const supabase = createClient()

      // Build query based on sort option
      let query = supabase
        .from("courses")
        .select(`
          id,
          title,
          thumbnail,
          category,
          level,
          rating,
          reviews_count,
          students_count,
          duration,
          price,
          original_price,
          is_bestseller,
          teacher:profiles!courses_teacher_id_fkey(name)
        `, { count: "exact" })
        .eq("is_published", true)

      // Apply sorting
      switch (sortBy) {
        case "popular":
          query = query.order("students_count", { ascending: false })
          break
        case "rating":
          query = query.order("rating", { ascending: false })
          break
        case "newest":
          query = query.order("created_at", { ascending: false })
          break
        case "price-low":
          query = query.order("price", { ascending: true })
          break
        case "price-high":
          query = query.order("price", { ascending: false })
          break
      }

      const { data, count } = await query.limit(9)

      if (data) {
        // Fetch video counts for each course
        const coursesWithVideoCounts = await Promise.all(
          data.map(async (course: any) => {
            const { count: videoCount } = await supabase
              .from("videos")
              .select("*", { count: "exact", head: true })
              .eq("course_id", course.id)

            return {
              id: course.id,
              title: course.title,
              thumbnail: course.thumbnail,
              category: course.category,
              level: course.level,
              rating: course.rating,
              reviews_count: course.reviews_count,
              students_count: course.students_count,
              duration: course.duration,
              price: course.price,
              original_price: course.original_price,
              is_bestseller: course.is_bestseller,
              teacher_name: course.teacher?.name || "Unknown",
              video_count: videoCount || 0,
            }
          })
        )

        setCourses(coursesWithVideoCounts)
        setTotalCount(count || 0)
      }
      setLoading(false)
    }

    fetchCourses()
  }, [sortBy])

  if (loading) {
    return (
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div className="h-4 w-40 bg-muted animate-pulse rounded" />
          <div className="h-10 w-44 bg-muted animate-pulse rounded" />
        </div>
        <div className="grid sm:grid-cols-2 xl:grid-cols-3 gap-6">
          {[...Array(6)].map((_, i) => (
            <div key={i} className="h-80 bg-muted animate-pulse rounded-lg" />
          ))}
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <p className="text-sm text-muted-foreground">
          Showing <span className="font-medium text-foreground">{Math.min(courses.length, 9)}</span> of{" "}
          <span className="font-medium text-foreground">{totalCount}</span> courses
        </p>
        <Select value={sortBy} onValueChange={setSortBy}>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Sort by" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="popular">Most Popular</SelectItem>
            <SelectItem value="rating">Highest Rated</SelectItem>
            <SelectItem value="newest">Newest</SelectItem>
            <SelectItem value="price-low">Price: Low to High</SelectItem>
            <SelectItem value="price-high">Price: High to Low</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="grid sm:grid-cols-2 xl:grid-cols-3 gap-6">
        {courses.length > 0 ? (
          courses.map((course) => (
            <Link key={course.id} href={`/courses/${course.id}`}>
              <Card className="group h-full overflow-hidden border-border/50 hover:border-border hover:shadow-sm transition-all">
                <div className="aspect-video bg-muted relative overflow-hidden">
                  {course.thumbnail ? (
                    <Image
                      src={course.thumbnail}
                      alt={course.title}
                      fill
                      className="object-cover"
                    />
                  ) : (
                    <div className="absolute inset-0 bg-gradient-to-br from-primary/10 to-primary/5" />
                  )}
                  {course.is_bestseller && (
                    <Badge className="absolute top-3 left-3 bg-yellow-500 text-yellow-950 hover:bg-yellow-500">
                      Bestseller
                    </Badge>
                  )}
                  <Badge variant="secondary" className="absolute top-3 right-3">
                    {course.category}
                  </Badge>
                </div>
                <CardContent className="p-4">
                  <h3 className="font-semibold line-clamp-2 group-hover:text-primary transition-colors">
                    {course.title}
                  </h3>
                  <p className="text-sm text-muted-foreground mt-1">
                    {course.teacher_name}
                  </p>
                  
                  <div className="flex items-center gap-2 mt-3">
                    <div className="flex items-center gap-1">
                      <Star className="h-4 w-4 fill-yellow-500 text-yellow-500" />
                      <span className="text-sm font-bold">{course.rating}</span>
                    </div>
                    <span className="text-muted-foreground text-sm">
                      ({course.reviews_count.toLocaleString()} reviews)
                    </span>
                  </div>

                  <div className="flex items-center gap-4 mt-3 text-xs text-muted-foreground">
                    <span className="flex items-center gap-1">
                      <Clock className="h-3.5 w-3.5" />
                      {course.duration}
                    </span>
                    <span className="flex items-center gap-1">
                      <BookOpen className="h-3.5 w-3.5" />
                      {course.video_count} lessons
                    </span>
                    <span className="flex items-center gap-1">
                      <Users className="h-3.5 w-3.5" />
                      {(course.students_count / 1000).toFixed(1)}k
                    </span>
                  </div>

                  <Badge variant="outline" className="mt-3 text-xs">
                    {course.level}
                  </Badge>
                </CardContent>
                <CardFooter className="p-4 pt-0 flex items-center justify-between">
                  <div className="flex items-baseline gap-2">
                    <span className="text-lg font-bold">${course.price}</span>
                    {course.original_price > course.price && (
                      <span className="text-sm text-muted-foreground line-through">
                        ${course.original_price}
                      </span>
                    )}
                  </div>
                  <Button size="sm">View Course</Button>
                </CardFooter>
              </Card>
            </Link>
          ))
        ) : (
          <div className="col-span-full py-12 text-center text-muted-foreground">
            No courses found. Check back later!
          </div>
        )}
      </div>

      {courses.length > 0 && courses.length < totalCount && (
        <div className="flex justify-center">
          <Button variant="outline" size="lg">
            Load more courses
          </Button>
        </div>
      )}
    </div>
  )
}
