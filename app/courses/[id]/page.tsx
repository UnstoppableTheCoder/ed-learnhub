import { Metadata } from "next"
import { notFound } from "next/navigation"
import { Header } from "@/components/landing/header"
import { Footer } from "@/components/landing/footer"
import { CourseHero } from "@/components/courses/course-hero"
import { CourseCurriculum } from "@/components/courses/course-curriculum"
import { CourseInstructor } from "@/components/courses/course-instructor"
import { CourseReviews } from "@/components/courses/course-reviews"
import { CourseRequirements } from "@/components/courses/course-requirements"
import { CourseEnrollCard } from "@/components/courses/course-enroll-card"
import { createClient } from "@/lib/supabase/server"

export const metadata: Metadata = {
  title: "Course Details - LearnHub",
  description: "Learn from industry experts",
}

async function getCourse(id: string) {
  const supabase = await createClient()

  const { data: course } = await supabase
    .from("courses")
    .select(`
      *,
      teacher:profiles!courses_teacher_id_fkey(
        id,
        name,
        avatar,
        bio,
        title,
        location
      )
    `)
    .eq("id", id)
    .eq("is_published", true)
    .single()

  if (!course) return null

  // Get video count
  const { count: videoCount } = await supabase
    .from("videos")
    .select("*", { count: "exact", head: true })
    .eq("course_id", id)

  // Get teacher's total students and courses
  const { data: teacherCourses } = await supabase
    .from("courses")
    .select("students_count")
    .eq("teacher_id", course.teacher?.id)
    .eq("is_published", true)

  const teacherTotalStudents = teacherCourses?.reduce((acc, c) => acc + (c.students_count || 0), 0) || 0
  const teacherCourseCount = teacherCourses?.length || 0

  return {
    id: course.id,
    title: course.title,
    subtitle: course.subtitle || course.description,
    instructor: {
      name: course.teacher?.name || "Unknown",
      title: course.teacher?.title || "Instructor",
      avatar: course.teacher?.avatar || course.teacher?.name?.charAt(0) || "T",
      rating: course.rating || 4.5,
      students: teacherTotalStudents,
      courses: teacherCourseCount,
      bio: course.teacher?.bio || "Experienced instructor passionate about teaching.",
    },
    rating: course.rating || 0,
    reviews: course.reviews_count || 0,
    students: course.students_count || 0,
    duration: course.duration || "N/A",
    lessons: videoCount || 0,
    level: course.level || "Beginner",
    price: course.price || 0,
    originalPrice: course.original_price || course.price || 0,
    lastUpdated: new Date(course.updated_at).toLocaleDateString("en-US", { month: "long", year: "numeric" }),
    language: course.language || "English",
    features: course.features || [
      "Full lifetime access",
      "Certificate of completion",
      "Access on mobile and desktop",
    ],
    requirements: course.requirements || [
      "No prior experience needed",
      "A computer with internet access",
    ],
    whatYouWillLearn: course.what_you_will_learn || [
      "Build real-world projects",
      "Learn industry best practices",
    ],
    thumbnail: course.thumbnail,
  }
}

export default async function CourseDetailsPage({
  params,
}: {
  params: Promise<{ id: string }>
}) {
  const { id } = await params
  const courseData = await getCourse(id)

  if (!courseData) {
    notFound()
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1">
        <CourseHero course={courseData} />
        
        <div className="container mx-auto px-4 py-8">
          <div className="flex flex-col lg:flex-row gap-8">
            <div className="flex-1 space-y-8">
              <CourseRequirements
                requirements={courseData.requirements}
                whatYouWillLearn={courseData.whatYouWillLearn}
              />
              <CourseCurriculum courseId={id} />
              <CourseInstructor instructor={courseData.instructor} />
              <CourseReviews rating={courseData.rating} reviews={courseData.reviews} />
            </div>
            <div className="w-full lg:w-96 shrink-0">
              <div className="lg:sticky lg:top-20">
                <CourseEnrollCard course={courseData} />
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  )
}
