import { createFileRoute } from '@tanstack/react-router'
import { Blog } from '../../../articles/posts/0001-building-aws-cloud-resume-challenge'

export const Route = createFileRoute(
  '/blog/posts/0001-building-aws-cloud-resume-challenge'
)({
  component: () => <Blog.content></Blog.content>
})
