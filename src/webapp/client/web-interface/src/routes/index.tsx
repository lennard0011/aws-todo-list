import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/')({
  component: Index
})

function Index() {
  return (
    <>
      <h1> Hi, I&apos;m Lennard van der Plas.</h1>
      <p>
        Welcome to my website. The code for this is on my repository in Github.
      </p>
      <p>
        Take a look at the navigation tab to get to my blog or to-do-list
        project.
      </p>
    </>
  )
}
