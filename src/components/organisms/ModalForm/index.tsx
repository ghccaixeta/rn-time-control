/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { forwardRef, useRef, useState } from 'react';
import { Modalize } from 'react-native-modalize';
import { ITimes, TIME_STATUS } from 'src/context/times';

import * as Yup from 'yup';
import { useTheme } from 'styled-components/native';
import Container from '@components/atoms/Container';
import { Formik } from 'formik';
import Box from '@components/atoms/Box';
import CustomText from '@components/atoms/Text';
import Spacer from '@components/atoms/Spacer';
import { Pressable, Switch, TextInput, View } from 'react-native';
import InputContainer from '@components/atoms/InputContainer';
import UserIcon from '@assets/icons/user.svg'
import HourGlassTimeIcon from '@assets/icons/hourglass-time.svg'
import PhoneIcon from '@assets/icons/phone.svg'
import BellExclamationIcon from '@assets/icons/bell-exclamation.svg'
import { newHash } from 'src/utils/crypt';
import Button from '@components/atoms/Button';


interface IModalFormProps {
  item?: ITimes;
  onSubmit: (item: ITimes) => void;
}

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

const ModalForm = forwardRef(function ModalForm({ item, onSubmit }: IModalFormProps, ref) {

  const theme = useTheme();
  const formikRef = useRef<any>();

  const [isLoading, setIsLoading] = useState(false)

  const handlePaid = () => {
    formikRef.current.setFieldValue('hasPaid', !formikRef.current.values.hasPaid)
  }

  const onModalClose = () => {
    setIsLoading(false)
  }

  const handleFormSubmit = (values: FormValues) => {
    setIsLoading(true)
    const time: ITimes = {
      ...values,
      minutes: values.time

    }

    onSubmit(time)
  }

  return (
    <Modalize
      ref={ref}
      adjustToContentHeight
      withReactModal
      onClose={onModalClose}
      FooterComponent={
        <View style={{ backgroundColor: theme.COLORS.WHITE, padding: 20 }}>
          <Button title="Salvar" isLoading={isLoading} onPress={() => formikRef.current.handleSubmit()} />
        </View>
      }
    >
      <Container backgroundColor={theme.COLORS.WHITE}>
        <Formik
          innerRef={formikRef}
          initialValues={{
            id: item?.id ?? newHash(),
            status: item?.status ?? 'waiting',
            completeName: item?.completeName ?? '',
            time: item?.minutes ?? 11,
            hasPaid: item?.hasPaid ?? false,
            phone: item?.phone ?? '',
            pagerNumber: item?.pagerNumber ?? undefined,
            date: item?.date ?? '',
          }}
          onSubmit={handleFormSubmit}
          validationSchema={FormSchema}>
          {({ handleChange, values, errors, touched }) => (
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
                    disabled
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
                  value={values.pagerNumber?.toString()}
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
            </>
          )}
        </Formik>
      </Container>
    </Modalize>
  )
});

export default ModalForm;
