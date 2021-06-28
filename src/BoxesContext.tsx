import React, { useState } from 'react';
import Box from './types/Box';

type ContextProps = {
    boxes: [Box[], React.Dispatch<React.SetStateAction<Box[]>>]
}

export const BoxesContext = React.createContext<Partial<ContextProps>>({})

const BoxesProvider = (props: any) => {
    const [boxes, setBoxes] = useState<Box[]>([]); 
    return (
        <BoxesContext.Provider 
            value={{ boxes: [boxes, setBoxes] }}
        >
            {props.children}
        </BoxesContext.Provider>
    )
}

export default BoxesProvider;