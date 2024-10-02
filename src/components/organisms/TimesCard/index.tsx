/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useEffect, useState } from "react";
import { Container } from "./styles";

import { ITimes, TIME_STATUS, useTimes } from "src/context/times";
import CustomText from "src/components/atoms/Text";
import PlayerPlayIcon from '@assets/icons/player-lay.svg'
import PauseIcon from '@assets/icons/pause.svg'
import CheckIcon from '@assets/icons/check.svg'
import { useTheme } from "styled-components/native";
import Box from "src/components/atoms/Box";
import Spacer from "src/components/atoms/Spacer";
import { Pressable, Vibration } from "react-native";
import { differenceInSeconds, format } from "date-fns";
import { getDBConnection, saveTimes } from "src/services/db";
import Tag from "@components/atoms/Tag";
import RNBeep from 'react-native-a-beep';

interface ITimesCardProps {
    time: ITimes
}

const TimesCard: React.FC<ITimesCardProps> = ({ time }) => {
    const theme = useTheme()
    const { times, setTimes } = useTimes()
    const [seconds, setSeconds] = useState(0);
    const [secondsPaused, setSecondsPaused] = useState(0);
    const [status, setStatus] = useState<TIME_STATUS>();
    const [fineshed, setFineshed] = useState<boolean>();

    const handleStart = () => {

        const _times: ITimes[] = times

        _times.map((item) => {
            if (item.id === time.id) {
                const date = new Date();
                item.date = status === 'waiting' ? date.toString() : item.date
                item.status = 'active'
            }
        })

        setTimes(_times);
        setStatus('active');

    }

    const handlePause = () => {
        const _times: ITimes[] = times

        _times.map((item) => {
            if (item.id === time.id) {
                const date = new Date();
                item.status = 'paused'
                item.pauseDate = date.toString()
            }
        })

        setTimes(_times);
        setStatus('paused');
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
        let activeInterval: any
        let pauseInterval: any

        if (status === 'active' && !fineshed) {
            activeInterval = setInterval(() => {
                const secondsDiff = differenceInSeconds(
                    new Date(),
                    new Date(time.date!)
                )

                if (secondsDiff - secondsPaused > time.minutes * 60) {

                    const _times: ITimes[] = times

                    _times.map((item) => {
                        if (item.id === time.id) {
                            item.status = 'completed'
                        }
                    })
                    setTimes(_times);
                    setFineshed(true)
                    setStatus('completed')
                    RNBeep.beep(false)
                    Vibration.vibrate(500)
                    clearInterval(activeInterval)
                } else {
                    setSeconds(secondsDiff - secondsPaused)
                }
            }, 1000)
        }

        if (status === 'paused' && !fineshed) {
            pauseInterval = setInterval(() => {
                const secondsDiff = differenceInSeconds(
                    new Date(),
                    new Date(time.pauseDate!)
                )
                setSecondsPaused(secondsPaused + secondsDiff)
            }, 1000)
        }

        return () => {
            clearInterval(activeInterval)
            clearInterval(pauseInterval)
        }
    }, [status])

    useEffect(() => {
        setStatus(time.status)
    }, [])

    return (
        <Container>
            <Box flexDirection="row" justiFyContent="space-between">
                <Tag label={`${time.minutes}min`} color={theme.COLORS.INFO} />
                {
                    time.status === 'waiting' || time.status === 'paused' ?
                        <Pressable onPress={handleStart}>
                            <PlayerPlayIcon fill={theme.COLORS.WHITE} />
                        </Pressable>
                        : time.status === 'active' ?
                            <Pressable onPress={handlePause}>
                                <PauseIcon fill={theme.COLORS.WHITE} />
                            </Pressable>
                            : <Pressable onPress={handleComplete}>
                                <CheckIcon stroke={theme.COLORS.WHITE} />
                            </Pressable>
                }
            </Box>
            <Spacer vertical={20} />
            <Box flexDirection="row">
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
                    <CustomText color={theme.COLORS.GREEN_500} bold size={theme.FONT_SIZE.LG}>{getTime()}</CustomText>
                    {/* {

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
                    } */}
                </Box>

            </Box>
        </Container>
    )

}

export default TimesCard