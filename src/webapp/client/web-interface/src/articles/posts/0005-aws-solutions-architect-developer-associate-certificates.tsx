import type { Article } from '../article.type'

export const Blog: () => Article = () => {
  const url = '/blog/posts/0005-aws-solutions-architect-developer-associate-certificates'
  const title = 'AWS Solutions Architect and Developer Associate Certificates'
  const summary = 'My journey to earning AWS Solutions Architect and Developer Associate certifications'
  const releaseDate = new Date('2025-01-15')
  const content = (
    <>
      <p>
        [Your content will go here]
      </p>
    </>
  )

  return {
    url,
    title,
    summary,
    releaseDate,
    content
  }
}