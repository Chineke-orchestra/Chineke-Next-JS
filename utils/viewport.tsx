import React, { useContext, useState, useEffect } from "react";

export const ViewportContext = React.createContext<{
  isMobile: boolean;
  isTablet: boolean;
}>({ isMobile: false, isTablet: false });
export const useViewport = () => useContext(ViewportContext);

export const ViewportProvider = ({ children }: any) => {
  const [isMobile, setIsMobile] = useState<boolean>(false);
  const [isTablet, setIsTablet] = useState<boolean>(false);

  useEffect(() => {
    setIsMobile(typeof window !== "undefined" && window.innerWidth < 769);
    const resizeAction = () => {
      setIsMobile(window.innerWidth < 769);
      setIsTablet(window.innerWidth < 1025);
    };
    if (typeof window !== "undefined") {
      window.addEventListener("resize", resizeAction);
    }
    return () => {
      window.removeEventListener("resize", resizeAction);
    };
  }, []);

  return (
    <ViewportContext.Provider
      value={{
        isMobile,
        isTablet,
      }}
    >
      {children}
    </ViewportContext.Provider>
  );
};
