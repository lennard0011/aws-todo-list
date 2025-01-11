import { useContext, useState } from 'react'

import { TaskContext } from '../../providers/task-provider'
import { TemporaryRender } from '../temporary-render/temporary-render'

export const TaskForm = () => {
  const { createTask } = useContext(TaskContext)

  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')
  const [showNotification, setShowNotification] = useState(false)

  const submitTask = () => {
    void createTask({ title, description })
    setTitle('')
    setDescription('')
    setShowNotification(true)
  }

  const closeNotification = () => {
    setShowNotification(false)
  }

  return (
    <form style={{ minWidth: 300, padding: 10, maxHeight: 400 }}>
      <h2>Create new task</h2>
      <label>Title</label>
      <input
        type='text'
        value={title}
        onChange={(e) => {
          setTitle(e.target.value)
        }}
      />
      <label>Description</label>
      <textarea
        value={description}
        onChange={(e) => {
          setDescription(e.target.value)
        }}
      />
      <button type='button' onClick={submitTask}>
        Submit Task
      </button>
      {showNotification && (
        <TemporaryRender
          durationInSeconds={1.2}
          child={<p className='success'>Task Created</p>}
          onClose={closeNotification}
        />
      )}
    </form>
  )
}
