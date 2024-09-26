/* eslint-disable @typescript-eslint/no-explicit-any */
import styled from "styled-components/native";

export const ContainerComponent = styled.View`

    flex: 1;
    padding: 16px;
    background-color:  ${(props: any) => props.theme.COLORS.BACKGROUND};

`