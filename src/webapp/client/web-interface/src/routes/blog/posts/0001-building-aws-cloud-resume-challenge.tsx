import { createFileRoute } from '@tanstack/react-router'

import { Blog } from '../../../articles/posts/0001-building-aws-cloud-resume-challenge'
import { BlogContent } from '../../../components/blog/blog-content'

export const Route = createFileRoute(
  '/blog/posts/0001-building-aws-cloud-resume-challenge'
)({
  component: () => <BlogContent article={Blog()}></BlogContent>
})
