import React from "react";
import { Text } from "react-native";
import Container from "src/atoms/Container";
import { useTheme } from "styled-components/native";

const TimesForm: React.FC = () => {

    const theme = useTheme();

    return (
        <Container backgroundColor={theme.COLORS.WHITE}>
            <Text>A</Text>
            <Text>A</Text>
            <Text>A</Text>
            <Text>A</Text>
            <Text>A</Text>
        </Container>
    )

}

export default TimesForm