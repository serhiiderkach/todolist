import React, {ChangeEvent} from "react";
import {filterType} from "./App";
import {AddItemForm} from "./AddItemForm";
import {EditableSpan} from "./EditableSpan";
import DeleteIcon from '@mui/icons-material/Delete';
import {Button, IconButton} from "@mui/material";
import CheckBox from "@mui/material/Checkbox";

export interface Task {
    id: string;
    title: string;
    isDone: boolean;
}

export interface TodolistProps {
    id: string;
    title: string;
    tasks: Array<Task>;
    addItem: (taskTitle: string, todolistId: string) => void;
    removeTask: (id: string, todolistId: string) => void;
    changeFilter: (value: filterType, todolistId: string) => void;
    changeTaskStatus: (taskId: string, isDone: boolean, todolistId: string) => void;
    filter: filterType;
    removeTodolist: (todolistId: string) => void;
    changeTodolistTitle: (id: string, newTitle: string) => void;
    changeTaskTitle: (id: string, newTitle: string, todolistId: string) => void;
}

export const Todolist = (props: TodolistProps) => {
    const onAllClick = () => {
        props.changeFilter('all', props.id);
    };
    const onActiveClick = () => {
        props.changeFilter('active', props.id);
    };
    const onCompletedClick = () => {
        props.changeFilter('completed', props.id);
    };
    const removeTodolist = () => {
        props.removeTodolist(props.id);
    }
    const addTask = (title: string) => {
        props.addItem(title, props.id);
    }

    const changeTodolistTitle = (newTitle :string) => {
        props.changeTodolistTitle(props.id, newTitle);
    }

    return <div>
        <h3><EditableSpan title={props.title} onChange={changeTodolistTitle} />
            <IconButton aria-label="delete" onClick={removeTodolist}>
                <DeleteIcon />
            </IconButton>
        </h3>
        <AddItemForm addItem={addTask} />
        <div>
            {props.tasks.map(task => {
                const onRemoveHandler = () => {
                    props.removeTask(task.id, props.id)
                }
                const onChangeStatusHandler = (e: ChangeEvent<HTMLInputElement>) => {
                    let newIsDoneValue = e.currentTarget.checked;
                    props.changeTaskStatus(task.id, newIsDoneValue, props.id)
                };
                const onChangeTitleHandler = (newValue: string) => {
                    props.changeTaskTitle(task.id, newValue, props.id)
                };
                return <div key={task.id} className={task.isDone ? 'is-done': ''}>
                    <CheckBox checked={task.isDone} onChange={onChangeStatusHandler} />
                    <EditableSpan title={task.title} onChange={onChangeTitleHandler} />
                    <IconButton aria-label="delete" onClick={onRemoveHandler}>
                        <DeleteIcon />
                    </IconButton>
                </div>
            })
            }
        </div>
        <div>
            <Button variant={props.filter === 'all' ? 'contained' : 'text'} onClick={onAllClick}>All</Button>
            <Button color={'primary'} variant={props.filter === 'active' ? 'contained' : 'text'} onClick={onActiveClick}>Active</Button>
            <Button color={'secondary'} variant={props.filter === 'completed' ? 'contained' : 'text'} onClick={onCompletedClick}>Completed</Button>
        </div>
    </div>
}

