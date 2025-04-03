import type { Article } from '../../articles/article.type'

export const BlogContent = (props: { article: Article }) => {
  const { title, content } = props.article
  return (
    <>
      <h2>{title}</h2>
      <>{content}</>
    </>
  )
}
