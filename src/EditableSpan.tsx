import React, { useState, ChangeEvent } from 'react'
import { TextField } from '@material-ui/core';

type EditableSpanType = {
    title: string
    saveTitle: (newTitle: string) => void
}

function EditableSpan(props: EditableSpanType) {

    let [editMode, setEditMode] = useState(false);
    let [title, setTitle] = useState(props.title);

    const onEditMode = () => {
        setEditMode(true);
    };

    const offEditMode = () => {
        setEditMode(false);
        props.saveTitle(title);
        setTitle('');
    };

    const changeTitle = (e:ChangeEvent<HTMLInputElement>) => {
        setTitle(e.currentTarget.value);
    };

    return editMode
           ? 
        //    <input 
        //         value={title}
        //         onChange={(e) => {changeTitle(e)}}
        //         autoFocus={true}
        //         onBlur={offEditMode}
        //     />
            <TextField 
                value={title}
                onChange={changeTitle}
                autoFocus={true}
                onBlur={offEditMode}
                variant={"outlined"}
            />
           : <span onDoubleClick={ onEditMode }>{props.title}</span> 
    
}

export default EditableSpan;