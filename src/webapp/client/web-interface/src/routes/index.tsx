import { createFileRoute } from '@tanstack/react-router'
import imgUrl from '../assets/businessPortret-min.jpg'

export const Route = createFileRoute('/')({
  component: Index
})

function Index() {
  return (
    <>
      <img width={'150px'} src={imgUrl}></img>
      <p> Hi, I am Lennard van der Plas.</p>
      <p>
        Take a look at the navigation tab to get to my blog or to-do-list
        project.
      </p>
    </>
  )
}
