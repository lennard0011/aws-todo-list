import type { Article } from './../article.type'

export const Blog: () => Article = () => {
  const url = '/blog/posts/0001-building-aws-cloud-resume-challenge'
  const title = 'Taking on the AWS Cloud Resume Challenge'
  const summary =
    'I took interest in AWS. I took on this challenge to get hands on experience.'
  const releaseDate = new Date('2025-01-05')
  const content = <p>hello world</p>

  return {
    url,
    title,
    summary,
    releaseDate,
    content
  }
}
