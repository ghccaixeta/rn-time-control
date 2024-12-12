import React, { createContext, ReactNode, useCallback, useContext, useRef, useState } from 'react';
import { Modalize } from 'react-native-modalize';

export interface IModalProps {
  content: ReactNode
}

export interface IModalContext {
  show(param: IModalProps): void;
  hide(): void;
}

export interface IModalProviderProps {
  children?: React.ReactNode;
}

const ModalContext = createContext<IModalContext>({} as IModalContext);

const ModalProvider: React.FC<IModalProviderProps> = ({ children }) => {
  const [modalData, setModalData] = useState<IModalProps>({} as IModalProps);

  const modalizeRef = useRef<Modalize>(null);

  const show = useCallback((data: IModalProps) => {
    setModalData(data);
    modalizeRef.current?.open();
  }, []);

  const hide = useCallback(() => {
    setModalData({} as IModalProps);
    modalizeRef.current?.close();
  }, []);

  return (
    <ModalContext.Provider value={{ show, hide }}>
      {children}
      {modalData.content && (
        <Modalize adjustToContentHeight ref={modalizeRef}>
          {modalData.content}
        </Modalize>
      )}
    </ModalContext.Provider>
  );
};

function useModal(): IModalContext {
  const context = useContext(ModalContext);

  return context;
}

export { ModalProvider, useModal };
