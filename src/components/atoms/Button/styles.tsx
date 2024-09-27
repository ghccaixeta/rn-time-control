/* eslint-disable @typescript-eslint/no-explicit-any */
import { Pressable } from "react-native-gesture-handler";
import styled from "styled-components/native";

export const Container = styled(Pressable)`
    flex-direction: row;
    gap: 10px;
    justify-content: center;
    align-content: center;
    align-items: center;
    padding: 20px;
    background-color: ${(props: any) => props.theme.COLORS.PRIMARY};
    border-radius: 10px;

`