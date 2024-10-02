import React from "react";
import { Container } from "./styles";
import CustomText from "../Text";

interface ITagProps {
    label: string
    color: string
}

const Tag: React.FC<ITagProps> = ({ label, color }) => {

    return (
        <Container backgroundColor={color}>
            <CustomText color={color} bold>{label}</CustomText>
        </Container>
    )

}

export default Tag