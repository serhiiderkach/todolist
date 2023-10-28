import React, {ChangeEvent, useState} from "react";
import {TextField} from "@mui/material";

interface EditableSpanProps {
    title: string;
    onChange: (newValue: string) => void;
}

export const EditableSpan = (props: EditableSpanProps) => {
    const [editMode, setEditMode] = useState(false);
    const [title, setTitle] = useState('')
    const activateEditMode = () => {
        setEditMode(true);
        setTitle(props.title);
    }
    const activateViewMode = () => {
        setEditMode(false);
        props.onChange(title);
    }

    const onChangeTitleHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setTitle(e.currentTarget.value);
    }

    return editMode
        ? <TextField onBlur={activateViewMode} onChange={onChangeTitleHandler} value={title} autoFocus />
        : <span onDoubleClick={activateEditMode}>{props.title}</span>
}