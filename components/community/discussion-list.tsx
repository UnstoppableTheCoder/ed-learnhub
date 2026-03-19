"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Card } from "@/components/ui/card"
import { 
  MessageSquare, 
  ThumbsUp, 
  Eye, 
  Clock, 
  CheckCircle2,
  Pin
} from "lucide-react"
import { createClient } from "@/lib/supabase/client"
import { formatDistanceToNow } from "date-fns"

interface Discussion {
  id: string
  title: string
  category: string
  tags: string[]
  replies_count: number
  likes_count: number
  views_count: number
  is_pinned: boolean
  is_solved: boolean
  created_at: string
  author: {
    name: string
    avatar: string | null
  }
}

const categoryColors: Record<string, string> = {
  "Help & Support": "bg-blue-50 text-blue-700 border-blue-200",
  "Career Advice": "bg-emerald-50 text-emerald-700 border-emerald-200",
  "Project Showcase": "bg-amber-50 text-amber-700 border-amber-200",
  "Resources": "bg-violet-50 text-violet-700 border-violet-200",
  "General Discussion": "bg-slate-50 text-slate-700 border-slate-200",
  "React": "bg-cyan-50 text-cyan-700 border-cyan-200",
  "Next.js": "bg-gray-50 text-gray-700 border-gray-200",
  "TypeScript": "bg-blue-50 text-blue-700 border-blue-200",
  "Database": "bg-orange-50 text-orange-700 border-orange-200",
}

export function DiscussionList() {
  const [discussions, setDiscussions] = useState<Discussion[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchDiscussions = async () => {
      const supabase = createClient()

      const { data } = await supabase
        .from("discussions")
        .select(`
          id,
          title,
          category,
          tags,
          replies_count,
          likes_count,
          views_count,
          is_pinned,
          is_solved,
          created_at,
          author:profiles!discussions_user_id_fkey(
            name,
            avatar
          )
        `)
        .order("is_pinned", { ascending: false })
        .order("created_at", { ascending: false })
        .limit(10)

      if (data) {
        setDiscussions(
          data.map((d: any) => ({
            id: d.id,
            title: d.title,
            category: d.category,
            tags: d.tags || [],
            replies_count: d.replies_count,
            likes_count: d.likes_count,
            views_count: d.views_count,
            is_pinned: d.is_pinned,
            is_solved: d.is_solved,
            created_at: d.created_at,
            author: {
              name: d.author?.name || "Anonymous",
              avatar: d.author?.avatar,
            },
          }))
        )
      }
      setLoading(false)
    }

    fetchDiscussions()
  }, [])

  if (loading) {
    return (
      <div className="space-y-4">
        {[...Array(3)].map((_, i) => (
          <Card key={i} className="p-5">
            <div className="flex gap-4">
              <div className="h-10 w-10 bg-muted animate-pulse rounded-full" />
              <div className="flex-1 space-y-2">
                <div className="h-5 w-3/4 bg-muted animate-pulse rounded" />
                <div className="h-4 w-1/2 bg-muted animate-pulse rounded" />
              </div>
            </div>
          </Card>
        ))}
      </div>
    )
  }

  return (
    <div className="space-y-4">
      {discussions.length > 0 ? (
        discussions.map((discussion) => (
          <Card key={discussion.id} className="p-5">
            <div className="flex gap-4">
              <Avatar className="h-10 w-10">
                <AvatarImage src={discussion.author.avatar || undefined} />
                <AvatarFallback>
                  {discussion.author.name.split(" ").map((n) => n[0]).join("")}
                </AvatarFallback>
              </Avatar>
              
              <div className="min-w-0 flex-1">
                <div className="flex items-center gap-2">
                  {discussion.is_pinned && (
                    <Pin className="h-4 w-4 text-amber-500" />
                  )}
                  {discussion.is_solved && (
                    <CheckCircle2 className="h-4 w-4 text-emerald-500" />
                  )}
                  <Link 
                    href={`/community/${discussion.id}`}
                    className="text-base font-semibold hover:text-primary line-clamp-1"
                  >
                    {discussion.title}
                  </Link>
                </div>
                
                <div className="mt-2 flex flex-wrap items-center gap-2">
                  <Badge 
                    variant="outline" 
                    className={categoryColors[discussion.category] || "bg-slate-50 text-slate-700 border-slate-200"}
                  >
                    {discussion.category}
                  </Badge>
                  {discussion.tags.slice(0, 2).map((tag) => (
                    <Badge key={tag} variant="secondary" className="text-xs">
                      {tag}
                    </Badge>
                  ))}
                </div>
                
                <div className="mt-3 flex flex-wrap items-center gap-4 text-sm text-muted-foreground">
                  <span className="font-medium text-foreground">
                    {discussion.author.name}
                  </span>
                  <span className="flex items-center gap-1">
                    <Clock className="h-3.5 w-3.5" />
                    {formatDistanceToNow(new Date(discussion.created_at), { addSuffix: true })}
                  </span>
                  <span className="flex items-center gap-1">
                    <MessageSquare className="h-3.5 w-3.5" />
                    {discussion.replies_count}
                  </span>
                  <span className="flex items-center gap-1">
                    <ThumbsUp className="h-3.5 w-3.5" />
                    {discussion.likes_count}
                  </span>
                  <span className="flex items-center gap-1">
                    <Eye className="h-3.5 w-3.5" />
                    {discussion.views_count}
                  </span>
                </div>
              </div>
            </div>
          </Card>
        ))
      ) : (
        <Card className="p-12 text-center">
          <MessageSquare className="mx-auto h-12 w-12 text-muted-foreground/50" />
          <h3 className="mt-4 text-lg font-semibold">No discussions yet</h3>
          <p className="text-muted-foreground">Be the first to start a conversation in the community.</p>
        </Card>
      )}
    </div>
  )
}
