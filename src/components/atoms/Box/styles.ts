/* eslint-disable @typescript-eslint/no-explicit-any */
import { View } from "react-native";
import styled from "styled-components/native";

interface IContainerProps {
    flexDirection: 'row' | 'column',
    justiFyContent: 'flex-start' | 'flex-end' | 'center' | 'space-between'
    alignItems: 'start' | 'center'
    width: number
}

export const Container = styled(View) <IContainerProps>`
    flex-direction: ${(props: any) => props.flexDirection};
    justify-content: ${(props: any) => props.justiFyContent ? props.justiFyContent : 'flex-end'};
    align-items: ${(props: any) => props.alignItems ? props.alignItems : 'start'};
    width: ${(props: any) => props.width}%;
    

`