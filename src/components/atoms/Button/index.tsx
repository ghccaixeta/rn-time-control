import React from "react";
import { Container } from "./styles";
import { ActivityIndicator, PressableProps } from "react-native";
import CustomText from "../Text";


interface IButtonProps extends PressableProps {
    title: string
    isLoading?: boolean
}

const Button: React.FC<IButtonProps> = ({ title, isLoading, ...rest }) => {

    return (
        <Container {...rest}>
            {
                isLoading &&
                <ActivityIndicator />
            }
            <CustomText center bold>{title}</CustomText>
        </Container>
    )

}

export default Button;