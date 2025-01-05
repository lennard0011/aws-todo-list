import { createRootRoute, Outlet } from '@tanstack/react-router'
import { Header } from '../components/header/header'

export const Route = createRootRoute({
  component: () => (
    <>
      <Header></Header>
      <br></br>
      <Outlet />
    </>
  )
})
