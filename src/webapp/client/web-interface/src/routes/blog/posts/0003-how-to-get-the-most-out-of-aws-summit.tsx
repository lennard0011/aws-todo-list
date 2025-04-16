import { createFileRoute } from '@tanstack/react-router'

import { Blog } from '../../../articles/posts/0003-how-to-get-the-most-out-of-aws-summit'
import { BlogContent } from '../../../components/blog/blog-content'

export const Route = createFileRoute(
  '/blog/posts/0003-how-to-get-the-most-out-of-aws-summit'
)({
  component: () => <BlogContent article={Blog()}></BlogContent>
})
