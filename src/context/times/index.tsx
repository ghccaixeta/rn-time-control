import React, { createContext, PropsWithChildren, useContext } from 'react';
import { MMKVLoader, useMMKVStorage } from 'react-native-mmkv-storage';

const Storage = new MMKVLoader().withEncryption().initialize();

export interface ITimes {
    id: string;
    completeName: string;
    minutes: number;
    isActive: boolean;
    date?: string;
}

const TimesContext = createContext<ITimesContext>({} as ITimesContext);

interface ITimesContext {
    times: ITimes[];
    setTimes: (
        times: ITimes[],
    ) => void;

}

const TimesProvider: React.FC<PropsWithChildren> = ({ children }) => {
    const [times, setTimes] =
        useMMKVStorage<ITimes[]>('times', Storage, []);

    return (
        <TimesContext.Provider
            value={{
                times,
                setTimes,
            }}>
            {children}
        </TimesContext.Provider>
    );
};

function useTimes(): ITimesContext {
    const context = useContext(TimesContext);

    return context;
}

export { TimesProvider, useTimes };
