/* eslint-disable @typescript-eslint/no-explicit-any */
import styled from "styled-components/native";

interface IContainerProps {
    backgroundColor: string
}

export const Container = styled.View<IContainerProps>`
    flex-direction: row;
    gap: 10px;
    padding: 12px;
    border: 1px solid ${(props: any) => props.theme.COLORS.GRAY_200};
    border-radius: 10px;
    align-items: center;
    background-color: ${(props: any) => props.backgroundColor};

`