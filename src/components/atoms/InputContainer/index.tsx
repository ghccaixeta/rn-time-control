import React, { PropsWithChildren, ReactNode } from "react";
import { Container } from "./styles";
import CustomText from "../Text";
import { useTheme } from "styled-components/native";

interface IInputContainerProps {
    leftComponent?: ReactNode
    rightComponent?: ReactNode
    errorMessage?: string
    backgroundColor?: string
}

const InputContainer: React.FC<PropsWithChildren<IInputContainerProps>> = ({ leftComponent,
    rightComponent,
    errorMessage,
    backgroundColor,
    children
}) => {
    const theme = useTheme()
    return (
        <>
            <Container backgroundColor={backgroundColor}>
                {leftComponent}
                {children}
                {rightComponent}
            </Container>
            {
                errorMessage &&
                <CustomText color={theme.COLORS.RED}>{errorMessage}</CustomText>
            }
        </>
    )
}

export default InputContainer;