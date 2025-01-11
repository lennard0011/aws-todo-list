import { useContext, useState } from 'react'

import { TaskContext } from '../../providers/task-provider'
import type { Task } from './task'

interface Props {
  task: Task
}

export const TaskCard = (props: Props) => {
  const { id, title, description, status } = props.task
  const { deleteTask } = useContext(TaskContext)
  const [isDeleted, setIsDeleted] = useState(false)

  const deleteThisTask = () => {
    setIsDeleted(true)
    deleteTask(id)
  }

  return (
    !isDeleted && (
      <article style={{ minWidth: 200 }}>
        <header>
          {title} {status}
        </header>
        <p>{description}</p>
        <footer>
          <button
            onClick={() => {
              void deleteThisTask()
            }}
          >
            🗑️
          </button>
        </footer>
      </article>
    )
  )
}
