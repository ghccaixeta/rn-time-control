import React, { PropsWithChildren } from 'react';
import { Modal } from 'react-native';
import CustomText from '@components/atoms/Text';
import Spacer from '@components/atoms/Spacer';
import { CenteredView, ModalView } from './styles';
import { useTheme } from 'styled-components/native';

interface IModalComponentProps {
    title: string;
    isVisible: boolean;
    onRequestClose: () => void;
}

const ModalComponent: React.FC<PropsWithChildren<IModalComponentProps>> = ({
    title,
    isVisible,
    onRequestClose,
    children,
}) => {
    const theme = useTheme()
    return (
        <CenteredView>
            <Modal
                animationType="fade"
                transparent={true}
                visible={isVisible}
                onRequestClose={onRequestClose}>
                <CenteredView>
                    <ModalView>
                        <CustomText color={theme.COLORS.PRIMARY} bold center>{title}</CustomText>
                        <Spacer vertical={24} />
                        {children}
                    </ModalView>
                </CenteredView>
            </Modal>
        </CenteredView>
    );
};

export default ModalComponent;
