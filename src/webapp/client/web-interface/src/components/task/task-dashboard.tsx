import { useContext } from "react";
import { AuthContext } from "../../providers/auth-provider";
import { TaskList } from "./task-list";

export const TaskDashboard = () => {
    const { isAuthenticated } = useContext(AuthContext);

    return (
        <div>
            <h1>Task Dashboard</h1>
            { isAuthenticated ? <div> <TaskList /></div> : <p>Not Authenticated</p>}
        </div>
    );
}