import React, {useRef} from 'react';

import { ContainerEditInPlace } from './styles-edit-in-place';

const EditInPlace = ({value, onChangeValue}) => {
    const done = () => {
        onChangeValue(inputRef.current.textContent !== "" ? inputRef.current.textContent : "*")
    }
    const inputRef = useRef(null)

    return (
        <ContainerEditInPlace>
            <span suppressContentEditableWarning={true} className='textArea' onBlur={done} contentEditable ref={inputRef}>{value}</span>
        </ContainerEditInPlace>
    );
}

export default EditInPlace;