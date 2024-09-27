import React, { PropsWithChildren } from "react";
import { Container } from "./styles";


interface IBoxProps {
    flexDirection: 'row' | 'column',
    justiFyContent?: 'flex-start' | 'flex-end' | 'center' | 'space-between'
    alignItems?: 'start' | 'center'
    width?: number
}

const Box: React.FC<PropsWithChildren<IBoxProps>> = ({ flexDirection, justiFyContent, alignItems, width = 100, children }) => {
    return (
        <Container flexDirection={flexDirection} justiFyContent={justiFyContent} alignItems={alignItems} width={width}>
            {children}
        </Container>
    )
}

export default Box;