import React, { PropsWithChildren } from "react";
import { ContainerComponent } from "./styles";

interface IContainerProps {
    backgroundColor?: string;
}

const Container: React.FC<PropsWithChildren<IContainerProps>> = ({ backgroundColor, children }) => {

    return (
        <ContainerComponent backgroundColor={backgroundColor}>
            {children}
        </ContainerComponent>
    )

}

export default Container