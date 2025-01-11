import { useContext } from 'react'

import { AuthContext } from '../../providers/auth-provider'
import { TaskProvider } from '../../providers/task-provider'
import { TaskForm } from './task-form'
import { TaskList } from './task-list'

export const TaskDashboard = () => {
  const { isAuthenticated } = useContext(AuthContext)

  return (
    <div style={{ padding: 20 }}>
      {isAuthenticated ? (
        <TaskProvider>
          <div style={{ display: 'flex' }}>
            <TaskForm />
            <TaskList />
          </div>
        </TaskProvider>
      ) : (
        <p>Not Authenticated</p>
      )}
    </div>
  )
}
