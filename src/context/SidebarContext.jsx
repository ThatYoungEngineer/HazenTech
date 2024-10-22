import { createContext, useContext, useState } from 'react'

import generateUsers from '../assets/data/user.js'

const SidebarContext = createContext()

export const useSidebar = () => useContext(SidebarContext)

export const SidebarProvider = ({ children }) => {

  const [openSidebar, setOpenSidebar] = useState(true)
  const [users, setUsers] = useState(generateUsers)
  const [selectedUsers, setSelectedUsers] = useState([])

  const updateSidebar = () => {
    setOpenSidebar(prevState => !prevState)
  }

  const handleSelectUser = (userId) => {
    if (userId === "emptyArray") {
      setSelectedUsers([])
      return
    } else {
      setSelectedUsers((prevSelectedUsers) => {
        if (prevSelectedUsers.includes(userId)) {
          return prevSelectedUsers.filter((id) => id !== userId);
        } else {
          return [...prevSelectedUsers, userId]
        }
      })
    }
  }

  return (
    <SidebarContext.Provider value={{ openSidebar, updateSidebar, users, selectedUsers, handleSelectUser }} >
      {children}
    </SidebarContext.Provider>
  );
};
