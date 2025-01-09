import { createFileRoute } from '@tanstack/react-router'

import Status from '../components/auth/status'
import { TaskDashboard } from '../components/task/task-dashboard'
import AuthProvider from '../providers/auth-provider'

export const Route = createFileRoute('/to-do-list')({
  component: () => (
    <>
      <h1>Todo List - Lennard van der Plas</h1>
      <AuthProvider>
        <Status />
        <TaskDashboard />
      </AuthProvider>
    </>
  )
})
