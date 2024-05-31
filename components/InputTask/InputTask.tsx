import React, { useEffect, useRef, useState } from 'react';
import { IconButton, TextField } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import CheckIcon from '@mui/icons-material/Check';
import { useSession } from 'next-auth/react';
import Task from '@/components/Task';
import './styles.scss';

interface TodoListProps {
    id: string,
    title: string,
    completed: boolean,
    email: string | null | undefined,
    onEdited: (id: string, title: string, completed: boolean) => void,
    onRemoved: (id: string) => void,
}

const InputTask: React.FC<TodoListProps> = ({ id, title, onEdited, onRemoved, email, completed }) => {
    const [isCompleted, setIsCompleted] = useState(completed);
    const [edit, setEdit] = useState(false);
    const [value, setValue] = useState(title);
    const editInputRef = useRef<HTMLInputElement>(null);

    const session = useSession();

    const isAdmin: boolean = session?.data?.user?.role === 'admin';
    const isUser: boolean = session?.data?.user?.role === 'user';

    useEffect(() => {
        if (edit) {
            editInputRef?.current?.focus();
        }
    }, [edit]);

    const handleCheckbox = (e: React.ChangeEvent<HTMLInputElement>) => {
        setIsCompleted(e.target.checked);
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setValue(e.target.value);
    };

    const handleOnKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter') {
            onEdited(id, value, isCompleted);
            setEdit(false);
        }
    };

    return (
        <div className='inputTask'>
            <label className='inputTaskLabel'>
                {!isUser && edit ? (
                    <input
                        className='inputTaskCheckbox'
                        type='checkbox'
                        checked={isCompleted}
                        onChange={handleCheckbox}
                    />
                ) : null}
                {!isUser && edit ? (
                    <TextField
                        inputRef={editInputRef}
                        className='inputTaskEdit'
                        variant='standard'
                        required
                        fullWidth
                        inputProps={{ maxLength: 25, minLength: 3 }}
                        size='small'
                        value={value}
                        onChange={handleChange}
                        onKeyDown={handleOnKeyDown}
                    />
                ) : <Task isCompleted={isCompleted} email={email} title={title} />
                }
            </label>
            <div className='inputTaskAction'>
                {!isUser && edit ? (
                    <IconButton
                        aria-label='Save'
                        color='primary'
                        className='inputTaskSave'
                        onClick={() => {
                            onEdited(id, value, isCompleted);
                            setEdit(false);
                        }}
                    >
                        <CheckIcon />
                    </IconButton>
                ) : (
                    <IconButton
                        aria-label='edit'
                        color='primary'
                        className='inputTaskEdit'
                        onClick={() => {
                            setEdit(true);
                        }}
                    >
                        <EditIcon />
                    </IconButton>)
                }
                <IconButton
                    aria-label='delete'
                    color='primary'
                    className='inputTaskRemove'
                    onClick={() => {
                        onRemoved(id);
                    }}
                >
                    <DeleteIcon />
                </IconButton>
            </div>
        </div>
    );
};

export default InputTask;