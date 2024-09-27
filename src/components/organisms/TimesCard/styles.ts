/* eslint-disable @typescript-eslint/no-explicit-any */
import styled from "styled-components/native";

export const Container = styled.View`

    flex-direction: row;
    padding: 30px 18px;
    background-color: ${(props: any) => props.theme.COLORS.PRIMARY};
    border-radius: 10px;

`