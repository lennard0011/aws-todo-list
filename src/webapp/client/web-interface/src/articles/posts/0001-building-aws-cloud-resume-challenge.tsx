import { Article } from './../article.type'

export const Blog: Article = {
  url: '/blog/posts/0001-building-aws-cloud-resume-challenge',
  title: 'First blog',
  releaseDate: new Date('2025-01-05'),
  content: () => <p>blog1</p>
}
