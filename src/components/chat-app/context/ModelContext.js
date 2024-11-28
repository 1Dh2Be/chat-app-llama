import { useContext, createContext, useState } from "react";

const ModelContext = createContext();

export const ModelProvider = ({ children }) => {

    const [selectedModel, setSelectModel] = useState({'Nexus':'Qwen2-72B-Instruct'});

    return (
        <ModelContext.Provider value={{selectedModel, setSelectModel}} >
            {children}
        </ModelContext.Provider>
    );
};

export const useModel = () => {
    return useContext(ModelContext)
}