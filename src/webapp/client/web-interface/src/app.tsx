import Status from './components/status'
import { TaskDashboard } from './components/task/task-dashboard'
import AuthProvider from './providers/auth-provider'

function App() {
  return (
    <>
    <h1>Todo List</h1>
      <AuthProvider>
        <Status />
        <TaskDashboard />
      </AuthProvider>
    </>
  )
}

export default App
