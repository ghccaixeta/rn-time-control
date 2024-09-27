/* eslint-disable @typescript-eslint/no-explicit-any */

import styled from "styled-components/native";
import { Text } from 'react-native';

interface ITextComponentProps {
    color?: string
    center?: boolean
    bold?: boolean

}

export const TextComponent = styled(Text) <ITextComponentProps>`

    color: ${(props: any) => props.color ? props.color : props.theme.COLORS.WHITE};
    text-align: ${(props: any) => props.center ? 'center' : 'start'};
    font-size: 16px;
    font-weight: ${(props: any) => props.bold ? 'bold' : 'normal'};
    font-family: 'Inter';
    

`