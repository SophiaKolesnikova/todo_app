'use client';
import React, { useCallback, useState } from 'react';
import { Button, TextField } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import { useSession } from 'next-auth/react';
import './styles.scss';

interface InputAddProps {
    onAdd: (title: string, email: string | null | undefined) => void,
}

const InputAdd: React.FC<InputAddProps> = ({ onAdd }) => {
    const [inputValue, setInputValue] = useState('');
    const session = useSession();
    const email = session?.data?.user?.email;

    const addTask = useCallback(() => {
        onAdd(inputValue, email);
        setInputValue('');
    }, [inputValue]);


    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setInputValue(e.target.value);
    };

    const handleOnKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter') {
            addTask();
        }
    };

    return (
        <div className='inputAdd'>
            <TextField
                className='inputAddInput'
                value={inputValue}
                onChange={handleChange}
                onKeyDown={handleOnKeyDown}
                placeholder='Create task...'
            />
            <Button
                className='inputAddButton'
                variant='outlined'
                startIcon={<AddIcon />}
                onClick={addTask}
            >Add</Button>
        </div>
    );
};

export default InputAdd;