import React, { useState, ChangeEvent } from 'react';
import {Button, TextField} from "@material-ui/core";

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
        <div>
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
                className={error ? "error": ""}
                variant={"outlined"}
            />
            
            <Button onClick={onAddItemClick} variant={"contained"} color={"primary"}>+</Button>
            {/*<button onClick={() => { onAddItemClick }}>add</button>*/}
            {error && <div className="error-message">{error}</div> }
        </div>
    )
}


export default AddItemForm;