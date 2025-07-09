import { createFileRoute } from '@tanstack/react-router'

import { Blog } from '../../../articles/posts/0004-amazon-q-developer-game-builder-challenge'
import { BlogContent } from '../../../components/blog/blog-content'

export const Route = createFileRoute(
  '/blog/posts/0004-amazon-q-developer-game-builder-challenge'
)({
  component: () => <BlogContent article={Blog()}></BlogContent>
})
