import React, { PropsWithChildren } from "react";
import { ContainerComponent } from "./styles";

const Container: React.FC<PropsWithChildren> = ({ children }) => {

    return (
        <ContainerComponent>
            {children}
        </ContainerComponent>
    )

}

export default Container