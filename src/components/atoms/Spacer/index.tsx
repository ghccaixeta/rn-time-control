import React from "react";
import { View } from "react-native";

interface ISpacerProps {
    vertical?: number
    horizontal?: number
}

const Spacer: React.FC<ISpacerProps> = ({ vertical = 0, horizontal = 0 }) => {

    return <View style={{ marginTop: vertical, marginRight: horizontal }} />

}

export default Spacer;