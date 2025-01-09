import { useContext } from 'react'

import { TaskContext } from '../../providers/task-provider'
import type { Task } from './task'

interface Props {
  task: Task
}

export const TaskCard = (props: Props) => {
  const { id, title, description, status } = props.task
  const { deleteTask } = useContext(TaskContext)

  return (
    <article>
      <header>
        {title} {status}
      </header>
      <p>{description}</p>
      <footer>
        <button
          onClick={() => {
            void deleteTask(id)
          }}
        >
          🗑️
        </button>
      </footer>
    </article>
  )
}
