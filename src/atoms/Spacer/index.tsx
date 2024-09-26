import React from "react";
import { View } from "react-native";

interface ISpacerProps {
    size: number
}

const Spacer: React.FC<ISpacerProps> = ({ size }) => {

    return <View style={{ marginTop: size }} />

}

export default Spacer;