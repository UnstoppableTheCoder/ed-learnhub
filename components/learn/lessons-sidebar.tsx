"use client"

import { useState } from "react"
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"
import { ScrollArea } from "@/components/ui/scroll-area"
import { CheckCircle2, Circle, PlayCircle, Lock } from "lucide-react"
import { cn } from "@/lib/utils"

const curriculum = [
  {
    id: "section-1",
    title: "Getting Started",
    lessons: [
      { id: "1-1", title: "Welcome to the Course", duration: "5:00", completed: true, current: false },
      { id: "1-2", title: "Course Overview", duration: "10:00", completed: true, current: false },
      { id: "1-3", title: "Setting Up Your Environment", duration: "25:00", completed: true, current: false },
    ],
  },
  {
    id: "section-2",
    title: "HTML Fundamentals",
    lessons: [
      { id: "2-1", title: "Introduction to HTML", duration: "15:00", completed: true, current: false },
      { id: "2-2", title: "HTML Document Structure", duration: "20:00", completed: true, current: false },
      { id: "2-3", title: "Working with Text Elements", duration: "25:00", completed: false, current: true },
      { id: "2-4", title: "Links and Navigation", duration: "20:00", completed: false, current: false },
      { id: "2-5", title: "Images and Media", duration: "30:00", completed: false, current: false },
    ],
  },
  {
    id: "section-3",
    title: "CSS Styling",
    lessons: [
      { id: "3-1", title: "Introduction to CSS", duration: "15:00", completed: false, current: false },
      { id: "3-2", title: "Selectors and Specificity", duration: "25:00", completed: false, current: false },
      { id: "3-3", title: "Box Model Deep Dive", duration: "30:00", completed: false, current: false },
      { id: "3-4", title: "Flexbox Layout", duration: "45:00", completed: false, current: false },
    ],
  },
]

export function LessonsSidebar() {
  const [openSections, setOpenSections] = useState(["section-2"])

  return (
    <ScrollArea className="h-full">
      <div className="p-4">
        <h2 className="font-semibold mb-4">Course Content</h2>
        
        <Accordion
          type="multiple"
          value={openSections}
          onValueChange={setOpenSections}
          className="space-y-2"
        >
          {curriculum.map((section) => {
            const completedCount = section.lessons.filter((l) => l.completed).length
            const totalCount = section.lessons.length
            
            return (
              <AccordionItem
                key={section.id}
                value={section.id}
                className="border rounded-lg overflow-hidden"
              >
                <AccordionTrigger className="px-4 py-3 hover:no-underline hover:bg-muted/50">
                  <div className="flex flex-col items-start text-left">
                    <span className="font-medium text-sm">{section.title}</span>
                    <span className="text-xs text-muted-foreground mt-0.5">
                      {completedCount}/{totalCount} completed
                    </span>
                  </div>
                </AccordionTrigger>
                <AccordionContent className="pb-0">
                  <ul>
                    {section.lessons.map((lesson) => (
                      <li key={lesson.id}>
                        <button
                          className={cn(
                            "w-full flex items-center gap-3 px-4 py-3 text-left hover:bg-muted/50 transition-colors",
                            lesson.current && "bg-primary/5 border-l-2 border-primary"
                          )}
                        >
                          <div className="shrink-0">
                            {lesson.completed ? (
                              <CheckCircle2 className="h-4 w-4 text-green-600" />
                            ) : lesson.current ? (
                              <PlayCircle className="h-4 w-4 text-primary" />
                            ) : (
                              <Circle className="h-4 w-4 text-muted-foreground" />
                            )}
                          </div>
                          <div className="flex-1 min-w-0">
                            <p
                              className={cn(
                                "text-sm truncate",
                                lesson.current && "font-medium"
                              )}
                            >
                              {lesson.title}
                            </p>
                            <p className="text-xs text-muted-foreground">
                              {lesson.duration}
                            </p>
                          </div>
                        </button>
                      </li>
                    ))}
                  </ul>
                </AccordionContent>
              </AccordionItem>
            )
          })}
        </Accordion>
      </div>
    </ScrollArea>
  )
}
