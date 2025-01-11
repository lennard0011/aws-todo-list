import { useContext } from 'react'

import { TaskContext } from '../../providers/task-provider'
import { TaskCard } from './task-card'

export const TaskList = () => {
  const { tasks } = useContext(TaskContext)

  return (
    <div style={{}}>
      <div style={{ display: 'flex', flexWrap: 'wrap' }}>
        {tasks.map((task) => (
          <TaskCard task={task} key={task.id} />
        ))}
      </div>
    </div>
  )
}
