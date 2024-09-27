import React, { PropsWithChildren } from "react";
import { TextComponent } from "./styles";

export interface ITextProps {
    color?: string
    center?: boolean
    bold?: boolean
}

const CustomText: React.FC<PropsWithChildren<ITextProps>> = ({ color, center, bold, children }) => {
    return (
        <TextComponent color={color} center={center} bold={bold}>
            {children}
        </TextComponent>
    )
}

export default CustomText;