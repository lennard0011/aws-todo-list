export enum TaskStatus {
  OPEN = "OPEN",
  IN_PROGRESS = "IN_PROGRESS",
  DONE = "DONE",
}

export type TaskData = {
  title: string;
  description: string;
  status: TaskStatus;
};

export class Task {
  private readonly title: string;
  private readonly description: string;
  private readonly status: TaskStatus;

  constructor(taskData: TaskData) {
    const { title, description, status } = taskData;
    this.title = title;
    this.description = description;
    this.status = status;
  }

  toObject() {
    return structuredClone({
      title: this.title,
      description: this.description,
      status: this.status,
    });
  }
}
