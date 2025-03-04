import Box from "@components/atoms/Box";
import Container from "@components/atoms/Container";
import Spacer from "@components/atoms/Spacer";
import CustomText from "@components/atoms/Text";
import React, { useEffect, useState } from "react";
import { FlatList, TextInput } from "react-native-gesture-handler";
import { ITimes } from "src/context/times";
import { getDBConnection, getTimes } from "src/services/db";
import { useTheme } from "styled-components/native";
import NotFoundIcon from "@assets/ilustrations/not-found.svg"
import ReportListItem from "@components/organisms/ReportListItem";
import Divider from "@components/atoms/Divider";
import { ActivityIndicator, Pressable, RefreshControl } from "react-native";
import InputContainer from "@components/atoms/InputContainer";
import SearchIcon from '@assets/icons/search.svg'
import CalendarIcon from '@assets/icons/calendar.svg'
import ModalComponent from "@components/organisms/Modal";
import DateTimePicker, { DateType } from "react-native-ui-datepicker";
import * as locale from 'dayjs/locale/pt-br';

const ReportScreen: React.FC = () => {
    const theme = useTheme()
    const [times, setTimes] = useState<ITimes[]>()
    const [startDate, setStartDate] = useState<DateType>();
    const [endDate, setEndDate] = useState<DateType>();
    const [isLoading, setIsLoading] = useState<boolean>(false)
    const [isModalVisible, setIsModalVisible] = useState<boolean>(false)

    const handleModal = () => {
        setIsModalVisible(!isModalVisible)
    }

    const handleDate = () => {
        handleModal()
    }

    const init = async () => {
        setIsLoading(true)
        const db = await getDBConnection();
        const items = await getTimes(db)
        setTimes(items)
        setIsLoading(false)

    }

    useEffect(() => {
        init()
    }, [])

    return (
        <>
            <Container>
                {
                    times ?
                        <FlatList
                            data={times}
                            refreshControl={
                                <RefreshControl refreshing={isLoading} onRefresh={() => init()} />
                            }
                            ListHeaderComponent={
                                <>
                                    <ModalComponent isVisible={isModalVisible} title="Selecione um intervalo" onRequestClose={handleModal}>
                                        <DateTimePicker
                                            mode="range"
                                            locale={locale.name}
                                            startDate={startDate}
                                            endDate={endDate}
                                            onChange={({ startDate, endDate }) => {
                                                setStartDate(startDate)
                                                setEndDate(endDate)
                                            }}
                                        />
                                        <Box flexDirection="row" justiFyContent="flex-end">
                                            <Pressable onPress={handleModal}>
                                                <CustomText color={theme.COLORS.PRIMARY} bold>Fechar</CustomText>
                                            </Pressable>
                                            <Spacer horizontal={16} />
                                            <Pressable onPress={handleDate}>
                                                <CustomText color={theme.COLORS.PRIMARY} bold>Ok</CustomText>
                                            </Pressable>
                                        </Box>
                                    </ModalComponent>
                                    <InputContainer
                                        leftComponent={<SearchIcon stroke={theme.COLORS.SECONDARY} />}
                                        rightComponent={
                                            <Pressable onPress={handleModal}>
                                                <CalendarIcon stroke={theme.COLORS.SECONDARY} />
                                            </Pressable>
                                        }
                                    >
                                        <TextInput style={{ flex: 1, color: theme.COLORS.WHITE }}></TextInput>
                                    </InputContainer>
                                    <Spacer vertical={30} />
                                </>
                            }
                            ListEmptyComponent={
                                <Box flexDirection="column" alignItems="center" justiFyContent="center">
                                    <NotFoundIcon width={200} height={300} />
                                    <Spacer vertical={20} />
                                    <CustomText size={theme.FONT_SIZE.LG}>Nenhum disponível no momento.</CustomText>
                                </Box>
                            }
                            renderItem={({ item }) =>
                                <>
                                    <Spacer vertical={20} />
                                    <ReportListItem time={item} />
                                    <Spacer vertical={20} />
                                </>
                            }
                            keyExtractor={item => item.id}
                            ItemSeparatorComponent={() => <Divider />
                            }
                        />
                        :
                        <ActivityIndicator />
                }
            </Container>
        </>
    )
}

export default ReportScreen
