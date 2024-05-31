'use client';
import InputAdd from '@/components/InputAdd/InputAdd';
import InputTask from '@/components/InputTask/InputTask';
import { useToDoStore } from '@/store/useToDoStore';
import React, { useState } from 'react';
import useFilter from '@/hooks/useFilter';

export default function Main() {
    const [
        tasks,
        createTask,
        updateTask,
        removeTask, ,
    ] = useToDoStore(state => [
        state.tasks,
        state.createTask,
        state.updateTask,
        state.removeTask,
    ]);


    const [currentPage, setCurrentPage] = useState(1);
    const tasksPerPage = 3;

    const indexOfLastTask = currentPage * tasksPerPage;
    const indexOfFirstTask = indexOfLastTask - tasksPerPage;
    const currentTasks = tasks.slice(indexOfFirstTask, indexOfLastTask);

    const paginate = (pageNumber: number) => setCurrentPage(pageNumber);

    const pageNumbers = [];
    for (let i = 1; i <= Math.ceil(tasks.length / tasksPerPage); i++) {
        pageNumbers.push(i);
    }

    const { filteredData, filterData } = useFilter(currentTasks);
    const [searchTerm, setSearchTerm] = useState('');

    const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
        setSearchTerm(e.target.value);
        filterData(e.target.value);
    };

    return (
        <div className='todos'>
            <h1 className='todosTitle'>To Do App</h1>
            <InputAdd
                onAdd={(title, email) => {
                    if (title) {
                        createTask(title, email);
                    }
                }}
            />
            {!tasks.length && (
                <p className='todosText'>There is no task.</p>
            )}
            {currentTasks.length ? (
                <div className='todosFilters'>
                    <input className='input-search' type='search' value={searchTerm} onChange={handleSearch} />
                </div>
            ) : null}
            <div className='todosTasks'>
                {searchTerm ? filteredData.map(task => (
                    <InputTask
                        key={task.id}
                        id={task.id}
                        title={task.title}
                        completed={task.completed}
                        email={task.email}
                        onEdited={updateTask}
                        onRemoved={removeTask}
                    />
                )) : null}
                {!searchTerm ? currentTasks?.map((task) => (
                    <InputTask
                        key={task.id}
                        id={task.id}
                        title={task.title}
                        completed={task.completed}
                        email={task.email}
                        onEdited={updateTask}
                        onRemoved={removeTask}
                    />
                )) : null}
            </div>
            <nav>
                <ul>
                    {pageNumbers.map(number => (
                        <li key={number}>
                            <a onClick={() => paginate(number)} href='#'>
                                {number}
                            </a>
                        </li>
                    ))}
                </ul>
            </nav>
        </div>
    );
}