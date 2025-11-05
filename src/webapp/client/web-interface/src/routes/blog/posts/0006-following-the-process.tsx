import { createFileRoute } from '@tanstack/react-router'

import { Blog } from '../../../articles/posts/0006-following-the-process.tsx'
import { BlogContent } from '../../../components/blog/blog-content'

export const Route = createFileRoute('/blog/posts/0006-following-the-process')({
  component: () => <BlogContent article={Blog()}></BlogContent>
})
