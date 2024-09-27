import React, { PropsWithChildren, ReactNode } from "react";
import { Container } from "./styles";
import CustomText from "../Text";
import { useTheme } from "styled-components/native";
import Box from "../Box";
import Spacer from "../Spacer";


interface ICardProps {
    title: string
    leftComponent?: ReactNode
}

const Card: React.FC<PropsWithChildren<ICardProps>> = ({ title, leftComponent, children }) => {
    const theme = useTheme()
    return (
        <Container>
            <Box flexDirection="row" justiFyContent="flex-start" alignItems="center">
                {leftComponent}
                <Spacer horizontal={6} />
                <CustomText color={theme.COLORS.PRIMARY} bold>{title}</CustomText>
            </Box>
            <Spacer vertical={20} />
            <Box flexDirection="column">
                {children}
            </Box>
        </Container>
    )
}

export default Card