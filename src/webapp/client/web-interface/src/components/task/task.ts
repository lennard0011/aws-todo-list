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

export type Task = TaskData & {
taskId: string;
};
