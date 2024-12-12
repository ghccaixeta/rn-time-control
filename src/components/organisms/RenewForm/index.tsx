import { Formik } from "formik";
import React from "react";
import { TextInput } from "react-native-gesture-handler";
import Container from "src/components/atoms/Container";
import InputContainer from "src/components/atoms/InputContainer";
import { useTheme } from "styled-components/native";
import HourGlassTimeIcon from '@assets/icons/hourglass-time.svg'
import UserIcon from '@assets/icons/user.svg'

import * as Yup from 'yup';
import Button from "src/components/atoms/Button";
import Spacer from "src/components/atoms/Spacer";
import { ITimes, useTimes } from "src/context/times";
import CustomText from "@components/atoms/Text";

interface IRenewFormInterface {
    item: ITimes
    handleRenew: (item: ITimes[]) => void
}
interface FormValues {
    time: number,
}

const FormSchema = Yup.object().shape({
    time: Yup.number().required('O campo tempo é obrigatório'),
});

const RenewForm: React.FC<IRenewFormInterface> = ({ item, handleRenew }) => {

    const theme = useTheme();
    const { times } = useTimes();

    const handleSubmit = async (
        values: FormValues,
    ) => {
        const _times: ITimes[] = times
        _times.map((time) => {
            if (time.id === item.id) {
                time.status = 'active'
                time.minutes = Number(time.minutes) + Number(values.time)
            }
        })

        handleRenew(_times)
    }

    return (
        <Container backgroundColor={theme.COLORS.WHITE}>
            <Formik
                initialValues={{ completeName: '', time: 21 }}
                onSubmit={handleSubmit}
                validationSchema={FormSchema}>
                {({ handleChange, handleSubmit, values, errors, touched }) => (
                    <>
                        <InputContainer
                            leftComponent={<UserIcon />}
                            backgroundColor={theme.COLORS.GRAY_200}
                        >

                            <CustomText color={theme.COLORS.BACKGROUND}>{item.completeName}</CustomText>

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

                        <Spacer vertical={40} />

                        <Button title="Renovar" onPress={() => handleSubmit()} />
                    </>
                )}
            </Formik>
        </Container>
    )

}

export default RenewForm