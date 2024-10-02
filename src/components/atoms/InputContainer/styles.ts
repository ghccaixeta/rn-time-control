/* eslint-disable @typescript-eslint/no-explicit-any */
import styled from "styled-components/native";

export const Container = styled.View`
    flex-direction: row;
    gap: 10px;
    padding: 12px;
    border: 1px solid ${(props: any) => props.theme.COLORS.GRAY_200};
    border-radius: 10px;
    align-items: center;

`