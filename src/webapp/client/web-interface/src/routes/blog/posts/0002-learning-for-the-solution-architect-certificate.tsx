import { createFileRoute } from '@tanstack/react-router'

import { Blog } from '../../../articles/posts/0002-learning-for-the-solution-architect-certificate'
import { BlogContent } from '../../../components/blog/blog-content'

export const Route = createFileRoute(
  '/blog/posts/0002-learning-for-the-solution-architect-certificate'
)({
  component: () => <BlogContent article={Blog()}></BlogContent>
})
