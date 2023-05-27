import React, {
    SetStateAction,
    createContext,
    useCallback,
    useContext,
    useState,
  } from "react";
  interface GlobalStateProviderProps {
    children: React.ReactNode;
  }
  
  type GlobalContextType = {
    pending: boolean;
    setPending: React.Dispatch<SetStateAction<boolean>>;
    openWalletModal: boolean;
    toggleWalletModal: () => void;
  };
  
  const GlobalStateContext = createContext({} as GlobalContextType);
  
  function GlobalStateProvider({ children }: GlobalStateProviderProps) {
    const [pending, setPending] = useState<boolean>(false);
     const [openWalletModal, setOpenWalletModal] = useState<boolean>(false);
     const toggleWalletModal = useCallback(
       () => setOpenWalletModal((w) => !w),
       [setOpenWalletModal]
     );
   
    return (
      <GlobalStateContext.Provider
        value={{
          pending,
          setPending,
          openWalletModal,
          toggleWalletModal,
        }}
      >
        {children}
      </GlobalStateContext.Provider>
    );
  }
  
  const useGlobalState = () => {
    return useContext(GlobalStateContext);
  };
  
  export { GlobalStateProvider, useGlobalState };
  