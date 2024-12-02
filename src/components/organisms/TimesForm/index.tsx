import { Formik } from "formik";
import React, { useRef, useState } from "react";
import { TextInput } from "react-native-gesture-handler";
import Container from "src/components/atoms/Container";
import InputContainer from "src/components/atoms/InputContainer";
import { useTheme } from "styled-components/native";
import UserIcon from '@assets/icons/user.svg'
import HourGlassTimeIcon from '@assets/icons/hourglass-time.svg'
import CryptoJS from 'crypto-js';

import * as Yup from 'yup';
import Button from "src/components/atoms/Button";
import Spacer from "src/components/atoms/Spacer";
import { useTimes } from "src/context/times";
import { Modalize } from "react-native-modalize";
import CustomText from "@components/atoms/Text";
import { Switch } from "react-native";
import Box from "@components/atoms/Box";

interface ITimesFormInterface {
    modalRef: React.RefObject<Modalize>
}
interface FormValues {
    completeName: string,
    time: number,
}

const FormSchema = Yup.object().shape({
    completeName: Yup.string()
        .required('O nome é obrigatório')
        .min(3, 'O nome deve deve conter 3 dígitos.'),
    time: Yup.number().nullable(),
});

const TimesForm: React.FC<ITimesFormInterface> = ({ modalRef }) => {

    const theme = useTheme();
    const { times, setTimes } = useTimes();


    const [isLoading, setIsLoading] = useState<boolean>(false)

    const handleSubmit = async (
        values: FormValues,
    ) => {
        console.log(values)
        const hashSHA256 = CryptoJS.SHA256(new Date().getTime().toString()).toString();
        setIsLoading(true)
        setTimes([...times, { id: hashSHA256, completeName: values.completeName, minutes: values.time, status: 'waiting' }])
        setIsLoading(false)
        modalRef.current?.close()
    }

    return (
        <Container backgroundColor={theme.COLORS.WHITE}>
            <Formik
                initialValues={{ completeName: '', time: 12 }}
                onSubmit={handleSubmit}
                validationSchema={FormSchema}>
                {({ handleChange, handleSubmit, values, errors, touched }) => (
                    <>
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

                        <Spacer vertical={40} />

                        <Button title="Cadastrar" isLoading={isLoading} onPress={() => handleSubmit()} disabled={isLoading} />
                    </>
                )}
            </Formik>
        </Container>
    )

}

export default TimesForm