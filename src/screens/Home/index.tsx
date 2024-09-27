import React from "react";
import { FlatList } from "react-native-gesture-handler";
import Container from "src/components/atoms/Container";
import Spacer from "src/components/atoms/Spacer";
import { useTimes } from "src/context/times";
import TimesCard from "src/components/organisms/TimesCard";
import { useTheme } from "styled-components/native";
import NotFoundIcon from "@assets/ilustrations/not-found.svg"
import Box from "src/components/atoms/Box";
import CustomText from "src/components/atoms/Text";

const HomeScreen: React.FC = () => {
    const theme = useTheme()
    const { times } = useTimes()

    return (
        <Container>
            {
                times.length > 0 ?
                    <FlatList data={times} renderItem={({ item }) => <TimesCard time={item} />}
                        keyExtractor={item => item.id} ItemSeparatorComponent={() => <Spacer size={10} />} />

                    :
                    <Box flexDirection="column" alignItems="center" justiFyContent="center">
                        <NotFoundIcon color={theme.COLORS.SECONDARY} width={400} height={400} />
                        <CustomText color={theme.COLORS.SECONDARY}>Nenhum disponível no momento.</CustomText>
                    </Box>
            }
        </Container>
    )
}

export default HomeScreen;