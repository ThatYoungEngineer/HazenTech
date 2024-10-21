import { createContext, useContext, useState } from 'react'

import generateUsers from '../assets/data/user.js'

const SidebarContext = createContext()

export const useSidebar = () => useContext(SidebarContext)

export const SidebarProvider = ({ children }) => {

  const [openSidebar, setOpenSidebar] = useState(true)
  const [users, setUsers] = useState(generateUsers)
  const [ selectedUsers, setSelectedUsers] = useState([])

  const updateSidebar = () => {
    setOpenSidebar(prevState => !prevState)
  }

  const handleSelectUser = (selectedIds) => {
    const matchedUsers = generateUsers.filter(user => selectedIds.includes(user.id));

    setSelectedUsers(matchedUsers);
  }

  return (
    <SidebarContext.Provider value={{ openSidebar, updateSidebar, users, selectedUsers, handleSelectUser }} >
      {children}
    </SidebarContext.Provider>
  );
};
