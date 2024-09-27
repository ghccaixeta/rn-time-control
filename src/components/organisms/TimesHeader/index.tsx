import Box from "@components/atoms/Box";
import Card from "@components/atoms/Cards";
import CustomText from "@components/atoms/Text";
import React from "react";
import { useTheme } from "styled-components/native";

import RocketIcon from '@assets/icons/rocket.svg'
import UsersIcon from '@assets/icons/users.svg'
import CheckIcon from '@assets/icons/check.svg'
import { ITimes } from "src/context/times";

interface ITimesHeader {
    times: ITimes[]
}

const TimesHeader: React.FC<ITimesHeader> = ({ times }) => {
    const theme = useTheme()
    return (
        <Box flexDirection="row" justiFyContent="space-between">
            <Card title="Ativos" leftComponent={<RocketIcon stroke={theme.COLORS.PRIMARY} />}>
                <CustomText color={theme.COLORS.PRIMARY} center bold size={theme.FONT_SIZE.XL}>{times.length}</CustomText>
            </Card>
            <Card title="Fila" leftComponent={<UsersIcon stroke={theme.COLORS.PRIMARY} />}>
                <CustomText color={theme.COLORS.PRIMARY} center bold size={theme.FONT_SIZE.XL}>{times.filter((item) => item.status === 'waiting').length}</CustomText>
            </Card>
            <Card title="Expirado" leftComponent={<CheckIcon stroke={theme.COLORS.PRIMARY} />}>
                <CustomText color={theme.COLORS.PRIMARY} center bold size={theme.FONT_SIZE.XL}>{times.filter((item) => item.status === 'completed').length}</CustomText>
            </Card>
        </Box>
    )

}

export default TimesHeader