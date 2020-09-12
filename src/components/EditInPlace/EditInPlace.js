import React, {useState, useEffect, useRef} from 'react';

import { ContainerEditInPlace } from './styles-edit-in-place';

const EditInPlace = ({value, onChangeValue}) => {
    const [isEditing, setIsEditing] = useState(false)
    const edit = () => setIsEditing(true)
    const done = () => {
        onChangeValue(inputRef.current.value !== "" ? inputRef.current.value : "*")
        setIsEditing(false)
    }
    const inputRef = useRef(null)

    useEffect(() => {
        if (isEditing) inputRef.current.focus()
    }, [isEditing])

    let element = isEditing ? (
        <input type='text' defaultValue={value} onBlur={done} ref={inputRef}/>
    ) : (
        <h1 onClick={edit} className="edit-in-place">{value !== '' ? value : "!SEM DADOS!"}</h1>
    )
    return (
        <ContainerEditInPlace>
            {element}            
        </ContainerEditInPlace>
    );
}

export default EditInPlace;