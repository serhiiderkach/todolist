import React, {useState} from 'react';
import './App.css';
import {Task, Todolist} from "./Todolist";
import {v1} from "uuid";
import {AddItemForm} from "./AddItemForm";
import {AppBar, Button, Container, Grid, IconButton, Paper, Toolbar, Typography} from "@mui/material";
import {Menu} from "@mui/icons-material";

export type filterType = 'all' | 'completed' | 'active';
type TodolistType = {
    id: string
    title: string
    filter: filterType
}
type TasksStateType = {
    [key: string]: Array<Task>
}

function App() {
    const todolistId1 = v1();
    const todolistId2 = v1();
    const [tasksObj, setTasksObj] = useState<TasksStateType>({
        [todolistId1]: [
            {id: v1(), title: 'CSS', isDone: true},
            {id: v1(), title: 'JS', isDone: true},
            {id: v1(), title: 'React', isDone: false},
            {id: v1(), title: 'Redux', isDone: false},
        ],
        [todolistId2]: [
            {id: v1(), title: 'Bool', isDone: true},
            {id: v1(), title: 'Milk', isDone: true},
        ]
    })

    const removeTask = (id: string, todolistId: string) => {
        let tasks = tasksObj[todolistId];
        tasksObj[todolistId] = tasks.filter(t => t.id !== id);
        setTasksObj({...tasksObj})
    }
    const addItem = (taskTitle: string, todolistId: string) => {
        let task = {id: v1(), title: taskTitle, isDone: false}
        let tasks = tasksObj[todolistId];
        tasksObj[todolistId] = [task, ...tasks];
        setTasksObj({...tasksObj});
    }
    const changeTaskStatus = (taskId: string, isDone: boolean, todolistId: string) => {
        let tasks = tasksObj[todolistId];
        const task = tasks.find((task) => task.id === taskId)
        if (task) {
            task.isDone = isDone;
            setTasksObj({...tasksObj});
        }
    }
    const changeTaskTitle = (taskId: string, newTitle: string, todolistId: string) => {
        let tasks = tasksObj[todolistId];
        const task = tasks.find((task) => task.id === taskId)
        if (task) {
            task.title = newTitle;
            setTasksObj({...tasksObj});
        }
    }
    const changeFilter = (value: filterType, todolistId: string) => {
        let todolist = todolists.find(tl => tl.id === todolistId);
        if (todolist) {
            todolist.filter = value;
            setTodolists([...todolists])
        }
    }

    const removeTodolist = (todolistId: string) => {
        let filteredTodolist = todolists.filter(tl => tl.id !== todolistId);
        setTodolists(filteredTodolist);
        delete tasksObj[todolistId];
        setTasksObj({...tasksObj});
    }

    const changeTodolistTitle = (id: string, newTitle: string) => {
        const todolist = todolists.find(tl => tl.id === id);
        if (todolist) {
            todolist.title = newTitle;
            setTodolists([...todolists]);
        }
    }

    const [todolists, setTodolists] = useState<Array<TodolistType>>([
        {id: todolistId1, title: 'What to learn', filter: 'active'},
        {id: todolistId2, title: 'What to buy', filter: 'completed'}
    ]);

    const addTodolist = (title: string) => {
        let todolist: TodolistType = {
            id: v1(),
            filter: 'all',
            title: title,
        }
        setTodolists([todolist, ...todolists]);
        setTasksObj({
            ...tasksObj,
            [todolist.id]: []
        })
    }

    return (
        <div className="App">
            <AppBar position={'static'}>
                <Toolbar>
                    <IconButton edge={'start'} color={'inherit'} aria-label={'menu'}>
                        <Menu/>
                    </IconButton>
                    <Typography variant={'h6'}>
                        News
                    </Typography>
                    <Button color={'inherit'}>Login</Button>
                </Toolbar>
            </AppBar>
            <Container fixed>
                <Grid container style={{padding: '10px'}}>

                    <AddItemForm addItem={addTodolist}/>
                </Grid>
                <Grid container spacing={5}>

                    {
                        todolists.map(tl => {
                            let tasksForTodoList = tasksObj[tl.id];
                            if (tl.filter === 'completed') {
                                tasksForTodoList = tasksForTodoList.filter(t => t.isDone)
                            }
                            if (tl.filter === 'active') {
                                tasksForTodoList = tasksForTodoList.filter(t => !t.isDone)
                            }
                            return <Grid item>
                                <Paper style={{ padding: '10px'}}>

                                    <Todolist
                                        key={tl.id}
                                        id={tl.id}
                                        title={tl.title}
                                        tasks={tasksForTodoList}
                                        addItem={addItem}
                                        removeTask={removeTask}
                                        changeFilter={changeFilter}
                                        changeTaskStatus={changeTaskStatus}
                                        filter={tl.filter}
                                        removeTodolist={removeTodolist}
                                        changeTaskTitle={changeTaskTitle}
                                        changeTodolistTitle={changeTodolistTitle}
                                    />
                                </Paper>
                            </Grid>
                        })
                    }
                </Grid>

            </Container>
        </div>
    );
}


export default App;
