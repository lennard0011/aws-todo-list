import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/')({
  component: Index
})

function Index() {
  return (
    <>
      <img
        width={'100px'}
        src='https://media.licdn.com/dms/image/v2/D4E03AQFThaBEzxrfBw/profile-displayphoto-shrink_800_800/profile-displayphoto-shrink_800_800/0/1688110115533?e=1741824000&v=beta&t=Nx_k8rgBrGcxqt59P4oS-OUtngx_SvJ_KjeUCk1KxnA'
      ></img>
      <p> Hi, I&apos;m Lennard van der Plas.</p>
      <p>Welcome to my website.</p>
      <p>
        Take a look at the navigation tab to get to my blog or to-do-list
        project.
      </p>
    </>
  )
}
