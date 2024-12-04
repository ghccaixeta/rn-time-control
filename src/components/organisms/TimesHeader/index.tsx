import Box from "@components/atoms/Box";
import Card from "@components/atoms/Cards";
import CustomText from "@components/atoms/Text";
import React from "react";
import { useTheme } from "styled-components/native";

import RocketIcon from '@assets/icons/rocket.svg'
import UsersIcon from '@assets/icons/users.svg'
import CheckIcon from '@assets/icons/check.svg'
import { useTimes } from "src/context/times";

const TimesHeader: React.FC = () => {
    const theme = useTheme()
    const { times } = useTimes()

    return (
        <Box flexDirection="row" justiFyContent="space-between">
            <Box flexDirection="row" width={30}>
                <Card title="Ativos" leftComponent={<RocketIcon stroke={theme.COLORS.PRIMARY} />}>
                    <CustomText color={theme.COLORS.PRIMARY} center bold size={theme.FONT_SIZE.XL}>{times.filter((item) => item.status === 'active').length}</CustomText>
                </Card>

            </Box>
            <Box flexDirection="row" width={30}>
                <Card title="Fila" leftComponent={<UsersIcon stroke={theme.COLORS.PRIMARY} />}>
                    <CustomText color={theme.COLORS.PRIMARY} center bold size={theme.FONT_SIZE.XL}>{times.filter((item) => item.status === 'waiting').length}</CustomText>
                </Card>
            </Box>
            <Box flexDirection="row" width={30}>
                <Card title="Expirado" leftComponent={<CheckIcon stroke={theme.COLORS.PRIMARY} />}>
                    <CustomText color={theme.COLORS.PRIMARY} center bold size={theme.FONT_SIZE.XL}>{times.filter((item) => item.status === 'completed').length}</CustomText>
                </Card>
            </Box>
        </Box>
    )

}

export default TimesHeader