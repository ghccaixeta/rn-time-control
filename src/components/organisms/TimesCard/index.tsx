/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useEffect, useRef, useState } from "react";
import { Container } from "./styles";

import { ITimes, useTimes } from "src/context/times";
import CustomText from "src/components/atoms/Text";
import PlayerPlayIcon from '@assets/icons/player-lay.svg'
import PauseIcon from '@assets/icons/pause.svg'
import CheckIcon from '@assets/icons/check.svg'
import EditIcon from '@assets/icons/edit.svg'
import { useTheme } from "styled-components/native";
import Box from "src/components/atoms/Box";
import Spacer from "src/components/atoms/Spacer";
import { Pressable, Vibration } from "react-native";
import { differenceInSeconds, format } from "date-fns";
import { getDBConnection, saveTimes } from "src/services/db";
import Tag from "@components/atoms/Tag";
import RNBeep from 'react-native-a-beep';
import InfinityIcon from '@assets/icons/infinity.svg'
import PlayerStopIcon from '@assets/icons/player-stop.svg'
import RepeatIcon from '@assets/icons/repeat.svg'
import ModalForm from "../ModalForm";
import { Modalize } from "react-native-modalize";

interface ITimesCardProps {
    time: ITimes
}

const TimesCard: React.FC<ITimesCardProps> = ({ time }) => {
    const theme = useTheme()
    const { times, setTimes } = useTimes()
    const timesRef = useRef(times);
    const modalizeRef = useRef<Modalize>(null);
    const [seconds, setSeconds] = useState(0);
    const [secondsPaused, setSecondsPaused] = useState(0);
    const [fineshed, setFineshed] = useState<boolean>();
    const [timeState, setTimeState] = useState<ITimes>(time)
    const [isRenew, setIsRenew] = useState<boolean | undefined>(false)

    const handleStart = () => {

        const _times: ITimes[] = times

        _times.map((item) => {
            if (item.id === time.id) {
                const date = new Date();
                item.date = timeState.status === 'waiting' ? date.toString() : item.date
                item.status = 'active'
            }
        })

        setTimes(_times);
        setTimeState({ ...timeState, status: 'active' })

    }

    const handlePause = () => {
        const _times: ITimes[] = times
        const date = new Date();

        _times.map((item) => {
            if (item.id === time.id) {
                item.status = 'paused'
                item.pauseDate = date.toString()
            }
        })

        setTimeState({
            ...timeState,
            status: 'paused',
            pauseDate: date.toString()
        });

        setTimes(_times);
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

        await saveTimes(db, { ...time, minutes: time.minutes > 0 ? time.minutes : (seconds / 60) })

        const _times = times.filter(item => item.id !== time.id)


        setTimes(_times)
    }

    const handleStop = async () => {
        const _times: ITimes[] = times

        _times.map((item) => {
            if (item.id === time.id) {
                item.status = 'completed'
            }
        })
        setTimes(_times);
        setFineshed(true)
        setTimeState({
            ...timeState,
            status: 'completed',
        })
    }

    const handleModal = async (isRenew?: boolean) => {
        setIsRenew(isRenew)
        modalizeRef.current?.open();
    }

    const handleEdit = (item: ITimes) => {
        let _times: ITimes[] = times

        const _item = item;

        if (isRenew) {
            setFineshed(false)
            _item.status = 'active'
        }

        _times = _times.map((t) => (t.id === _item.id ? _item : t));

        setTimes(_times)
        setTimeState(_item)
        setIsRenew(false)
        modalizeRef.current?.close();
    }

    const handleTimeComplete = (time: ITimes) => {
        const _times = timesRef.current
        _times.map((item) => {
            if (item.id === time.id) {
                item.status = 'completed'
            }
        })
        setTimes(_times);
        setFineshed(true)

        setTimeState({ ...time, status: 'completed' })

        RNBeep.beep(false)
        Vibration.vibrate(500)
        setSeconds(time.minutes * 60)
    }

    useEffect(() => {
        let activeInterval: any
        let pauseInterval: any

        if (timeState.status === 'active' && !fineshed) {
            if (timeState.minutes > 0) {
                activeInterval = setInterval(() => {
                    const secondsDiff = differenceInSeconds(
                        new Date(),
                        new Date(timeState.date!)
                    )

                    if (secondsDiff - secondsPaused > timeState.minutes * 60) {

                        handleTimeComplete(timeState)
                        clearInterval(activeInterval)

                    } else {
                        setSeconds(secondsDiff - secondsPaused)
                    }
                }, 1000)

            } else {
                activeInterval = setInterval(() => {
                    const secondsDiff = differenceInSeconds(
                        new Date(),
                        new Date(timeState.date!)
                    )
                    setSeconds(secondsDiff - secondsPaused)
                }, 1000)
            }
        }

        if (timeState.status === 'paused' && !fineshed) {
            pauseInterval = setInterval(() => {
                const secondsDiff = differenceInSeconds(
                    new Date(),
                    new Date(timeState.pauseDate!)
                )
                setSecondsPaused(secondsPaused + secondsDiff)
            }, 1000)
        }

        return () => {
            clearInterval(activeInterval)
            clearInterval(pauseInterval)
        }
    }, [timeState])

    useEffect(() => {
        timesRef.current = times;
    }, [times])

    return (
        <>
            <Container>
                <Box flexDirection="row" justiFyContent="space-between">
                    <Box flexDirection="row" justiFyContent="flex-start" width={50}>
                        <Tag label={time.minutes && time.minutes > 0 ? `${time.minutes}min` : <InfinityIcon stroke={theme.COLORS.INFO} />} color={theme.COLORS.INFO} />

                        {
                            time.hasPaid &&
                            <>
                                <Spacer horizontal={8} />

                                <Tag label='Pago' color={theme.COLORS.GREEN_500} />
                            </>
                        }

                    </Box>
                    <Box flexDirection="row" width={50}>
                        <Pressable onPress={() => handleModal(false)}>
                            <EditIcon stroke={theme.COLORS.WHITE} />
                        </Pressable>
                        <Spacer horizontal={10} />
                        {
                            timeState.status === 'waiting' || timeState.status === 'paused' ?
                                <>
                                    <Pressable onPress={handleStart}>
                                        <PlayerPlayIcon fill={theme.COLORS.WHITE} />
                                    </Pressable>

                                    <Spacer horizontal={10} />

                                    <Pressable onPress={handleStop}>
                                        <PlayerStopIcon fill={theme.COLORS.WHITE} />
                                    </Pressable>
                                </>
                                : timeState.status === 'active' ?
                                    <Pressable onPress={handlePause}>
                                        <PauseIcon fill={theme.COLORS.WHITE} />
                                    </Pressable>
                                    :
                                    <>
                                        <Pressable onPress={handleComplete}>
                                            <CheckIcon stroke={theme.COLORS.WHITE} />
                                        </Pressable>

                                        <Spacer horizontal={10} />

                                        <Pressable onPress={() => handleModal(true)}>
                                            <RepeatIcon stroke={theme.COLORS.WHITE} />
                                        </Pressable>
                                    </>
                        }

                    </Box>
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
                    </Box>


                </Box>
                {
                    time.pagerNumber &&
                    <>
                        <Spacer vertical={20} />
                        <Tag label={`Nº: ${time.pagerNumber}`} color={theme.COLORS.SECONDARY} />
                    </>
                }
            </Container>
            <ModalForm item={time} onSubmit={handleEdit} ref={modalizeRef} />
        </>
    )

}

export default TimesCard