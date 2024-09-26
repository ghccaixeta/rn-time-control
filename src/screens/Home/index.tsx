import React from "react";
import { Text } from "react-native";
import Container from "src/atoms/Container";
import { useTimes } from "src/context/times";
import { useTheme } from "styled-components/native";

const HomeScreen: React.FC = () => {
    const theme = useTheme()
    const { times } = useTimes()

    return (
        <Container>
            {
                times.length > 0 ?
                    <Text>Data list</Text>
                    :
                    <Text style={{ color: theme.COLORS.WHITE }}>Nenhum item disponível no momento.</Text>
            }
        </Container>
    )
}

export default HomeScreen;