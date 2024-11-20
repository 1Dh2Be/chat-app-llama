import { useContext, createContext, useState } from "react";

const ModelContext = createContext();

export const ModelProvider = ({ children }) => {

    const [selectedModel, setSelectModel] = useState('llama3.2-11b-vision');

    return (
        <ModelContext.Provider value={{selectedModel, setSelectModel}} >
            {children}
        </ModelContext.Provider>
    );
};

export const useModel = () => {
    return useContext(ModelContext)
}