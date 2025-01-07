import { Link } from '@tanstack/react-router'

type Props = {
  url: string
  title: string
  summary: string
  releaseDate: Date
}
export const BlogCard = (props: Props) => {
  return (
    <article>
      <header>{props.title}</header>
      <p>{props.summary}</p>
      <Link to={props.url}>Read more</Link>
      <footer>{props.releaseDate.toDateString()}</footer>
    </article>
  )
}
