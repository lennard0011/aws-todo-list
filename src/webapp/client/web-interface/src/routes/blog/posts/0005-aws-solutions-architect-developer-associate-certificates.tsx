import { createFileRoute } from '@tanstack/react-router'

import { Blog } from '../../../articles/posts/0005-aws-solutions-architect-developer-associate-certificates'
import { BlogContent } from '../../../components/blog/blog-content'

export const Route = createFileRoute(
  '/blog/posts/0005-aws-solutions-architect-developer-associate-certificates'
)({
  component: () => <BlogContent article={Blog()}></BlogContent>
})