/* eslint-disable @typescript-eslint/no-explicit-any */
import styled from "styled-components/native";

interface IContainerProps {
    backgroundColor: string
}

export const Container = styled.View<IContainerProps>`

    padding: 4px 12px;
    border-radius: 100px;
    background-color: ${(props: any) => props.backgroundColor + 25};
    align-self: flex-start;
    border: 1px solid ${(props: any) => props.backgroundColor};

`