"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import Image from "next/image"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import { Spinner } from "@/components/ui/spinner"
import { Play, Heart, Share2, Check, Clock } from "lucide-react"
import { createClient } from "@/lib/supabase/client"
import { useUser } from "@/lib/user-context"

interface CourseEnrollCardProps {
  course: {
    id?: string
    price: number
    originalPrice: number
    features: string[]
    thumbnail?: string | null
    title?: string
  }
}

export function CourseEnrollCard({ course }: CourseEnrollCardProps) {
  const router = useRouter()
  const { user } = useUser()
  const [isLoading, setIsLoading] = useState(false)
  const [isWishlisted, setIsWishlisted] = useState(false)
  const [isEnrolled, setIsEnrolled] = useState(false)
  const [checkingEnrollment, setCheckingEnrollment] = useState(true)

  const discount = course.originalPrice > course.price
    ? Math.round(((course.originalPrice - course.price) / course.originalPrice) * 100)
    : 0

  // Check if user is already enrolled
  useEffect(() => {
    const checkEnrollment = async () => {
      if (!user || !course.id) {
        setCheckingEnrollment(false)
        return
      }

      const supabase = createClient()
      const { data } = await supabase
        .from("enrollments")
        .select("id")
        .eq("user_id", user.id)
        .eq("course_id", course.id)
        .single()

      setIsEnrolled(!!data)
      setCheckingEnrollment(false)
    }

    checkEnrollment()
  }, [user, course.id])

  const handleEnroll = async () => {
    if (!user) {
      router.push("/login")
      return
    }

    if (!course.id) return

    setIsLoading(true)

    try {
      const supabase = createClient()
      
      // Create enrollment
      const { error } = await supabase
        .from("enrollments")
        .insert({
          user_id: user.id,
          course_id: course.id,
        })

      if (error) {
        console.error("Enrollment error:", error)
        setIsLoading(false)
        return
      }

      setIsEnrolled(true)
      // Redirect to learning page
      router.push(`/learning/${course.id}`)
    } catch (err) {
      console.error("Enrollment failed:", err)
    } finally {
      setIsLoading(false)
    }
  }

  const handleContinueLearning = () => {
    router.push(`/learning/${course.id}`)
  }

  return (
    <Card className="overflow-hidden">
      <div className="aspect-video bg-muted relative">
        {course.thumbnail ? (
          <Image
            src={course.thumbnail}
            alt={course.title || "Course"}
            fill
            className="object-cover"
          />
        ) : null}
        <div className="absolute inset-0 bg-black/30 flex items-center justify-center">
          <Button size="lg" variant="secondary" className="gap-2 rounded-full">
            <Play className="h-5 w-5" />
            Preview Course
          </Button>
        </div>
      </div>
      <CardContent className="p-6">
        {course.price > 0 ? (
          <>
            <div className="flex items-baseline gap-2">
              <span className="text-3xl font-bold">${course.price}</span>
              {course.originalPrice > course.price && (
                <>
                  <span className="text-lg text-muted-foreground line-through">
                    ${course.originalPrice}
                  </span>
                  <span className="text-sm font-medium text-green-600">{discount}% off</span>
                </>
              )}
            </div>

            {discount > 0 && (
              <div className="flex items-center gap-2 mt-2 text-sm text-destructive">
                <Clock className="h-4 w-4" />
                <span className="font-medium">Limited time offer!</span>
              </div>
            )}
          </>
        ) : (
          <div className="text-3xl font-bold text-green-600">Free</div>
        )}

        <div className="mt-6 space-y-3">
          {checkingEnrollment ? (
            <Button className="w-full" size="lg" disabled>
              <Spinner className="mr-2" />
              Checking...
            </Button>
          ) : isEnrolled ? (
            <Button
              className="w-full"
              size="lg"
              onClick={handleContinueLearning}
            >
              Continue Learning
            </Button>
          ) : (
            <>
              <Button
                className="w-full"
                size="lg"
                onClick={handleEnroll}
                disabled={isLoading}
              >
                {isLoading ? <Spinner className="mr-2" /> : null}
                {isLoading ? "Enrolling..." : course.price > 0 ? "Enroll Now" : "Enroll for Free"}
              </Button>
              {course.price > 0 && (
                <Button variant="outline" className="w-full" size="lg">
                  Add to Cart
                </Button>
              )}
            </>
          )}
        </div>

        <p className="text-center text-xs text-muted-foreground mt-3">
          30-Day Money-Back Guarantee
        </p>

        <Separator className="my-6" />

        <div>
          <h4 className="font-semibold mb-3">This course includes:</h4>
          <ul className="space-y-2">
            {course.features.map((feature, index) => (
              <li key={index} className="flex items-center gap-2 text-sm">
                <Check className="h-4 w-4 text-green-600 shrink-0" />
                {feature}
              </li>
            ))}
          </ul>
        </div>

        <Separator className="my-6" />

        <div className="flex gap-2">
          <Button
            variant="outline"
            className="flex-1 gap-2"
            onClick={() => setIsWishlisted(!isWishlisted)}
          >
            <Heart
              className={`h-4 w-4 ${isWishlisted ? "fill-red-500 text-red-500" : ""}`}
            />
            {isWishlisted ? "Wishlisted" : "Wishlist"}
          </Button>
          <Button variant="outline" className="flex-1 gap-2">
            <Share2 className="h-4 w-4" />
            Share
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}
