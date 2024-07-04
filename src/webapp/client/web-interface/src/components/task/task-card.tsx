import { Task } from "../../../../../../shared/task"

type Props = {
    task: Task;
}

export const TaskCard = (props: Props) => {
    const { task } = props;

    console.log('task', task)
    return (
        <div>
            <h2>{task.title}</h2>
            <p>{task.description}</p>
            <p>{task.status}</p>
        </div>
    );
}