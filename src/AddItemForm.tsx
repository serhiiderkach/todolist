import React, {ChangeEvent, KeyboardEvent, useState} from "react";
import {IconButton, TextField} from "@mui/material";
import {ControlPoint} from "@mui/icons-material";

interface AddItemFormProps {
    addItem: (title: string) => void;
}
export const AddItemForm = (props: AddItemFormProps) => {
    const [taskTitle, setTaskTitle] = useState('');
    const [error, setError] = useState('');

    const onChange = (e: ChangeEvent<HTMLInputElement>) => {
        setTaskTitle(e.currentTarget.value)
    }
    const addItem = () => {
        if (!taskTitle.trim()) {
            setError('Title is required!')
            return;
        }
        props.addItem(taskTitle.trim());
        setTaskTitle('');
    };
    const onKeyPress = (e: KeyboardEvent<HTMLInputElement>) => {
        setError('');
        if (e.charCode === 13) {
            addItem();
        }
    };
    return <div>
        <TextField type="text"
                   variant={'outlined'}
                   label={'Type Value'}
               value={taskTitle}
               onChange={onChange}
               onKeyPress={onKeyPress}
               error={!!error}
                   helperText={error}
        />
        <IconButton onClick={addItem} color={'primary'}>
                <ControlPoint />
        </IconButton>
    </div>
}