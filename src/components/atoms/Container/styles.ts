/* eslint-disable @typescript-eslint/no-explicit-any */
import styled from "styled-components/native";

interface IContainerComponentProps {
    backgroundColor: string,
}

export const ContainerComponent = styled.View<IContainerComponentProps>`

    flex: 1;
    padding: 24px 14px;
    background-color:  ${(props: any) => props.backgroundColor ? props.backgroundColor : props.theme.COLORS.BACKGROUND};

`