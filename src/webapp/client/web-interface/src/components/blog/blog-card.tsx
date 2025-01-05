type Props = {
  title: string
  releaseDate: Date
}
export const BlogCard = (props: Props) => {
  return (
    <article>
      <header>{props.title}</header>
      <footer>{props.releaseDate.toDateString()}</footer>
    </article>
  )
}
