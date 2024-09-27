import Box from "@components/atoms/Box";
import Spacer from "@components/atoms/Spacer";
import CustomText from "@components/atoms/Text";
import { format } from "date-fns";
import React from "react";
import { ITimes } from "src/context/times";
import { useTheme } from "styled-components/native";

interface IReportListItem {
    time: ITimes
}

const ReportListItem: React.FC<IReportListItem> = ({ time }) => {
    const theme = useTheme()
    return (
        <Box flexDirection="row" justiFyContent="space-between" alignItems="center">
            <Box flexDirection="column" width={50}>
                <CustomText color={theme.COLORS.SECONDARY} size={theme.FONT_SIZE.LG} bold>{time.completeName}</CustomText>
                <Spacer vertical={8} />
                <CustomText>{format(new Date(time.date!), "dd/MM/yy k'h'mm")}</CustomText>
            </Box>
            <Box flexDirection="row" width={50}>
                <CustomText size={theme.FONT_SIZE.XL} bold>{time.minutes}<CustomText>min</CustomText></CustomText>
            </Box>
        </Box>
    )

}

export default ReportListItem