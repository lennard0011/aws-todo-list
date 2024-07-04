import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../providers/auth-provider";
import { TaskCard } from "./task-card";
import { Task } from "./task";

export const TaskList = () => {
    const { fetchFromBackend } = useContext(AuthContext);

    const [tasks, setTasks] = useState([] as Task[]);

    useEffect(() => {
        async function fetchUserInfo() {
            const tasks = await fetchFromBackend('task', 
                'GET',
            ) as Task[];
            
            setTasks(tasks);
        }

        fetchUserInfo();
    }, [fetchFromBackend]);

    return (
        <div>
            <h1>Task List</h1>
            {tasks.map((task) => <TaskCard task={ task } key={task.taskId} />)}
        </div>
    );
} 