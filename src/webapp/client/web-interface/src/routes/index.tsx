import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/')({
  component: Index
})

function Index() {
  return (
    <>
      <img
        width={'150px'}
        src='./../assets/businessPortret-min.jpg'
      ></img>
      <p> Hi, I am Lennard van der Plas.</p>
      <p>
        Take a look at the navigation tab to get to my blog or to-do-list
        project.
      </p>
    </>
  )
}
