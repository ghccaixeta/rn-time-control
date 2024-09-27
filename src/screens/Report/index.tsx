import Box from "@components/atoms/Box";
import Container from "@components/atoms/Container";
import Spacer from "@components/atoms/Spacer";
import CustomText from "@components/atoms/Text";
import React, { useEffect, useState } from "react";
import { FlatList } from "react-native-gesture-handler";
import { ITimes } from "src/context/times";
import { getDBConnection, getTimes } from "src/services/db";
import { useTheme } from "styled-components/native";
import NotFoundIcon from "@assets/ilustrations/not-found.svg"
import ReportListItem from "@components/organisms/ReportListItem";
import Divider from "@components/atoms/Divider";
import { ActivityIndicator, RefreshControl } from "react-native";
import InputContainer from "@components/atoms/InputContainer";

const ReportScreen: React.FC = () => {
    const theme = useTheme()
    const [times, setTimes] = useState<ITimes[]>()
    const [isLoading, setIsLoading] = useState<boolean>(false)

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
    )
}

export default ReportScreen