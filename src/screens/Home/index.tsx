import React, { useLayoutEffect, useRef } from "react";
import { FlatList } from "react-native-gesture-handler";
import Spacer from "src/components/atoms/Spacer";
import { ITimes, useTimes } from "src/context/times";
import TimesCard from "src/components/organisms/TimesCard";
import { useTheme } from "styled-components/native";
import NotFoundIcon from "@assets/ilustrations/not-found.svg"
import Box from "src/components/atoms/Box";
import CustomText from "src/components/atoms/Text";
import TimesHeader from "@components/organisms/TimesHeader";
import { Modalize } from "react-native-modalize";
import ModalForm from "@components/organisms/ModalForm";
import { useNavigation } from "@react-navigation/native";
import PlusIcon from '@assets/icons/plus.svg'
import { Pressable } from "react-native";


const HomeScreen: React.FC = () => {
    const navigation = useNavigation()
    const theme = useTheme()
    const { times, setTimes } = useTimes()
    const modalizeRef = useRef<Modalize>(null);

    const openModal = () => {
        modalizeRef.current?.open();
    }

    const handleSubmit = (item: ITimes) => {
        setTimes([...times, item])
        modalizeRef.current?.close();
    }

    useLayoutEffect(() => {
        navigation.setOptions({
            headerRight: () => <Pressable style={{ padding: 12 }} onPress={openModal}><PlusIcon stroke={theme.COLORS.WHITE} /></Pressable>
        })
    }, [navigation])

    return (
        <>
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
                style={{ padding: 20, backgroundColor: theme.COLORS.BACKGROUND }}
            />

            <ModalForm ref={modalizeRef} onSubmit={handleSubmit} />
        </>
    )
}

export default HomeScreen;