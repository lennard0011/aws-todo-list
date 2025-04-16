import { createFileRoute } from '@tanstack/react-router'

import type { Article } from '../../articles/article.type'
import { Blog as blog1 } from '../../articles/posts/0001-building-aws-cloud-resume-challenge'
import { Blog as blog2 } from '../../articles/posts/0002-learning-for-the-solution-architect-certificate'
import { Blog as blog3 } from '../../articles/posts/0003-how-to-get-the-most-out-of-aws-summit'
import { BlogCard } from '../../components/blog/blog-card'

const blogs: Article[] = [blog1(), blog2(), blog3()]

const sortOnReleaseDate = (blogA: Article, blogB: Article) =>
  blogA.releaseDate > blogB.releaseDate ? -1 : 1

export const Route = createFileRoute('/blog/')({
  component: () => (
    <>{blogs.sort(sortOnReleaseDate).map((blog) => BlogCard(blog))}</>
  )
})
