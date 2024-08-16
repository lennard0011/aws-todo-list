import { useContext } from "react";
import { TaskContext } from "../../providers/task-provider";
import { Task } from "./task";

type Props = {
    task: Task;
}

export const TaskCard = (props: Props) => {
    const { id, title, description, status } = props.task;
    const { deleteTask } = useContext(TaskContext);

    return (
        <div>
            <h2>{title}</h2>
            <p>{description}</p>
            <p>{status}</p>
            <button onClick={() => deleteTask(id)}>🗑️</button>
        </div>
    );
}