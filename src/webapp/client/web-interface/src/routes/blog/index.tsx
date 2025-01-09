import { createFileRoute } from '@tanstack/react-router'

import type { Article } from '../../articles/article.type'
import { Blog as blog1 } from '../../articles/posts/0001-building-aws-cloud-resume-challenge'
import { BlogCard } from '../../components/blog/blog-card'

const blogs: Article[] = [blog1()]

export const Route = createFileRoute('/blog/')({
  component: () => <>{blogs.map((blog) => BlogCard(blog))}</>
})
