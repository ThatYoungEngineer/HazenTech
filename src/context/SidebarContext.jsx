import { createContext, useContext, useState } from 'react'

const SidebarContext = createContext()

export const useSidebar = () => useContext(SidebarContext)

export const SidebarProvider = ({ children }) => {

  const [openSidebar, setOpenSidebar] = useState(true)

  const updateSidebar = () => {
    setOpenSidebar(prevState => !prevState)
  }

  return (
    <SidebarContext.Provider value={{ openSidebar, updateSidebar }} >
      {children}
    </SidebarContext.Provider>
  );
};
