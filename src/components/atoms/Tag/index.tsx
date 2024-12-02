import React, { ReactNode } from "react";
import { Container } from "./styles";
import CustomText from "../Text";

interface ITagProps {
    label: string | ReactNode
    color: string
}

const Tag: React.FC<ITagProps> = ({ label, color }) => {

    return (
        <Container backgroundColor={color}>
            {
                typeof (label) === 'string' ?
                    <CustomText color={color} bold>{label}</CustomText>
                    : label
            }
        </Container>
    )

}

export default Tag