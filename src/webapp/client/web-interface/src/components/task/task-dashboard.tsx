import { useContext } from 'react'

import { AuthContext } from '../../providers/auth-provider'
import { TaskProvider } from '../../providers/task-provider'
import { TaskForm } from './task-form'
import { TaskList } from './task-list'

export const TaskDashboard = () => {
  const { isAuthenticated } = useContext(AuthContext)

  return (
    <>
      <h1>Task Dashboard</h1>
      {isAuthenticated ? (
        <TaskProvider>
          <TaskForm />
          <TaskList />
        </TaskProvider>
      ) : (
        <p>Not Authenticated</p>
      )}
    </>
  )
}
