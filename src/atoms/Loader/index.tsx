import React from "react";
import { ActivityIndicator } from "react-native";
import { Container } from "./styles";

interface ILoaderProps {
    size?: 'small' | 'large'
}

const Loader: React.FC<ILoaderProps> = ({ size = 'large' }) => {

    return (
        <Container>
            <ActivityIndicator size={size} />
        </Container>
    )

}

export default Loader