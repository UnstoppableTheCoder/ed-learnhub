"use client"

import { useEffect, useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"
import { PlayCircle, FileText, Lock, Clock } from "lucide-react"
import { createClient } from "@/lib/supabase/client"

interface Video {
  id: string
  title: string
  duration: string
  lesson_type: string
  is_free: boolean
}

interface Section {
  id: string
  title: string
  videos: Video[]
}

interface CourseCurriculumProps {
  courseId: string
}

export function CourseCurriculum({ courseId }: CourseCurriculumProps) {
  const [sections, setSections] = useState<Section[]>([])
  const [videos, setVideos] = useState<Video[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchCurriculum = async () => {
      const supabase = createClient()

      // Fetch sections for this course
      const { data: sectionsData } = await supabase
        .from("sections")
        .select("*")
        .eq("course_id", courseId)
        .order("sort_order", { ascending: true })

      // Fetch all videos for this course
      const { data: videosData } = await supabase
        .from("videos")
        .select("*")
        .eq("course_id", courseId)
        .order("sort_order", { ascending: true })

      if (sectionsData && sectionsData.length > 0) {
        setSections(sectionsData)
      }

      if (videosData) {
        setVideos(videosData.map((v: any) => ({
          id: v.id,
          title: v.title,
          duration: v.duration || "5:00",
          lesson_type: v.lesson_type || "video",
          is_free: v.is_free || false,
        })))
      }

      setLoading(false)
    }

    fetchCurriculum()
  }, [courseId])

  if (loading) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Course Curriculum</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {[...Array(3)].map((_, i) => (
              <div key={i} className="h-12 bg-muted animate-pulse rounded" />
            ))}
          </div>
        </CardContent>
      </Card>
    )
  }

  // If we have sections, group videos by section
  // Otherwise, just show all videos in a flat list
  const hasSections = sections.length > 0

  // Calculate total duration
  const calculateTotalDuration = () => {
    let totalMinutes = 0
    videos.forEach(video => {
      const [mins, secs] = video.duration.split(":").map(Number)
      totalMinutes += mins + (secs || 0) / 60
    })
    const hours = Math.floor(totalMinutes / 60)
    const mins = Math.round(totalMinutes % 60)
    return hours > 0 ? `${hours}h ${mins}m` : `${mins}m`
  }

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle>Course Curriculum</CardTitle>
          <span className="text-sm text-muted-foreground">
            {hasSections ? `${sections.length} sections • ` : ""}{videos.length} lessons • {calculateTotalDuration()}
          </span>
        </div>
      </CardHeader>
      <CardContent>
        {hasSections ? (
          <Accordion type="multiple" className="w-full" defaultValue={sections.map(s => s.id)}>
            {sections.map((section) => (
              <AccordionItem key={section.id} value={section.id}>
                <AccordionTrigger className="hover:no-underline">
                  <div className="flex items-center justify-between w-full pr-4">
                    <span className="font-medium text-left">{section.title}</span>
                  </div>
                </AccordionTrigger>
                <AccordionContent>
                  <ul className="space-y-1">
                    {videos.map((lesson, index) => (
                      <LessonItem key={lesson.id} lesson={lesson} index={index} />
                    ))}
                  </ul>
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        ) : (
          <ul className="space-y-1">
            {videos.map((lesson, index) => (
              <LessonItem key={lesson.id} lesson={lesson} index={index} />
            ))}
          </ul>
        )}
        
        {videos.length === 0 && (
          <p className="text-muted-foreground text-center py-4">
            No lessons available yet.
          </p>
        )}
      </CardContent>
    </Card>
  )
}

function LessonItem({ lesson, index }: { lesson: Video; index: number }) {
  return (
    <li className="flex items-center justify-between p-3 rounded-md hover:bg-muted/50">
      <div className="flex items-center gap-3">
        <span className="text-xs text-muted-foreground w-5">{index + 1}.</span>
        {lesson.lesson_type === "video" ? (
          <PlayCircle className="h-4 w-4 text-muted-foreground" />
        ) : lesson.lesson_type === "quiz" ? (
          <FileText className="h-4 w-4 text-muted-foreground" />
        ) : (
          <FileText className="h-4 w-4 text-primary" />
        )}
        <span className="text-sm">{lesson.title}</span>
        {lesson.is_free && (
          <span className="text-xs text-primary font-medium">Preview</span>
        )}
      </div>
      <div className="flex items-center gap-2">
        <span className="text-xs text-muted-foreground flex items-center gap-1">
          <Clock className="h-3 w-3" />
          {lesson.duration}
        </span>
        {!lesson.is_free && (
          <Lock className="h-3.5 w-3.5 text-muted-foreground" />
        )}
      </div>
    </li>
  )
}
