import React, { PropsWithChildren } from "react";
import { Container } from "./styles";


interface IBoxProps {
    flexDirection: 'row' | 'column',
    justiFyContent?: 'flex-start' | 'flex-end' | 'center'
    alignItems?: 'start' | 'center'
}

const Box: React.FC<PropsWithChildren<IBoxProps>> = ({ flexDirection, justiFyContent, alignItems, children }) => {
    return (
        <Container flexDirection={flexDirection} justiFyContent={justiFyContent} alignItems={alignItems}>
            {children}
        </Container>
    )
}

export default Box;