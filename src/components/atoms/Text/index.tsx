import React, { PropsWithChildren } from "react";
import { TextComponent } from "./styles";

export interface ITextProps {
    color?: string
    center?: boolean
    bold?: boolean
    size?: number
}

const CustomText: React.FC<PropsWithChildren<ITextProps>> = ({ color, center, bold, size, children }) => {
    return (
        <TextComponent color={color} center={center} bold={bold} size={size}>
            {children}
        </TextComponent>
    )
}

export default CustomText;