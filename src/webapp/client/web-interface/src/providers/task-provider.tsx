import type { FC, ReactNode } from 'react'
import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState
} from 'react'

import type { Task } from '../components/task/task'
import { AuthContext } from './auth-provider'

export interface CreateTaskDto {
  title: string
  description: string
}

interface TaskContextProps {
  tasks: Task[]
  createTask: (createTaskDto: CreateTaskDto) => Promise<void>
  deleteTask: (id: string) => Promise<void>
}

export const TaskContext = createContext<TaskContextProps>({
  tasks: [],
  createTask: () => {
    throw new Error('Fetch is not yet set!')
  },
  deleteTask: () => {
    throw new Error('Fetch is not yet set!')
  }
})

export const TaskProvider: FC<{ children: ReactNode }> = ({ children }) => {
  const { fetchFromBackend } = useContext(AuthContext)
  const [tasks, setTasks] = useState<Task[]>([])

  const fetchTasks = useCallback(async () => {
    const tasks = (await fetchFromBackend('task', 'GET')) as Task[]

    setTasks(tasks)
  }, [fetchFromBackend])

  useEffect(() => {
    void fetchTasks()
  }, [fetchTasks])

  async function createTask(createTaskDto: CreateTaskDto) {
    async function postTask(createTaskDto: CreateTaskDto) {
      await fetchFromBackend('task', 'POST', {
        title: createTaskDto.title,
        description: createTaskDto.description
      })
      await fetchTasks()
    }

    await postTask(createTaskDto)
  }

  async function deleteTask(id: string) {
    async function deleteTask(id: string) {
      await fetchFromBackend(`task/${id}`, 'DELETE')
      await fetchTasks()
    }

    await deleteTask(id)
  }

  return (
    <TaskContext.Provider value={{ tasks, createTask, deleteTask }}>
      {children}
    </TaskContext.Provider>
  )
}
