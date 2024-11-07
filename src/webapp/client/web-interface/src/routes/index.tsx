import { createFileRoute, Link } from '@tanstack/react-router'

export const Route = createFileRoute('/')({
  component: Index,
})

function Index() {
  return (
    <>
      <h1> Hi, I'm Lennard van der Plas.</h1>
      <p>Welcome to my website. The code for this is on my repository in Github.</p>
      <p>I made this to learn how to create a full stack application using basic AWS services.</p>
      <Link to="/to-do-list">To do list</Link> <br></br>
      <Link to='/blog'>Blog</Link>
    </>
  )
}