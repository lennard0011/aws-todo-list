export enum TaskStatus {
  OPEN = 'OPEN',
  IN_PROGRESS = 'IN_PROGRESS',
  DONE = 'DONE'
}

export interface TaskData {
  id: string
  title: string
  description: string
  status: TaskStatus
}

export class Task {
  private readonly id: string
  private readonly title: string
  private readonly description: string
  private readonly status: TaskStatus

  constructor(taskData: TaskData) {
    const { id, title, description, status } = taskData
    this.id = id
    this.title = title
    this.description = description
    this.status = status
  }

  toObject() {
    return structuredClone({
      id: this.id,
      title: this.title,
      description: this.description,
      status: this.status
    })
  }
}
