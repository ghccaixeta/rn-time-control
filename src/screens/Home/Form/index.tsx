import CustomText from "@components/atoms/Text";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { InicioStackParamList } from "@routes/inicio.routes";
import React, { useRef, useState } from "react";
import Container from "@components/atoms/Container";
import { useTheme } from "styled-components/native";
import { Formik } from "formik";
import * as Yup from 'yup';
import { ITimes, TIME_STATUS } from "src/context/times";
import { newHash } from "src/utils/crypt";
import Box from "@components/atoms/Box";
import Spacer from "@components/atoms/Spacer";
import { Pressable, Switch, TextInput } from "react-native";
import InputContainer from "@components/atoms/InputContainer";
import UserIcon from '@assets/icons/user.svg'
import HourGlassTimeIcon from '@assets/icons/hourglass-time.svg'
import PhoneIcon from '@assets/icons/phone.svg'
import BellExclamationIcon from '@assets/icons/bell-exclamation.svg'
import Button from "@components/atoms/Button";

interface FormValues {
  id: string;
  completeName: string,
  time: number,
  hasPaid?: boolean
  phone?: string
  pagerNumber?: number,
  status: TIME_STATUS,
  date?: string
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


type Props = NativeStackScreenProps<InicioStackParamList, 'Form'>;

const FormScreen: React.FC<Props> = ({ route, navigation }) => {
  const { onSubmit, item, isRenew } = route.params;

  const theme = useTheme();
  const formikRef = useRef<any>();

  const [isLoading, setIsLoading] = useState(false)

  const handlePaid = () => {
    formikRef.current.setFieldValue('hasPaid', !formikRef.current.values.hasPaid)
  }
  const handleFormSubmit = (values: FormValues) => {
    setIsLoading(true)
    const time: ITimes = {
      ...values,
      minutes: values.time,
      status: isRenew ? 'active' : values.status

    }

    onSubmit(time)

    navigation.goBack()
  }

  const increaseMinutes = (minutes?: number) => {
    if (minutes) {

      return Number(minutes) + (isRenew ? 20 : 0)
    }

    return null;
  }

  return (
    <Container>
      <Formik
        innerRef={formikRef}
        initialValues={{
          id: item?.id ?? newHash(),
          status: item?.status ?? 'waiting',
          completeName: item?.completeName ?? '',
          time: increaseMinutes(item?.minutes) ?? 11,
          hasPaid: item?.hasPaid ?? false,
          phone: item?.phone ?? '',
          pagerNumber: item?.pagerNumber ?? undefined,
          date: item?.date ?? '',
        }}
        onSubmit={handleFormSubmit}
        validationSchema={FormSchema}>
        {({ handleChange, values, errors, touched, handleSubmit }) => (
          <>

            <Box flexDirection="row" justiFyContent="flex-start" alignItems="center">

              <CustomText color={theme.COLORS.WHITE} bold>Pago:</CustomText>

              <Spacer horizontal={10} />

              <Pressable onPress={handlePaid}>
                <Switch
                  trackColor={{ false: theme.COLORS.GRAY_200, true: theme.COLORS.GREEN_500 }}
                  thumbColor={theme.COLORS.WHITE}
                  ios_backgroundColor={theme.COLORS.PRIMARY}
                  value={values.hasPaid}
                  disabled
                />
              </Pressable>

            </Box>

            <Spacer vertical={20} />

            <InputContainer leftComponent={<UserIcon stroke={theme.COLORS.WHITE} />} errorMessage={touched.completeName ? errors.completeName : undefined}>
              <TextInput
                value={values.completeName}
                onChangeText={handleChange('completeName')}
                placeholder="Insira o nome."
                style={{ flex: 1, color: theme.COLORS.WHITE }}
                placeholderTextColor={theme.COLORS.WHITE}
              />
            </InputContainer>

            <Spacer vertical={20} />

            <InputContainer leftComponent={<HourGlassTimeIcon stroke={theme.COLORS.WHITE} />} errorMessage={touched.time ? errors.time : undefined}>
              <TextInput
                keyboardType="number-pad"
                value={values.time?.toString()}
                onChangeText={handleChange('time')}
                placeholder="Insira o tempo."
                style={{ flex: 1, color: theme.COLORS.WHITE }}
                placeholderTextColor={theme.COLORS.WHITE}
              />
            </InputContainer>

            <Spacer vertical={20} />

            <InputContainer leftComponent={<BellExclamationIcon stroke={theme.COLORS.WHITE} />}>
              <TextInput
                keyboardType="number-pad"
                value={values.pagerNumber?.toString()}
                onChangeText={handleChange('pagerNumber')}
                placeholder="Insira o Nª do pager."
                style={{ flex: 1, color: theme.COLORS.WHITE }}
                placeholderTextColor={theme.COLORS.WHITE}
              />
            </InputContainer>

            <Spacer vertical={20} />

            <InputContainer leftComponent={<PhoneIcon stroke={theme.COLORS.WHITE} />}>
              <TextInput
                keyboardType="number-pad"
                value={values.phone}
                onChangeText={handleChange('phone')}
                placeholder="(00) 0 0000-0000"
                style={{ flex: 1, color: theme.COLORS.WHITE }}
                placeholderTextColor={theme.COLORS.WHITE}
              />
            </InputContainer>

            <Spacer vertical={20} />

            <Button title="Salvar" isLoading={isLoading} onPress={() => handleSubmit()} />
          </>
        )}
      </Formik>
    </Container>
  )
}

export default FormScreen
