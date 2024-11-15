'use client'

import { Dispatch, SetStateAction } from 'react'
import { Skeleton } from '@/components/ui/skeleton'
import { useCreations } from '@/hooks/useCreations'
import { Post } from '@penxio/types'
import { Bookmark, MessageCircle } from 'lucide-react'

interface Props {
  post: Post
  setIsOpen: Dispatch<SetStateAction<boolean>>
}

export function CommentAmount({ post, setIsOpen }: Props) {
  return (
    <div
      className="flex items-center justify-between text-foreground gap-1 cursor-pointer opacity-70 hover:opacity-100"
      onClick={() => setIsOpen(true)}
    >
      <MessageCircle size={20} />
      <div>{80}</div>
    </div>
  )
}
