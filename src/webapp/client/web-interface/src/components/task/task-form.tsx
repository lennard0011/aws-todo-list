import { useContext, useState } from "react";
import { TaskContext } from "../../providers/task-provider";

export const TaskForm = () => {
    const { createTask } = useContext(TaskContext);

    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');

    const submitTask = () => {
        createTask({ title, description });
        setTitle('');
        setDescription('');
    }

    return (
        <div>
            <h1>Create new task</h1>
            <label>Title</label>
            <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} />
            <label>Description</label>
            <input type="text" value={description} onChange={(e) => setDescription(e.target.value)} />
            <button onClick={submitTask}>Submit Task</button>
        </div>
    );
}