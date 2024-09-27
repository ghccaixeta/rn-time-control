import React, { useEffect, useState } from "react";
import { Container } from "./styles";

import { ITimes, useTimes } from "src/context/times";
import CustomText from "src/components/atoms/Text";
import PlayerPlayIcon from '@assets/icons/player-lay.svg'
import CheckIcon from '@assets/icons/check.svg'
import { useTheme } from "styled-components/native";
import Box from "src/components/atoms/Box";
import Spacer from "src/components/atoms/Spacer";
import { Pressable } from "react-native";
import { differenceInSeconds, format } from "date-fns";
import { getDBConnection, saveTimes } from "src/services/db";

interface ITimesCardProps {
    time: ITimes
}

const TimesCard: React.FC<ITimesCardProps> = ({ time }) => {
    const theme = useTheme()
    const { times, setTimes } = useTimes()
    const [seconds, setSeconds] = useState(0);
    const [isRunning, setIsRunning] = useState(false);
    const [fineshed, setFineshed] = useState<boolean>();

    const handleStart = () => {

        const _times: ITimes[] = times

        _times.map((item) => {
            if (item.id === time.id) {
                const date = new Date();
                item.date = date.toString()
                item.status = 'active'
            }
        })

        setTimes(_times);
        setIsRunning(true);

    }

    const getTime = () => {
        const minutesAmount = Math.floor(seconds / 60)
        const secondsAmount = seconds % 60

        const _minutes = String(minutesAmount).padStart(2, '0')
        const _seconds = String(secondsAmount).padStart(2, '0')

        return (`${_minutes}:${_seconds}`)

    }

    const handleComplete = async () => {

        const db = await getDBConnection();

        await saveTimes(db, time)

        const _times = times.filter(item => item.id !== time.id)
        setTimes(_times)
    }

    useEffect(() => {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        let interval: any

        if (isRunning && !fineshed) {
            interval = setInterval(() => {
                const secondsDiff = differenceInSeconds(
                    new Date(),
                    new Date(time.date!)
                )

                if (secondsDiff >= time.minutes * 60) {

                    const _times: ITimes[] = times

                    _times.map((item) => {
                        if (item.id === time.id) {
                            item.status = 'completed'
                        }
                    })
                    setTimes(_times);
                    setFineshed(true)
                    setIsRunning(false)
                    clearInterval(interval)
                } else {
                    setSeconds(secondsDiff)
                }
            }, 1000)
        }

        return () => {
            clearInterval(interval)
        }
    }, [isRunning])

    useEffect(() => {
        setIsRunning(time.status === 'active')
    }, [])

    return (
        <Container>
            <Box flexDirection="column" width={50}>
                <CustomText color={theme.COLORS.SECONDARY} bold>{time.completeName}</CustomText>
                <Spacer vertical={10} />
                <CustomText>
                    {
                        time.date
                            ? format(new Date(time.date), "dd/MM/yy k'h'm")
                            : 'Aguardando'
                    }
                </CustomText>
            </Box>
            <Box flexDirection="row" alignItems="center" width={50}>
                {

                    isRunning
                        ? <CustomText color={theme.COLORS.GREEN_500} bold size={theme.FONT_SIZE.LG}>{getTime()}</CustomText>
                        : time.status === 'waiting' ?
                            <Pressable onPress={handleStart}>
                                <PlayerPlayIcon fill={theme.COLORS.WHITE} />
                            </Pressable>
                            :
                            <Pressable onPress={handleComplete}>
                                <CheckIcon stroke={theme.COLORS.GREEN_500} />
                            </Pressable>
                }
            </Box>
        </Container>
    )

}

export default TimesCard