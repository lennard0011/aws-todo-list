import { Article } from '../../articles/article.type'

export const BlogContent = (props: { article: Article }) => {
  return props.article.content
}
