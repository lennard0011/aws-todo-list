import { useContext } from "react";
import { TaskCard } from "./task-card";
import { TaskContext } from "../../providers/task-provider";

export const TaskList = () => {
    const { tasks } = useContext(TaskContext);

    return (
        <div>
            <h1>Task List</h1>
            {tasks.map((task) => <TaskCard task={ task } key={task.id} />)}
        </div>
    );
} 