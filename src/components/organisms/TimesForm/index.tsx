import { Formik } from "formik";
import React, { useRef, useState } from "react";
import { Pressable, TextInput } from "react-native-gesture-handler";
import Container from "src/components/atoms/Container";
import InputContainer from "src/components/atoms/InputContainer";
import { useTheme } from "styled-components/native";
import UserIcon from '@assets/icons/user.svg'
import HourGlassTimeIcon from '@assets/icons/hourglass-time.svg'
import PhoneIcon from '@assets/icons/phone.svg'
import BellExclamationIcon from '@assets/icons/bell-exclamation.svg'
import CryptoJS from 'crypto-js';

import * as Yup from 'yup';
import Button from "src/components/atoms/Button";
import Spacer from "src/components/atoms/Spacer";
import { ITimes, useTimes } from "src/context/times";
import { Modalize } from "react-native-modalize";
import { Switch } from "react-native";
import Box from "@components/atoms/Box";
import CustomText from "@components/atoms/Text";

interface ITimesFormInterface {
    item?: ITimes
    modalRef: React.RefObject<Modalize>
}
interface FormValues {
    completeName: string,
    time: number,
    hasPaid?: boolean
    phone?: string
    pagerNumber?: number,
}

const FormSchema = Yup.object().shape({
    completeName: Yup.string()
        .required('O nome é obrigatório')
        .min(3, 'O nome deve deve conter 3 dígitos.'),
    time: Yup.number().nullable(),
    hasPaid: Yup.boolean().nullable(),
    phone: Yup.string().nullable(),
    pagerNumber: Yup.number().nullable(),
});

const TimesForm: React.FC<ITimesFormInterface> = ({ item, modalRef }) => {

    const theme = useTheme();
    const { times, setTimes } = useTimes();
    const formikRef = useRef<any>();


    const [isLoading, setIsLoading] = useState<boolean>(false)

    const handlePaid = () => {
        formikRef.current.setFieldValue('hasPaid', !formikRef.current.values.hasPaid)
    }

    const handleSubmit = async (
        values: FormValues,
    ) => {
        if (!item) {
            const hashSHA256 = CryptoJS.SHA256(new Date().getTime().toString()).toString();
            setIsLoading(true)
            setTimes([...times, {
                id: hashSHA256,
                completeName: values.completeName,
                minutes: values.time,
                status: 'waiting',
                pagerNumber: values.pagerNumber,
                phone: values.phone,
                hasPaid: values.hasPaid
            }])

        } else {
            const _times: ITimes[] = times
            _times.map((time) => {
                if (time.id === item.id) {
                    time.completeName = values.completeName
                    time.minutes = values.time
                    time.status = 'waiting'
                    time.pagerNumber = values.pagerNumber
                    time.phone = values.phone
                    time.hasPaid = values.hasPaid
                }
            })
            setTimes(_times)
        }
        modalRef.current?.close()
        setIsLoading(false)
    }

    return (
        <Container backgroundColor={theme.COLORS.WHITE}>
            <Formik
                innerRef={formikRef}
                initialValues={{
                    completeName: item?.completeName ?? '',
                    time: item?.minutes ?? 12,
                    hasPaid: item?.hasPaid ?? false,
                    phone: item?.phone ?? '',
                    pagerNumber: item?.pagerNumber ?? undefined,
                }}
                onSubmit={handleSubmit}
                validationSchema={FormSchema}>
                {({ handleChange, handleSubmit, values, errors, touched }) => (
                    <>

                        <Box flexDirection="row" justiFyContent="flex-start" alignItems="center">

                            <CustomText color={theme.COLORS.PRIMARY} bold>Pago:</CustomText>

                            <Spacer horizontal={10} />

                            <Pressable onPress={handlePaid}>
                                <Switch
                                    trackColor={{ false: theme.COLORS.GRAY_200, true: theme.COLORS.PRIMARY }}
                                    thumbColor={theme.COLORS.GRAY_100}
                                    ios_backgroundColor={theme.COLORS.BACKGROUND}
                                    value={values.hasPaid}
                                />
                            </Pressable>

                        </Box>

                        <Spacer vertical={20} />

                        <InputContainer leftComponent={<UserIcon stroke={theme.COLORS.PRIMARY} />} errorMessage={touched.completeName ? errors.completeName : undefined}>
                            <TextInput
                                value={values.completeName}
                                onChangeText={handleChange('completeName')}
                                placeholder="Insira o nome."
                                style={{ flex: 1 }}
                            />
                        </InputContainer>

                        <Spacer vertical={20} />

                        <InputContainer leftComponent={<HourGlassTimeIcon stroke={theme.COLORS.PRIMARY} />} errorMessage={touched.time ? errors.time : undefined}>
                            <TextInput
                                keyboardType="number-pad"
                                value={values.time?.toString()}
                                onChangeText={handleChange('time')}
                                placeholder="Insira o tempo."
                                style={{ flex: 1 }}
                            />
                        </InputContainer>

                        <Spacer vertical={20} />

                        <InputContainer leftComponent={<BellExclamationIcon stroke={theme.COLORS.PRIMARY} />}>
                            <TextInput
                                keyboardType="number-pad"
                                value={values.pagerNumber}
                                onChangeText={handleChange('pagerNumber')}
                                placeholder="Insira o Nª do pager."
                                style={{ flex: 1 }}
                            />
                        </InputContainer>

                        <Spacer vertical={20} />

                        <InputContainer leftComponent={<PhoneIcon stroke={theme.COLORS.PRIMARY} />}>
                            <TextInput
                                keyboardType="number-pad"
                                value={values.phone}
                                onChangeText={handleChange('phone')}
                                placeholder="(00) 0 0000-0000"
                                style={{ flex: 1 }}
                            />
                        </InputContainer>

                        <Spacer vertical={40} />

                        <Button title="Cadastrar" isLoading={isLoading} onPress={() => handleSubmit()} disabled={isLoading} />
                    </>
                )}
            </Formik>
        </Container>
    )

}

export default TimesForm