import React, { useState, ChangeEvent } from 'react';
import {Button, TextField, IconButton} from "@material-ui/core";
import { AddBox } from '@material-ui/icons';

type AddItemFormPropsType = {
    additem: (title: string) => void
}

const AddItemForm = (props: AddItemFormPropsType) => {

    let [title, setTitle] = useState<string>("");
    let [error, setError] =useState<string | null>(null)

    const onTitleChange = (e: ChangeEvent<HTMLInputElement>) => {setError(null); setTitle(e.currentTarget.value) }



    const onAddItemClick = () => {
        if((title.trim()) !== "") { 
            props.additem(title.trim())
            setTitle("")
        } else {
            setError("Title is required")
        }
    }


    
    return (
        <div onBlur={() => {setError(null);}}>
            {/* <input 
                className={error ? "error": ""}
                type="text" 
                value={title} 
                onChange={ (e) => { onTitleChange(e) }}
                onKeyPress={ (e) => {
                    setError(null)
                    if(e.charCode === 13) {
                        onAddItemClick()
                    } 
                }}
            /> */}

            <TextField 
                value={title}
                onChange={onTitleChange}
                onKeyPress={ (e) => {
                    setError(null)
                    if(e.charCode === 13) {
                        onAddItemClick()
                    } 
                }}
                error={!!error}
                variant={"outlined"}
                label={"Title"}
                helperText={error}
            />
            <IconButton  color={"primary"} onClick={onAddItemClick}>
                <AddBox />
            </IconButton>
            {/*<button onClick={() => { onAddItemClick }}>add</button>*/}
            {/* {error && <div className="error-message">{error}</div> } */}
        </div>
    )
}


export default AddItemForm;