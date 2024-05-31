import { create, State, StateCreator } from 'zustand';
import { generateId } from '@/helpers';
import { devtools } from 'zustand/middleware';

export interface Task {
    id: string,
    title: string,
    created: number,
    completed: boolean,
    email: string | null | undefined,
}

interface ToDoStore {
    tasks: Task[],
    createTask: (title: string, email: string | null | undefined ) => void,
    updateTask: (id: string, title: string, completed: boolean) => void,
    removeTask: (id: string) => void,
}

function isToDoStore(object: any): object is ToDoStore {
    return 'tasks' in object;
}

const localStorageUpdate = <T extends State>(config: StateCreator<T>): StateCreator<T> =>
    (set, get, api) => config((nextState, ...args) => {
        if (isToDoStore(nextState)) {
            window.localStorage.setItem('tasks', JSON.stringify(
                nextState.tasks
            ));
        }
        set(nextState, ...args);
    }, get, api);

const getCurrentState = () => {
    try {
        return (
            JSON.parse(window.localStorage.getItem('tasks') || '[]')
        ) as Task[];
    } catch (err) {
        window.localStorage.setItem('tasks', '[]');
    }
    return [];
};

export const useToDoStore = create<ToDoStore>()(devtools(localStorageUpdate((set, get) => ({
    tasks: getCurrentState(),
    createTask: (title: string, email: string | null | undefined) => {
        const { tasks } = get();
        const newTask = {
            id: generateId(),
            title,
            email,
            created: Date.now(),
            completed: false,
        };
        set({
            tasks: [newTask].concat(tasks),
        });
    },
    updateTask: (id: string, title: string, completed: boolean) => {
        const { tasks } = get();
        set({
            tasks: tasks.map(task => task.id === id ? {...task, title, completed} : task)
        });
    },
    removeTask: (id: string) => {
        const { tasks } = get();
        set({
            tasks: tasks.filter((task) => task.id !== id),
        });
    },
}))));



