import { useContext, useState } from 'react'

import { TaskContext } from '../../providers/task-provider'

export const TaskForm = () => {
  const { createTask } = useContext(TaskContext)

  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')

  const submitTask = () => {
    void createTask({ title, description })
    setTitle('')
    setDescription('')
  }

  return (
    <form>
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
    </form>
  )
}
