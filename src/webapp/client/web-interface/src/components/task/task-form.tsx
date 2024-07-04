import { useContext, useState } from "react";
import { AuthContext } from "../../providers/auth-provider";

export const TaskForm = () => {
    const { fetchFromBackend } = useContext(AuthContext);

    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');

    async function createTask() {
        await fetchFromBackend('https://api.lennardvanderplas.com/task', 
            'POST',
            {title: 'title', description: 'description'},
        );
        setTitle('');
        setDescription('');
    }

    return (
        <div>
            <h1>Task Form</h1>
            <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} />
            <input type="text" value={description} onChange={(e) => setDescription(e.target.value)} />
            <button onClick={createTask}>Submit Task</button>
        </div>
    );
}