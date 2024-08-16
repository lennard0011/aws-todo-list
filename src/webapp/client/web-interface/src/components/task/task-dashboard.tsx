import { useContext } from "react";
import { AuthContext } from "../../providers/auth-provider";
import { TaskList } from "./task-list";
import { TaskForm } from "./task-form";
import { TaskProvider } from "../../providers/task-provider";

export const TaskDashboard = () => {
    const { isAuthenticated } = useContext(AuthContext);

    return (
        <div>
            <h1>Task Dashboard</h1>
            { isAuthenticated ? <TaskProvider> <TaskForm /> <TaskList /></TaskProvider> : <p>Not Authenticated</p>}
        </div>
    );
}