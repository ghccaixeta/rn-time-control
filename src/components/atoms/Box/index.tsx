import React, { PropsWithChildren } from "react";
import { Container } from "./styles";
import { ViewProps } from "react-native";


interface IBoxProps extends ViewProps {
    flexDirection: 'row' | 'column',
    justiFyContent?: 'flex-start' | 'flex-end' | 'center' | 'space-between'
    alignItems?: 'start' | 'center' | 'end' | 'flex-end'
    width?: number
}

const Box: React.FC<PropsWithChildren<IBoxProps>> = ({ flexDirection, justiFyContent, alignItems, width = 100, children, ...rest }) => {
    return (
        <Container flexDirection={flexDirection} justiFyContent={justiFyContent} alignItems={alignItems} width={width} {...rest}>
            {children}
        </Container>
    )
}

export default Box;