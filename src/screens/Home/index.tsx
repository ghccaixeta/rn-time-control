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
import TimesHeader from "@components/organisms/TimesHeader";


const HomeScreen: React.FC = () => {
    const theme = useTheme()
    const { times } = useTimes()

    return (
        <Container>
            <FlatList
                data={times}
                ListHeaderComponent={
                    <>
                        <TimesHeader />
                        <Spacer vertical={30} />
                    </>
                }
                ListEmptyComponent={
                    <Box flexDirection="column" alignItems="center" justiFyContent="center">
                        <NotFoundIcon width={200} height={300} />
                        <Spacer vertical={20} />
                        <CustomText size={theme.FONT_SIZE.LG}>Nenhum item disponível no momento.</CustomText>
                    </Box>
                }
                renderItem={({ item }) => <TimesCard time={item} />}
                keyExtractor={item => item.id}
                ItemSeparatorComponent={() => <Spacer vertical={10} />
                }
            />
        </Container>
    )
}

export default HomeScreen;