import { createContext, FC, ReactNode, useCallback, useContext, useEffect, useState } from 'react';
import { AuthContext } from './auth-provider';
import { Task } from '../components/task/task';

export type CreateTaskDto = {
    title: string;
    description: string;
};

type TaskContextProps = {
    tasks: Task[];
    createTask: (createTaskDto: CreateTaskDto) => void;
    deleteTask: (id: string) => void;
}

export const TaskContext = createContext<TaskContextProps>({
    tasks: [],
    createTask: () => {},
    deleteTask: () => {},
});

export const TaskProvider: FC<{ children: ReactNode }> = ({ children }) => {
    const { fetchFromBackend } = useContext(AuthContext);
    const [tasks, setTasks] = useState<Task[]>([]);

    const fetchTasks = useCallback(async () => {
        const tasks = await fetchFromBackend('task', 
            'GET',
        ) as Task[];
        
        setTasks(tasks);
    }, [fetchFromBackend]);


    useEffect(() => {
        fetchTasks();
    }, [fetchTasks]);

    function createTask (createTaskDto: CreateTaskDto) {
        async function postTask(createTaskDto: CreateTaskDto) {
            await fetchFromBackend('task', 
                'POST',
                {title: createTaskDto.title, description: createTaskDto.description},
            );
            await fetchTasks();
        }
        
        postTask(createTaskDto);
    }

    function deleteTask (id: string) {
        async function deleteTask(id: string) {
            await fetchFromBackend(`task/${id}`, 
                'DELETE',
            );
            await fetchTasks();
        }
        
        deleteTask(id);
    }

    

    return (
        <TaskContext.Provider value={{ tasks, createTask, deleteTask }}>
            {children}
        </TaskContext.Provider>
    );
};